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
  const [showMatches, setShowMatches] = useState(false);

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
    // Keep original case from backend
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
            
            // Set canvas dimensions to match image
            canvas.width = img.width;
            canvas.height = img.height;
            
            // Draw image at full resolution
            ctx.drawImage(img, 0, 0);
            
            // Store the scale factor for later use
            canvas.dataset.scaleX = canvas.width / canvas.offsetWidth;
            canvas.dataset.scaleY = canvas.height / canvas.offsetHeight;
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
    console.log('Selecting color:', color);
    setLocalSelectedColor(color);
    setSelectedColor(color);
    setMessage(`Selected color: ${color}`);
  };

  // Update the color handling functions to work with both cases
  const normalizeHex = (hex) => {
    if (!hex) return '';
    // Just ensure # prefix is present, keep original case
    return hex.startsWith('#') ? hex : `#${hex}`;
  };

  const hexToRgb = (hex) => {
    const value = hex.replace('#', '');
    const bigint = parseInt(value, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `${r}, ${g}, ${b}`;
  };

  function hexToRgbArr(hex) {
    console.log('Converting hex to RGB:', hex);
    hex = hex.replace('#', '');
    if (hex.length === 3) hex = hex.split('').map(x => x + x).join('');
    const num = parseInt(hex, 16);
    const result = [num >> 16, (num >> 8) & 255, num & 255];
    console.log('RGB result:', result);
    return result;
  }

  // Update the handleCanvasMouseMove function to use uppercase hex
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

  // Fetch balloons from backend
  useEffect(() => {
    const fetchBalloons = async () => {
      try {
        console.log('Fetching balloons from Vercel...');
        const response = await fetch('https://balloon-backend.vercel.app/api/auth/products', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          mode: 'cors',
          credentials: 'include'
        });
        
        console.log('Response status:', response.status);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Raw balloon data sample:', data.slice(0, 2));
        
        if (!Array.isArray(data)) {
          throw new Error('Invalid data format received from server');
        }
        
        const mapped = data.map(item => {
          // Log any items with missing required fields
          if (!item.brand || !item.singleHex) {
            console.log('Item missing required fields:', item);
          }
          return {
            _id: item._id,
            brand: item.brand || 'Unknown',
            color: item.singleColour,
            hex: normalizeHex(item.singleHex),
            image: item.balloonImage,
            newColour: item.newColour,
            mixedColourTitle: item.mixedColourTitle,
            mixedHex: normalizeHex(item.mixedHex),
            outsideColour: item.outsideColour,
            outsideHex: normalizeHex(item.outsideHex),
            insideColour: item.insideColour,
            insideHex: normalizeHex(item.insideHex)
          };
        }).filter(item => item.hex && item.brand); // Filter out items with missing hex or brand
        
        console.log('Processed balloon data sample:', mapped.slice(0, 2));
        console.log('Total valid balloons:', mapped.length);
        setBalloons(mapped);
      } catch (error) {
        console.error('Error fetching balloons:', error);
        setMessage('Error loading balloon data. Please try again.');
        setBalloons([]);
      }
    };
    fetchBalloons();
  }, []);

  // Update the color distance calculation to work with both cases
  function colorDistance(rgb1, rgb2) {
    // Using weighted Euclidean distance for better color perception
    const rMean = (rgb1[0] + rgb2[0]) / 2;
    const r = rgb1[0] - rgb2[0];
    const g = rgb1[1] - rgb2[1];
    const b = rgb1[2] - rgb2[2];
    
    const weightR = 2 + rMean / 256;
    const weightG = 4;
    const weightB = 2 + (255 - rMean) / 256;
    
    const distance = Math.sqrt(
      weightR * r * r +
      weightG * g * g +
      weightB * b * b
    );
    
    console.log('Color distance calculation:', {
      rgb1,
      rgb2,
      distance
    });
    
    return distance;
  }

  // Update the findClosestBalloons function to work with both cases
  function findClosestBalloons(selectedHex) {
    console.log('Finding closest balloons for color:', selectedHex);
    if (!selectedHex || balloons.length === 0) {
      console.log('No selected color or no balloons available');
      return [];
    }
    
    const selectedRgb = hexToRgbArr(normalizeHex(selectedHex));
    console.log('Selected RGB:', selectedRgb);
    
    // Group balloons by brand
    const grouped = {};
    let validBalloons = 0;
    
    balloons.forEach(balloon => {
      if (!balloon.brand || !balloon.hex) {
        console.log('Invalid balloon data:', balloon);
        return;
      }
      validBalloons++;
      if (!grouped[balloon.brand]) grouped[balloon.brand] = [];
      grouped[balloon.brand].push(balloon);
    });
    
    console.log('Valid balloons processed:', validBalloons);
    console.log('Grouped balloons by brand:', Object.keys(grouped).length);
    console.log('Brands found:', Object.keys(grouped));
    
    const closest = [];
    Object.entries(grouped).forEach(([brand, arr]) => {
      let minDist = Infinity;
      let best = null;
      
      arr.forEach(balloon => {
        if (!balloon.hex) return;
        const balloonRgb = hexToRgbArr(normalizeHex(balloon.hex));
        const dist = colorDistance(selectedRgb, balloonRgb);
        if (dist < minDist) {
          minDist = dist;
          best = balloon;
        }
      });
      
      if (best) {
        console.log(`Best match for ${brand}:`, best.hex, 'Distance:', minDist);
        closest.push(best);
      }
    });
    
    // Sort by color distance
    closest.sort((a, b) => {
      const distA = colorDistance(selectedRgb, hexToRgbArr(normalizeHex(a.hex)));
      const distB = colorDistance(selectedRgb, hexToRgbArr(normalizeHex(b.hex)));
      return distA - distB;
    });
    
    console.log('Closest matches:', closest.length);
    return closest;
  }

  const handleFindMatch = async () => {
    try {
      console.log('Find Match clicked');
      console.log('Selected color:', localSelectedColor);
      console.log('Current balloons:', balloons);

      if (!localSelectedColor) {
        console.log('No color selected');
        setMessage('Please select a color first');
        return;
      }
      
      // If balloons are not loaded yet, try to fetch them
      if (balloons.length === 0) {
        console.log('Fetching balloons from Vercel...');
        const response = await fetch('https://balloon-backend.vercel.app/api/auth/products', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          mode: 'cors',
          credentials: 'include'
        });
        
        console.log('Response status:', response.status);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('API Response data:', data);
        
        if (!Array.isArray(data)) {
          throw new Error('Invalid data format received from server');
        }
        
        const mapped = data.map(item => ({
          _id: item._id,
          brand: item.brand,
          color: item.singleColour,
          hex: normalizeHex(item.singleHex),
          image: item.balloonImage,
          newColour: item.newColour,
          mixedColourTitle: item.mixedColourTitle,
          mixedHex: normalizeHex(item.mixedHex),
          outsideColour: item.outsideColour,
          outsideHex: normalizeHex(item.outsideHex),
          insideColour: item.insideColour,
          insideHex: normalizeHex(item.insideHex)
        }));
        console.log('Mapped balloons:', mapped);
        setBalloons(mapped);
      }
      
      console.log('Finding closest balloons...');
      const matches = findClosestBalloons(localSelectedColor);
      console.log('Found matches:', matches);
      
      setClosestBalloons(matches);
      setShowMatches(true);
      setMessage('Found matching balloons!');
    } catch (error) {
      console.error('Error finding matches:', error);
      setMessage('Error finding matches. Please try again.');
    }
  };

  // Magnifier settings
  const MAGNIFIER_SIZE = 100;
  const MAGNIFIER_ZOOM = 3;

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
                    onClick={handleFindMatch}
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
          {showMatches && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mt-8">
              {closestBalloons.map((balloon) => (
                <div key={balloon._id || balloon.id || balloon.hex + balloon.brand} className="flex flex-col items-center bg-gray-900/60 rounded-xl p-3 shadow border border-purple-500/20">
                  <div className="mb-2 text-base font-bold text-purple-200 capitalize">{balloon.brand}</div>
                  {balloon.image ? (
                    <img src={balloon.image} alt={balloon.color} className="w-12 h-12 rounded-full border-2 border-purple-200 mb-2 object-cover" />
                  ) : (
                    <div className="w-12 h-12 rounded-full border-2 border-purple-200 mb-2" style={{ backgroundColor: balloon.hex }} />
                  )}
                  <div className="text-xs text-gray-200 font-semibold">{balloon.newColour || balloon.color}</div>
                  <div className="text-xs text-gray-400 font-mono mt-1">{balloon.hex}</div>
                  {balloon.mixedColourTitle && (
                    <div className="text-xs text-gray-300 mt-1">
                      <span className="text-purple-300">Mixed:</span> {balloon.mixedColourTitle}
                    </div>
                  )}
                  {balloon.outsideColour && (
                    <div className="text-xs text-gray-300">
                      <span className="text-purple-300">Outside:</span> {balloon.outsideColour}
                    </div>
                  )}
                  {balloon.insideColour && (
                    <div className="text-xs text-gray-300">
                      <span className="text-purple-300">Inside:</span> {balloon.insideColour}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Step1ImageUploadOrInspire;