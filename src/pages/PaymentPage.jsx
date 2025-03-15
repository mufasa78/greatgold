import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { ArrowLeft, ArrowUp } from 'lucide-react';

// This would normally come from an environment variable
const STRIPE_PUBLIC_KEY = 'pk_test_your_key';

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
    setLoading(true);
    
    // In a real application, you would:
    // 1. Call your backend to create a Stripe session
    // 2. Redirect to Stripe Checkout
    // For demo purposes, we'll just show an alert
    alert('In a production environment, this would redirect to Stripe Checkout');
    setLoading(false);
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
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <button
            onClick={handleBack}
            className="group flex items-center space-x-2 text-gray-600 hover:text-yellow-500 transition-all duration-300"
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
              <h2 className="text-2xl font-bold mb-4">{product.name}</h2>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <div className="mb-8">
                <span className="text-3xl font-bold">${product.price.toLocaleString()}</span>
              </div>
              <button
                onClick={handlePayment}
                disabled={loading}
                className={`w-full bg-yellow-400 text-gray-900 py-3 rounded-lg font-semibold 
                  ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-yellow-500'} 
                  transition duration-300`}
              >
                {loading ? 'Processing...' : 'Proceed to Payment'}
              </button>
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