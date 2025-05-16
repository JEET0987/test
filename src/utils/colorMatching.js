import balloonColors from '../data/balloon-colors.json';

// Convert hex to RGB
const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

// Calculate color distance using RGB space
const calculateColorDistance = (color1, color2) => {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);
  
  if (!rgb1 || !rgb2) return Infinity;
  
  // Euclidean distance in RGB space
  return Math.sqrt(
    Math.pow(rgb1.r - rgb2.r, 2) +
    Math.pow(rgb1.g - rgb2.g, 2) +
    Math.pow(rgb1.b - rgb2.b, 2)
  );
};

// Find matching colors
export const findMatchingColors = (selectedColor, threshold = 50) => {
  if (!selectedColor) return {};

  const matches = balloonColors
    .map(color => ({
      ...color,
      distance: calculateColorDistance(selectedColor, color["Single Hex"])
    }))
    .filter(match => match.distance <= threshold)
    .sort((a, b) => a.distance - b.distance);

  // Keep only the nearest match per brand
  const matchesByBrand = {};
  for (const match of matches) {
    const brand = match.Brand;
    if (!matchesByBrand[brand] || match.distance < matchesByBrand[brand].distance) {
      matchesByBrand[brand] = match;
    }
  }
  return matchesByBrand;
};

// Get color name from hex
export const getColorName = (hex) => {
  const match = balloonColors.find(color => color["Single Hex"].toLowerCase() === hex.toLowerCase());
  return match ? match["Single Colour "] : 'Unknown';
}; 