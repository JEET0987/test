import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

const Step5CartPreview = ({ setStep }) => {
  const { cartItems, itemCount, totalPrice, removeFromCart, clearCart } = useContext(CartContext);
  const [showCart, setShowCart] = useState(false);

  // Close cart when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showCart && !event.target.closest('.cart-container')) {
        setShowCart(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showCart]);

  const handleCheckoutClick = () => {
    setShowCart(false);
    setStep(7);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50">
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-8 lg:p-10 min-h-[80vh]">
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-10 max-w-4xl w-full text-center border border-purple-100">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-party-purple mb-6 drop-shadow-[0_2px_8px_rgba(80,0,80,0.15)]">
            Cart Preview
          </h2>
          <div className="relative cart-container">
            <button
              onClick={() => setShowCart(!showCart)}
              className="relative focus:outline-none focus-ring transform transition-transform hover:scale-110"
              aria-label="Toggle cart preview"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-foreground"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4" />
                <circle cx="7" cy="21" r="2" />
                <circle cx="17" cy="21" r="2" />
              </svg>
              {itemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full text-xs w-5 h-5 flex items-center justify-center"
                >
                  {itemCount}
                </motion.span>
              )}
            </button>

            <AnimatePresence>
              {showCart && (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black sm:hidden z-40"
                    onClick={() => setShowCart(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="fixed sm:absolute inset-x-0 bottom-0 sm:bottom-auto sm:right-0 sm:top-16 sm:mt-2 sm:w-96 bg-card rounded-t-lg sm:rounded-lg shadow-lg border p-3 sm:p-4 z-50"
                  >
                    <div className="flex justify-between items-center mb-3 sm:mb-4">
                      <h3 className="text-base sm:text-lg font-bold text-foreground">Your Cart</h3>
                      <button
                        onClick={() => setShowCart(false)}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        ×
                      </button>
                    </div>

                    {cartItems.length === 0 ? (
                      <div className="text-center py-6 sm:py-8">
                        <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🛒</div>
                        <p className="text-sm sm:text-base text-muted-foreground">Your cart is empty</p>
                        <p className="text-xs sm:text-sm text-muted-foreground mt-1 sm:mt-2">Add some items to get started!</p>
                      </div>
                    ) : (
                      <div className="space-y-3 sm:space-y-4">
                        <div className="max-h-[40vh] sm:max-h-[50vh] overflow-y-auto pr-2 space-y-3 sm:space-y-4">
                          {cartItems.map((item) => (
                            <motion.div
                              key={item.id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 20 }}
                              className="flex justify-between items-center p-2 sm:p-3 rounded-lg bg-background/50 hover:bg-background/80 transition-colors"
                            >
                              <div className="flex items-center space-x-3 sm:space-x-4">
                                {item.image && (
                                  <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-lg overflow-hidden border border-input">
                                    <img
                                      src={item.image}
                                      alt={item.name}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                )}
                                <div>
                                  <span className="text-sm sm:text-base text-foreground font-medium block">{item.name}</span>
                                  <div className="flex items-center space-x-2 mt-0.5 sm:mt-1">
                                    <span className="text-xs sm:text-sm text-muted-foreground">
                                      ₹{item.price.toFixed(2)}
                                    </span>
                                    <span className="text-muted-foreground">×</span>
                                    <span className="text-xs sm:text-sm font-medium">{item.quantity}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center space-x-3 sm:space-x-4">
                                <span className="text-sm sm:text-base font-medium text-foreground">
                                  ₹{(item.price * item.quantity).toFixed(2)}
                                </span>
                                <button
                                  onClick={() => removeFromCart(item.id)}
                                  className="text-muted-foreground hover:text-destructive transition-colors p-1 rounded-full hover:bg-destructive/10"
                                  aria-label={`Remove ${item.name} from cart`}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 sm:h-5 sm:w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </button>
                              </div>
                            </motion.div>
                          ))}
                        </div>

                        <div className="border-t border-input pt-3 sm:pt-4 space-y-3 sm:space-y-4">
                          <div className="flex justify-between items-center text-base sm:text-lg font-medium">
                            <span className="text-foreground">Total</span>
                            <span className="text-primary">₹{totalPrice.toFixed(2)}</span>
                          </div>
                          
                          <div className="space-y-2">
                            <button
                              onClick={clearCart}
                              className="w-full px-3 sm:px-4 py-2 border-2 border-input bg-background text-foreground rounded-md text-sm sm:text-base font-medium hover:bg-accent hover:text-accent-foreground transition-all duration-300 transform hover:scale-[1.02] focus-ring"
                            >
                              Clear Cart
                            </button>
                            <button
                              onClick={handleCheckoutClick}
                              className="w-full px-3 sm:px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm sm:text-base font-medium hover:bg-primary/90 transition-all duration-300 transform hover:scale-[1.02] focus-ring"
                            >
                              Proceed to Checkout
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step5CartPreview;
