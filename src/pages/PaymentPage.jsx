import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowUp, Loader2 } from 'lucide-react';
import { stripePromise } from '../utils/stripe';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const products = {
  1: {
    id: 1,
    name: "1oz Gold Bar",
    price: 2050.00,
    image: "https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&w=800&q=80",
    description: "999.9 Fine Gold LBMA Certified"
  },
  2: {
    id: 2,
    name: "American Gold Eagle",
    price: 2150.00,
    image: "https://images.unsplash.com/photo-1624365169364-0640dd10e180?auto=format&fit=crop&w=800&q=80",
    description: "1oz American Eagle Gold Coin 2024"
  },
  3: {
    id: 3,
    name: "100g Gold Bar",
    price: 6500.00,
    image: "https://images.unsplash.com/photo-1618403088890-3d9ff6f4c8b1?auto=format&fit=crop&w=800&q=80",
    description: "PAMP Suisse 100g Gold Bar"
  }
};

const PaymentPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const product = products[Number(productId)];

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handlePayment = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // 1. Check server health
      const healthCheck = await fetch(`${API_BASE_URL}/api/health`);
      if (!healthCheck.ok) {
        throw new Error('Payment server is not available. Please try again later.');
      }
      console.log('Server health check passed');

      // 2. Get Stripe instance
      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe failed to initialize');
      console.log('Stripe initialized successfully');

      // Get the current origin for absolute URLs
      const origin = window.location.origin;

      // 3. Create checkout session
      console.log('Creating checkout session with product:', {
        name: product.name,
        price: product.price,
        description: product.description,
        image: product.image,
        successUrl: `${origin}/success`,
        cancelUrl: `${origin}/cancel`
      });

      const response = await fetch(`${API_BASE_URL}/api/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productName: product.name,
          productPrice: product.price,
          productDescription: product.description,
          productImage: product.image,
          successUrl: `${origin}/success`,
          cancelUrl: `${origin}/cancel`
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || data.details || 'Failed to create checkout session');
      }

      if (!data.sessionId) {
        throw new Error('No session ID received from server');
      }

      console.log('Session created successfully:', data.sessionId);

      // 4. Redirect to checkout
      const { error: redirectError } = await stripe.redirectToCheckout({
        sessionId: data.sessionId,
      });

      if (redirectError) {
        throw new Error(`Redirect failed: ${redirectError.message}`);
      }
    } catch (error) {
      console.error('Payment error:', error);
      setError(error.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Product not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      {/* Back Button */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <button
            onClick={handleBack}
            className="group flex items-center space-x-2 text-[#854836] hover:text-[#FFB22C] transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="font-semibold">Back to Products</span>
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-64 object-cover"
              />
            </div>
            <div className="p-8 md:w-1/2">
              <h2 className="text-2xl font-bold mb-4 text-[#854836]">{product.name}</h2>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <div className="mb-8">
                <span className="text-3xl font-bold text-[#854836]">${product.price.toLocaleString()}</span>
              </div>
              <button
                onClick={handlePayment}
                disabled={loading}
                className={`w-full bg-[#FFB22C] text-[#F7F7F7] py-3 rounded-lg font-semibold 
                  ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#854836]'} 
                  transition-colors duration-300`}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Processing...
                  </span>
                ) : (
                  'Proceed to Payment'
                )}
              </button>
              {error && (
                <p className="mt-4 text-sm text-red-600 text-center">
                  {error}
                </p>
              )}
              <p className="mt-4 text-sm text-gray-500 text-center">
                Secure payment powered by Stripe
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-yellow-400 hover:bg-yellow-500 text-gray-900 p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default PaymentPage; 