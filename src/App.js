import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import Step1ImageUploadOrInspire from './components/Step1ImageUploadOrInspire';
import Step2UserTypeSelection from './components/Step2UserTypeSelection';
import Step3EventDescription from './components/Step3EventDescription';
import Step4ProductDisplay from './components/Step4ProductDisplay';
import Step5CartPreview from './components/Step5CartPreview';
import { CartProvider } from './context/CartContext';

function App() {
  const [step, setStep] = useState(0);
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
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Build Your Occasion – Colour Match Tool</h1>
          <Step5CartPreview />
        </header>
        <main className="flex-grow container mx-auto p-4">
          {step === 0 && <LandingPage onNext={() => setStep(1)} />}
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
            <Step4ProductDisplay
              themeSuggestions={themeSuggestions}
              selectedTheme={selectedTheme}
              setSelectedTheme={setSelectedTheme}
              onNext={() => setStep(5)}
            />
          )}
          {step === 5 && <Step5CartPreview />}
        </main>
      </div>
    </CartProvider>
  );
}

export default App;
