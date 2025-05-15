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
  const [magnifierVisible, setMagnifierVisible] = useState(false);
  const [magnifierPos, setMagnifierPos] = useState({ x: 0, y: 0 });
  const [magnifierColor, setMagnifierColor] = useState('#ffffff');
  const [hoveredColor, setHoveredColor] = useState('#ffffff');
  const [secondColor, setSecondColor] = useState(null);
  const [selectingSecond, setSelectingSecond] = useState(false);
  const [balloons, setBalloons] = useState([]);
  const [closestBalloons, setClosestBalloons] = useState([]);

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
    setSelectedColor(hoveredColor);
    setLocalSelectedColor(hoveredColor);
    setMessage(`Selected color: ${hoveredColor}`);
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

  // Fetch balloons from backend
  useEffect(() => {
    fetch('/api/auth/products')
      .then(res => res.json())
      .then(data => {
        // Map backend fields to frontend fields
        const mapped = data.map(item => ({
          _id: item._id,
          brand: item.brand,
          color: item.singleColour,
          hex: item.singleHex,
          image: item.balloonImage
        }));
        setBalloons(mapped);
      })
      .catch(err => setBalloons([]));
  }, []);

  // Helper: hex to rgb
  function hexToRgbArr(hex) {
    hex = hex.replace('#', '');
    if (hex.length === 3) hex = hex.split('').map(x => x + x).join('');
    const num = parseInt(hex, 16);
    return [num >> 16, (num >> 8) & 255, num & 255];
  }
  function colorDistance(rgb1, rgb2) {
    return Math.sqrt(
      Math.pow(rgb1[0] - rgb2[0], 2) +
      Math.pow(rgb1[1] - rgb2[1], 2) +
      Math.pow(rgb1[2] - rgb2[2], 2)
    );
  }
  // Find closest balloons by brand when color is selected
  useEffect(() => {
    if (!localSelectedColor || balloons.length === 0) {
      setClosestBalloons([]);
      return;
    }
    const selectedRgb = hexToRgbArr(localSelectedColor);
    const grouped = {};
    balloons.forEach(balloon => {
      if (!balloon.brand) return;
      if (!grouped[balloon.brand]) grouped[balloon.brand] = [];
      grouped[balloon.brand].push(balloon);
    });
    const closest = [];
    Object.entries(grouped).forEach(([brand, arr]) => {
      let minDist = Infinity;
      let best = null;
      arr.forEach(balloon => {
        if (!balloon.hex) return;
        const balloonRgb = hexToRgbArr(balloon.hex);
        const dist = colorDistance(selectedRgb, balloonRgb);
        if (dist < minDist) {
          minDist = dist;
          best = balloon;
        }
      });
      if (best) closest.push(best);
    });
    setClosestBalloons(closest);
  }, [localSelectedColor, balloons]);

  // Magnifier settings
  const MAGNIFIER_SIZE = 100;
  const MAGNIFIER_ZOOM = 3;

  const handleCanvasMouseMove = (e) => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;
    setMagnifierPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    // Get color under cursor
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(Math.floor(x), Math.floor(y), 1, 1).data;
    const hex = rgbToHex(imageData[0], imageData[1], imageData[2]);
    setMagnifierColor(hex);
    setHoveredColor(hex);
  };

  const handleCanvasMouseEnter = () => setMagnifierVisible(true);
  const handleCanvasMouseLeave = () => setMagnifierVisible(false);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 md:p-12 lg:p-16 min-h-[80vh]">
        <div className="w-full max-w-4xl mx-auto bg-gray-800/80 backdrop-blur-lg rounded-3xl shadow-2xl p-6 sm:p-10 border border-purple-500/20">
          <div className="mb-6 text-2xl font-bold text-white">Main Colour Blending Tool</div>
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
                <div className="flex items-center gap-2">
                  <div className="relative w-64 h-64">
                    <img
                      src={imageSrc}
                      alt="Uploaded"
                      className="w-64 h-64 object-cover rounded-xl border border-purple-200 mb-2 absolute top-0 left-0 z-0"
                    />
                    <canvas
                      ref={canvasRef}
                      onClick={selectingSecond ? (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (!imageSrc) return;
                        setSecondColor(hoveredColor);
                        setSelectingSecond(false);
                        setMessage(`Second color selected: ${hoveredColor}`);
                      } : handleImageClick}
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
                            // Calculate source area for magnifier
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
                  {/* + button for second color */}
                  <button
                    type="button"
                    className="ml-2 w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xl font-bold shadow border-2 border-purple-500/40 hover:scale-110 transition"
                    title="Select second color"
                    onClick={() => setSelectingSecond(true)}
                    disabled={selectingSecond}
                  >
                    +
                  </button>
                </div>
              )}
              {/* Unified color box below image/canvas, themed */}
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
              {/* Second color box, if selected */}
              {secondColor && (
                <div className="mt-2 flex flex-col items-center z-20">
                  <div className="flex items-center gap-2 bg-gray-800/80 border border-pink-400 rounded-lg px-4 py-2 shadow" style={{ width: 'max-content' }}>
                    <span className="w-6 h-6 rounded-full border-2 border-pink-400" style={{ backgroundColor: secondColor }}></span>
                    <span className="font-mono text-base text-white">{secondColor}</span>
                  </div>
                  <div className="text-xs font-mono text-pink-200 mt-1">
                    RGB: {hexToRgb(secondColor)}
                  </div>
                </div>
              )}
            </div>
            {/* Right: Instructions and Logo */}
            <div className="flex-1 flex flex-col items-center md:items-start bg-gray-800/80 backdrop-blur-lg rounded-3xl shadow-2xl p-6 border border-purple-500/20 min-h-[300px]">
              <img src="/logo192.png" alt="Logo" className="w-16 h-16 mb-4" />
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
                  <span className="text-white font-semibold">Drag the circle to pick a colour</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full px-3 py-1 text-sm font-bold shadow">3</span>
                  <button
                    onClick={() => setShowResultLayout(true)}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg font-bold shadow-xl border-2 border-purple-500/40 hover:scale-105 hover:shadow-2xl transition"
                    disabled={!localSelectedColor}
                  >
                    Click to find match
                  </button>
                </div>
              </div>
              <div className="mt-4 text-xs text-gray-300">
                Balloon Colour Blending will provide a suggested or nearest swatch colour match to the uploaded image. The colour match cannot be guaranteed and will depend on the quality and shading of the image and the device used to upload.
              </div>
            </div>
          </div>
          {/* Brand color cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mt-8">
            {closestBalloons.map((balloon) => (
              <div key={balloon._id || balloon.id || balloon.hex + balloon.brand} className="flex flex-col items-center bg-gray-900/60 rounded-xl p-3 shadow border border-purple-500/20">
                <div className="mb-2 text-base font-bold text-purple-200 capitalize">{balloon.brand}</div>
                {balloon.image ? (
                  <img src={balloon.image} alt={balloon.color} className="w-12 h-12 rounded-full border-2 border-purple-200 mb-2 object-cover" />
                ) : (
                  <div className="w-12 h-12 rounded-full border-2 border-purple-200 mb-2" style={{ backgroundColor: balloon.hex }} />
                )}
                <div className="text-xs text-gray-200 font-semibold">{balloon.color}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step1ImageUploadOrInspire;
