import React, { useState } from 'react';
import Header from './Header';

const Step5BalloonSelection = ({ selectedTheme, selectedColor, onNext }) => {
  const [selectedBalloons, setSelectedBalloons] = useState([]);

  const balloonOptions = [
    { id: 1, name: 'Round Balloon', size: '12"', price: '$2.99' },
    { id: 2, name: 'Heart Balloon', size: '16"', price: '$3.99' },
    { id: 3, name: 'Star Balloon', size: '14"', price: '$3.49' },
    { id: 4, name: 'Letter Balloon', size: '18"', price: '$4.99' },
    { id: 5, name: 'Number Balloon', size: '18"', price: '$4.99' },
    { id: 6, name: 'Foil Balloon', size: '20"', price: '$5.99' },
  ];

  const handleBalloonSelect = (balloonId) => {
    setSelectedBalloons(prev => {
      if (prev.includes(balloonId)) {
        return prev.filter(id => id !== balloonId);
      }
      return [...prev, balloonId];
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedBalloons.length > 0) {
      onNext(selectedBalloons);
    }
  };

  return (
    <div>
      <Header />
      <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-6 sm:p-8 lg:p-10 bg-background">
        <div className="bg-card p-8 sm:p-10 rounded-lg border max-w-2xl w-full text-center shadow-sm">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-foreground mb-6">
            Select Your Balloons
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground mb-8">
            Choose the balloons that match your theme and color scheme
          </p>

          {selectedColor && (
            <div className="mb-8 flex items-center justify-center space-x-4">
              <div
                className="w-12 h-12 rounded-full border border-input"
                style={{ backgroundColor: selectedColor.hex || selectedColor }}
              />
              <span className="text-lg font-medium text-foreground">
                Selected Color: {selectedColor.hex || selectedColor}
              </span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {balloonOptions.map((balloon) => (
                <label
                  key={balloon.id}
                  className={`relative flex items-center p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedBalloons.includes(balloon.id)
                      ? 'bg-accent border-primary'
                      : 'bg-background border-input hover:bg-accent/50'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedBalloons.includes(balloon.id)}
                    onChange={() => handleBalloonSelect(balloon.id)}
                    className="sr-only"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-medium text-foreground">
                        {balloon.name}
                      </span>
                      <span className="text-muted-foreground">{balloon.price}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Size: {balloon.size}
                    </p>
                  </div>
                </label>
              ))}
            </div>

            <button
              type="submit"
              disabled={selectedBalloons.length === 0}
              className={`w-full bg-primary text-primary-foreground px-6 py-3 rounded-md text-lg font-medium transition-colors focus-ring ${
                selectedBalloons.length === 0
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-primary/90'
              }`}
            >
              {selectedBalloons.length === 0
                ? 'Select at least one balloon'
                : `Continue with ${selectedBalloons.length} balloon${selectedBalloons.length > 1 ? 's' : ''}`}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Step5BalloonSelection; 