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
<<<<<<< HEAD
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
=======
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
>>>>>>> f865efd25f2a7b9fe2838dcf38909f468ac7dd82
            </button>
          </form>
        </div>
      </div>
      
    </div>
  );
};

export default Step4ThemeSelection;
