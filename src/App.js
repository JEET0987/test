import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Step1ImageUploadOrInspire from './components/Step1ImageUploadOrInspire';
import Step2UserTypeSelection from './components/Step2UserTypeSelection';
import Step3EventDescription from './components/Step3EventDescription';
import Step4ThemeSelection from './components/Step4ThemeSelection';
import Step4ProductDisplay from './components/Step4ProductDisplay';
import CheckoutPage from './components/CheckoutPage';
import ConfirmationPage from './components/ConfirmationPage';
import ThankYouPage from './components/ThankYouPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import { CartProvider } from './context/CartContext';
import HeroLanding from './components/HeroLanding';
import { AuthProvider } from './contexts/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import Header from './components/Header';
import Footer from './components/Footer';

const stripePromise = loadStripe('pk_test_12345ReplaceWithYourOwnKey');

// State management context
const AppStateContext = React.createContext();

// Wrapper components to handle navigation
const Step1Wrapper = () => {
  const navigate = useNavigate();
  const { selectedColor, setSelectedColor } = React.useContext(AppStateContext);
  
  return (
    <Step1ImageUploadOrInspire
      selectedColor={selectedColor}
      setSelectedColor={setSelectedColor}
      onNext={() => navigate('/step2')}
    />
  );
};

const Step2Wrapper = () => {
  const navigate = useNavigate();
  const { selectedColor, userType, setUserType } = React.useContext(AppStateContext);
  
  return (
    <Step2UserTypeSelection
      userType={userType}
      setUserType={setUserType}
      selectedColor={selectedColor}
      onNext={() => navigate('/step3')}
      onBack={() => navigate('/')}
    />
  );
};

const Step3Wrapper = () => {
  const navigate = useNavigate();
  const { selectedColor, userType, setEventDescription, setThemeSuggestions } = React.useContext(AppStateContext);
  
  const handleSubmit = (description) => {
    setEventDescription(description);
    const desc = description.eventDetails?.toLowerCase() || '';
    const suggestions = [];
    if (desc.includes('birthday')) {
      suggestions.push('Circus', 'Gaming', 'Space');
    } else if (desc.includes('wedding')) {
      suggestions.push('Romantic', 'Elegant', 'Rustic');
    } else if (desc.includes('baby')) {
      suggestions.push('Pastel', 'Jungle', 'Fairy Tale');
    } else {
      suggestions.push('Classic', 'Modern', 'Festive');
    }
    setThemeSuggestions(suggestions);
    navigate('/step4');
  };

  return (
    <Step3EventDescription
      onSubmit={handleSubmit}
      selectedColor={selectedColor}
      userType={userType}
      onBack={() => navigate('/step2')}
    />
  );
};

const Step4Wrapper = () => {
  const navigate = useNavigate();
  const { themeSuggestions, selectedTheme, setSelectedTheme } = React.useContext(AppStateContext);
  
  return (
    <Step4ThemeSelection
      themeSuggestions={themeSuggestions}
      selectedTheme={selectedTheme}
      setSelectedTheme={setSelectedTheme}
      onNext={() => navigate('/step5')}
      onBack={() => navigate('/step3')}
    />
  );
};

const Step5Wrapper = () => {
  const navigate = useNavigate();
  const { themeSuggestions, selectedTheme, setSelectedTheme } = React.useContext(AppStateContext);
  
  return (
    <Step4ProductDisplay
      themeSuggestions={themeSuggestions}
      selectedTheme={selectedTheme}
      setSelectedTheme={setSelectedTheme}
      onNext={() => navigate('/confirmation')}
      onBack={() => navigate('/step4')}
    />
  );
};

const CheckoutWrapper = () => {
  const navigate = useNavigate();
  return <CheckoutPage onBack={() => navigate('/thank-you')} />;
};

function App() {
  const [selectedColor, setSelectedColor] = useState(null);
  const [userType, setUserType] = useState(null);
  const [eventDescription, setEventDescription] = useState('');
  const [themeSuggestions, setThemeSuggestions] = useState([]);
  const [selectedTheme, setSelectedTheme] = useState(null);

  const appState = {
    selectedColor,
    setSelectedColor: (color) => {
      console.log('Setting color:', color); // Add logging to debug color selection
      setSelectedColor(color);
    },
    userType,
    setUserType,
    eventDescription,
    setEventDescription,
    themeSuggestions,
    setThemeSuggestions,
    selectedTheme,
    setSelectedTheme
  };

  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
              <AppStateContext.Provider value={appState}>
                <Elements stripe={stripePromise}>
                  <Routes>
                    <Route path="/" element={<HeroLanding />} />
                    <Route path="/step1" element={<Step1Wrapper />} />
                    <Route path="/step2" element={<Step2Wrapper />} />
                    <Route path="/step3" element={<Step3Wrapper />} />
                    <Route path="/step4" element={<Step4Wrapper />} />
                    <Route path="/step5" element={<Step5Wrapper />} />
                    <Route path="/confirmation" element={<ConfirmationPage />} />
                    <Route path="/checkout" element={<CheckoutWrapper />} />
                    <Route path="/thank-you" element={<ThankYouPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </Elements>
              </AppStateContext.Provider>
            </main>
            <Footer />
            <ToastContainer
              position="top-right"
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
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
