import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';

const HeroLanding = () => {
  const navigate = useNavigate();
  const [hoveredEvent, setHoveredEvent] = useState(null);

  const handleEventClick = (eventType) => {
    navigate('/step1', { state: { eventType } });
  };

  const events = [
    {
      type: 'Wedding',
      colors: ['#FFD700', '#FF69B4', '#87CEEB'],
      description: 'Elegant and romantic color combinations for your special day'
    },
    {
      type: 'Birthday',
      colors: ['#FF6B6B', '#4ECDC4', '#FFE66D'],
      description: 'Vibrant and playful colors to celebrate life'
    },
    {
      type: 'Corporate',
      colors: ['#2C3E50', '#3498DB', '#E74C3C'],
      description: 'Professional and sophisticated color schemes'
    },
    {
      type: 'Holiday',
      colors: ['#E74C3C', '#27AE60', '#F1C40F'],
      description: 'Festive colors for seasonal celebrations'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="min-h-[80vh] bg-gradient-to-br from-purple-50 to-purple-100 py-8 sm:py-12 md:py-16 lg:py-20 pt-56 sm:pt-64 md:pt-[16rem] lg:pt-[20rem]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-12 md:mb-16">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-party-purple mb-4 sm:mb-6">
                Create Your Perfect Event
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                Discover the perfect color palette for your special occasion
              </p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 sm:py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-party-purple mb-8 sm:mb-12">
              Why Choose Our Color Matching?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <div className="p-6 rounded-xl bg-purple-50 hover:bg-purple-100 transition-colors duration-300">
                <h3 className="text-lg sm:text-xl font-bold text-party-purple mb-4">AI-Powered Matching</h3>
                <p className="text-sm sm:text-base text-gray-600">Our advanced algorithm ensures perfect color harmony for your event.</p>
              </div>
              <div className="p-6 rounded-xl bg-purple-50 hover:bg-purple-100 transition-colors duration-300">
                <h3 className="text-lg sm:text-xl font-bold text-party-purple mb-4">Customizable Options</h3>
                <p className="text-sm sm:text-base text-gray-600">Fine-tune your color palette to match your exact preferences.</p>
              </div>
              <div className="p-6 rounded-xl bg-purple-50 hover:bg-purple-100 transition-colors duration-300">
                <h3 className="text-lg sm:text-xl font-bold text-party-purple mb-4">Instant Preview</h3>
                <p className="text-sm sm:text-base text-gray-600">See how your colors look together before making any decisions.</p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-12 sm:py-16 md:py-20 bg-purple-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-party-purple mb-8 sm:mb-12">
              How It Works
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {[
                { step: 1, title: 'Choose Event Type', description: 'Select your event category' },
                { step: 2, title: 'Upload Image', description: 'Add your inspiration image' },
                { step: 3, title: 'Get Matches', description: 'Receive perfect color combinations' },
                { step: 4, title: 'Customize', description: 'Fine-tune your color palette' }
              ].map((item) => (
                <div key={item.step} className="relative">
                  <div className="p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="w-12 h-12 rounded-full bg-party-purple text-black flex items-center justify-center text-xl font-bold mb-4">
                      {item.step}
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-party-purple mb-2">{item.title}</h3>
                    <p className="text-sm sm:text-base text-gray-600">{item.description}</p>
                  </div>
                  {item.step < 4 && (
                    <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                      <svg className="w-8 h-8 text-party-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 sm:py-16 md:py-20 bg-party-gradient text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
              Ready to Create Your Perfect Event?
            </h2>
            <p className="text-base sm:text-lg md:text-xl mb-8 max-w-2xl mx-auto">
              Start your color matching journey today and bring your event vision to life
            </p>
            <button
              onClick={() => navigate('/step1')}
              className="bg-white text-party-purple px-6 py-3 rounded-md font-medium hover:bg-purple-100 transition-colors duration-300 text-sm sm:text-base"
            >
              Get Started Now
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HeroLanding; 