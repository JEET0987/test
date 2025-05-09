import React, { useState } from 'react';
import Header from './Header';
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
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex items-center justify-center p-6 sm:p-8 lg:p-10 bg-background min-h-[80vh]">
        <div className="bg-card p-8 sm:p-10 lg:p-12 rounded-lg border max-w-lg w-full text-center shadow-sm">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-foreground mb-6">
            Describe Your Occasion
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6">
            Please select your event type to help us choose the best theme.
          </p>
          {userType && (
            <p className="text-muted-foreground">
              User Type: <span className="font-medium text-foreground">{userType}</span>
            </p>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="mb-6">
              <select
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                className="w-full rounded-md border border-input bg-background px-4 py-3 text-lg focus-ring"
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
              className="bg-primary text-primary-foreground px-6 py-3 rounded-md font-medium text-lg hover:bg-primary/90 transition-colors focus-ring"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Step3EventDescription;
