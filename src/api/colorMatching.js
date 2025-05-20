import axios from 'axios';

const API_URL = 'https://balloon-backend.vercel.app/api/color-matching';

export const findMatchingColors = async (color) => {
  try {
    const response = await axios.post(`${API_URL}/match`, { targetColor: color });
    return response.data;
  } catch (error) {
    console.error('Error finding matching colors:', error);
    throw error;
  }
}; 