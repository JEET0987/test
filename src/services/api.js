const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';
console.log('API_BASE_URL:', API_BASE_URL);

async function post(endpoint, data) {
  const response = await fetch(API_BASE_URL + endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'API request failed');
  }
  return response.json();
}

export const authService = {
  login: (credentials) => post('/api/auth/login', credentials),
  register: (userData) => post('/api/auth/register', userData),
};
