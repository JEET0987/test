import React, { useState } from 'react';

const Step3EventDescription = ({ onSubmit, selectedColor, userType }) => {
<<<<<<< HEAD
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (description.trim()) {
      onSubmit(description.trim());
=======
  const [eventType, setEventType] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (eventType.trim()) {
      onSubmit(eventType.trim());
>>>>>>> 318b780 (Update project files)
    }
  };

  return (
<<<<<<< HEAD
    <div className="max-w-md mx-auto space-y-6">
      <h2 className="text-xl font-semibold">Describe your Occasion</h2>
      {selectedColor && (
        <div className="flex items-center space-x-4">
          <div
            className="w-12 h-12 rounded border border-gray-400"
            style={{ backgroundColor: selectedColor.hex || selectedColor }}
          />
          <p>Selected Color</p>
        </div>
      )}
=======
    <div className="min-h-screen flex items-center justify-center p-6 sm:p-8 lg:p-10 bg-gradient-to-r from-blue-50 via-purple-100 to-pink-100">
      <div className="bg-white/90 p-8 sm:p-10 lg:p-12 rounded-3xl shadow-2xl max-w-lg w-full text-center backdrop-blur-md">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-800 mb-6">Describe Your Occasion</h2>
      <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6">Please select your event type to help us choose the best theme.</p>
>>>>>>> 318b780 (Update project files)
      {userType && (
        <p className="text-gray-700">User Type: <strong>{userType}</strong></p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
<<<<<<< HEAD
        <input
          type="text"
          placeholder="e.g. Son’s 8th Birthday"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border border-gray-300 rounded px-4 py-2"
          required
        />
=======
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
>>>>>>> 318b780 (Update project files)
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
<<<<<<< HEAD
=======
      </div>
>>>>>>> 318b780 (Update project files)
    </div>
  );
};

export default Step3EventDescription;
