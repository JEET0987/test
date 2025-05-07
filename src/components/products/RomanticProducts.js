import React, { useState } from 'react';

const products = [
  {
    id: 1,
    name: 'Candle Holders',
    price: 12,
    image: 'https://picsum.photos/200/300?random=24',
  },
  {
    id: 2,
    name: 'Table Settings',
    price: 15,
    image: 'https://picsum.photos/200/300?random=22',
  },
  {
    id: 3,
    name: 'Chair Covers',
    price: 18,
    image: 'https://picsum.photos/200/300?random=23',
  },
  {
    id: 4,
    name: 'Romantic Wedding',
    price: 20,
    image: 'https://picsum.photos/200/300?random=21',
  },
];

const RomanticProducts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('price');

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
        Products for "Romantic"
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
              <button className="mt-4 w-full bg-indigo-500 text-white py-2 rounded-xl text-lg font-semibold hover:bg-indigo-600 transition-all duration-300">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RomanticProducts;
