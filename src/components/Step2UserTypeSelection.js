import React from 'react';

const Step2UserTypeSelection = ({ userType, setUserType, selectedColor, onNext }) => {
  return (
<<<<<<< HEAD
    <div className="space-y-6 max-w-md mx-auto">
      <h2 className="text-xl font-semibold">Are you a Balloon Artist (Wholesale) or a Retail Customer?</h2>
      {selectedColor && (
        <div className="flex items-center space-x-4">
          <div
            className="w-12 h-12 rounded border border-gray-400"
=======
    <div class="min-h-screen flex flex-col items-center justify-center p-6 sm:p-8 lg:p-10 bg-gradient-to-r from-yellow-100 via-pink-200 to-purple-200">
    <div class="bg-white/90 p-8 sm:p-10 lg:p-12 rounded-3xl shadow-2xl max-w-lg w-full text-center backdrop-blur-md">
    <h2 class="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-800 mb-6">Are you a Balloon Artist (Wholesale) or Retail Customer?</h2>
    <p class="text-base sm:text-lg text-gray-600 mb-8">Choose your user type to get started with personalized options.</p>
      {selectedColor && (
        <div className="mb-8">
          <div
            className="mx-auto w-48 h-48 object-cover rounded-xl shadow-lg border-4 border-purple-300"
>>>>>>> 318b780 (Update project files)
            style={{ backgroundColor: selectedColor.hex || selectedColor }}
          />
          <p>Selected Color</p>
        </div>
      )}
<<<<<<< HEAD
      <div className="space-x-4">
        <button
=======
      <div className="flex flex-wrap justify-center gap-6 mb-6">
        <button 
>>>>>>> 318b780 (Update project files)
          onClick={() => {
            setUserType('Balloon Artist');
            onNext();
          }}
<<<<<<< HEAD
          className={`px-6 py-3 rounded ${
=======
          className={`bg-blue-500 text-white py-3 px-6 rounded-xl text-lg shadow-lg hover:bg-blue-600 transition-all duration-300 transform hover:-translate-y-1 w-full sm:w-auto${
>>>>>>> 318b780 (Update project files)
            userType === 'Balloon Artist' ? 'bg-blue-600 text-white' : 'bg-gray-200'
          } hover:bg-blue-700 hover:text-white transition`}
        >
          Balloon Artist
        </button>
        <button
          onClick={() => {
            setUserType('Retail Customer');
            onNext();
          }}
<<<<<<< HEAD
          className={`px-6 py-3 rounded ${
=======
          className={`bg-green-500 text-white py-3 px-6 rounded-xl text-lg shadow-lg hover:bg-green-600 transition-all duration-300 transform hover:-translate-y-1 w-full sm:w-auto ${
>>>>>>> 318b780 (Update project files)
            userType === 'Retail Customer' ? 'bg-green-600 text-white' : 'bg-gray-200'
          } hover:bg-green-700 hover:text-white transition`}
        >
          Retail Customer
        </button>
      </div>
    </div>
<<<<<<< HEAD
=======
    </div>
>>>>>>> 318b780 (Update project files)
  );
};

export default Step2UserTypeSelection;
