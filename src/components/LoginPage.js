import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
// import Header from './Header';
import Footer from './Footer';
<<<<<<< HEAD
import { Link } from 'react-router-dom';
=======
>>>>>>> f865efd25f2a7b9fe2838dcf38909f468ac7dd82

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await login(formData);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
<<<<<<< HEAD
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* <Header /> */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-8 lg:p-10 min-h-[80vh]">
        <div className="bg-gray-800/80 backdrop-blur-lg rounded-3xl shadow-2xl p-10 max-w-lg w-full text-center border border-purple-500/20">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-6 drop-shadow-[0_2px_8px_rgba(80,0,80,0.15)]">
            Login
          </h2>
=======
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50">
      {/* <Header /> */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-8 lg:p-10">
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-10 max-w-md w-full text-center border border-purple-100">
          <h2 className="text-4xl font-extrabold text-gray-900 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Welcome back
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Sign in to your account
          </p>
>>>>>>> f865efd25f2a7b9fe2838dcf38909f468ac7dd82
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
<<<<<<< HEAD
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-purple-500/20 focus:ring-2 focus:ring-purple-500 focus:outline-none text-lg text-white bg-gray-700/80 shadow"
                required
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-purple-500/20 focus:ring-2 focus:ring-purple-500 focus:outline-none text-lg text-white bg-gray-700/80 shadow"
                required
=======
              <label className="block text-left text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-purple-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-left text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-purple-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                placeholder="Enter your password"
>>>>>>> f865efd25f2a7b9fe2838dcf38909f468ac7dd82
              />
            </div>
            <button
              type="submit"
<<<<<<< HEAD
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 border-2 border-purple-500/40"
            >
              Login
            </button>
          </form>
          <p className="mt-6 text-gray-300">
            Don't have an account?{' '}
            <Link to="/register" className="text-purple-400 hover:text-purple-300 font-semibold">
              Register
            </Link>
=======
              disabled={loading}
              className="w-full bg-gradient-to-r from-party-purple to-pink-400 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 border-2 border-white/40 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
          <p className="mt-6 text-gray-600">
            Don't have an account?{' '}
            <button
              onClick={() => navigate('/register')}
              className="text-party-purple hover:text-purple-700 font-medium transition-colors"
            >
              Sign up
            </button>
>>>>>>> f865efd25f2a7b9fe2838dcf38909f468ac7dd82
          </p>
        </div>
      </div>
      
    </div>
  );
}

export default LoginPage;
