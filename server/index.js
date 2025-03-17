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

// Configure CORS with specific options
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.post('/create-checkout-session', async (req, res) => {
  try {
    const { productName, productPrice, productDescription, productImage } = req.body;

    if (!productName || !productPrice) {
      return res.status(400).json({ error: 'Missing required product information' });
    }

    // Create a product in Stripe
    const product = await stripe.products.create({
      name: productName,
      description: productDescription,
      images: [productImage],
    });

    // Create a price for the product
    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: Math.round(productPrice * 100), // Convert to cents
      currency: 'usd',
    });

    // Create the checkout session with absolute URLs
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: price.id,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'http://localhost:5173/cancel',
    });

    res.json({ sessionId: session.id });
  } catch (error) {
    console.error('Stripe error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Verify session endpoint
app.get('/verify-session/:sessionId', async (req, res) => {
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

const startServer = async (retries = 5) => {
  const PORT = process.env.PORT || 3001;
  
  try {
    await new Promise((resolve, reject) => {
      const server = app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
        console.log(`Frontend URL: http://localhost:5173`);
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