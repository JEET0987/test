import React, { useState, useRef, useEffect } from 'react';
import { findMatchingColors } from '../api/colorMatching';
import { useNavigate } from 'react-router-dom';
import ColorMatcher from './ColorMatcher';

const Step1ImageUploadOrInspire = ({ selectedColor, setSelectedColor, onNext }) => {
  const navigate = useNavigate();
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
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeTab, setActiveTab] = useState('upload'); // 'upload' or 'picker'

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
        setShowMatches(true);
      } catch (error) {
        console.error('Error finding matches:', error);
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
        setShowMatches(false);
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
    setShowMatches(false);
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

  const handleNext = () => {
    navigate('/suggested-balloons', { state: { matchingBalloons } });
  };

  const handleColorSelect = (product) => {
    setSelectedColor(product.singleHex);
    setLocalSelectedColor(product.singleHex);
    setMatchingBalloons({ [product.singleHex]: product });
    setShowMatches(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 md:p-12 lg:p-16 min-h-[80vh]">
        <div className="w-full max-w-4xl mx-auto bg-gray-800/80 backdrop-blur-lg rounded-3xl shadow-2xl p-6 sm:p-10 border border-purple-500/20">
          <div className="mb-6 text-2xl font-bold text-white">Balloon Colour Blending Tool</div>
          
          {/* Tab Navigation */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setActiveTab('upload')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'upload'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Upload Image
            </button>
            <button
              onClick={() => setActiveTab('picker')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'picker'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Color Picker
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-8 items-start justify-center">
            {activeTab === 'upload' ? (
              <div className="flex flex-col items-center w-full md:w-1/2">
                {!imageSrc ? (
                  <div className="flex flex-col items-center">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="w-64 h-64 flex flex-col items-center justify-center border-2 border-dashed border-purple-400 rounded-2xl bg-gray-900/60 hover:bg-purple-900/40 transition-colors text-purple-200 text-lg font-semibold mb-4"
                    >
                      <span className="text-4xl mb-2">📤</span>
                      1. Click to upload image
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        ref={fileInputRef}
                      />
                    </button>
                    <p className="text-purple-200 text-sm text-center max-w-md">
                      Balloon Colour Blending will provide a suggested or nearest stock colour match to the uploaded image. 
                      The colour match cannot be guaranteed and will depend on the quality and shading of the image and the device used to upload it.
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
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
                    <div className="mt-4 text-purple-200 text-center">
                      2. Drag the circle to pick a colour
                    </div>
                    {localSelectedColor && (
                      <button
                        onClick={handleFindMatches}
                        disabled={isAnalyzing}
                        className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:bg-gray-600"
                      >
                        3. {isAnalyzing ? 'Finding matches...' : 'Click to find match'}
                      </button>
                    )}
                  </div>
                )}
                
                <div className="mt-4 flex flex-col items-center z-20">
                  <div className="flex items-center gap-2 bg-gray-800/80 border border-purple-500/20 rounded-lg px-4 py-2 shadow" style={{ width: 'max-content' }}>
                    <span className="w-6 h-6 rounded-full border-2 border-purple-200" style={{ backgroundColor: magnifierVisible ? hoveredColor : localSelectedColor }}></span>
                    <span className="font-mono text-base text-white">{magnifierVisible ? hoveredColor : localSelectedColor}</span>
                  </div>
                  <div className="text-xs font-mono text-purple-200 mt-1">
                    RGB: {magnifierVisible ? hexToRgb(hoveredColor) : localSelectedColor ? hexToRgb(localSelectedColor) : ''}
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full md:w-1/2">
                <ColorMatcher onColorSelect={handleColorSelect} />
              </div>
            )}

            <div className="w-full md:w-1/2">
              {showMatches && (
                <div className="bg-gray-900/60 rounded-xl p-4 border border-purple-500/20">
                  <h3 className="text-xl font-semibold text-white mb-4">Matching Balloons</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {Object.entries(matchingBalloons).map(([color, product]) => (
                      <div
                        key={color}
                        className="bg-gray-800/80 rounded-lg p-4 border border-purple-500/20"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div
                            className="w-8 h-8 rounded-full border-2 border-purple-200"
                            style={{ backgroundColor: color }}
                          />
                          <div>
                            <div className="text-white font-semibold">{product.singleColour}</div>
                            <div className="text-purple-200 text-sm">{product.brand}</div>
                          </div>
                        </div>
                        {product.balloonImage && (
                          <img
                            src={product.balloonImage}
                            alt={product.singleColour}
                            className="w-full h-32 object-contain rounded-lg mt-2"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {showMatches && (
            <div className="mt-8 flex justify-end">
              <button
                onClick={handleNext}
                className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors"
              >
                Next Step
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Step1ImageUploadOrInspire;
