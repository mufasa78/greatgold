import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const PaymentSuccessPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    // If no session ID is present, redirect to home
    if (!sessionId) {
      navigate('/');
    }
  }, [sessionId, navigate]);

  if (!sessionId) {
    return null; // Don't render anything while redirecting
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F7F7F7] py-12">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <div className="mb-6">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto animate-bounce" />
          </div>
          <h1 className="text-2xl font-bold text-[#854836] mb-4">
            Payment Successful!
          </h1>
          <div className="text-gray-600 mb-8 space-y-4">
            <p>Thank you for your purchase. Your order has been confirmed.</p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm font-medium">Order ID:</p>
              <p className="text-xs font-mono mt-1 break-all">{sessionId}</p>
            </div>
            <p className="text-sm">
              You will receive a confirmation email shortly.
            </p>
          </div>
          <div className="space-y-4">
            <button
              onClick={() => navigate('/')}
              className="w-full bg-[#FFB22C] hover:bg-[#854836] text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300"
            >
              Return to Home
            </button>
            <button
              onClick={() => window.print()}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold transition-colors duration-300"
            >
              Print Receipt
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage; 