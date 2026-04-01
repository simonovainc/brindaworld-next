import { stripe } from '@/lib/stripe';
import { createAdminClient } from '@/lib/supabase/admin';
import { NextRequest, NextResponse } from 'next/server';
import { Readable } from 'stream';

async function getRawRequestBody(req: NextRequest): Promise<string> {
  const chunks: Uint8Array[] = [];
  const reader = req.body?.getReader();

  if (!reader) {
    return '';
  }

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value);
    }
  } catch (error) {
    console.error('Error reading request body:', error);
  }

  const buffer = Buffer.concat(chunks.map((chunk) => Buffer.from(chunk)));
  return buffer.toString('utf-8');
}

export async function POST(req: NextRequest) {
  const body = await getRawRequestBody(req);
  const signature = req.headers.get('stripe-signature');

  if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('Webhook signature verification failed:', message);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  const supabase = createAdminClient();

  try {
    switch (event.type) {
      case 'customer.subscription.updated': {
        const subscription = event.data.object;
        const customerId = subscription.customer as string;

        const { data: customer } = await stripe.customers.retrieve(customerId);

        if (!customer || 'deleted' in customer || !customer.metadata?.user_id) {
          console.error('Customer not found or metadata missing');
          break;
        }

        await supabase
          .from('subscriptions')
          .update({
            status: subscription.status as 'active' | 'canceled' | 'past_due' | 'unpaid',
            current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
            current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
            updated_at: new Date().toISOString(),
          })
          .eq('stripe_subscription_id', subscription.id);
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object;

        await supabase
          .from('subscriptions')
          .update({
            status: 'canceled',
            updated_at: new Date().toISOString(),
          })
          .eq('stripe_subscription_id', subscription.id);
        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object;

        if (invoice.subscription) {
          await supabase
            .from('subscriptions')
            .update({
              status: 'active',
              updated_at: new Date().toISOString(),
            })
            .eq('stripe_subscription_id', invoice.subscription as string);
        }
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object;

        if (invoice.subscription) {
          await supabase
            .from('subscriptions')
            .update({
              status: 'past_due',
              updated_at: new Date().toISOString(),
            })
            .eq('stripe_subscription_id', invoice.subscription as string);
        }
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
