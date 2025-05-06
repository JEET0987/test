import React, { useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';

const mockProducts = {
  Circus: [
    { id: 'circus1', name: 'Circus Balloon Set', price: 29.99 },
    { id: 'circus2', name: 'Circus Banner', price: 15.99 },
    { id: 'circus3', name: 'Circus Ribbon', price: 5.99 },
    { id: 'circus4', name: 'Circus Hat', price: 9.99 },
  ],
  Gaming: [
    { id: 'gaming1', name: 'Gaming Balloon Set', price: 34.99 },
    { id: 'gaming2', name: 'Gaming Banner', price: 18.99 },
    { id: 'gaming3', name: 'Gaming Ribbon', price: 6.99 },
    { id: 'gaming4', name: 'Gaming Controller', price: 12.99 },
  ],
  Space: [
    { id: 'space1', name: 'Space Balloon Set', price: 31.99 },
    { id: 'space2', name: 'Space Banner', price: 16.99 },
    { id: 'space3', name: 'Space Ribbon', price: 7.99 },
    { id: 'space4', name: 'Space Helmet', price: 14.99 },
  ],
  Romantic: [
    { id: 'romantic1', name: 'Romantic Balloon Set', price: 29.99 },
    { id: 'romantic2', name: 'Romantic Banner', price: 15.99 },
    { id: 'romantic3', name: 'Romantic Ribbon', price: 5.99 },
    { id: 'romantic4', name: 'Rose Bouquet', price: 19.99 },
  ],
  Elegant: [
    { id: 'elegant1', name: 'Elegant Balloon Set', price: 39.99 },
    { id: 'elegant2', name: 'Elegant Banner', price: 20.99 },
    { id: 'elegant3', name: 'Elegant Ribbon', price: 8.99 },
    { id: 'elegant4', name: 'Candle Set', price: 14.99 },
  ],
  Rustic: [
    { id: 'rustic1', name: 'Rustic Balloon Set', price: 27.99 },
    { id: 'rustic2', name: 'Rustic Banner', price: 14.99 },
    { id: 'rustic3', name: 'Rustic Ribbon', price: 6.99 },
    { id: 'rustic4', name: 'Wooden Sign', price: 12.99 },
  ],
  Pastel: [
    { id: 'pastel1', name: 'Pastel Balloon Set', price: 28.99 },
    { id: 'pastel2', name: 'Pastel Banner', price: 13.99 },
    { id: 'pastel3', name: 'Pastel Ribbon', price: 5.99 },
    { id: 'pastel4', name: 'Stuffed Animal', price: 15.99 },
  ],
  Jungle: [
    { id: 'jungle1', name: 'Jungle Balloon Set', price: 30.99 },
    { id: 'jungle2', name: 'Jungle Banner', price: 16.99 },
    { id: 'jungle3', name: 'Jungle Ribbon', price: 7.99 },
    { id: 'jungle4', name: 'Animal Figurines', price: 18.99 },
  ],
  'Fairy Tale': [
    { id: 'fairytale1', name: 'Fairy Tale Balloon Set', price: 32.99 },
    { id: 'fairytale2', name: 'Fairy Tale Banner', price: 17.99 },
    { id: 'fairytale3', name: 'Fairy Tale Ribbon', price: 6.99 },
    { id: 'fairytale4', name: 'Magic Wand', price: 14.99 },
  ],
  Classic: [
    { id: 'classic1', name: 'Classic Balloon Set', price: 25.99 },
    { id: 'classic2', name: 'Classic Banner', price: 12.99 },
    { id: 'classic3', name: 'Classic Ribbon', price: 4.99 },
    { id: 'classic4', name: 'Party Hats', price: 9.99 },
  ],
  Modern: [
    { id: 'modern1', name: 'Modern Balloon Set', price: 35.99 },
    { id: 'modern2', name: 'Modern Banner', price: 18.99 },
    { id: 'modern3', name: 'Modern Ribbon', price: 7.99 },
    { id: 'modern4', name: 'LED Lights', price: 19.99 },
  ],
  Festive: [
    { id: 'festive1', name: 'Festive Balloon Set', price: 29.99 },
    { id: 'festive2', name: 'Festive Banner', price: 15.99 },
    { id: 'festive3', name: 'Festive Ribbon', price: 5.99 },
    { id: 'festive4', name: 'Confetti', price: 8.99 },
  ],
};

const Step4ProductDisplay = ({ themeSuggestions, selectedTheme, setSelectedTheme, onNext }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h2 className="text-xl font-semibold">Select a Theme</h2>
      <div className="flex flex-wrap gap-4">
        {themeSuggestions.map((theme) => (
          <div
            key={theme}
            onClick={() => setSelectedTheme(theme)}
            className={`cursor-pointer rounded border-2 p-4 flex items-center justify-center w-32 h-20 text-center font-semibold ${
              selectedTheme === theme ? 'border-blue-600 bg-blue-100' : 'border-gray-300'
            }`}
          >
            {theme}
          </div>
        ))}
      </div>

      {selectedTheme && (
        <div>
          <h3 className="text-lg font-semibold mt-6">Products for {selectedTheme}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            {mockProducts[selectedTheme].map((product) => (
              <div key={product.id} className="border rounded p-4 flex flex-col justify-between">
                <div>
                  <h4 className="font-semibold">{product.name}</h4>
                  <p className="text-gray-700">${product.price.toFixed(2)}</p>
                </div>
                <button
                  onClick={() => addToCart(product)}
                  className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={onNext}
            className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Step4ProductDisplay;
