import axios from 'axios';

const API_URL = 'https://balloon-backend.vercel.app/api';

export const findMatchingColors = async (color, threshold = 50) => {
  try {
    const response = await axios.get(`${API_URL}/color-match`, {
      params: {
        color,
        threshold
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error finding matching colors:', error);
    throw error;
  }
}; 