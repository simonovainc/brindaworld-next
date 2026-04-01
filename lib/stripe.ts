import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY environment variable is not set');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-04-10',
});

export const STRIPE_PRODUCTS = {
  flourish_monthly: process.env.NEXT_PUBLIC_STRIPE_FLOURISH_PRODUCT_ID || 'prod_flourish_monthly',
  flourish_annual: process.env.NEXT_PUBLIC_STRIPE_FLOURISH_ANNUAL_ID || 'prod_flourish_annual',
} as const;

export async function getProductPrices(productId: string) {
  try {
    const prices = await stripe.prices.list({
      product: productId,
      active: true,
    });
    return prices.data;
  } catch (error) {
    console.error('Error fetching prices:', error);
    throw error;
  }
}
