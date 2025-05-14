const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

async function request(endpoint, method = 'GET', data) {
  const config = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };
  if (data) {
    config.body = JSON.stringify(data);
  }
  const response = await fetch(`${API_BASE_URL}/api/${endpoint}`, config);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'API request failed');
  }
  return response.json();
}

export async function login(email, password) {
  return request('auth/login', 'POST', { email, password });
}

export async function register(name, email, password, userType) {
  return request('auth/register', 'POST', { name, email, password, userType });
}

export async function getProducts(params = {}) {
  const query = new URLSearchParams(params).toString();
  return request(`products?${query}`);
}

export async function getProduct(id) {
  return request(`products/${id}`);
}

export async function createOrder(orderData) {
  return request('orders', 'POST', orderData);
}

