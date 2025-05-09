import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const Header = () => {
  const navigate = useNavigate();
  const { cartItems } = useContext(CartContext);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleNavigation = (path) => {
    navigate(path);
    setIsCartOpen(false);
  };

  return (
    <header className="bg-card border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl">🎈</span>
            <span className="font-bold text-xl text-primary">BCB</span>
          </Link>

          {/* Main Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => handleNavigation('/step1')}
              className="text-muted-foreground hover:text-primary transition-colors font-medium"
            >
              Build Your Occasion
            </button>
            <button
              onClick={() => handleNavigation('/step1')}
              className="text-muted-foreground hover:text-primary transition-colors font-medium"
            >
              Color Match
            </button>
            <button
              onClick={() => handleNavigation('/step5')}
              className="text-muted-foreground hover:text-primary transition-colors font-medium"
            >
              Trending Looks
            </button>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Cart Button */}
            <div className="relative">
              <button
                onClick={() => setIsCartOpen(!isCartOpen)}
                className="p-2 text-muted-foreground hover:text-primary transition-colors relative"
              >
                <span className="text-xl">🛒</span>
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </button>

              {/* Cart Dropdown */}
              {isCartOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-card rounded-lg shadow-lg border p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-foreground">Your Cart</h3>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      ✕
                    </button>
                  </div>

                  {cartItems.length === 0 ? (
                    <p className="text-muted-foreground text-center py-4">Your cart is empty</p>
                  ) : (
                    <>
                      <div className="max-h-60 overflow-y-auto space-y-4">
                        {cartItems.map((item) => (
                          <div key={item.id} className="flex items-center space-x-4">
                            {item.image && (
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-12 h-12 object-cover rounded-md"
                              />
                            )}
                            <div className="flex-1">
                              <p className="text-sm font-medium text-foreground">{item.name}</p>
                              <p className="text-xs text-muted-foreground">
                                Quantity: {item.quantity}
                              </p>
                            </div>
                            <p className="text-sm font-medium text-foreground">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        ))}
                      </div>
                      <div className="border-t mt-4 pt-4">
                        <div className="flex justify-between items-center mb-4">
                          <span className="font-medium text-foreground">Total</span>
                          <span className="font-medium text-foreground">
                            ${cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}
                          </span>
                        </div>
                        <button
                          onClick={() => handleNavigation('/confirmation')}
                          className="w-full bg-primary text-primary-foreground py-2 rounded-md font-medium hover:bg-primary/90 transition-colors focus-ring"
                        >
                          View Cart
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Sign In Button */}
            <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium hover:bg-primary/90 transition-colors focus-ring">
              Sign In
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 