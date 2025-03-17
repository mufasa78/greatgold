import { loadStripe } from '@stripe/stripe-js';

// Make sure your key starts with 'pk_test_' or 'pk_live_'
export const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY); 