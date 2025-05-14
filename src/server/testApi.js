const fetch = require('node-fetch');

const API_BASE = 'http://localhost:5000/api';

async function testAuth() {
  console.log('Testing Auth API...');
  try {
    // Register
    let res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'testuser@example.com', password: 'TestPass123', name: 'Test User' }),
    });
    let data = await res.json();
    console.log('Register response:', data);

    // Login
    res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'testuser@example.com', password: 'TestPass123' }),
    });
    data = await res.json();
    console.log('Login response:', data);

    return data.token;
  } catch (err) {
    console.error('Auth API test error:', err);
  }
}

async function runTests() {
  const token = await testAuth();
  if (!token) {
    console.error('Auth tests failed, aborting further tests.');
    return;
  }
  // Further tests for products, cart, orders can be added here using the token for auth
}

runTests();
