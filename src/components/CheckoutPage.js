import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CheckoutPage = ({ onBack }) => {
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

    setLoading(false);
  };

  if (success) {
    return (
      <div className="flex justify-center p-6">
        <div className="max-w-3xl w-full p-6 bg-white rounded shadow text-center">
          <h2 className="text-2xl font-bold mb-4">Payment Successful!</h2>
          <p>Thank you for your purchase.</p>
          <button
            onClick={() => onBack(1)}
            className="mt-6 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center p-6">
      <div className="max-w-3xl w-full p-6 bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Checkout</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <form onSubmit={handleCheckout}>
            <ul className="mb-4">
              {cartItems.map((item) => (
                <li key={item.id} className="flex justify-between py-2 border-b items-center">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded mr-4"
                    />
                  )}
                  <span className="flex-1">{item.name} x {item.quantity}</span>
                  <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <div className="flex justify-between font-semibold text-lg mb-6">
              <span>Total:</span>
              <span>₹{totalPrice.toFixed(2)}</span>
            </div>
            <div className="mb-4">
              <CardElement options={{ hidePostalCode: false }} />
            </div>
            {error && <p className="text-red-600 mb-4">{error}</p>}
            <button
              type="submit"
              disabled={!stripe || loading}
              className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 transition disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Confirm Purchase'}
            </button>
            <button
              type="button"
              onClick={() => onBack(1)}
              className="mt-4 w-full bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400 transition"
            >
              Back to Cart
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
