import React, { useState } from 'react';

const Step3EventDescription = ({ onSubmit, selectedColor, userType }) => {
  const [eventType, setEventType] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (eventType.trim()) {
      onSubmit(eventType.trim());
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 sm:p-8 lg:p-10 bg-gradient-to-r from-blue-50 via-purple-100 to-pink-100">
      <div className="bg-white/90 p-8 sm:p-10 lg:p-12 rounded-3xl shadow-2xl max-w-lg w-full text-center backdrop-blur-md">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-800 mb-6">Describe Your Occasion</h2>
      <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6">Please select your event type to help us choose the best theme.</p>
      {userType && (
        <p className="text-gray-700">User Type: <strong>{userType}</strong></p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-6">
          <select
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
            className="border-2 border-gray-300 p-4 rounded-xl w-full text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
            required
          >
            <option value="">Select Event Type</option>
            <option value="Birthday">Birthday</option>
            <option value="Wedding">Wedding</option>
            <option value="Corporate Event">Corporate Event</option>
            <option value="Festival">Festival</option>
          </select>
        </div>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
      </div>
    </div>
  );
};

export default Step3EventDescription;
