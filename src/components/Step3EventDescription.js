import React, { useState } from 'react';
// import Header from './Header';
import Footer from './Footer';

const Step3EventDescription = ({ onSubmit, selectedColor, userType }) => {
  const [eventType, setEventType] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (eventType.trim()) {
      onSubmit(eventType.trim());
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50">
      {/* <Header /> */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-8 lg:p-10 min-h-[80vh]">
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-10 max-w-lg w-full text-center border border-purple-100">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-party-purple mb-6 drop-shadow-[0_2px_8px_rgba(80,0,80,0.15)]">
            Describe Your Occasion
          </h2>
          <p className="text-lg sm:text-xl text-purple-800 mb-6">
            Please select your event type to help us choose the best theme.
          </p>
          {userType && (
            <p className="text-purple-700 mb-4">
              User Type: <span className="font-medium text-party-purple">{userType}</span>
            </p>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              value={eventType}
              onChange={(e) => setEventType(e.target.value)}
              placeholder="e.g. Birthday Party, Wedding, Corporate Event..."
              className="w-full px-4 py-3 rounded-lg border border-purple-200 focus:ring-2 focus:ring-party-purple focus:outline-none text-lg text-purple-900 bg-white/90 shadow"
            />
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

export default Step3EventDescription;
