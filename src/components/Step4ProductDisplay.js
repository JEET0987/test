import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Header from './Header';

const productsByTheme = {
  Circus: [
    {
      id: 1,
      name: 'Circus Tent',
      price: 20,
      image: 'https://m.media-amazon.com/images/I/71N1dstm1uL._SX522_.jpg',
    },
    {
      id: 2,
      name: 'Clown Costume',
      price: 15,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCVPaZ4kqBUrdpJrRPZxMOFqvcyqBhcS1XYQ&s',
    },
  ],
  Gaming: [
    {
      id: 3,
      name: 'Gaming Chair',
      price: 30,
      image: 'https://m.media-amazon.com/images/I/81nsrszBdQL._AC_UF894,1000_QL80_.jpg',
    },
    {
      id: 4,
      name: 'Game Console',
      price: 50,
      image: 'https://m.media-amazon.com/images/I/71+-T1Kpo8L.jpg',
    },
  ],
  Space: [
    {
      id: 5,
      name: 'Space Helmet',
      price: 25,
      image: 'https://m.media-amazon.com/images/I/81TYRg236eL.jpg',
    },
    {
      id: 6,
      name: 'Rocket Model',
      price: 35,
      image: 'https://m.media-amazon.com/images/I/71sUcSErpHL.jpg',
    },
  ],
  Romantic: [
    {
      id: 7,
      name: 'Candle Holders',
      price: 12,
      image: 'https://sugaholic.com/image/cache/catalog/Candles/New%20web%20Foil%20Number%20Balloon%20Candles-800x800.jpg',
    },
    {
      id: 8,
      name: 'Table Settings',
      price: 15,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcYsa4m7kkot-Iq7yYsajtEu1Zk-RhQC-axejMcpdHqXXZMvJhCbzBktxxqDKVztUQSts&usqp=CAU',
    },
    {
      id: 9,
      name: 'Chair Covers',
      price: 18,
      image: 'https://www.tallengestore.com/cdn/shop/products/20_0_248d3f92-7736-41ec-844f-3a3a83824144.jpg?v=1481902150',
    },
    {
      id: 10,
      name: 'Romantic Wedding',
      price: 20,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWMCLDwpbdYlsTkaPGyua2sE5F_4716HFbJQ&s',
    },
  ],
  Elegant: [
    {
      id: 11,
      name: 'Elegant Vase',
      price: 25,
      image: 'https://m.media-amazon.com/images/I/71RuhQOA0LL.jpg',
    },
    {
      id: 12,
      name: 'Elegant Drapes',
      price: 30,
      image: 'https://m.media-amazon.com/images/I/51qJebzL3JL._AC_UF1000,1000_QL80_.jpg',
    },
  ],
  Rustic: [
    {
      id: 13,
      name: 'Rustic Lantern',
      price: 18,
      image: 'https://funlah.com/wp-content/uploads/2020/07/Eucalyptus-Rustic-Balloon-Bouquet.jpg',
    },
    {
      id: 14,
      name: 'Rustic Table',
      price: 22,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4RVTStvGbx358Oa2hlHbtjzE3N7eEOa9mVQ&s',
    },
  ],
  Pastel: [
    {
      id: 15,
      name: 'Pastel Balloons',
      price: 10,
      image: 'https://d1oqse56pjxcdl.cloudfront.net/6576/1.png',
    },
    {
      id: 16,
      name: 'Pastel Cake',
      price: 15,
      image: 'https://www.thesparklestory.in/cdn/shop/products/Pastel1_1400x.jpg?v=1636189289',
    },
  ],
  Jungle: [
    {
      id: 17,
      name: 'Jungle Plants',
      price: 20,
      image: 'https://m.media-amazon.com/images/I/717KUoRXHtL.jpg',
    },
    {
      id: 18,
      name: 'Jungle Decorations',
      price: 25,
      image: 'https://i.etsystatic.com/11504324/r/il/aa5416/2284637621/il_570xN.2284637621_t7ig.jpg',
    },
  ],
  'Fairy Tale': [
    {
      id: 19,
      name: 'Fairy Lights',
      price: 12,
      image: 'https://m.media-amazon.com/images/I/613uANyU4SS.jpg',
    },
    {
      id: 20,
      name: 'Fairy Wings',
      price: 18,
      image: 'https://www.fnp.com/images/pr/malaysia/l/v20211221180750/double-fairytale-balloons-bunch_1.jpg',
    },
  ],
  Classic: [
    {
      id: 21,
      name: 'Classic Chairs',
      price: 15,
      image: 'https://m.media-amazon.com/images/I/61qUzUJU1VL._AC_UF1000,1000_QL80_.jpg',
    },
    {
      id: 22,
      name: 'Classic Tablecloth',
      price: 20,
      image: 'https://images-cdn.ubuy.co.in/634d1af4b2c0b777500bb33a-black-gold-metallic-silver-metallic.jpg',
    },
  ],
  Modern: [
    {
      id: 23,
      name: 'Modern Art',
      price: 30,
      image: 'https://www.realmomofsfv.com/wp-content/uploads/2018/10/De-Luxe-Balloon-Unicorn-Party_Image-Credit-The-De-Luxe-Balloon-Company.png',
    },
    {
      id: 24,
      name: 'Modern Lighting',
      price: 35,
      image: 'https://i.pinimg.com/736x/dd/4b/9a/dd4b9afb57b3608529bd8af85a9bc06a.jpg',
    },
  ],
  Festive: [
    {
      id: 25,
      name: 'Festive Banners',
      price: 18,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-R6fxC3oy-yTLv2PC3IfRX-NnN-2SaYXPNw&s',
    },
    {
      id: 26,
      name: 'Festive Lights',
      price: 22,
      image: 'https://static.vecteezy.com/system/resources/thumbnails/059/600/984/small/festive-balloons-arch-pink-turquoise-white-decoration-cut-out-transparent-png.png',
    },
  ],
  Default: [
    {
      id: 27,
      name: 'Generic Candle Holders',
      price: 12,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3e0sYbq3hww-5NK657PlhOhfk4qhqIGST6A&s',
    },
    {
      id: 28,
      name: 'Generic Table Settings',
      price: 15,
      image: 'https://m.media-amazon.com/images/I/41rECjq13GL._AC_UF1000,1000_QL80_.jpg',
    },
  ],
};

const Step4ProductDisplay = ({ selectedTheme = 'Default', onNext }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('price');
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const products = productsByTheme[selectedTheme] || productsByTheme['Default'];

  const [quantities, setQuantities] = useState({});

  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'price') {
        return a.price - b.price;
      } else if (sortBy === 'popularity') {
        return 0;
      }
      return 0;
    });

  const handleQuantityChange = (productId, value) => {
    const qty = Math.max(0, Number(value));
    setQuantities((prev) => ({ ...prev, [productId]: qty }));
  };

  const handleAddToCart = (product) => {
    const quantity = quantities[product.id] || 1;
    if (quantity > 0) {
      addToCart(product, quantity);
      toast.success('Successfully added to cart');
      setQuantities((prev) => ({ ...prev, [product.id]: 0 }));
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50">
      {/* <Header /> */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-8 lg:p-10 min-h-[80vh]">
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-10 max-w-5xl w-full text-center border border-purple-100">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-party-purple mb-6 drop-shadow-[0_2px_8px_rgba(80,0,80,0.15)]">
            Product Display
          </h2>
          <div className="mb-12 flex flex-col sm:flex-row justify-center gap-4 max-w-3xl mx-auto">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search by product name..."
                className="w-full p-4 rounded-lg border-2 border-gray-200 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-3">
              <label htmlFor="sort" className="text-gray-700 font-medium">
                Sort by:
              </label>
              <select
                id="sort"
                className="p-4 rounded-lg border-2 border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="price">Price: Low to High</option>
                <option value="popularity">Popularity</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-white/70 backdrop-blur-lg rounded-2xl border-2 border-purple-100 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-t-2xl">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-2xl" />
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <h3 className="text-xl font-bold text-party-purple mb-2 drop-shadow-[0_2px_8px_rgba(80,0,80,0.10)]">{product.name}</h3>
                  <p className="text-2xl font-bold text-purple-700 mb-4 drop-shadow-[0_2px_8px_rgba(80,0,80,0.10)]">₹{product.price}</p>
                  <div className="flex items-center gap-4 mb-4">
                    <label htmlFor={`quantity-${product.id}`} className="text-gray-700 font-medium">
                      Quantity:
                    </label>
                    <input
                      type="number"
                      id={`quantity-${product.id}`}
                      min="0"
                      value={quantities[product.id] || 0}
                      onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                      className="w-20 p-2 rounded-lg border-2 border-purple-200 bg-white/80 text-purple-900 focus:outline-none focus:ring-2 focus:ring-party-purple focus:border-transparent transition-all"
                    />
                  </div>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-full bg-gradient-to-r from-party-purple to-pink-400 text-party-purple py-3 rounded-full text-lg font-bold shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 border-2 border-white/40 focus:outline-none focus:ring-2 focus:ring-party-purple focus:ring-offset-2"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={() => navigate('/step3')}
              className="bg-white/80 text-party-purple px-8 py-4 rounded-full font-bold border border-purple-200 hover:bg-purple-50 hover:text-purple-700 shadow transition-all duration-300"
            >
              Back
            </button>
            <button
              onClick={onNext}
              className="bg-gradient-to-r from-party-purple to-pink-400 text-party-purple px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 border-2 border-white/40"
            >
              Next
            </button>
          </div>
        </div>
      </div>
      
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default Step4ProductDisplay;
