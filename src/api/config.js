const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://balloon-backend.vercel.app';

export const API_ENDPOINTS = {
  COLOR_MATCH: '/api/color-match',
  AUTH: {
    REGISTER: '/api/auth/register',
    LOGIN: '/api/auth/login',
  }
};

export const handleApiError = (error) => {
  console.error('API Error:', error);
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.error('Response data:', error.response.data);
    console.error('Response status:', error.response.status);
    throw new Error(error.response.data.message || 'API request failed');
  } else if (error.request) {
    // The request was made but no response was received
    console.error('No response received:', error.request);
    throw new Error('No response from server. Please check your internet connection.');
  } else {
    // Something happened in setting up the request that triggered an Error
    console.error('Error setting up request:', error.message);
    throw new Error('Failed to make request. Please try again.');
  }
};

export const makeApiRequest = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'API request failed');
    }

    return await response.json();
  } catch (error) {
    handleApiError(error);
  }
}; 