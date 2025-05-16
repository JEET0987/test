import React, { useState, useRef, useEffect } from 'react';
import { findMatchingColors } from '../api/colorMatching';

const Step1ImageUploadOrInspire = ({ selectedColor, setSelectedColor, onNext }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [localSelectedColor, setLocalSelectedColor] = useState(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const [magnifierVisible, setMagnifierVisible] = useState(false);
  const [magnifierPos, setMagnifierPos] = useState({ x: 0, y: 0 });
  const [magnifierColor, setMagnifierColor] = useState('#ffffff');
  const [hoveredColor, setHoveredColor] = useState('#ffffff');
  const [secondColor, setSecondColor] = useState(null);
  const [selectingSecond, setSelectingSecond] = useState(false);
  const [matchingBalloons, setMatchingBalloons] = useState({});
  const [showMatches, setShowMatches] = useState(false);
  const [colorAnalysis, setColorAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    setLocalSelectedColor(selectedColor);
    setShowMatches(false);
  }, [selectedColor]);

  const handleFindMatches = async () => {
    if (localSelectedColor) {
      try {
        setIsAnalyzing(true);
        const response = await findMatchingColors(localSelectedColor);
        
        if (!response || !response.matches) {
          throw new Error('Invalid response from server');
        }

        setMatchingBalloons(response.matches);
        setColorAnalysis(response.colorAnalysis);
        setShowMatches(true);
      } catch (error) {
        console.error('Error finding matches:', error);
        // You might want to show an error message to the user here
        setShowMatches(false);
      } finally {
        setIsAnalyzing(false);
      }
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target.result);
        setSelectedColor(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = (e) => {
    if (!imageSrc || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(Math.floor(x), Math.floor(y), 1, 1).data;
    const hex = rgbToHex(imageData[0], imageData[1], imageData[2]);

    setSelectedColor(hex);
    setLocalSelectedColor(hex);
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
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
      };
      img.src = imageSrc;
    }
  }, [imageSrc]);

  const handleCanvasMouseMove = (e) => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    setMagnifierPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });

    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(Math.floor(x), Math.floor(y), 1, 1).data;
    const hex = rgbToHex(imageData[0], imageData[1], imageData[2]);
    setMagnifierColor(hex);
    setHoveredColor(hex);
  };

  const MAGNIFIER_SIZE = 100;
  const MAGNIFIER_ZOOM = 3;

  const hexToRgb = (hex) => {
    const value = hex.replace('#', '');
    const bigint = parseInt(value, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `${r}, ${g}, ${b}`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 md:p-12 lg:p-16 min-h-[80vh]">
        <div className="w-full max-w-4xl mx-auto bg-gray-800/80 backdrop-blur-lg rounded-3xl shadow-2xl p-6 sm:p-10 border border-purple-500/20">
          <div className="mb-6 text-2xl font-bold text-white">Color Picker Tool</div>
          <div className="flex flex-col md:flex-row gap-8 items-start justify-center">
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
                  <canvas
                    ref={canvasRef}
                    onClick={selectingSecond ? (e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (!imageSrc) return;
                      setSecondColor(hoveredColor);
                      setSelectingSecond(false);
                    } : handleImageClick}
                    onMouseMove={handleCanvasMouseMove}
                    onMouseEnter={() => setMagnifierVisible(true)}
                    onMouseLeave={() => setMagnifierVisible(false)}
                    width={256}
                    height={256}
                    className="w-64 h-64 rounded-xl cursor-crosshair"
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
                      <div
                        style={{
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
                        }}
                      >
                        {magnifierColor}
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              <div className="mt-2 flex flex-col items-center z-20">
                <div className="flex items-center gap-2 bg-gray-800/80 border border-purple-500/20 rounded-lg px-4 py-2 shadow" style={{ width: 'max-content' }}>
                  <span className="w-6 h-6 rounded-full border-2 border-purple-200" style={{ backgroundColor: magnifierVisible ? hoveredColor : localSelectedColor }}></span>
                  <span className="font-mono text-base text-white">{magnifierVisible ? hoveredColor : localSelectedColor}</span>
                </div>
                <div className="text-xs font-mono text-purple-200 mt-1">
                  RGB: {magnifierVisible ? hexToRgb(hoveredColor) : localSelectedColor ? hexToRgb(localSelectedColor) : ''}
                </div>
              </div>

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

            <div className="flex flex-col items-center w-full md:w-1/2">
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
                  <span className="text-white font-semibold">Click on the image to pick a color</span>
                </div>
                {localSelectedColor && (
                  <button
                    className="mt-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-lg font-bold shadow-xl border-2 border-purple-500/40 hover:scale-105 hover:shadow-2xl transition focus:outline-none w-fit"
                    onClick={handleFindMatches}
                  >
                    Find Matching Balloons
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Color Analysis Section */}
          {colorAnalysis && (
            <div className="mt-8 bg-gray-800/80 backdrop-blur-lg rounded-xl p-6 border border-purple-500/20">
              <h3 className="text-xl font-bold text-white mb-4">Color Theory Analysis</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(colorAnalysis).map(([relationship, colors]) => (
                  <div key={relationship} className="bg-gray-700/50 rounded-xl p-4 border border-purple-500/20">
                    <h4 className="text-lg font-semibold text-purple-200 mb-3 capitalize">
                      {relationship.replace(/([A-Z])/g, ' $1').trim()}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {Array.isArray(colors) ? colors.map((color, index) => (
                        <div
                          key={index}
                          className="w-8 h-8 rounded-full border-2 border-purple-200"
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      )) : (
                        <div
                          className="w-8 h-8 rounded-full border-2 border-purple-200"
                          style={{ backgroundColor: colors }}
                          title={colors}
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Matching Balloons Section */}
          {showMatches && (
            <div className="mt-8">
              <h3 className="text-xl font-bold text-white mb-4">Nearest Matching Balloons</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(matchingBalloons).map(([brand, balloon]) => (
                  <div 
                    key={brand} 
                    className={`bg-gray-700/50 rounded-xl p-4 border ${
                      balloon.isSuggestedColor 
                        ? 'border-pink-500/40' 
                        : 'border-purple-500/20'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="text-lg font-semibold text-purple-200">{balloon["Brand"]}</h4>
                      {balloon.isSuggestedColor && (
                        <span className="text-xs bg-pink-500/20 text-pink-200 px-2 py-1 rounded-full">
                          AI Suggested
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col items-center">
                      <img
                        src={balloon["Balloon Image"]}
                        alt={balloon["Single Colour"]}
                        className="w-24 h-24 object-contain rounded-lg bg-white/10 p-2"
                      />
                      <span className="text-sm text-white mt-2">{balloon["Single Colour"]}</span>
                      <span className="text-xs text-purple-300 mt-1">Color: {balloon["New Colour"]}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Loading State */}
          {isAnalyzing && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
              <div className="bg-gray-800 rounded-xl p-6 border border-purple-500/20">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent mx-auto"></div>
                <p className="text-white mt-4 text-center">Analyzing colors with AI...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Step1ImageUploadOrInspire;
