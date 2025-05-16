import axios from 'axios';

const API_BASE_URL = 'https://balloon-backend.vercel.app/api';

export const findMatchingColors = async (selectedColor, threshold = 50) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/color-match`, {
      params: {
        color: selectedColor,
        threshold
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error finding matching colors:', error);
    throw error;
  }
}; 