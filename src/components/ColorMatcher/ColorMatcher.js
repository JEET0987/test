import React, { useState } from 'react';
import { ChromePicker } from 'react-color';
import { findMatchingColors } from '../../api/colorMatching';

const ColorMatcher = ({ onColorSelect }) => {
  const [selectedColor, setSelectedColor] = useState('#ffffff');
  const [matchingColors, setMatchingColors] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleColorChange = (color) => {
    setSelectedColor(color.hex);
    setMatchingColors({});
    setError(null);
  };

  const handleFindMatches = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await findMatchingColors(selectedColor);
      setMatchingColors(response.matches);
    } catch (err) {
      setError('Failed to find matching colors. Please try again.');
      console.error('Error finding matches:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleColorSelect = (product) => {
    onColorSelect(product);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4">
        <ChromePicker
          color={selectedColor}
          onChange={handleColorChange}
          disableAlpha={true}
        />
      </div>

      <button
        onClick={handleFindMatches}
        disabled={loading}
        className="px-4 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:bg-gray-600"
      >
        {loading ? 'Finding matches...' : 'Find matching balloons'}
      </button>

      {error && (
        <div className="mt-4 text-red-500 text-center">{error}</div>
      )}

      {Object.keys(matchingColors).length > 0 && (
        <div className="mt-6 w-full">
          <h3 className="text-xl font-semibold text-white mb-4">Matching Balloons</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.entries(matchingColors).map(([color, product]) => (
              <div
                key={color}
                onClick={() => handleColorSelect(product)}
                className="bg-gray-800/80 rounded-lg p-4 border border-purple-500/20 cursor-pointer hover:bg-gray-700/80 transition-colors"
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
  );
};

export default ColorMatcher; 