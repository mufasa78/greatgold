# Gold Investment Platform

A modern, responsive web application for purchasing investment-grade gold products. Built with React and styled with Tailwind CSS.

## Overview

This platform provides a seamless experience for users to browse and purchase high-quality gold investment products, including gold bars and coins. The website features a clean, professional design with emphasis on security and trust.

## Features

### 1. Homepage
- **Hero Section**: Large, engaging banner with a clear value proposition
- **Features Section**: Highlights three key benefits
  - Secure Storage (with insurance)
  - Real-time Market Updates
  - LBMA Certified Products
- **Product Showcase**: Grid layout featuring premium gold products

### 2. Product Listings
- Three premium products available:
  1. 1oz Gold Bar (999.9 Fine Gold LBMA Certified)
  2. American Gold Eagle Coin (2024 Edition)
  3. 100g PAMP Suisse Gold Bar
- Each product includes:
  - High-quality product image
  - Detailed description
  - Current price
  - "Buy Now" button

### 3. Payment Integration
- Secure checkout process
- Stripe payment integration (configured for test mode)
- Real-time price updates
- Mobile-responsive payment interface

## Technical Stack

### Frontend
- **React**: JavaScript library for building the user interface
- **React Router**: For handling navigation between pages
- **Tailwind CSS**: For styling and responsive design
- **Lucide React**: For high-quality icons
- **Google Fonts**: Poppins font family for modern typography

### Payment Processing
- **Stripe**: For secure payment processing
- **@stripe/stripe-js**: Stripe's JavaScript library

## Design Features

### Typography
- **Font Family**: Poppins
- **Weights Used**:
  - Light (300): Subtle text elements
  - Regular (400): Body text
  - Medium (500): Semi-emphasized text
  - Semi-bold (600): Important information
  - Bold (700): Headings and CTAs

### Color Scheme
- Primary: Yellow-400 (#FBBF24) for CTAs and highlights
- Text: Various grays for readability
- Background: White for content areas, subtle gray for sections
- Accent: Yellow-500 for hover states

### Responsive Design
- Mobile-first approach
- Breakpoints:
  - md: 768px (tablet and up)
  - lg: 1024px (desktop)

## Security Features

1. Secure payment processing through Stripe
2. HTTPS encryption
3. Protected routes
4. Input validation
5. Secure storage guarantees

## Product Information

### 1. 1oz Gold Bar
- Price: $2,050.00
- Features: 999.9 Fine Gold
- Certification: LBMA Certified
- Storage: Fully insured facility

### 2. American Gold Eagle
- Price: $2,150.00
- Year: 2024
- Type: Coin
- Certification: US Mint

### 3. 100g Gold Bar
- Price: $6,500.00
- Manufacturer: PAMP Suisse
- Weight: 100 grams
- Storage: Secured vault

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables:
   - Create a `.env` file
   - Add Stripe API keys
4. Start development server:
   ```bash
   npm run dev
   ```

## Deployment

The application can be built for production using:
```bash
npm run build
```

## Future Enhancements

1. Real-time price updates from gold markets
2. User accounts and purchase history
3. Additional payment methods
4. Product filtering and search
5. Market analysis tools
6. Mobile app version

## Support

For technical support or inquiries:
- Email: [support@goldvault.com]
- Phone: [Your support number]
- Hours: 24/7 availability

## Legal Information

- All products are verified and certified
- Shipping is insured
- Storage facilities are fully secured
- Market prices are updated in real-time
- Terms and conditions apply

---

© 2024 Gold Investment Platform. All rights reserved. 