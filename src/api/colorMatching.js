import { API_ENDPOINTS, makeApiRequest } from './config';

export const findMatchingColors = async (color) => {
  try {
    const response = await makeApiRequest(API_ENDPOINTS.COLOR_MATCH, {
      method: 'POST',
      body: JSON.stringify({
        targetColor: color
      })
    });

    if (!response || !response.matches) {
      throw new Error('Invalid response from server');
    }

    return { matches: response.matches };
  } catch (error) {
    console.error('Error finding matching colors:', error);
    throw error;
  }
}; 