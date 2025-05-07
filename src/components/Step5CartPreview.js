import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';

const Step5CartPreview = ({ setStep }) => {
  const { cartItems, itemCount, totalPrice, removeFromCart, clearCart } = useContext(CartContext);
  const [showCart, setShowCart] = useState(false);

  const handleCheckoutClick = () => {
    setShowCart(false);
    setStep(7);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowCart(!showCart)}
        className="relative focus:outline-none"
        aria-label="Toggle cart preview"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-gray-700"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4" />
          <circle cx="7" cy="21" r="2" />
          <circle cx="17" cy="21" r="2" />
        </svg>
        {itemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
            {itemCount}
          </span>
        )}
      </button>

      {showCart && (
        <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-300 rounded shadow-lg z-10 p-4">
          <h3 className="text-lg font-semibold mb-2">Cart Preview</h3>
          {cartItems.length === 0 ? (
            <p class="text-gray-700 text-center">Your cart is empty.</p>
          ) : (
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center border-b border-gray-200 pb-1">
                  <div>
                    <span style={{ color: 'black', fontWeight: '600' }}>{item.name}</span>
                    <p className="text-sm text-gray-600">
                      ${item.price.toFixed(2)} x {item.quantity}
                    </p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-600 hover:text-red-800 font-bold"
                    aria-label={`Remove ${item.name} from cart`}
                  >
                    &times;
                  </button>
                </div>
              ))}
              <div className="border-t border-gray-300 pt-2 flex justify-between font-semibold">
                <span>Total:</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <button
                onClick={clearCart}
                className="mt-2 w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Clear Cart
              </button>
              <button
                onClick={handleCheckoutClick}
                className="mt-2 w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Checkout
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Step5CartPreview;
