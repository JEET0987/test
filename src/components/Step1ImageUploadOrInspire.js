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
  const [showResultLayout, setShowResultLayout] = useState(false);

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

  // Helper to convert HEX to RGB
  const hexToRgb = (hex) => {
    const value = hex.replace('#', '');
    const bigint = parseInt(value, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `${r}, ${g}, ${b}`;
  };

  // Dummy brand data for demonstration
  const brands = [
    { name: 'prima', color: 'Sandy Beach', hex: '#c4bbae' },
    { name: 'kalisan', color: 'Stone', hex: '#b4b7b4' },
    { name: 'gemar', color: 'Macaron Salmon', hex: '#f5d7c7' },
    { name: 'tuftex', color: 'Stone', hex: '#b4bbae' },
    { name: 'balloonia', color: 'Gris/Grey', hex: '#bfc3c7' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 md:p-12 lg:p-16 min-h-[80vh]">
        <div className="w-full max-w-4xl mx-auto">
          {!showResultLayout && (
            <div className="mb-10 flex flex-col md:flex-row gap-8 items-center justify-center">
              <div className="flex flex-col items-center w-full md:w-1/2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  ref={fileInputRef}
                />
                <div
                  className="border-2 border-dashed border-purple-500/20 rounded-2xl p-10 text-center cursor-pointer hover:border-purple-500/40 transition-colors bg-gray-800/80 mb-6 w-full"
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
                        <div className="absolute bottom-4 left-4 bg-gray-900/90 backdrop-blur-sm px-4 py-2 rounded-lg text-sm text-gray-300">
                          Click anywhere to pick a color
                        </div>
                      </div>
                      {localSelectedColor && (
                        <div className="mt-6 p-4 rounded-xl bg-gray-900/70">
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
                {localSelectedColor && (
                  <button
                    onClick={() => setShowResultLayout(true)}
                    className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-semibold text-base shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 border border-purple-500/40"
                  >
                    OK
                  </button>
                )}
              </div>
            </div>
          )}
          {showResultLayout && (
            <div className="w-full bg-gray-800/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 sm:p-10 border border-purple-500/20">
              <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
                <div className="flex flex-col items-center">
                  {imageSrc && (
                    <img src={imageSrc} alt="Uploaded" className="w-48 h-48 object-cover rounded-xl border border-purple-500/40 mb-4" />
                  )}
                  {localSelectedColor && (
                    <div className="flex flex-col items-center mt-2">
                      <div className="w-10 h-10 rounded-full border-2 border-purple-500/40 mb-2" style={{ backgroundColor: localSelectedColor }} />
                      <div className="text-xs font-mono text-purple-200">HEX: {localSelectedColor}</div>
                      <div className="text-xs font-mono text-purple-200">RGB: {hexToRgb(localSelectedColor)}</div>
                    </div>
                  )}
                </div>
                <div className="flex-1 flex flex-col items-center md:items-start">
                  <div className="flex items-center mb-4">
                    <img src="/logo192.png" alt="Logo" className="w-10 h-10 mr-4" />
                    <span className="text-lg font-bold text-purple-200">Balloon Colour Blending</span>
                  </div>
                  <div className="bg-gray-900/80 rounded-2xl p-5 text-purple-100 text-left w-full border border-purple-500/10">
                    <div className="mb-2 font-semibold text-purple-400 text-xs">1. Click to upload image</div>
                    <div className="mb-2 font-semibold text-purple-400 text-xs">2. Drag the circle to pick a colour</div>
                    <div className="mb-2 font-semibold text-purple-400 text-xs">3. Click to find match</div>
                    <div className="mt-2 text-xs text-purple-200">Balloon Colour Blending will provide a suggested or nearest swatch colour match to the uploaded image. The colour match cannot be guaranteed and will depend on the quality and shading of the image and the device used to upload.</div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mt-6">
                {brands.map((brand) => (
                  <div key={brand.name} className="flex flex-col items-center bg-gray-900/80 rounded-xl p-3 shadow border border-purple-500/20">
                    <div className="mb-2 text-base font-bold text-purple-300 capitalize">{brand.name}</div>
                    <div className="w-10 h-10 rounded-full border-2 border-purple-500/40 mb-2" style={{ backgroundColor: brand.hex }} />
                    <div className="text-xs text-purple-100 font-semibold">{brand.color}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Step1ImageUploadOrInspire;
