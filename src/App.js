import React, { useState, useEffect } from 'react';
import Step1ImageUploadOrInspire from './components/Step1ImageUploadOrInspire';
import Step2UserTypeSelection from './components/Step2UserTypeSelection';
import Step3EventDescription from './components/Step3EventDescription';
import Step4ThemeSelection from './components/Step4ThemeSelection';
import Step4ProductDisplay from './components/Step4ProductDisplay';
import Step5CartPreview from './components/Step5CartPreview';
import RomanticProducts from './components/products/RomanticProducts';
import CheckoutPage from './components/CheckoutPage';
import { CartProvider } from './context/CartContext';

import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_12345ReplaceWithYourOwnKey');

function App() {
  const [step, setStep] = useState(1);
  const [selectedColor, setSelectedColor] = useState(null);
  const [userType, setUserType] = useState(null);
  const [eventDescription, setEventDescription] = useState('');
  const [themeSuggestions, setThemeSuggestions] = useState([]);
  const [selectedTheme, setSelectedTheme] = useState(null);

  // Function to handle event description submit and generate theme suggestions
  const handleEventSubmit = (description) => {
    setEventDescription(description);
    const desc = description.toLowerCase();
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
    setStep(4);
  };

  return (
    <CartProvider>
      <Elements stripe={stripePromise}>
        <header className="flex justify-between items-center p-4 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 text-white shadow-lg">
          <h1 className="text-2xl font-bold cursor-pointer hover:scale-105 transition-all duration-300">Colour Match</h1>
          <Step5CartPreview setStep={setStep} />
        </header>
        
          {step === 1 && (
            <Step1ImageUploadOrInspire
              selectedColor={selectedColor}
              setSelectedColor={setSelectedColor}
              onNext={() => setStep(2)}
            />
          )}
          {step === 2 && (
            <Step2UserTypeSelection
              userType={userType}
              setUserType={setUserType}
              selectedColor={selectedColor}
              onNext={() => setStep(3)}
            />
          )}
          {step === 3 && (
            <Step3EventDescription
              onSubmit={handleEventSubmit}
              selectedColor={selectedColor}
              userType={userType}
            />
          )}
          {step === 4 && (
            <Step4ThemeSelection
              themeSuggestions={themeSuggestions}
              selectedTheme={selectedTheme}
              setSelectedTheme={setSelectedTheme}
              onNext={() => setStep(5)}
            />
          )}
          {step === 5 && (
            <>
              {selectedTheme === 'Romantic' ? (
                <RomanticProducts onNext={() => setStep(6)} />
              ) : (
                <Step4ProductDisplay
                  themeSuggestions={themeSuggestions}
                  selectedTheme={selectedTheme}
                  setSelectedTheme={setSelectedTheme}
                  onNext={() => setStep(6)}
                />
              )}
            </>
          )}
          {step === 6 && <Step5CartPreview setStep={setStep} />}
          {step === 7 && <CheckoutPage onBack={(step) => setStep(step)} />}
      </Elements>
    </CartProvider>
  );

}

export default App;
