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
  const [hoveredColor, setHoveredColor] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const canvasRef = useRef(null);
  const imageRef = useRef(null);
  const dropZoneRef = useRef(null);
  const fileInputRef = useRef(null);

  const categories = ['All', 'Warm', 'Cool', 'Neutral'];

  useEffect(() => {
    if (selectedColor) {
      setMessage(`You selected color: ${selectedColor.hex || selectedColor}`);
    }
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

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      {!mode && (
        <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12 bg-background min-h-[80vh]">
          <div className="responsive-card text-center">
            <h1 className="responsive-heading font-bold mb-4 sm:mb-6 text-foreground tracking-tight">
              🎨 Event Color Match
            </h1>
            <p className="responsive-text text-muted-foreground mb-6 sm:mb-8">
              Find the perfect color theme for your next event!
            </p>
            <div className="responsive-flex">
              <button
                onClick={() => setMode('upload')}
                className="responsive-button bg-primary text-primary-foreground hover:bg-primary/90"
              >
                📤 Upload an Image
              </button>
              <button
                onClick={() => setMode('inspire')}
                className="responsive-button bg-secondary text-secondary-foreground hover:bg-secondary/90"
              >
                ✨ Inspire Me
              </button>
            </div>
          </div>
        </div>
      )}

      {mode === 'upload' && (
        <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12 bg-background min-h-[80vh]">
          <div className="responsive-card">
            <h2 className="responsive-heading font-bold mb-4 sm:mb-6 text-foreground">
              Upload Your Image
            </h2>
            <div
              className={`border-2 border-dashed rounded-lg p-6 sm:p-8 text-center ${
                isDragging ? 'border-primary bg-primary/5' : 'border-input'
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
                  {selectedColor && (
                    <div className="mt-4 p-4 rounded-lg bg-background/50">
                      <div className="flex items-center justify-center gap-4">
                        <div
                          className="w-12 h-12 rounded-full border-2 border-input"
                          style={{ backgroundColor: selectedColor }}
                        />
                        <span className="font-mono text-lg">{selectedColor}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            {message && (
              <p className="mt-4 text-center text-muted-foreground">{message}</p>
            )}
            <div className="mt-6 sm:mt-8 flex justify-center gap-4">
              <button
                onClick={() => {
                  setMode(null);
                  setImageSrc(null);
                  setSelectedColor(null);
                }}
                className="responsive-button border-2 border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground"
              >
                Back
              </button>
              <button
                onClick={onNext}
                disabled={!selectedColor}
                className="responsive-button bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {mode === 'inspire' && (
        <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12 bg-background min-h-[80vh]">
          <div className="responsive-card">
            <h2 className="responsive-heading font-bold mb-4 sm:mb-6 text-foreground">
              Get Inspired
            </h2>
            <div className="mb-6 sm:mb-8">
              <div className="flex flex-wrap gap-2 justify-center">
                {['All', 'Warm', 'Cool', 'Neutral'].map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      activeCategory === category
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            <div className="responsive-grid">
              {filteredColors.map((color) => (
                <div
                  key={color.hex}
                  className="relative group"
                  onMouseEnter={() => setHoveredColor(color)}
                  onMouseLeave={() => setHoveredColor(null)}
                >
                  <button
                    onClick={() => {
                      setSelectedColor(color.hex);
                      setMessage(`Selected color: ${color.hex}`);
                    }}
                    className="w-full aspect-square rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105"
                    style={{ backgroundColor: color.hex }}
                  />
                  {hoveredColor === color && (
                    <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center text-white font-medium text-sm sm:text-base">
                      {color.name}
                    </div>
                  )}
                </div>
              ))}
            </div>
            {selectedColor && (
              <div className="mt-6 sm:mt-8 p-4 rounded-lg bg-background/50">
                <div className="flex items-center justify-center gap-4">
                  <div
                    className="w-12 h-12 rounded-full border-2 border-input"
                    style={{ backgroundColor: selectedColor }}
                  />
                  <span className="font-mono text-lg">{selectedColor}</span>
                </div>
              </div>
            )}
            <div className="mt-6 sm:mt-8 flex justify-center gap-4">
              <button
                onClick={() => setMode(null)}
                className="responsive-button border-2 border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground"
              >
                Back
              </button>
              <button
                onClick={onNext}
                disabled={!selectedColor}
                className="responsive-button bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Step1ImageUploadOrInspire;
