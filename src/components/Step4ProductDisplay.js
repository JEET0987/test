import React, { useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';

<<<<<<< HEAD
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
=======
const productsByTheme = {
  Circus: [
    {
      id: 1,
      name: 'Circus Tent',
      price: 20,
      image: 'https://picsum.photos/200/300?random=41',
    },
    {
      id: 2,
      name: 'Clown Costume',
      price: 15,
      image: 'https://picsum.photos/200/300?random=42',
    },
  ],
  Gaming: [
    {
      id: 3,
      name: 'Gaming Chair',
      price: 30,
      image: 'https://picsum.photos/200/300?random=43',
    },
    {
      id: 4,
      name: 'Game Console',
      price: 50,
      image: 'https://picsum.photos/200/300?random=44',
    },
  ],
  Space: [
    {
      id: 5,
      name: 'Space Helmet',
      price: 25,
      image: 'https://picsum.photos/200/300?random=45',
    },
    {
      id: 6,
      name: 'Rocket Model',
      price: 35,
      image: 'https://picsum.photos/200/300?random=46',
    },
  ],
  Romantic: [
    {
      id: 7,
      name: 'Candle Holders',
      price: 12,
      image: 'https://picsum.photos/200/300?random=24',
    },
    {
      id: 8,
      name: 'Table Settings',
      price: 15,
      image: 'https://picsum.photos/200/300?random=22',
    },
    {
      id: 9,
      name: 'Chair Covers',
      price: 18,
      image: 'https://picsum.photos/200/300?random=23',
    },
    {
      id: 10,
      name: 'Romantic Wedding',
      price: 20,
      image: 'https://picsum.photos/200/300?random=21',
    },
  ],
  Elegant: [
    {
      id: 11,
      name: 'Elegant Vase',
      price: 25,
      image: 'https://picsum.photos/200/300?random=47',
    },
    {
      id: 12,
      name: 'Elegant Drapes',
      price: 30,
      image: 'https://picsum.photos/200/300?random=48',
    },
  ],
  Rustic: [
    {
      id: 13,
      name: 'Rustic Lantern',
      price: 18,
      image: 'https://picsum.photos/200/300?random=49',
    },
    {
      id: 14,
      name: 'Rustic Table',
      price: 22,
      image: 'https://picsum.photos/200/300?random=50',
    },
  ],
  Pastel: [
    {
      id: 15,
      name: 'Pastel Balloons',
      price: 10,
      image: 'https://picsum.photos/200/300?random=51',
    },
    {
      id: 16,
      name: 'Pastel Cake',
      price: 15,
      image: 'https://picsum.photos/200/300?random=52',
    },
  ],
  Jungle: [
    {
      id: 17,
      name: 'Jungle Plants',
      price: 20,
      image: 'https://picsum.photos/200/300?random=53',
    },
    {
      id: 18,
      name: 'Jungle Decorations',
      price: 25,
      image: 'https://picsum.photos/200/300?random=54',
    },
  ],
  'Fairy Tale': [
    {
      id: 19,
      name: 'Fairy Lights',
      price: 12,
      image: 'https://picsum.photos/200/300?random=55',
    },
    {
      id: 20,
      name: 'Fairy Wings',
      price: 18,
      image: 'https://picsum.photos/200/300?random=56',
    },
  ],
  Classic: [
    {
      id: 21,
      name: 'Classic Chairs',
      price: 15,
      image: 'https://picsum.photos/200/300?random=57',
    },
    {
      id: 22,
      name: 'Classic Tablecloth',
      price: 20,
      image: 'https://picsum.photos/200/300?random=58',
    },
  ],
  Modern: [
    {
      id: 23,
      name: 'Modern Art',
      price: 30,
      image: 'https://picsum.photos/200/300?random=59',
    },
    {
      id: 24,
      name: 'Modern Lighting',
      price: 35,
      image: 'https://picsum.photos/200/300?random=60',
    },
  ],
  Festive: [
    {
      id: 25,
      name: 'Festive Banners',
      price: 18,
      image: 'https://picsum.photos/200/300?random=61',
    },
    {
      id: 26,
      name: 'Festive Lights',
      price: 22,
      image: 'https://picsum.photos/200/300?random=62',
    },
  ],
  Default: [
    {
      id: 27,
      name: 'Generic Candle Holders',
      price: 12,
      image: 'https://picsum.photos/200/300?random=24',
    },
    {
      id: 28,
      name: 'Generic Table Settings',
      price: 15,
      image: 'https://picsum.photos/200/300?random=22',
    },
  ],
};

const Step4ProductDisplay = ({ selectedTheme = 'Default' }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('price');
  const { addToCart } = useContext(CartContext);

  const products = productsByTheme[selectedTheme] || productsByTheme['Default'];

  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'price') {
        return a.price - b.price;
      } else if (sortBy === 'popularity') {
        // Assuming popularity is not defined, keep original order
        return 0;
      }
      return 0;
    });

  return (
    <div className="min-h-screen p-6 bg-gradient-to-r from-pink-100 via-purple-100 to-blue-200">
      <h2 className="text-3xl font-semibold text-gray-800 text-center mb-8">
        Products for "{selectedTheme}"
      </h2>
      <div className="mb-6 flex flex-wrap justify-center gap-4">
        <input
          type="text"
          placeholder="Search by product name..."
          className="p-3 rounded-xl border-2 border-gray-300 text-lg w-72"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div>
          <label htmlFor="sort" className="mr-2 text-lg font-semibold text-gray-800">
            Sort by:
          </label>
          <select
            id="sort"
            className="p-3 rounded-xl border-2 border-gray-300 text-lg"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="price">Price: Low to High</option>
            <option value="popularity">Popularity</option>
          </select>
        </div>
      </div>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 hover:shadow-2xl transition-all duration-300"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-56 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
              <p className="text-lg text-gray-600 mt-2">₹{product.price}</p>
              <button
                onClick={() => addToCart({ ...product })}
                className="mt-4 w-full bg-indigo-500 text-white py-2 rounded-xl text-lg font-semibold hover:bg-indigo-600 transition-all duration-300"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
>>>>>>> 318b780 (Update project files)
    </div>
  );
};

export default Step4ProductDisplay;
