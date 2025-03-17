import React from 'react';
import { useNavigate } from 'react-router-dom';
import { XCircle, ArrowLeft } from 'lucide-react';

const CancelPage = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#F7F7F7] flex items-center justify-center">
      <div className="max-w-md w-full mx-4 p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
            <XCircle className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Payment Cancelled</h2>
          <p className="text-gray-600 mb-8">Your payment was cancelled. No charges were made.</p>
          <button
            onClick={handleBackToHome}
            className="inline-flex items-center px-6 py-3 bg-[#FFB22C] text-white rounded-lg hover:bg-[#854836] transition-colors duration-300"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Return to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelPage; 