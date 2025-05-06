import React, { useState } from 'react';

const Step3EventDescription = ({ onSubmit, selectedColor, userType }) => {
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (description.trim()) {
      onSubmit(description.trim());
    }
  };

  return (
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
      {userType && (
        <p className="text-gray-700">User Type: <strong>{userType}</strong></p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="e.g. Son’s 8th Birthday"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border border-gray-300 rounded px-4 py-2"
          required
        />
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Step3EventDescription;
