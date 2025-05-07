import React, { useState } from 'react';

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
    <div className="min-h-screen flex flex-col items-center justify-center p-6 sm:p-8 lg:p-10 bg-gradient-to-r from-blue-50 via-purple-100 to-pink-100">
      <div className="bg-white/90 p-8 sm:p-10 rounded-3xl shadow-2xl max-w-lg w-full text-center backdrop-blur-md">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-800 mb-6">Select a Theme</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col space-y-4">
            {themeSuggestions.map((theme) => (
              <label key={theme} className="inline-flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="theme"
                  value={theme}
                  checked={localSelectedTheme === theme}
                  onChange={(e) => setLocalSelectedTheme(e.target.value)}
                  className="form-radio h-5 w-5 text-indigo-600"
                  required
                />
                <span className="text-lg font-medium text-gray-700">{theme}</span>
              </label>
            ))}
          </div>
          <button
            type="submit"
            className="mt-6 w-full px-6 py-3 bg-indigo-600 text-white rounded-xl text-lg font-semibold hover:bg-indigo-700 transition"
          >
            Next
          </button>
        </form>
      </div>
    </div>
  );
};

export default Step4ThemeSelection;
