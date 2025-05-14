import React from 'react';
// import Header from './Header';
// import Footer from './Footer';

const Step2UserTypeSelection = ({ userType, setUserType, selectedColor, onNext }) => {
  const localUserType = userType;

  const handleUserTypeSelect = (type) => {
    setUserType(type);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* <Header /> */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 lg:p-10 min-h-[80vh]">
        <div className="bg-gray-800/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 sm:p-10 md:p-12 max-w-4xl w-full text-center border border-purple-500/20">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6 tracking-tight">
            Are you a Balloon Artist (Wholesale) or Retail Customer?
          </h2>
          <p className="text-base sm:text-lg text-gray-300 mb-8 leading-relaxed">
            Select your account type to help us provide you with the most relevant experience.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button
              onClick={() => handleUserTypeSelect('wholesale')}
              className={`p-6 rounded-xl text-left transition-all duration-300 ${
                localUserType === 'wholesale'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-xl scale-[1.02]'
                  : 'bg-gray-700/80 text-gray-300 hover:bg-gray-600 hover:text-white border border-purple-500/20'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-white/10">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2">Balloon Artist (Wholesale)</h3>
                  <p className="text-sm sm:text-base text-gray-300">
                    Access wholesale pricing, bulk orders, and professional resources for your balloon business.
                  </p>
                </div>
              </div>
            </button>

            <button
              onClick={() => handleUserTypeSelect('retail')}
              className={`p-6 rounded-xl text-left transition-all duration-300 ${
                localUserType === 'retail'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-xl scale-[1.02]'
                  : 'bg-gray-700/80 text-gray-300 hover:bg-gray-600 hover:text-white border border-purple-500/20'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-white/10">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2">Retail Customer</h3>
                  <p className="text-sm sm:text-base text-gray-300">
                    Browse our retail collection and find the perfect balloons for your special occasion.
                  </p>
                </div>
              </div>
            </button>
          </div>

          {localUserType && (
            <button
              onClick={onNext}
              className="mt-8 w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-semibold text-base shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 border border-purple-500/40"
            >
              Continue
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Step2UserTypeSelection;
