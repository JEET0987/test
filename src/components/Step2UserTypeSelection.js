import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Step2UserTypeSelection = ({ userType, setUserType, selectedColor, onNext }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-8 lg:p-10 bg-background">
        <div className="bg-card p-8 sm:p-10 lg:p-12 rounded-lg border max-w-lg w-full text-center shadow-sm">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-foreground mb-6">
            Are you a Balloon Artist (Wholesale) or Retail Customer?
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground mb-8">
            Choose your user type to get started with personalized options.
          </p>
          {selectedColor && (
            <div className="mb-8">
              <div
                className="mx-auto w-48 h-48 object-cover rounded-md border shadow-sm"
                style={{ backgroundColor: selectedColor.hex || selectedColor }}
              />
              <p className="text-muted-foreground mt-2">Selected Color</p>
            </div>
          )}
          <div className="flex flex-wrap justify-center gap-6 mb-6">
            <button
              onClick={() => {
                setUserType('Balloon Artist');
                onNext();
              }}
              className={`bg-primary text-primary-foreground py-3 px-6 rounded-md text-lg font-medium hover:bg-primary/90 transition-colors focus-ring w-full sm:w-auto ${
                userType === 'Balloon Artist' ? 'ring-2 ring-primary' : ''
              }`}
            >
              Balloon Artist
            </button>
            <button
              onClick={() => {
                setUserType('Retail Customer');
                onNext();
              }}
              className={`bg-secondary text-secondary-foreground py-3 px-6 rounded-md text-lg font-medium hover:bg-secondary/90 transition-colors focus-ring w-full sm:w-auto ${
                userType === 'Retail Customer' ? 'ring-2 ring-secondary' : ''
              }`}
            >
              Retail Customer
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Step2UserTypeSelection;
