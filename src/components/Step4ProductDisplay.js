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
      description: 'Colorful circus tent decoration',
      stock: 10
    },
    {
      id: 2,
      name: 'Clown Costume',
      price: 15,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCVPaZ4kqBUrdpJrRPZxMOFqvcyqBhcS1XYQ&s',
      description: 'Fun clown costume for parties',
      stock: 15
    },
  ],
  Gaming: [
    {
      id: 3,
      name: 'Gaming Chair',
      price: 30,
      image: 'https://m.media-amazon.com/images/I/81nsrszBdQL._AC_UF894,1000_QL80_.jpg',
      description: 'Comfortable gaming chair',
      stock: 8
    },
    {
      id: 4,
      name: 'Game Console',
      price: 50,
      image: 'https://m.media-amazon.com/images/I/71+-T1Kpo8L.jpg',
      description: 'Popular gaming console',
      stock: 5
    },
  ],
  Space: [
    {
      id: 5,
      name: 'Space Helmet',
      price: 25,
      image: 'https://m.media-amazon.com/images/I/81TYRg236eL.jpg',
      description: 'Realistic space helmet',
      stock: 12
    },
    {
      id: 6,
      name: 'Rocket Model',
      price: 35,
      image: 'https://m.media-amazon.com/images/I/71sUcSErpHL.jpg',
      description: 'Detailed rocket model',
      stock: 7
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
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const products = productsByTheme[selectedTheme] || productsByTheme['Default'];

  const [quantities, setQuantities] = useState({});

  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (!product.description || product.description.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'price-asc') {
        return a.price - b.price;
      } else if (sortBy === 'price-desc') {
        return b.price - a.price;
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
      const productToAdd = {
        ...product,
        quantity: quantity
      };
      addToCart(productToAdd, quantity);
      toast.success(`${quantity} ${product.name} added to cart`);
      setQuantities((prev) => ({ ...prev, [product.id]: 0 }));
    }
  };

  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductSelect = (productId) => {
    setSelectedProduct(productId);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* <Header /> */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 lg:p-10 min-h-[80vh]">
        <div className="bg-gray-800/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 sm:p-10 md:p-12 max-w-7xl w-full text-center border border-purple-500/20">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-6 tracking-tight">
            Available Products
          </h2>
          <p className="text-base sm:text-lg text-gray-300 mb-8 leading-relaxed">
            Browse our selection of high-quality balloons and decorations for your event.
          </p>
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
              <div className="w-full sm:w-96">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-purple-500/20 focus:ring-2 focus:ring-purple-500 focus:outline-none text-base text-white bg-gray-700/80 shadow"
                />
              </div>
              <div className="w-full sm:w-48">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-purple-500/20 focus:ring-2 focus:ring-purple-500 focus:outline-none text-base text-white bg-gray-700/80 shadow"
                >
                  <option value="name">Sort by Name</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className={`p-6 rounded-xl transition-all duration-300 ${
                  selectedProduct === product.id
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-xl scale-[1.02]'
                    : 'bg-gray-700/80 text-gray-300 hover:bg-gray-600 hover:text-white border border-purple-500/20'
                }`}
                onClick={() => handleProductSelect(product.id)}
              >
                <div className="aspect-square rounded-lg bg-gray-600/50 mb-4 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <p className="text-sm mb-4">{product.description}</p>
                <div className="flex justify-between items-center mb-4">
                  <span className="font-semibold">${product.price}</span>
                  <span className="text-sm">{product.stock} in stock</span>
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleQuantityChange(product.id, (quantities[product.id] || 0) - 1);
                      }}
                      className="w-8 h-8 rounded-lg bg-gray-600 hover:bg-gray-500 text-white flex items-center justify-center transition-colors"
                    >
                      -
                    </button>
                    <span className="w-12 text-center">{quantities[product.id] || 0}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleQuantityChange(product.id, (quantities[product.id] || 0) + 1);
                      }}
                      className="w-8 h-8 rounded-lg bg-gray-600 hover:bg-gray-500 text-white flex items-center justify-center transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(product);
                    }}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
          {selectedProduct && (
            <button
              onClick={onNext}
              className="mt-8 w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-semibold text-base shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 border border-purple-500/40"
            >
              Continue
            </button>
          )}
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
        theme="dark"
      />
    </div>
  );
};

export default Step4ProductDisplay;
