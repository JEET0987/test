import React, { useState, useRef, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';

const inspirationColors = [
  // Warm Colors
  { name: 'Coral', hex: '#FF6F61', category: 'Warm' },
  { name: 'Sunflower', hex: '#FFC312', category: 'Warm' },
  { name: 'Peach', hex: '#FFDAB9', category: 'Warm' },
  { name: 'Rose', hex: '#FF007F', category: 'Warm' },
  { name: 'Terracotta', hex: '#E2725B', category: 'Warm' },
  { name: 'Amber', hex: '#FFBF00', category: 'Warm' },
  { name: 'Crimson', hex: '#DC143C', category: 'Warm' },
  { name: 'Coral Pink', hex: '#F88379', category: 'Warm' },
  
  // Cool Colors
  { name: 'Turquoise', hex: '#40E0D0', category: 'Cool' },
  { name: 'Sky Blue', hex: '#87CEEB', category: 'Cool' },
  { name: 'Lavender', hex: '#B497BD', category: 'Cool' },
  { name: 'Mint', hex: '#98FF98', category: 'Cool' },
  { name: 'Ocean Blue', hex: '#0077BE', category: 'Cool' },
  { name: 'Sage', hex: '#BCB88A', category: 'Cool' },
  { name: 'Periwinkle', hex: '#CCCCFF', category: 'Cool' },
  { name: 'Teal', hex: '#008080', category: 'Cool' },
  
  // Neutral Colors
  { name: 'Dusty Rose', hex: '#DC8B9B', category: 'Neutral' },
  { name: 'Mauve', hex: '#E0B0FF', category: 'Neutral' },
  { name: 'Sage Green', hex: '#9CAF88', category: 'Neutral' },
  { name: 'Blush', hex: '#DE5D83', category: 'Neutral' },
  { name: 'Lilac', hex: '#C8A2C8', category: 'Neutral' },
  { name: 'Seafoam', hex: '#9FE2BF', category: 'Neutral' },
  { name: 'Dusty Blue', hex: '#B0C4DE', category: 'Neutral' },
  { name: 'Moss', hex: '#8A9A5B', category: 'Neutral' }
];

const Step1ImageUploadOrInspire = ({ selectedColor, setSelectedColor, onNext }) => {
  const [mode, setMode] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [message, setMessage] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [localSelectedColor, setLocalSelectedColor] = useState(null);
  const canvasRef = useRef(null);
  const imageRef = useRef(null);
  const dropZoneRef = useRef(null);
  const fileInputRef = useRef(null);

  const categories = ['All', 'Warm', 'Cool', 'Neutral'];

  useEffect(() => {
    setLocalSelectedColor(selectedColor);
  }, [selectedColor]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target.result);
        setSelectedColor(null);
        setMessage('Image uploaded successfully! Click on the image to select a color.');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target.result);
        setSelectedColor(null);
        setMessage('Image uploaded successfully! Click on the image to select a color.');
      };
      reader.readAsDataURL(file);
    } else {
      setMessage('Please drop an image file.');
    }
  };

  const handleImageClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!imageSrc) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    
    // Calculate the scale factors
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    // Get the click coordinates relative to the canvas
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;
    
    // Get the pixel data at the clicked position
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(Math.floor(x), Math.floor(y), 1, 1).data;
    
    // Convert to hex
    const hex = rgbToHex(imageData[0], imageData[1], imageData[2]);
    setSelectedColor(hex);
    setMessage(`Selected color: ${hex}`);
  };

  const rgbToHex = (r, g, b) => {
    return '#' + [r, g, b].map(x => {
      const hex = x.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    }).join('');
  };

  useEffect(() => {
    if (imageSrc && canvasRef.current) {
      const img = new Image();
      img.onload = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        
        // Set canvas dimensions to match image
        canvas.width = img.width;
        canvas.height = img.height;
        
        // Draw image at full resolution
        ctx.drawImage(img, 0, 0);
        
        // Store the scale factor for later use
        canvas.dataset.scaleX = canvas.width / canvas.offsetWidth;
        canvas.dataset.scaleY = canvas.height / canvas.offsetHeight;
      };
      img.src = imageSrc;
    }
  }, [imageSrc]);

  const filteredColors = activeCategory === 'All' 
    ? inspirationColors 
    : inspirationColors.filter(color => color.category === activeCategory);

  const handleColorSelect = (color) => {
    console.log('Selecting color:', color);
    setLocalSelectedColor(color);
    setSelectedColor(color);
    setMessage(`Selected color: ${color}`);
  };

  return (
<<<<<<< HEAD
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {!mode && (
        <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12 min-h-[80vh]">
          <div className="bg-gray-800/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 sm:p-10 md:p-12 max-w-xl w-full text-center border border-purple-500/20">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
              Event Color Match
            </h1>
            <p className="text-base sm:text-lg text-gray-300 mb-8 leading-relaxed">
              Find the perfect color theme for your next event with our professional color matching tool.
=======
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50">
      
      {!mode && (
        <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12 min-h-[80vh]">
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-10 max-w-xl w-full text-center border border-purple-100">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-party-purple mb-4 sm:mb-6 drop-shadow-[0_2px_8px_rgba(80,0,80,0.15)]">
              🎨 Event Color Match
            </h1>
            <p className="text-lg sm:text-xl text-purple-800 mb-6 sm:mb-8">
              Find the perfect color theme for your next event!
>>>>>>> f865efd25f2a7b9fe2838dcf38909f468ac7dd82
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => setMode('upload')}
<<<<<<< HEAD
                className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-semibold text-base shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 border border-purple-500/40"
              >
                Upload an Image
              </button>
              <button
                onClick={() => setMode('inspire')}
                className="w-full sm:w-auto bg-gray-700/90 text-white px-8 py-4 rounded-xl font-semibold text-base border border-purple-500/20 hover:bg-gray-600 hover:border-purple-500/40 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Get Inspired
=======
                className="bg-gradient-to-r from-party-purple to-pink-400 text-party-purple px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 border-2 border-white/40"
              >
                📤 Upload an Image
              </button>
              <button
                onClick={() => setMode('inspire')}
                className="bg-white/80 text-party-purple px-8 py-4 rounded-full font-bold text-lg border border-purple-200 hover:bg-purple-50 hover:text-purple-700 shadow transition-all duration-300"
              >
                ✨ Inspire Me
>>>>>>> f865efd25f2a7b9fe2838dcf38909f468ac7dd82
              </button>
            </div>
          </div>
        </div>
      )}

      {mode === 'upload' && (
        <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12 min-h-[80vh]">
<<<<<<< HEAD
          <div className="bg-gray-800/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 sm:p-10 md:p-12 max-w-xl w-full text-center border border-purple-500/20">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-6 tracking-tight">
              Upload an Image
            </h2>
            <div className="mb-8">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                ref={fileInputRef}
              />
              <div
                className="border-2 border-dashed border-purple-500/20 rounded-xl p-8 text-center cursor-pointer hover:border-purple-500/40 transition-colors bg-gray-700/30"
                onClick={() => fileInputRef.current?.click()}
              >
                {!imageSrc ? (
                  <div className="space-y-4">
                    <div className="text-4xl mb-4">📸</div>
                    <p className="text-sm text-gray-400">
                      Drag and drop an image here, or click to select
                    </p>
                  </div>
                ) : (
                  <div className="relative">
                    <div className="relative w-full">
                      <img
                        src={imageSrc}
                        alt="Uploaded"
                        className="max-w-full h-auto rounded-lg"
                        style={{ display: 'none' }}
                        ref={imageRef}
                      />
                      <canvas
                        ref={canvasRef}
                        onClick={handleImageClick}
                        className="max-w-full h-auto rounded-lg cursor-crosshair"
                        style={{ touchAction: 'none' }}
                      />
                      <div className="absolute bottom-4 left-4 bg-gray-800/90 backdrop-blur-sm px-4 py-2 rounded-lg text-sm text-gray-300">
                        Click anywhere to pick a color
                      </div>
                    </div>
                    {localSelectedColor && (
                      <div className="mt-6 p-4 rounded-xl bg-gray-700/50">
                        <div className="flex items-center justify-center gap-4">
                          <div
                            className="w-12 h-12 rounded-lg border-2 border-purple-500/40"
                            style={{ backgroundColor: localSelectedColor }}
                          />
                          <span className="font-mono text-lg text-white">{localSelectedColor}</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            {localSelectedColor && (
              <button
                onClick={onNext}
                className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-semibold text-base shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 border border-purple-500/40"
              >
                Continue
              </button>
            )}
=======
          <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-10 max-w-xl w-full text-center border border-purple-100">
            <h2 className="text-2xl sm:text-3xl font-bold text-party-purple mb-4 sm:mb-6 drop-shadow-[0_2px_8px_rgba(80,0,80,0.10)]">
              Upload Your Image
            </h2>
            <div
              className={`border-2 border-dashed rounded-lg p-6 sm:p-8 text-center ${
                isDragging ? 'border-party-purple bg-party-purple/10' : 'border-input'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />
              {!imageSrc ? (
                <div 
                  className="space-y-4 cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="text-4xl sm:text-5xl mb-4">📸</div>
                  <p className="text-muted-foreground">
                    Drag and drop an image here, or click to select
                  </p>
                </div>
              ) : (
                <div className="relative">
                  <div className="relative w-full">
                    <img
                      src={imageSrc}
                      alt="Uploaded"
                      className="max-w-full h-auto rounded-lg"
                      style={{ display: 'none' }}
                      ref={imageRef}
                    />
                    <canvas
                      ref={canvasRef}
                      onClick={handleImageClick}
                      className="max-w-full h-auto rounded-lg cursor-crosshair"
                      style={{ touchAction: 'none' }}
                    />
                    <div className="absolute bottom-4 left-4 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-md text-sm text-muted-foreground">
                      Click anywhere to pick a color
                    </div>
                  </div>
                  {localSelectedColor && (
                    <div className="mt-4 p-4 rounded-lg bg-background/50">
                      <div className="flex items-center justify-center gap-4">
                        <div
                          className="w-12 h-12 rounded-full border-2 border-input"
                          style={{ backgroundColor: localSelectedColor }}
                        />
                        <span className="font-mono text-lg">{localSelectedColor}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            {message && (
              <p className="mt-4 text-center text-purple-700">{message}</p>
            )}
            <div className="mt-6 sm:mt-8 flex justify-center gap-4">
              <button
                onClick={() => {
                  setMode(null);
                  setImageSrc(null);
                  setSelectedColor(null);
                }}
                className="bg-white/80 text-party-purple px-6 py-3 rounded-full font-bold border border-purple-200 hover:bg-purple-50 hover:text-purple-700 shadow transition-all duration-300"
              >
                Back
              </button>
              <button
                onClick={onNext}
                disabled={!localSelectedColor}
                className="bg-gradient-to-r from-party-purple to-pink-400 text-party-purple px-6 py-3 rounded-full font-bold shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 border-2 border-white/40 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
>>>>>>> f865efd25f2a7b9fe2838dcf38909f468ac7dd82
          </div>
        </div>
      )}

      {mode === 'inspire' && (
        <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12 min-h-[80vh]">
<<<<<<< HEAD
          <div className="bg-gray-800/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 sm:p-10 md:p-12 max-w-xl w-full text-center border border-purple-500/20">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-6 tracking-tight">
              Get Inspired
            </h2>
            <div className="mb-8">
              <div className="flex flex-wrap gap-3 justify-center">
=======
          <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-10 max-w-xl w-full text-center border border-purple-100">
            <h2 className="text-2xl sm:text-3xl font-bold text-party-purple mb-4 sm:mb-6 drop-shadow-[0_2px_8px_rgba(80,0,80,0.10)]">
              Get Inspired
            </h2>
            <div className="mb-6 sm:mb-8">
              <div className="flex flex-wrap gap-2 justify-center">
>>>>>>> f865efd25f2a7b9fe2838dcf38909f468ac7dd82
                {['All', 'Warm', 'Cool', 'Neutral'].map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
<<<<<<< HEAD
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      activeCategory === category
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                        : 'bg-gray-700/80 text-gray-300 hover:bg-gray-600 hover:text-white border border-purple-500/20'
=======
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      activeCategory === category
                        ? 'bg-gradient-to-r from-party-purple to-pink-400 text-party-purple'
                        : 'bg-white/80 text-party-purple hover:bg-purple-50 hover:text-purple-700 border border-purple-200'
>>>>>>> f865efd25f2a7b9fe2838dcf38909f468ac7dd82
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
<<<<<<< HEAD
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-8">
=======
            <div className="grid grid-cols-4 gap-2 sm:gap-4 mb-6">
>>>>>>> f865efd25f2a7b9fe2838dcf38909f468ac7dd82
              {filteredColors.map((color) => (
                <div
                  key={color.hex}
                  className="relative group"
                >
                  <button
                    onClick={() => handleColorSelect(color.hex)}
<<<<<<< HEAD
                    className="w-full aspect-square rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
                    style={{ 
                      backgroundColor: color.hex,
                      border: localSelectedColor === color.hex ? '3px solid #8B5CF6' : 'none',
                      boxShadow: localSelectedColor === color.hex ? '0 0 0 2px #1F2937, 0 0 0 4px #8B5CF6' : 'none'
=======
                    className="w-full aspect-square rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105 border-2 border-white"
                    style={{ 
                      backgroundColor: color.hex,
                      border: localSelectedColor === color.hex ? '4px solid #9B59B6' : 'none',
                      boxShadow: localSelectedColor === color.hex ? '0 0 0 2px white, 0 0 0 4px #9B59B6' : 'none'
>>>>>>> f865efd25f2a7b9fe2838dcf38909f468ac7dd82
                    }}
                  />
                </div>
              ))}
            </div>
            {localSelectedColor && (
<<<<<<< HEAD
              <div className="mt-8 p-4 rounded-xl bg-gray-700/50 flex items-center justify-center gap-4">
                <div
                  className="w-12 h-12 rounded-lg border-2 border-purple-500/40"
                  style={{ backgroundColor: localSelectedColor }}
                />
                <span className="font-mono text-lg text-white">{localSelectedColor}</span>
              </div>
            )}
          </div>
        </div>
      )}
=======
              <div className="mt-6 sm:mt-8 p-4 rounded-lg bg-white/70 flex items-center justify-center gap-4">
                <div
                  className="w-12 h-12 rounded-full border-2 border-party-purple"
                  style={{ backgroundColor: localSelectedColor }}
                />
                <span className="font-mono text-lg text-party-purple">{localSelectedColor}</span>
              </div>
            )}
            <div className="mt-6 sm:mt-8 flex justify-center gap-4">
              <button
                onClick={() => setMode(null)}
                className="bg-white/80 text-party-purple px-6 py-3 rounded-full font-bold border border-purple-200 hover:bg-purple-50 hover:text-purple-700 shadow transition-all duration-300"
              >
                Back
              </button>
              <button
                onClick={onNext}
                disabled={!localSelectedColor}
                className="bg-gradient-to-r from-party-purple to-pink-400 text-party-purple px-6 py-3 rounded-full font-bold shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 border-2 border-white/40 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
      
>>>>>>> f865efd25f2a7b9fe2838dcf38909f468ac7dd82
    </div>
  );
};

export default Step1ImageUploadOrInspire;
