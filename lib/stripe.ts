import Stripe from 'stripe';

function getStripeClient(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error('STRIPE_SECRET_KEY environment variable is not set');
  }
  return new Stripe(key, {
    apiVersion: '2024-04-10',
  });
}

let _stripe: Stripe | null = null;
export function getStripe(): Stripe {
  if (!_stripe) {
    _stripe = getStripeClient();
  }
  return _stripe;
}

export const stripe = new Proxy({} as Stripe, {
  get(_target, prop) {
    return (getStripe() as any)[prop];
  },
});

export const STRIPE_PRODUCTS = {
  flourish_monthly: process.env.NEXT_PUBLIC_STRIPE_FLOURISH_PRODUCT_ID || 'prod_flourish_monthly',
  flourish_annual: process.env.NEXT_PUBLIC_STRIPE_FLOURISH_ANNUAL_ID || 'prod_flourish_annual',
} as const;

export async function getProductPrices(productId: string) {
  try {
    const prices = await getStripe().prices.list({
      product: productId,
      active: true,
    });
    return prices.data;
  } catch (error) {
    console.error('Error fetching prices:', error);
    throw error;
  }
}
