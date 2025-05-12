import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const Header = () => {
  const navigate = useNavigate();
  const cartContext = useContext(CartContext);
  const cartItems = cartContext?.cartItems || [];
  const [isCartOpen, setIsCartOpen] = useState(false);

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleNavigation = (path) => {
    navigate(path);
    setIsCartOpen(false);
  };

  return (
    <header className="bg-white/80 backdrop-blur-lg border-b border-purple-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center space-x-3 group">
            <span className="text-3xl transform group-hover:rotate-12 transition-transform duration-300">🎈</span>
            <span className="font-bold text-2xl bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              BCB
            </span>
          </Link>

          {/* Main Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => handleNavigation('/step1')}
              className="text-purple-700 hover:text-purple-900 transition-colors font-medium text-lg relative group"
            >
              Build Your Occasion
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-500 transition-all duration-300 group-hover:w-full"></span>
            </button>
            <button
              onClick={() => handleNavigation('/step1')}
              className="text-purple-700 hover:text-purple-900 transition-colors font-medium text-lg relative group"
            >
              Color Match
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-500 transition-all duration-300 group-hover:w-full"></span>
            </button>
            <button
              onClick={() => handleNavigation('/step5')}
              className="text-purple-700 hover:text-purple-900 transition-colors font-medium text-lg relative group"
            >
              Trending Looks
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-500 transition-all duration-300 group-hover:w-full"></span>
            </button>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-6">
            {/* Cart Button */}
            <div className="relative">
              <button
                onClick={() => setIsCartOpen(!isCartOpen)}
                className="p-2 text-purple-700 hover:text-purple-900 transition-colors relative group"
              >
                <span className="text-2xl transform group-hover:scale-110 transition-transform duration-300">🛒</span>
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center shadow-lg">
                    {cartItemCount}
                  </span>
                )}
              </button>

              {/* Cart Dropdown */}
              {isCartOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white/90 backdrop-blur-lg rounded-xl shadow-xl border border-purple-100 p-4 transform transition-all duration-300">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-purple-900 text-lg">Your Cart</h3>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="text-purple-500 hover:text-purple-700 transition-colors"
                    >
                      ✕
                    </button>
                  </div>

                  {cartItems.length === 0 ? (
                    <p className="text-purple-500 text-center py-4">Your cart is empty</p>
                  ) : (
                    <>
                      <div className="max-h-60 overflow-y-auto space-y-4">
                        {cartItems.map((item) => (
                          <div key={item.id} className="flex items-center space-x-4 p-2 rounded-lg hover:bg-purple-50 transition-colors">
                            {item.image && (
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-12 h-12 object-cover rounded-lg shadow-sm"
                              />
                            )}
                            <div className="flex-1">
                              <p className="text-sm font-medium text-purple-900">{item.name}</p>
                              <p className="text-xs text-purple-500">
                                Quantity: {item.quantity}
                              </p>
                            </div>
                            <p className="text-sm font-medium text-purple-700">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 pt-4 border-t border-purple-100">
                        <div className="flex justify-between items-center mb-4">
                          <span className="font-medium text-purple-900">Total</span>
                          <span className="font-medium text-purple-700">
                            ${cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}
                          </span>
                        </div>
                        <button
                          onClick={() => handleNavigation('/confirmation')}
                          className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-2 rounded-lg font-medium hover:opacity-90 transition-opacity focus:ring-2 focus:ring-purple-200"
                        >
                          View Cart
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-4">
              <Link
                to="/register"
                className="text-gray-600 hover:text-purple-600 transition-colors duration-200 font-medium"
              >
                Register
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
