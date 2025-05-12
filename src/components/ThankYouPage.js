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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50">
      {/* <Header /> */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-8 lg:p-10 min-h-[80vh]">
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-10 max-w-2xl w-full text-center border border-purple-100">
          <h2 className="text-3xl font-extrabold text-party-purple mb-4 drop-shadow-[0_2px_8px_rgba(80,0,80,0.15)]">Thank You!</h2>
          <p className="text-lg text-purple-800 mb-6">
            Your order has been placed successfully. We'll send you an email confirmation shortly.
          </p>
          <button
            onClick={() => navigate('/', { replace: true })}
            className="bg-gradient-to-r from-party-purple to-pink-400 text-party-purple px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 border-2 border-white/40"
          >
            Return to Home
          </button>
        </div>
      </div>
      
    </div>
  );
};

export default ThankYouPage; 