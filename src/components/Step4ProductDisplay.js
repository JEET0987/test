import React, { useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';

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
    </div>
  );
};

export default Step4ProductDisplay;
