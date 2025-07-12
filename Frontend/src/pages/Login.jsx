// 🔐 Login Page Component
// User authentication page converted from HTML to React

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../hooks/useAuth';
import '../login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login({
        email: formData.email,
        password: formData.password
      });
      
      toast.success('Welcome back! Redirecting to your dashboard...');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="login-wrapper">
        {/* Left side - Branding */}
        <div className="brand-section">
          <div className="brand-content">
            <div className="logo">
              <i className="fas fa-recycle"></i>
              <span>ReWear</span>
            </div>
            <h1>Sustainable Fashion Revolution</h1>
            <p>
              Join thousands of fashion lovers making a positive impact on the 
              planet through conscious clothing choices.
            </p>
            <div className="features">
              <div className="feature">
                <i className="fas fa-exchange-alt"></i>
                <span>Smart Swapping</span>
              </div>
              <div className="feature">
                <i className="fas fa-leaf"></i>
                <span>Eco-Friendly</span>
              </div>
              <div className="feature">
                <i className="fas fa-users"></i>
                <span>Community Driven</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Login Form */}
        <div className="form-section">
          <div className="form-container">
            <div className="form-header">
              <h2>Welcome Back to ReWear</h2>
              <p>
                Continue your sustainable fashion journey. Log in to check your 
                swaps, browse new arrivals, and manage your listings.
              </p>
            </div>

            <form className="login-form" onSubmit={handleSubmit}>
              <div className="input-group">
                <label htmlFor="email">Email Address</label>
                <div className="input-wrapper">
                  <i className="fas fa-envelope"></i>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="input-group">
                <label htmlFor="password">Password</label>
                <div className="input-wrapper">
                  <i className="fas fa-lock"></i>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={togglePassword}
                  >
                    <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                  </button>
                </div>
              </div>

              <div className="form-options">
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    id="remember"
                    name="remember"
                    checked={formData.remember}
                    onChange={handleInputChange}
                  />
                  <span className="checkmark"></span>
                  Remember me
                </label>
                <a href="#" className="forgot-password">Forgot Password?</a>
              </div>

              <button 
                type="submit" 
                className="login-btn"
                disabled={loading}
              >
                <span>{loading ? 'Signing In...' : 'Sign In'}</span>
                <i className="fas fa-arrow-right"></i>
              </button>

              <div className="divider">
                <span>or continue with</span>
              </div>

              <div className="social-login">
                <button type="button" className="social-btn google">
                  <i className="fab fa-google"></i>
                  <span>Google</span>
                </button>
                <button type="button" className="social-btn facebook">
                  <i className="fab fa-facebook-f"></i>
                  <span>Facebook</span>
                </button>
              </div>

              <div className="signup-link">
                <p>
                  New to ReWear? <Link to="/signup">Create an account</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
