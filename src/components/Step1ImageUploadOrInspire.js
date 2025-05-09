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

  const categories = ['All', 'Warm', 'Cool', 'Neutral'];

  useEffect(() => {
    if (selectedColor) {
      setMessage(`You selected color: ${selectedColor.hex || selectedColor}`);
    }
  }, [selectedColor]);

  const handleImageUpload = (file) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setImageSrc(ev.target.result);
        setSelectedColor(null);
        setMessage('');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleImageUpload(file);
  };

  const handleCanvasClick = (e) => {
    if (!imageRef.current || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = Math.floor((e.clientX - rect.left) * scaleX);
    const y = Math.floor((e.clientY - rect.top) * scaleY);
    const pixel = ctx.getImageData(x, y, 1, 1).data;
    const hex = rgbToHex(pixel[0], pixel[1], pixel[2]);
    setSelectedColor({ hex });
    setMessage(`You selected color: ${hex}`);
  };

  const rgbToHex = (r, g, b) => {
    const toHex = (c) => {
      const hex = c.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };
    return '#' + toHex(r) + toHex(g) + toHex(b);
  };

  useEffect(() => {
    if (imageSrc && canvasRef.current && imageRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const img = imageRef.current;
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      ctx.drawImage(img, 0, 0);
    }
  }, [imageSrc]);

  const filteredColors = activeCategory === 'All' 
    ? inspirationColors 
    : inspirationColors.filter(color => color.category === activeCategory);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      {!mode && (
        <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-8 lg:p-12 bg-background min-h-[80vh]">
          <div className="bg-card rounded-lg border p-6 sm:p-10 max-w-xl w-full text-center shadow-sm">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-foreground tracking-tight">
              🎨 Event Color Match
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg mb-8">
              Find the perfect color theme for your next event!
            </p>
            <div className="flex justify-center gap-4 sm:gap-6 mb-8 flex-wrap">
              <button
                onClick={() => setMode('upload')}
                className="bg-primary text-primary-foreground px-6 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors focus-ring transform hover:scale-105"
              >
                📤 Upload an Image
              </button>
              <button
                onClick={() => setMode('inspire')}
                className="bg-secondary text-secondary-foreground px-6 py-3 rounded-md font-medium hover:bg-secondary/90 transition-colors focus-ring transform hover:scale-105"
              >
                ✨ Inspire Me
              </button>
            </div>
          </div>
        </div>
      )}

      {mode === 'upload' && (
        <div className="flex-1 flex items-center justify-center p-6 sm:p-8 lg:p-10 bg-background min-h-[80vh]">
          <div className={`bg-card p-8 sm:p-10 rounded-lg border w-full text-center shadow-sm ${selectedColor ? 'max-w-6xl' : 'max-w-2xl'}`}>
            <h1 className="text-3xl sm:text-4xl font-semibold text-foreground mb-6">Upload Your Image</h1>
            <p className="text-base sm:text-lg text-muted-foreground mb-8">
              Upload an image or drag and drop it here to extract colors
            </p>

            {!imageSrc ? (
              <div
                ref={dropZoneRef}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-lg p-12 transition-all duration-300 ${
                  isDragging ? 'border-primary bg-primary/5 scale-105' : 'border-input'
                }`}
              >
                <div className="flex flex-col items-center justify-center space-y-6">
                  <span className="text-6xl animate-bounce">📸</span>
                  <p className="text-lg text-muted-foreground">
                    Drag and drop your image here, or{' '}
                    <label htmlFor="image-upload" className="text-primary cursor-pointer hover:underline">
                      browse
                    </label>
                  </p>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e.target.files[0])}
                    className="hidden"
                  />
                  <p className="text-sm text-muted-foreground">
                    Supports JPG, PNG, GIF up to 10MB
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col lg:flex-row items-start justify-center space-x-0 lg:space-x-8 space-y-8 lg:space-y-0">
                <div className="w-full lg:w-3/4">
                  <div className="relative group">
                    <canvas
                      ref={canvasRef}
                      onClick={handleCanvasClick}
                      className="w-full h-auto max-h-[600px] object-contain rounded-lg border border-input cursor-crosshair transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                    <div className="absolute bottom-4 left-4 bg-background/80 backdrop-blur-sm px-4 py-2 rounded-md transform transition-all duration-300 group-hover:translate-y-[-4px]">
                      <p className="text-sm text-muted-foreground">Click anywhere to pick a color</p>
                    </div>
                    <img
                      ref={imageRef}
                      src={imageSrc}
                      alt="Uploaded"
                      className="hidden"
                      onLoad={() => {
                        if (canvasRef.current && imageRef.current) {
                          const canvas = canvasRef.current;
                          const ctx = canvas.getContext('2d');
                          const img = imageRef.current;
                          canvas.width = img.naturalWidth;
                          canvas.height = img.naturalHeight;
                          ctx.drawImage(img, 0, 0);
                        }
                      }}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-1/4 space-y-6">
                  {selectedColor && (
                    <div className="bg-background p-6 rounded-lg border transform transition-all duration-300 hover:shadow-lg">
                      <h3 className="text-lg font-medium text-foreground mb-4">Selected Color</h3>
                      <div className="flex items-center space-x-4">
                        <div
                          className="w-20 h-20 rounded-lg border border-input transform transition-transform duration-300 hover:scale-110"
                          style={{ backgroundColor: selectedColor.hex }}
                        />
                        <div className="text-left">
                          <p className="text-foreground font-medium">{selectedColor.hex}</p>
                          <p className="text-sm text-muted-foreground">Click the image to change</p>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="flex flex-col space-y-4">
                    <button
                      onClick={() => {
                        setImageSrc(null);
                        setSelectedColor(null);
                      }}
                      className="w-full bg-secondary text-secondary-foreground px-4 py-2 rounded-md font-medium hover:bg-secondary/90 transition-all duration-300 transform hover:scale-105 focus-ring"
                    >
                      Upload New Image
                    </button>
                    {selectedColor && (
                      <button
                        onClick={onNext}
                        className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 focus-ring"
                      >
                        Continue with Selected Color
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {mode === 'inspire' && (
        <div className="flex-1 flex items-center justify-center p-6 sm:p-8 lg:p-10 bg-background min-h-[80vh]">
          <div className="bg-card p-8 sm:p-10 rounded-lg border w-full max-w-6xl text-center shadow-sm">
            <h1 className="text-3xl sm:text-4xl font-semibold text-foreground mb-6">Get Inspired</h1>
            <p className="text-base sm:text-lg text-muted-foreground mb-8">
              Choose from our curated collection of beautiful colors
            </p>

            {/* Category Filter */}
            <div className="flex justify-center gap-4 mb-8 flex-wrap">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full transition-all duration-300 transform hover:scale-105 ${
                    activeCategory === category
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Color Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {filteredColors.map((color) => (
                <div
                  key={color.hex}
                  className="group relative"
                  onMouseEnter={() => setHoveredColor(color)}
                  onMouseLeave={() => setHoveredColor(null)}
                >
                  <button
                    onClick={() => {
                      setSelectedColor(color);
                      setHoveredColor(null);
                    }}
                    className={`w-full aspect-square rounded-lg border-2 transition-all duration-300 transform hover:scale-105 ${
                      selectedColor?.hex === color.hex
                        ? 'border-primary scale-105 ring-2 ring-primary ring-offset-2'
                        : 'border-input hover:border-primary/50'
                    }`}
                    style={{ backgroundColor: color.hex }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className={`bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium transition-opacity duration-300 ${
                      hoveredColor?.hex === color.hex ? 'opacity-100' : 'opacity-0'
                    }`}>
                      {color.name}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Color Preview */}
            {hoveredColor && (
              <div className="mt-8 p-6 bg-background rounded-lg border transform transition-all duration-300 animate-fade-in">
                <h3 className="text-xl font-medium text-foreground mb-4">
                  {hoveredColor.name} Preview
                </h3>
                <div className="flex flex-wrap gap-4 justify-center">
                  <div className="p-4 rounded-lg shadow-md" style={{ backgroundColor: hoveredColor.hex }}>
                    <span className="text-white font-mono text-sm">
                      {hoveredColor.hex}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-8 flex justify-center gap-4">
              <button
                onClick={() => setMode(null)}
                className="bg-secondary text-secondary-foreground px-6 py-3 rounded-md font-medium hover:bg-secondary/90 transition-all duration-300 transform hover:scale-105 focus-ring"
              >
                Back
              </button>
              {selectedColor && (
                <button
                  onClick={onNext}
                  className="bg-primary text-primary-foreground px-6 py-3 rounded-md font-medium hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 focus-ring"
                >
                  Continue with Selected Color
                </button>
              )}
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Step1ImageUploadOrInspire;
