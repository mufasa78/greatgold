import express from 'express';
import cors from 'cors';
import Stripe from 'stripe';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

// Configure dotenv
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

if (!process.env.STRIPE_SECRET_KEY) {
  console.error('Error: STRIPE_SECRET_KEY is not set in environment variables');
  process.exit(1);
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const app = express();

// Configure CORS with allowed origins
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://greatgold.vercel.app', // Add your Vercel domain
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV
  });
});

app.post('/api/create-checkout-session', async (req, res) => {
  try {
    console.log('Received checkout request:', req.body);
    const { 
      productName, 
      productPrice, 
      productDescription, 
      productImage,
      successUrl,
      cancelUrl
    } = req.body;

    if (!productName || !productPrice) {
      console.error('Missing product information:', { productName, productPrice });
      return res.status(400).json({ error: 'Missing required product information' });
    }

    console.log('Creating Stripe product...');
    const product = await stripe.products.create({
      name: productName,
      description: productDescription || '',
      images: productImage ? [productImage] : [],
    });
    console.log('Product created:', product.id);

    console.log('Creating Stripe price...');
    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: Math.round(productPrice * 100),
      currency: 'usd',
    });
    console.log('Price created:', price.id);

    console.log('Creating checkout session...');
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: price.id,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${successUrl}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl,
    });
    console.log('Session created:', session.id);

    res.json({ sessionId: session.id });
  } catch (error) {
    console.error('Stripe error details:', {
      message: error.message,
      type: error.type,
      code: error.code,
      stack: error.stack
    });
    res.status(500).json({ 
      error: 'Failed to create checkout session',
      details: error.message
    });
  }
});

// Verify session endpoint
app.get('/api/verify-session/:sessionId', async (req, res) => {
  try {
    const { sessionId } = req.params;
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    res.json({ 
      status: session.payment_status,
      customer: session.customer_details
    });
  } catch (error) {
    console.error('Session verification error:', error);
    res.status(400).json({ error: 'Invalid session' });
  }
});

// Only start the server in development mode
if (process.env.NODE_ENV === 'development') {
  const startServer = async (retries = 5) => {
    const PORT = process.env.PORT || 3001;
    
    try {
      await new Promise((resolve, reject) => {
        const server = app.listen(PORT, () => {
          console.log(`Server running on port ${PORT}`);
          console.log(`Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
          resolve();
        });

        server.on('error', (error) => {
          if (error.code === 'EADDRINUSE') {
            console.log(`Port ${PORT} is busy, trying alternative port...`);
            server.close();
            if (retries > 0) {
              process.env.PORT = String(Number(PORT) + 1);
              startServer(retries - 1);
            } else {
              console.error('No available ports found after retries');
              process.exit(1);
            }
          } else {
            console.error('Server error:', error);
            reject(error);
          }
        });
      });
    } catch (error) {
      console.error('Failed to start server:', error);
      process.exit(1);
    }
  };

  startServer();
}

process.on('unhandledRejection', (error) => {
  console.error('Unhandled Rejection:', error);
});

// Export the Express API
export default app; 