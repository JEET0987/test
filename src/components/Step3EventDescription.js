import React, { useState } from 'react';
// import Header from './Header';
import Footer from './Footer';

const Step3EventDescription = ({ onSubmit, selectedColor, userType }) => {
  const [localEventType, setLocalEventType] = useState('');
  const [localEventDate, setLocalEventDate] = useState('');
  const [localEventDetails, setLocalEventDetails] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (localEventType.trim()) {
      onSubmit({
        eventType: localEventType.trim(),
        eventDate: localEventDate || '',
        eventDetails: localEventDetails || ''
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* <Header /> */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 lg:p-10 min-h-[80vh]">
        <div className="bg-gray-800/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 sm:p-10 md:p-12 max-w-2xl w-full text-center border border-purple-500/20">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-6 tracking-tight">
            Describe Your Occasion
          </h2>
          <p className="text-base sm:text-lg text-gray-300 mb-8 leading-relaxed">
            Help us understand your event better to provide the most suitable balloon arrangements.
          </p>
          {userType && (
            <div className="mb-6 p-3 rounded-lg bg-gray-700/50 text-sm text-gray-400">
              {userType === 'wholesale' ? 'Wholesale Account' : 'Retail Customer'}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="eventType" className="block text-sm font-medium text-gray-300 mb-2 text-left">
                  Event Type
                </label>
                <select
                  id="eventType"
                  value={localEventType}
                  onChange={(e) => setLocalEventType(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-purple-500/20 focus:ring-2 focus:ring-purple-500 focus:outline-none text-base text-white bg-gray-700/80 shadow"
                  required
                >
                  <option value="">Select an event type...</option>
                  <option value="wedding">Wedding</option>
                  <option value="birthday">Birthday</option>
                  <option value="corporate">Corporate Event</option>
                  <option value="holiday">Holiday Party</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="eventDate" className="block text-sm font-medium text-gray-300 mb-2 text-left">
                  Event Date
                </label>
                <input
                  type="date"
                  id="eventDate"
                  value={localEventDate}
                  onChange={(e) => setLocalEventDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-purple-500/20 focus:ring-2 focus:ring-purple-500 focus:outline-none text-base text-white bg-gray-700/80 shadow"
                  required
                />
              </div>
              <div>
                <label htmlFor="eventDetails" className="block text-sm font-medium text-gray-300 mb-2 text-left">
                  Additional Details
                </label>
                <textarea
                  id="eventDetails"
                  value={localEventDetails}
                  onChange={(e) => setLocalEventDetails(e.target.value)}
                  placeholder="Tell us more about your event..."
                  className="w-full px-4 py-3 rounded-xl border border-purple-500/20 focus:ring-2 focus:ring-purple-500 focus:outline-none text-base text-white bg-gray-700/80 shadow min-h-[100px] resize-y"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-semibold text-base shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 border border-purple-500/40"
            >
              Continue
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Step3EventDescription;
