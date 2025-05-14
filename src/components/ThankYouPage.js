import React from 'react';
import { useNavigate } from 'react-router-dom';
// import Header from './Header';
import Footer from './Footer';

const ThankYouPage = () => {
  const navigate = useNavigate();

  const handleReturnHome = () => {
    navigate('/', { replace: true });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* <Header /> */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-8 lg:p-10 min-h-[80vh]">
        <div className="bg-gray-800/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 sm:p-10 md:p-12 max-w-2xl w-full text-center border border-purple-500/20">
          <div className="text-6xl mb-6">🎉</div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-6 tracking-tight">
            Thank You for Your Order!
          </h2>
          <p className="text-base sm:text-lg text-gray-300 mb-8 leading-relaxed">
            Your order has been successfully placed. We'll send you an email confirmation shortly.
          </p>
          <div className="bg-gray-700/50 rounded-xl p-6 mb-8">
            <h3 className="text-xl font-semibold text-white mb-4">Order Details</h3>
            <p className="text-gray-300 mb-2">Order Number: #{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
            <p className="text-gray-300">Estimated Delivery: 3-5 business days</p>
          </div>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 border border-purple-500/40"
          >
            Return to Home
          </button>
        </div>
      </div>
      
    </div>
  );
};

export default ThankYouPage; 