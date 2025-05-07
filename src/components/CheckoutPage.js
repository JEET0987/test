import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const CheckoutPage = ({ onBack }) => {
  const { cartItems, totalPrice, clearCart } = useContext(CartContext);

  const handleCheckout = () => {
    alert('Thank you for your purchase!');
    clearCart();
    // After confirming purchase, navigate back to step 1 (Step1ImageUploadOrInspire)
    onBack(1);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="mb-4">
            {cartItems.map((item) => (
              <li key={item.id} className="flex justify-between py-2 border-b">
                <span>{item.name} x {item.quantity}</span>
                <span>₹{(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between font-semibold text-lg mb-6">
            <span>Total:</span>
            <span>₹{totalPrice.toFixed(2)}</span>
          </div>
          <button
            onClick={handleCheckout}
            className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 transition"
          >
            Confirm Purchase
          </button>
          <button
            onClick={() => onBack(1)}
            className="mt-4 w-full bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400 transition"
          >
            Back to Cart
          </button>
        </>
      )}
    </div>
  );
};

export default CheckoutPage;
