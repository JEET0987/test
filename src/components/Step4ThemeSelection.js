import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';

const Step4ThemeSelection = ({ themeSuggestions, selectedTheme, setSelectedTheme, onNext }) => {
  const [localSelectedTheme, setLocalSelectedTheme] = useState(selectedTheme || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (localSelectedTheme) {
      setSelectedTheme(localSelectedTheme);
      onNext();
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-8 lg:p-10 bg-background min-h-[80vh]">
        <div className="bg-card p-8 sm:p-10 rounded-lg border max-w-lg w-full text-center shadow-sm">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-foreground mb-6">
            Select a Theme
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col space-y-4">
              {themeSuggestions.map((theme) => (
                <label
                  key={theme}
                  className="inline-flex items-center space-x-3 cursor-pointer p-3 rounded-md hover:bg-accent transition-colors"
                >
                  <input
                    type="radio"
                    name="theme"
                    value={theme}
                    checked={localSelectedTheme === theme}
                    onChange={(e) => setLocalSelectedTheme(e.target.value)}
                    className="h-4 w-4 border-input text-primary focus-ring"
                    required
                  />
                  <span className="text-lg font-medium text-foreground">{theme}</span>
                </label>
              ))}
            </div>
            <button
              type="submit"
              className="mt-6 w-full bg-primary text-primary-foreground px-6 py-3 rounded-md text-lg font-medium hover:bg-primary/90 transition-colors focus-ring"
            >
              Next
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Step4ThemeSelection;
