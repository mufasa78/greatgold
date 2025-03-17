import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CheckCircle, Loader2, ArrowLeft } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const SuccessPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('loading');
  const [customerDetails, setCustomerDetails] = useState(null);
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    const verifySession = async () => {
      if (!sessionId) {
        setStatus('error');
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/api/verify-session/${sessionId}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to verify payment');
        }

        setStatus('success');
        setCustomerDetails(data.customer);
      } catch (error) {
        console.error('Verification error:', error);
        setStatus('error');
      }
    };

    verifySession();
  }, [sessionId]);

  const handleBackToHome = () => {
    navigate('/');
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-[#F7F7F7] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 mx-auto mb-4 text-[#FFB22C] animate-spin" />
          <h2 className="text-xl font-semibold text-gray-700">Verifying your payment...</h2>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen bg-[#F7F7F7] flex items-center justify-center">
        <div className="max-w-md w-full mx-4 p-8 bg-white rounded-lg shadow-lg">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
              <span className="text-red-600 text-2xl">×</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Payment Verification Failed</h2>
            <p className="text-gray-600 mb-8">We couldn't verify your payment. Please contact support if you believe this is an error.</p>
            <button
              onClick={handleBackToHome}
              className="inline-flex items-center px-6 py-3 bg-[#854836] text-white rounded-lg hover:bg-[#6d3a2d] transition-colors duration-300"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Return to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F7F7] flex items-center justify-center">
      <div className="max-w-md w-full mx-4 p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Payment Successful!</h2>
          <p className="text-gray-600 mb-6">Thank you for your purchase. You will receive a confirmation email shortly.</p>
          {customerDetails && (
            <div className="mb-8 text-left bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-700 mb-2">Order Details:</h3>
              <p className="text-gray-600">Email: {customerDetails.email}</p>
              <p className="text-gray-600">Name: {customerDetails.name}</p>
            </div>
          )}
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

export default SuccessPage; 