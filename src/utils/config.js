const isDevelopment = import.meta.env.MODE === 'development';
const isVercel = window.location.hostname.includes('vercel.app');

// For Vercel deployments, use the same origin
// For local development, use localhost:3001
// For other deployments, use the configured API URL or fall back to the same origin
export const API_BASE_URL = isDevelopment 
  ? 'http://localhost:3001'
  : isVercel 
    ? window.location.origin
    : import.meta.env.VITE_API_URL || window.location.origin;

export const STRIPE_PUBLIC_KEY = import.meta.env.VITE_STRIPE_PUBLIC_KEY;

// Log configuration in development
if (isDevelopment) {
  console.log('Configuration:', {
    isDevelopment,
    isVercel,
    API_BASE_URL,
    hasStripeKey: !!STRIPE_PUBLIC_KEY
  });
} 