import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import Header from './Header';

const ConfirmationPage = () => {
  const navigate = useNavigate();
  const { cartItems } = useContext(CartContext);

  const handleConfirmOrder = () => {
    navigate('/checkout');
  };

  const handleBackToCart = () => {
    navigate('/step5');
  };

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
<<<<<<< HEAD
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <div className="flex-1 flex items-center justify-center p-6 sm:p-8 lg:p-10 min-h-[80vh]">
        <div className="bg-gray-800/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 sm:p-10 md:p-12 max-w-2xl w-full text-center border border-purple-500/20">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-6 tracking-tight">
            Confirm Your Order
          </h2>
          <p className="text-base sm:text-lg text-gray-300 mb-8 leading-relaxed">
=======
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50">
      
      <div className="flex-1 flex items-center justify-center p-6 sm:p-8 lg:p-10 min-h-[80vh]">
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-10 max-w-2xl w-full text-center border border-purple-100">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-party-purple mb-6 drop-shadow-[0_2px_8px_rgba(80,0,80,0.15)]">
            Confirm Your Order
          </h2>
          <p className="text-lg sm:text-xl text-purple-800 mb-8">
>>>>>>> f865efd25f2a7b9fe2838dcf38909f468ac7dd82
            Please review your order details before proceeding to payment.
          </p>
          
          {/* Order Summary */}
<<<<<<< HEAD
          <div className="bg-gray-700/50 rounded-xl p-6 mb-8">
            <h3 className="text-xl font-semibold text-white mb-4">Order Summary</h3>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center text-gray-300">
                  <div className="flex items-center gap-4">
=======
          <div className="bg-card rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">Order Summary</h2>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
>>>>>>> f865efd25f2a7b9fe2838dcf38909f468ac7dd82
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
<<<<<<< HEAD
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    )}
                    <div className="text-left">
                      <p className="font-medium text-white">{item.name}</p>
                      <p className="text-sm text-gray-400">Quantity: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="font-semibold text-white">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-600 mt-4 pt-4">
              <div className="flex justify-between items-center text-lg font-semibold text-white">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
=======
                        className="w-16 h-16 object-cover rounded-md"
                      />
                    )}
                    <div>
                      <p className="font-medium text-foreground">{item.name}</p>
                      <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="font-medium text-foreground">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-foreground">Total</span>
                  <span className="font-semibold text-foreground">${total.toFixed(2)}</span>
                </div>
>>>>>>> f865efd25f2a7b9fe2838dcf38909f468ac7dd82
              </div>
            </div>
          </div>

          {/* Shipping Information */}
<<<<<<< HEAD
          <div className="bg-gray-700/50 rounded-xl p-6 mb-8">
            <h3 className="text-xl font-semibold text-white mb-4">Shipping Information</h3>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-1">
=======
          <div className="bg-card rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">Shipping Information</h2>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
>>>>>>> f865efd25f2a7b9fe2838dcf38909f468ac7dd82
                    First Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
                <div>
<<<<<<< HEAD
                  <label className="block text-sm font-medium text-white mb-1">
=======
                  <label className="block text-sm font-medium text-foreground mb-1">
>>>>>>> f865efd25f2a7b9fe2838dcf38909f468ac7dd82
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
              </div>
              <div>
<<<<<<< HEAD
                <label className="block text-sm font-medium text-white mb-1">
=======
                <label className="block text-sm font-medium text-foreground mb-1">
>>>>>>> f865efd25f2a7b9fe2838dcf38909f468ac7dd82
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div>
<<<<<<< HEAD
                <label className="block text-sm font-medium text-white mb-1">
=======
                <label className="block text-sm font-medium text-foreground mb-1">
>>>>>>> f865efd25f2a7b9fe2838dcf38909f468ac7dd82
                  Address
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
<<<<<<< HEAD
                  <label className="block text-sm font-medium text-white mb-1">
=======
                  <label className="block text-sm font-medium text-foreground mb-1">
>>>>>>> f865efd25f2a7b9fe2838dcf38909f468ac7dd82
                    City
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
                <div>
<<<<<<< HEAD
                  <label className="block text-sm font-medium text-white mb-1">
=======
                  <label className="block text-sm font-medium text-foreground mb-1">
>>>>>>> f865efd25f2a7b9fe2838dcf38909f468ac7dd82
                    State
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
                <div>
<<<<<<< HEAD
                  <label className="block text-sm font-medium text-white mb-1">
=======
                  <label className="block text-sm font-medium text-foreground mb-1">
>>>>>>> f865efd25f2a7b9fe2838dcf38909f468ac7dd82
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
              </div>
            </form>
          </div>

<<<<<<< HEAD
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleBackToCart}
              className="px-6 py-3 bg-gray-700/80 text-white rounded-xl font-semibold hover:bg-gray-600 transition-all duration-300 border border-purple-500/20"
            >
              Back to Cart
            </button>
            <button
              onClick={handleConfirmOrder}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 border border-purple-500/40"
            >
              Proceed to Payment
=======
          {/* Action Buttons */}
          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={handleBackToCart}
              className="bg-white/80 text-party-purple px-8 py-4 rounded-full font-bold border border-purple-200 hover:bg-purple-50 hover:text-purple-700 shadow transition-all duration-300"
            >
              Back
            </button>
            <button
              onClick={handleConfirmOrder}
              className="bg-gradient-to-r from-party-purple to-pink-400 text-party-purple px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 border-2 border-white/40"
            >
              Confirm & Pay
>>>>>>> f865efd25f2a7b9fe2838dcf38909f468ac7dd82
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage; 