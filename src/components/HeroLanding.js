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
        <section className="min-h-[80vh] bg-gradient-to-br from-purple-50 to-purple-100 py-20 pt-64">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-6xl font-bold text-party-purple mb-6">
                Create Your Perfect Event
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Discover the perfect color palette for your special occasion
              </p>
            </div>

            


            {/* Interactive Preview */}
            {hoveredEvent && (
              <div className="mt-12 p-6 bg-white rounded-xl shadow-lg transform transition-all duration-300 animate-fade-in">
                <h3 className="text-2xl font-bold text-party-purple mb-4">
                  {hoveredEvent} Color Preview
                </h3>
                <div className="flex flex-wrap gap-4">
                  {events.find(e => e.type === hoveredEvent)?.colors.map((color, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
                      style={{ backgroundColor: color }}
                    >
                      <span className="text-white font-mono text-sm">
                        {color}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-party-purple mb-12">
              Why Choose Our Color Matching?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 rounded-xl bg-purple-50 hover:bg-purple-100 transition-colors duration-300">
                <h3 className="text-xl font-bold text-party-purple mb-4">AI-Powered Matching</h3>
                <p className="text-gray-600">Our advanced algorithm ensures perfect color harmony for your event.</p>
              </div>
              <div className="p-6 rounded-xl bg-purple-50 hover:bg-purple-100 transition-colors duration-300">
                <h3 className="text-xl font-bold text-party-purple mb-4">Customizable Options</h3>
                <p className="text-gray-600">Fine-tune your color palette to match your exact preferences.</p>
              </div>
              <div className="p-6 rounded-xl bg-purple-50 hover:bg-purple-100 transition-colors duration-300">
                <h3 className="text-xl font-bold text-party-purple mb-4">Instant Preview</h3>
                <p className="text-gray-600">See how your colors look together before making any decisions.</p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 bg-purple-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-party-purple mb-12">
              How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { step: 1, title: 'Choose Event Type', description: 'Select your event category' },
                { step: 2, title: 'Upload Image', description: 'Add your inspiration image' },
                { step: 3, title: 'Get Matches', description: 'Receive perfect color combinations' },
                { step: 4, title: 'Customize', description: 'Fine-tune your color palette' }
              ].map((item) => (
                <div key={item.step} className="relative">
                  <div className="p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="w-12 h-12 rounded-full bg-party-purple text-white flex items-center justify-center text-xl font-bold mb-4">
                      {item.step}
                    </div>
                    <h3 className="text-xl font-bold text-party-purple mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
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
        <section className="py-20 bg-party-gradient text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Create Your Perfect Event?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Start your color matching journey today and bring your event vision to life
            </p>
            <button
              onClick={() => navigate('/step1')}
              className="bg-white text-party-purple px-8 py-3 rounded-full text-lg font-bold hover:bg-purple-100 transition-colors duration-300 transform hover:scale-105"
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