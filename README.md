# Great Gold Investment Site

A modern e-commerce platform for gold investment products, built with React, Vite, and integrated with Stripe for secure payments.

## Features

- Modern, responsive design
- Secure payment processing with Stripe
- Real-time order verification
- Product catalog with detailed information
- Smooth user experience with loading states and error handling

## Tech Stack

- Frontend: React + Vite
- Styling: TailwindCSS
- Payment Processing: Stripe
- Backend: Node.js + Express
- Deployment: Vercel

## Local Development

1. Clone the repository:
```bash
git clone https://github.com/mufasa78/greatgold.git
cd greatgold
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
STRIPE_SECRET_KEY=your_stripe_secret_key
NODE_ENV=development
PORT=3001
VITE_API_URL=http://localhost:3001
FRONTEND_URL=http://localhost:5173
```

4. Start the development servers:
```bash
# Start the backend server
node server/index.js

# In a new terminal, start the frontend
npm run dev
```

## Deployment

This project is configured for deployment on Vercel. To deploy:

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Add the following environment variables in Vercel:
   - `STRIPE_SECRET_KEY`
   - `VITE_STRIPE_PUBLIC_KEY`
   - `NODE_ENV` (set to "production")
   - `FRONTEND_URL` (your Vercel deployment URL)

## Testing Payments

Use these test card details for Stripe:
- Card number: 4242 4242 4242 4242
- Expiration: Any future date
- CVC: Any 3 digits
- ZIP: Any 5 digits

## License

MIT 