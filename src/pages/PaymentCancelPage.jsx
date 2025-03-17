import React from 'react';
import { useNavigate } from 'react-router-dom';
import { XCircle } from 'lucide-react';

const PaymentCancelPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F7F7F7]">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <XCircle className="w-16 h-16 text-[#854836] mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-[#854836] mb-4">
            Payment Cancelled
          </h1>
          <p className="text-gray-600 mb-8">
            Your payment was cancelled. If you have any questions, please don't hesitate to contact us.
          </p>
          <div className="space-y-4">
            <button
              onClick={() => navigate(-1)}
              className="bg-[#FFB22C] hover:bg-[#854836] text-[#F7F7F7] px-6 py-3 rounded-lg font-semibold transition-colors duration-300 w-full"
            >
              Try Again
            </button>
            <button
              onClick={() => navigate('/')}
              className="bg-[#F7F7F7] hover:bg-gray-200 text-[#854836] px-6 py-3 rounded-lg font-semibold transition-colors duration-300 w-full border border-[#854836]"
            >
              Return to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancelPage; 