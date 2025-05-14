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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* <Header /> */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 lg:p-10 min-h-[80vh]">
        <div className="bg-gray-800/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 sm:p-10 md:p-12 max-w-2xl w-full text-center border border-purple-500/20">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-6 tracking-tight">
            Select a Theme
          </h2>
          <p className="text-base sm:text-lg text-gray-300 mb-8 leading-relaxed">
            Choose a theme that best matches your event's style and atmosphere.
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="theme" className="block text-sm font-medium text-gray-300 mb-2 text-left">
                  Theme Selection
                </label>
                <select
                  id="theme"
                  value={localSelectedTheme}
                  onChange={(e) => setLocalSelectedTheme(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-purple-500/20 focus:ring-2 focus:ring-purple-500 focus:outline-none text-base text-white bg-gray-700/80 shadow"
                  required
                >
                  <option value="">Select a theme...</option>
                  {themeSuggestions && themeSuggestions.map((theme) => (
                    <option key={theme} value={theme}>{theme}</option>
                  ))}
                </select>
              </div>
              {localSelectedTheme && (
                <div className="p-4 rounded-xl bg-gray-700/50">
                  <h3 className="text-lg font-semibold text-white mb-2">Selected Theme</h3>
                  <p className="text-gray-300">{localSelectedTheme}</p>
                </div>
              )}
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-semibold text-base shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 border border-purple-500/40"
            >
              Continue
            </button>
          </form>
        </div>
      </div>
      
    </div>
  );
};

export default Step4ThemeSelection;
