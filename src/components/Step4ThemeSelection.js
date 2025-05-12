import React, { useState } from 'react';
// import Header from './Header';
// import Footer from './Footer';

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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50">
      {/* <Header /> */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-8 lg:p-10 min-h-[80vh]">
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-10 max-w-lg w-full text-center border border-purple-100">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-party-purple mb-6 drop-shadow-[0_2px_8px_rgba(80,0,80,0.15)]">
            Select a Theme
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <select
              value={localSelectedTheme}
              onChange={(e) => setLocalSelectedTheme(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-purple-200 focus:ring-2 focus:ring-party-purple focus:outline-none text-lg text-purple-900 bg-white/90 shadow mb-4"
              required
            >
              <option value="">Select a theme...</option>
              {themeSuggestions && themeSuggestions.map((theme) => (
                <option key={theme} value={theme}>{theme}</option>
              ))}
            </select>
            <button
              type="submit"
              className="bg-gradient-to-r from-party-purple to-pink-400 text-party-purple px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 border-2 border-white/40"
            >
              Next
            </button>
          </form>
        </div>
      </div>
      
    </div>
  );
};

export default Step4ThemeSelection;
