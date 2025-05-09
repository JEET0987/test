import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Footer from './Footer';

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
      <div className="min-h-screen bg-background flex flex-col">
        <div className="flex-1">
          <div className="max-w-2xl mx-auto p-8 text-center">
            <div className="bg-card rounded-lg shadow-sm p-8 border">
              <h2 className="text-2xl font-bold text-foreground mb-4">Thank You!</h2>
              <p className="text-muted-foreground mb-6">
                Your order has been placed successfully. We'll send you an email confirmation shortly.
              </p>
              <button
                onClick={() => navigate('/', { replace: true })}
                className="bg-primary text-primary-foreground px-6 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors focus-ring"
              >
                Return to Home
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
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
      <Footer />
    </div>
  );
};

export default CheckoutPage;
