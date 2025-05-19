import React from 'react';
import { useCart } from '../context/CartContext';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const SuggestedBalloons = () => {
  const { addToCart } = useCart();
  const location = useLocation();
  const { matchingBalloons } = location.state || { matchingBalloons: {} };

  const handleAddToCart = (balloon) => {
    console.log('Balloon object in handleAddToCart:', balloon); // Debug log
    const colorName = balloon["Single Colour"] || balloon["Single Colour "] || balloon["SingleColour"] || 'Unknown';
    const cartItem = {
      id: balloon["Balloon Image"], // Using image URL as unique ID
      name: colorName,
      brand: balloon["Brand"],
      color: colorName, // Use the robust color name
      image: balloon["Balloon Image"],
      price: 2.99, // Default price, you can adjust this
      quantity: 1
    };
    console.log('Cart item to be added:', cartItem); // Debug log
    addToCart(cartItem);
    
    // Show success toast
    toast.success(`Single Colour: ${colorName} balloon added to cart!`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 md:p-12 lg:p-16 min-h-[80vh]">
        <div className="w-full max-w-6xl mx-auto bg-gray-800/80 backdrop-blur-lg rounded-3xl shadow-2xl p-6 sm:p-10 border border-purple-500/20">
          <h2 className="text-2xl font-bold text-white mb-8">Suggested Balloons</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(matchingBalloons).map(([brand, balloon]) => (
              <div 
                key={brand} 
                className={`bg-gray-700/50 rounded-xl p-4 border ${
                  balloon.isSuggestedColor 
                    ? 'border-pink-500/40' 
                    : 'border-purple-500/20'
                }`}
              >
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-lg font-semibold text-purple-200">{balloon["Brand"]}</h4>
                  {balloon.isSuggestedColor && (
                    <span className="text-xs bg-pink-500/20 text-pink-200 px-2 py-1 rounded-full">
                      AI Suggested
                    </span>
                  )}
                </div>
                <div className="flex flex-col items-center">
                  <img
                    src={balloon["Balloon Image"]}
                    alt={balloon["Single Colour"]}
                    className="w-32 h-32 object-contain rounded-lg bg-white/10 p-2"
                  />
                  <span className="text-sm text-white mt-2">{balloon["Single Colour"]}</span>
                  <button
                    onClick={() => handleAddToCart(balloon)}
                    className="mt-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-lg font-bold shadow-xl border-2 border-purple-500/40 hover:scale-105 hover:shadow-2xl transition focus:outline-none"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuggestedBalloons; 