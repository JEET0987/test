import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
// import Header from './Header';
// import Footer from './Footer';
import { Link } from 'react-router-dom';

function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'retail'  // default value
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await register(formData);
      navigate('/login');
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* <Header /> */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-8 lg:p-10 min-h-[80vh]">
        <div className="bg-gray-800/80 backdrop-blur-lg rounded-3xl shadow-2xl p-10 max-w-lg w-full text-center border border-purple-500/20">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-6 drop-shadow-[0_2px_8px_rgba(80,0,80,0.15)]">
            Register
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Join our community of balloon enthusiasts
          </p>
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-left text-gray-300 mb-2">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-purple-500/20 focus:ring-2 focus:ring-purple-500 focus:outline-none text-lg text-white bg-gray-700/80 shadow"
                placeholder="Choose a username"
              />
            </div>
            <div>
              <label className="block text-left text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-purple-500/20 focus:ring-2 focus:ring-purple-500 focus:outline-none text-lg text-white bg-gray-700/80 shadow"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-left text-gray-300 mb-2">
                User Type
              </label>
              <select
                name="userType"
                value={formData.userType}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-purple-500/20 focus:ring-2 focus:ring-purple-500 focus:outline-none text-lg text-white bg-gray-700/80 shadow"
              >
                <option value="retail">Retail</option>
                <option value="wholesale">Wholesale</option>
              </select>
            </div>
            <div>
              <label className="block text-left text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-purple-500/20 focus:ring-2 focus:ring-purple-500 focus:outline-none text-lg text-white bg-gray-700/80 shadow"
                placeholder="Create a password"
              />
            </div>
            <div>
              <label className="block text-left text-gray-300 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-purple-500/20 focus:ring-2 focus:ring-purple-500 focus:outline-none text-lg text-white bg-gray-700/80 shadow"
                placeholder="Confirm your password"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 border-2 border-purple-500/40 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating account...' : 'Create account'}
            </button>
          </form>
          <p className="mt-6 text-gray-300">
            Already have an account?{' '}
            <Link to="/login" className="text-purple-400 hover:text-purple-300 font-semibold">
              Login
            </Link>
          </p>
        </div>
      </div>
      
    </div>
  );
}

export default RegisterPage;

