import React from 'react';
// import Header from './Header';
// import Footer from './Footer';

const Step2UserTypeSelection = ({ userType, setUserType, selectedColor, onNext }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50">
      {/* <Header /> */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-8 lg:p-10">
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-10 max-w-lg w-full text-center border border-purple-100">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-party-purple mb-6 drop-shadow-[0_2px_8px_rgba(80,0,80,0.15)]">
            Are you a Balloon Artist (Wholesale) or Retail Customer?
          </h2>
          <p className="text-lg sm:text-xl text-purple-800 mb-8">
            Choose your user type to get started with personalized options.
          </p>
          {selectedColor && (
            <div className="mb-8">
              <div
                className="mx-auto w-48 h-48 object-cover rounded-md border-2 border-party-purple shadow"
                style={{ backgroundColor: selectedColor.hex || selectedColor }}
              />
              <p className="text-purple-700 mt-2">Selected Color</p>
            </div>
          )}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => {
                setUserType('Balloon Artist');
                onNext();
              }}
              className={`bg-gradient-to-r from-party-purple to-pink-400 text-party-purple px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 border-2 border-white/40 ${userType === 'Balloon Artist' ? 'ring-2 ring-party-purple' : ''}`}
            >
              Balloon Artist
            </button>
            <button
              onClick={() => {
                setUserType('Retail Customer');
                onNext();
              }}
              className={`bg-white/80 text-party-purple px-8 py-4 rounded-full font-bold text-lg border border-purple-200 hover:bg-purple-50 hover:text-purple-700 shadow transition-all duration-300 ${userType === 'Retail Customer' ? 'ring-2 ring-pink-400' : ''}`}
            >
              Retail Customer
            </button>
          </div>
        </div>
      </div>
     
    </div>
  );
};

export default Step2UserTypeSelection;
