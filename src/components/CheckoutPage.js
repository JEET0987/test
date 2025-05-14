import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Footer from './Footer';
import Header from './Header';

const CheckoutPage = ({ onBack }) => {
  const navigate = useNavigate();
  const { cartItems, totalPrice, clearCart } = useContext(CartContext);
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleCheckout = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    if (!stripe || !elements) {
      setError('Stripe has not loaded yet.');
      setLoading(false);
      return;
    }

    // Simulate payment processing delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Simulate successful payment
    setSuccess(true);
    clearCart();
    navigate('/thank-you', { replace: true });

    setLoading(false);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50 flex flex-col">
       
        <div className="flex-1 flex items-center justify-center">
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
        <Footer />
      </div>
    );
  }

  return (
<<<<<<< HEAD
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <div className="flex-1 flex items-center justify-center p-6 sm:p-8 lg:p-10 min-h-[80vh]">
        <div className="bg-gray-800/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 sm:p-10 md:p-12 max-w-2xl w-full text-center border border-purple-500/20">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-6 tracking-tight">
            Checkout
          </h2>
          
          {/* Cart Items */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-white mb-4">Your Cart</h3>
            <div className="bg-gray-700/50 rounded-xl p-6 space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between py-2 border-b border-gray-600">
                  <div className="flex items-center gap-4">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
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
              <div className="flex justify-between items-center pt-4 border-t border-gray-600">
                <p className="text-lg font-semibold text-white">Total</p>
                <p className="text-lg font-semibold text-white">${totalPrice.toFixed(2)}</p>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <form onSubmit={handleCheckout} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Card Details
              </label>
              <div className="border border-purple-500/20 rounded-xl p-4 bg-gray-700/50">
                <CardElement
                  options={{
                    style: {
                      base: {
                        fontSize: '16px',
                        color: '#ffffff',
                        '::placeholder': {
                          color: '#aab7c4',
                        },
                      },
                      invalid: {
                        color: '#ff5252',
                      },
                    },
                  }}
                />
              </div>
            </div>

            {error && (
              <div className="text-red-400 text-sm">{error}</div>
            )}

            <div className="flex justify-between items-center">
              <button
                type="button"
                onClick={onBack}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ← Back
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 border border-purple-500/40 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Processing...' : `Pay $${totalPrice.toFixed(2)}`}
              </button>
            </div>
          </form>
        </div>
      </div>
=======
    <div className="min-h-screen bg-background flex flex-col">
     
      <div className="flex-1">
        <div className="max-w-2xl mx-auto p-8">
          <div className="bg-card rounded-lg shadow-sm p-8 border">
            <h2 className="text-2xl font-bold text-foreground mb-6">Checkout</h2>
            
            {/* Cart Items */}
            <div className="mb-8">
              <h3 className="font-semibold text-foreground mb-4">Your Cart</h3>
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between py-2 border-b">
                  <div>
                    <p className="text-foreground">{item.name}</p>
                    <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                  </div>
                  <p className="text-foreground">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
              <div className="flex justify-between items-center mt-4 font-semibold">
                <p className="text-foreground">Total</p>
                <p className="text-foreground">${totalPrice.toFixed(2)}</p>
              </div>
            </div>

            {/* Payment Form */}
            <form onSubmit={handleCheckout} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Card Details
                </label>
                <div className="border rounded-md p-3 bg-background">
                  <CardElement
                    options={{
                      style: {
                        base: {
                          fontSize: '16px',
                          color: '#424770',
                          '::placeholder': {
                            color: '#aab7c4',
                          },
                        },
                        invalid: {
                          color: '#9e2146',
                        },
                      },
                    }}
                  />
                </div>
              </div>

              {error && (
                <div className="text-red-500 text-sm">{error}</div>
              )}

              <div className="flex justify-between items-center">
                <button
                  type="button"
                  onClick={onBack}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  ← Back to Cart
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-primary text-primary-foreground px-6 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors focus-ring disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Processing...' : `Pay $${totalPrice.toFixed(2)}`}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
>>>>>>> f865efd25f2a7b9fe2838dcf38909f468ac7dd82
    </div>
  );
};

const CheckoutWrapper = () => {
  const navigate = useNavigate();
  return <CheckoutPage onBack={() => navigate('/confirmation')} />;
};

export default CheckoutWrapper;
