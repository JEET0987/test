import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import Footer from './Footer';
import BalloonTooltip from './BalloonTooltip';

const HeroLanding = () => {
  const navigate = useNavigate();
  const [hoveredEvent, setHoveredEvent] = useState(null);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(true);
  }, []);

  const handleEventClick = (eventType) => {
    navigate('/step1', { state: { eventType } });
  };

  const events = [
    {
      type: 'Wedding',
      colors: ['#FFD700', '#FF69B4', '#87CEEB'],
      description: 'Elegant and romantic color combinations for your special day',
      icon: '💍'
    },
    {
      type: 'Birthday',
      colors: ['#FF6B6B', '#4ECDC4', '#FFE66D'],
      description: 'Vibrant and playful colors to celebrate life',
      icon: '🎂'
    },
    {
      type: 'Corporate',
      colors: ['#2C3E50', '#3498DB', '#E74C3C'],
      description: 'Professional and sophisticated color schemes',
      icon: '💼'
    },
    {
      type: 'Holiday',
      colors: ['#E74C3C', '#27AE60', '#F1C40F'],
      description: 'Festive colors for seasonal celebrations',
      icon: '🎄'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50">
      <main className={`flex-grow transition-opacity duration-1000 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
          {/* Floating Balloon SVG */}
          <svg className="absolute left-10 top-10 animate-bounce-slow z-10" width="60" height="120" viewBox="0 0 60 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="30" cy="40" rx="25" ry="35" fill="#fbbf24" fillOpacity="0.7"/>
            <ellipse cx="30" cy="40" rx="15" ry="25" fill="#a78bfa" fillOpacity="0.7"/>
            <path d="M30 75 Q32 90 28 110" stroke="#a78bfa" strokeWidth="2" fill="none"/>
          </svg>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
            <div className="text-center mb-8 sm:mb-12 md:mb-16 bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-10 max-w-3xl mx-auto border border-purple-100">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-party-purple mb-6 sm:mb-8 leading-tight drop-shadow-[0_2px_8px_rgba(80,0,80,0.15)]">
                Create Your Perfect Event
                <span className="block text-2xl sm:text-3xl md:text-4xl text-purple-700 mt-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-pink-700 drop-shadow-[0_2px_8px_rgba(80,0,80,0.15)]">
                  With AI-Powered Color Magic
                </span>
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-800 max-w-2xl mx-auto leading-relaxed">
                Transform your vision into reality with our intelligent color matching system
              </p>
              <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button
                  onClick={() => navigate('/step1')}
                  className="bg-gradient-to-r from-party-purple to-pink-400 text-party-purple px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 border-2 border-white/40"
                >
                  Start Creating Now
                </button>
                <BalloonTooltip tooltipText="Learn more about our features">
                  <button
                    onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
                    className="bg-white/80 text-party-purple px-8 py-4 rounded-full font-bold text-lg border border-purple-200 hover:bg-purple-50 hover:text-purple-700 shadow transition-all duration-300"
                  >
                    Learn More
                  </button>
                </BalloonTooltip>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 sm:py-20 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-party-purple mb-12 sm:mb-16 drop-shadow">
              Why Choose Our Color Matching?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
              {[
                { icon: '🎨', title: 'AI-Powered Matching', desc: 'Our advanced algorithm ensures perfect color harmony for your event, backed by years of design expertise.' },
                { icon: '⚡', title: 'Customizable Options', desc: 'Fine-tune your color palette to match your exact preferences with our intuitive controls.' },
                { icon: '✨', title: 'Instant Preview', desc: 'See how your colors look together in real-time before making any decisions.' }
              ].map((f, i) => (
                <div key={f.title} className="p-8 rounded-2xl bg-white/90 backdrop-blur-lg border border-purple-100 shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 flex flex-col items-center group">
                  <div className="w-16 h-16 bg-gradient-to-br from-party-purple to-purple-600 rounded-full flex items-center justify-center mb-6 text-3xl group-hover:rotate-12 transition-transform border-4 border-pink-200">
                    {f.icon}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-party-purple mb-4 text-center drop-shadow-[0_2px_8px_rgba(80,0,80,0.10)]">{f.title}</h3>
                  <p className="text-base sm:text-lg text-gray-800 leading-relaxed text-center">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-br from-purple-50 to-pink-50 relative overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-party-purple mb-12 sm:mb-16 drop-shadow">
              How It Works
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
              {[
                { step: 1, title: 'Choose Event Type', description: 'Select your event category', icon: '🎯', accent: 'border-pink-300' },
                { step: 2, title: 'Upload Image', description: 'Add your inspiration image', icon: '📸', accent: 'border-yellow-300' },
                { step: 3, title: 'Get Matches', description: 'Receive perfect color combinations', icon: '🎨', accent: 'border-purple-300' },
                { step: 4, title: 'Customize', description: 'Fine-tune your color palette', icon: '✨', accent: 'border-blue-300' }
              ].map((item) => (
                <div key={item.step} className={`relative group p-8 rounded-2xl bg-white/90 backdrop-blur-lg shadow-lg border-4 ${item.accent} hover:scale-105 hover:shadow-2xl transition-all duration-300 flex flex-col items-center`}>
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-party-purple to-purple-600 text-white flex items-center justify-center text-2xl font-bold mb-6 border-2 border-white">
                    {item.icon}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-party-purple mb-4 text-center drop-shadow-[0_2px_8px_rgba(80,0,80,0.10)]">{item.title}</h3>
                  <p className="text-base sm:text-lg text-gray-800 leading-relaxed text-center">{item.description}</p>
                  {item.step < 4 && (
                    <div className="hidden lg:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                      <svg className="w-10 h-10 text-party-purple group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-r from-party-purple to-purple-600 text-white relative overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 drop-shadow text-party-purple">
              Ready to Create Your Perfect Event?
            </h2>
            <p className="text-xl sm:text-2xl mb-10 max-w-3xl mx-auto leading-relaxed text-purple-800">
              Start your color matching journey today and bring your event vision to life
            </p>
            <button
              onClick={() => navigate('/step1')}
              className="bg-gradient-to-r from-yellow-200 to-pink-200 text-purple-700 px-10 py-5 rounded-full font-bold text-lg hover:bg-yellow-100 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl border-2 border-white/40"
            >
              Get Started Now
            </button>
          </div>
        </section>
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default HeroLanding; 