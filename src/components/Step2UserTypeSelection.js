import React from 'react';

const Step2UserTypeSelection = ({ userType, setUserType, selectedColor, onNext }) => {
  return (
    <div className="space-y-6 max-w-md mx-auto">
      <h2 className="text-xl font-semibold">Are you a Balloon Artist (Wholesale) or a Retail Customer?</h2>
      {selectedColor && (
        <div className="flex items-center space-x-4">
          <div
            className="w-12 h-12 rounded border border-gray-400"
            style={{ backgroundColor: selectedColor.hex || selectedColor }}
          />
          <p>Selected Color</p>
        </div>
      )}
      <div className="space-x-4">
        <button
          onClick={() => {
            setUserType('Balloon Artist');
            onNext();
          }}
          className={`px-6 py-3 rounded ${
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
          className={`px-6 py-3 rounded ${
            userType === 'Retail Customer' ? 'bg-green-600 text-white' : 'bg-gray-200'
          } hover:bg-green-700 hover:text-white transition`}
        >
          Retail Customer
        </button>
      </div>
    </div>
  );
};

export default Step2UserTypeSelection;
