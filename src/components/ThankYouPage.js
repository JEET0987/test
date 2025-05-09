import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const ThankYouPage = () => {
  const navigate = useNavigate();

  const handleReturnHome = () => {
    navigate('/', { replace: true });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="bg-card rounded-lg shadow-sm p-8 md:p-12 text-center max-w-2xl border">
          <div className="mb-6">
            <span className="text-6xl">🎉</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Thank You for Your Order!
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Your order has been successfully placed. We'll send you an email confirmation with all the details.
          </p>
          
          <div className="space-y-4">
            <div className="bg-accent/50 rounded-lg p-4">
              <h2 className="font-semibold text-foreground mb-2">What's Next?</h2>
              <ul className="text-muted-foreground space-y-2 text-left">
                <li className="flex items-center">
                  <span className="mr-2">📧</span>
                  Check your email for order confirmation
                </li>
                <li className="flex items-center">
                  <span className="mr-2">📦</span>
                  We'll notify you when your order ships
                </li>
                <li className="flex items-center">
                  <span className="mr-2">💬</span>
                  Need help? Contact our support team
                </li>
              </ul>
            </div>

            <button
              onClick={handleReturnHome}
              className="bg-primary text-primary-foreground px-6 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors focus-ring"
            >
              Return to Home
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ThankYouPage; 