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
  const [imageSrc, setImageSrc] = useState(null);
  const [message, setMessage] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [localSelectedColor, setLocalSelectedColor] = useState(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const [magnifierVisible, setMagnifierVisible] = useState(false);
  const [magnifierPos, setMagnifierPos] = useState({ x: 0, y: 0 });
  const [magnifierColor, setMagnifierColor] = useState('#ffffff');
  const [hoveredColor, setHoveredColor] = useState('#ffffff');

  const categories = ['All', 'Warm', 'Cool', 'Neutral'];

  useEffect(() => {
    setLocalSelectedColor(selectedColor);
  }, [selectedColor]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            setImageSrc(e.target.result);
            setSelectedColor(null);
            setMessage('Image uploaded successfully! Click on the image to select a color.');
          } catch (error) {
            console.error('Error setting image source:', error);
            setMessage('Error processing image. Please try another image.');
          }
        };
        reader.onerror = () => {
          setMessage('Error reading file. Please try another image.');
        };
        reader.readAsDataURL(file);
      } catch (error) {
        console.error('Error in handleImageUpload:', error);
        setMessage('Error uploading image. Please try again.');
      }
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
    try {
      e.preventDefault();
      e.stopPropagation();
      if (!imageSrc || !canvasRef.current) return;
      
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      const x = (e.clientX - rect.left) * scaleX;
      const y = (e.clientY - rect.top) * scaleY;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      const imageData = ctx.getImageData(Math.floor(x), Math.floor(y), 1, 1).data;
      const hex = rgbToHex(imageData[0], imageData[1], imageData[2]);
      
      setSelectedColor(hex);
      setLocalSelectedColor(hex);
      setMessage(`Selected color: ${hex}`);
    } catch (error) {
      console.error('Error in handleImageClick:', error);
      setMessage('Error selecting color. Please try again.');
    }
  };

  const rgbToHex = (r, g, b) => {
    return '#' + [r, g, b].map(x => {
      const hex = x.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    }).join('');
  };

  useEffect(() => {
    if (imageSrc && canvasRef.current) {
      try {
        const img = new Image();
        img.onload = () => {
          try {
            const canvas = canvasRef.current;
            if (!canvas) return;
            
            const ctx = canvas.getContext('2d');
            if (!ctx) {
              console.error('Could not get canvas context');
              return;
            }
            
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
          } catch (error) {
            console.error('Error in canvas drawing:', error);
            setMessage('Error processing image. Please try another image.');
          }
        };
        img.onerror = () => {
          console.error('Error loading image');
          setMessage('Error loading image. Please try another image.');
        };
        img.src = imageSrc;
      } catch (error) {
        console.error('Error in image loading effect:', error);
        setMessage('Error processing image. Please try another image.');
      }
    }
  }, [imageSrc]);

  const filteredColors = activeCategory === 'All' 
    ? inspirationColors 
    : inspirationColors.filter(color => color.category === activeCategory);

  const handleColorSelect = (color) => {
    setLocalSelectedColor(color);
    setSelectedColor(color);
    setMessage(`Selected color: ${color}`);
  };

  const hexToRgb = (hex) => {
    const value = hex.replace('#', '');
    const bigint = parseInt(value, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `${r}, ${g}, ${b}`;
  };

  // Magnifier settings
  const MAGNIFIER_SIZE = 100;
  const MAGNIFIER_ZOOM = 3;

  const handleCanvasMouseMove = (e) => {
    try {
      if (!canvasRef.current) return;
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      
      const x = (e.clientX - rect.left) * scaleX;
      const y = (e.clientY - rect.top) * scaleY;
      
      setMagnifierPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      const imageData = ctx.getImageData(Math.floor(x), Math.floor(y), 1, 1).data;
      const hex = rgbToHex(imageData[0], imageData[1], imageData[2]);
      setMagnifierColor(hex);
      setHoveredColor(hex);
    } catch (error) {
      console.error('Error in handleCanvasMouseMove:', error);
    }
  };

  const handleCanvasMouseEnter = () => setMagnifierVisible(true);
  const handleCanvasMouseLeave = () => setMagnifierVisible(false);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 md:p-12 lg:p-16 min-h-[80vh]">
        <div className="w-full max-w-4xl mx-auto bg-gray-800/80 backdrop-blur-lg rounded-3xl shadow-2xl p-6 sm:p-10 border border-purple-500/20">
          <div className="mb-6 text-2xl font-bold text-white">Color Picker Tool</div>
          <div className="flex flex-col md:flex-row gap-8 items-start justify-center">
            {/* Left: Upload or Image */}
            <div className="flex flex-col items-center w-full md:w-1/2">
              {!imageSrc ? (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-64 h-64 flex flex-col items-center justify-center border-2 border-dashed border-purple-400 rounded-2xl bg-gray-900/60 hover:bg-purple-900/40 transition-colors text-purple-200 text-lg font-semibold mb-4"
                >
                  <span className="text-4xl mb-2">📤</span>
                  Click to upload image
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    ref={fileInputRef}
                  />
                </button>
              ) : (
                <div className="relative w-64 h-64">
                  <img
                    src={imageSrc}
                    alt="Uploaded"
                    className="w-64 h-64 object-cover rounded-xl border border-purple-200 mb-2 absolute top-0 left-0 z-0"
                  />
                  <canvas
                    ref={canvasRef}
                    onClick={handleImageClick}
                    onMouseMove={handleCanvasMouseMove}
                    onMouseEnter={handleCanvasMouseEnter}
                    onMouseLeave={handleCanvasMouseLeave}
                    width={256}
                    height={256}
                    className="w-64 h-64 rounded-xl cursor-crosshair absolute top-0 left-0 z-10"
                    style={{ pointerEvents: 'auto', background: 'transparent' }}
                  />
                  {magnifierVisible && (
                    <div
                      style={{
                        position: 'absolute',
                        left: Math.max(0, Math.min(magnifierPos.x + 20, 256 - MAGNIFIER_SIZE)),
                        top: Math.max(0, Math.min(magnifierPos.y - MAGNIFIER_SIZE / 2, 256 - MAGNIFIER_SIZE)),
                        width: MAGNIFIER_SIZE,
                        height: MAGNIFIER_SIZE,
                        pointerEvents: 'none',
                        border: '2px solid #a78bfa',
                        borderRadius: '50%',
                        overflow: 'hidden',
                        boxShadow: '0 2px 8px rgba(80,0,80,0.15)',
                        zIndex: 20,
                        background: '#fff',
                      }}
                    >
                      <canvas
                        width={MAGNIFIER_SIZE}
                        height={MAGNIFIER_SIZE}
                        ref={el => {
                          if (!el || !canvasRef.current) return;
                          const ctx = el.getContext('2d');
                          const mainCanvas = canvasRef.current;
                          const mainCtx = mainCanvas.getContext('2d');
                          const { x, y } = magnifierPos;
                          const scaleX = mainCanvas.width / 256;
                          const scaleY = mainCanvas.height / 256;
                          const sx = (x * scaleX) - MAGNIFIER_SIZE / (2 * MAGNIFIER_ZOOM);
                          const sy = (y * scaleY) - MAGNIFIER_SIZE / (2 * MAGNIFIER_ZOOM);
                          ctx.clearRect(0, 0, MAGNIFIER_SIZE, MAGNIFIER_SIZE);
                          ctx.save();
                          ctx.beginPath();
                          ctx.arc(MAGNIFIER_SIZE/2, MAGNIFIER_SIZE/2, MAGNIFIER_SIZE/2, 0, 2 * Math.PI);
                          ctx.clip();
                          ctx.drawImage(
                            mainCanvas,
                            sx,
                            sy,
                            MAGNIFIER_SIZE / MAGNIFIER_ZOOM,
                            MAGNIFIER_SIZE / MAGNIFIER_ZOOM,
                            0,
                            0,
                            MAGNIFIER_SIZE,
                            MAGNIFIER_SIZE
                          );
                          ctx.restore();
                        }}
                        style={{ width: MAGNIFIER_SIZE, height: MAGNIFIER_SIZE, display: 'block' }}
                      />
                      <div style={{
                        position: 'absolute',
                        bottom: 4,
                        left: 0,
                        width: '100%',
                        textAlign: 'center',
                        fontSize: 12,
                        color: '#333',
                        background: 'rgba(255,255,255,0.7)',
                        borderRadius: 8,
                        padding: '2px 0',
                      }}>{magnifierColor}</div>
                    </div>
                  )}
                </div>
              )}
              {/* Color display box */}
              {(magnifierVisible ? hoveredColor : localSelectedColor) && (
                <div className="mt-2 flex flex-col items-center z-20">
                  <div className="flex items-center gap-2 bg-gray-800/80 border border-purple-500/20 rounded-lg px-4 py-2 shadow" style={{ width: 'max-content' }}>
                    <span className="w-6 h-6 rounded-full border-2 border-purple-200" style={{ backgroundColor: magnifierVisible ? hoveredColor : localSelectedColor }}></span>
                    <span className="font-mono text-base text-white">{magnifierVisible ? hoveredColor : localSelectedColor}</span>
                  </div>
                  <div className="text-xs font-mono text-purple-200 mt-1">
                    RGB: {magnifierVisible ? hexToRgb(hoveredColor) : localSelectedColor ? hexToRgb(localSelectedColor) : ''}
                  </div>
                </div>
              )}
            </div>
            {/* Right: Instructions */}
            <div className="flex-1 flex flex-col items-center md:items-start bg-gray-800/80 backdrop-blur-lg rounded-3xl shadow-2xl p-6 border border-purple-500/20 min-h-[300px]">
              <div className="flex flex-col gap-3 w-full">
                <div className="flex items-center gap-2">
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full px-3 py-1 text-sm font-bold shadow">1</span>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg font-bold shadow-xl border-2 border-purple-500/40 hover:scale-105 hover:shadow-2xl transition focus:outline-none"
                  >
                    Click to upload image
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full px-3 py-1 text-sm font-bold shadow">2</span>
                  <span className="text-white font-semibold">Click on the image to select a color</span>
                </div>
              </div>
              <div className="mt-4 text-xs text-gray-300">
                The color picker will help you select colors from your uploaded image. Hover over the image to see a magnified view and click to select a color.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step1ImageUploadOrInspire;
