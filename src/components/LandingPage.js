import React from 'react';

const LandingPage = ({ onNext }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
      <div className="w-full h-64 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-lg flex items-center justify-center text-white text-3xl font-bold">
        Build Your Occasion – Colour Match Tool
      </div>
      <div className="space-x-4">
        <button
          onClick={onNext}
          className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Upload an Image
        </button>
        <button
          onClick={onNext}
          className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          Inspire Me
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
