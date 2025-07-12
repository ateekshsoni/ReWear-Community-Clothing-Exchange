// 📝 SignUp Page Component
// User registration page converted from HTML to React

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../hooks/useAuth';
import '../signup-styles.css';

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false,
    newsletter: false
  });
  
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false
  });
  
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    text: 'Password strength'
  });
  
  const [passwordMatch, setPasswordMatch] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const togglePassword = (field) => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const checkPasswordStrength = (password) => {
    let score = 0;
    let text = 'Very weak';
    
    if (password.length >= 8) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    
    switch (score) {
      case 0:
      case 1:
        text = 'Very weak';
        break;
      case 2:
        text = 'Weak';
        break;
      case 3:
        text = 'Fair';
        break;
      case 4:
        text = 'Good';
        break;
      case 5:
        text = 'Strong';
        break;
      default:
        text = 'Very weak';
    }
    
    return { score, text };
  };

  const checkPasswordMatch = () => {
    if (formData.confirmPassword && formData.password !== formData.confirmPassword) {
      setPasswordMatch('Passwords do not match');
    } else if (formData.confirmPassword && formData.password === formData.confirmPassword) {
      setPasswordMatch('Passwords match');
    } else {
      setPasswordMatch('');
    }
  };

  useEffect(() => {
    if (formData.password) {
      const strength = checkPasswordStrength(formData.password);
      setPasswordStrength(strength);
    }
  }, [formData.password]);

  useEffect(() => {
    checkPasswordMatch();
  }, [formData.password, formData.confirmPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    if (!formData.terms) {
      toast.error('Please accept the Terms & Conditions');
      return;
    }

    setLoading(true);

    try {
      await register({
        name: formData.fullName,
        email: formData.email,
        password: formData.password
      });
      
      setShowSuccessModal(true);
    } catch (error) {
      toast.error(error.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setShowSuccessModal(false);
    navigate('/dashboard');
  };

  return (
    <>
      <div className="container">
        <div className="signup-wrapper">
          {/* Left side - Branding */}
          <div className="brand-section">
            <div className="brand-content">
              <div className="logo">
                <i className="fas fa-recycle"></i>
                <span>ReWear</span>
              </div>
              <h1>Join the ReWear Community</h1>
              <p>
                Ready to revolutionize your wardrobe while helping the planet? 
                Create your account and start swapping sustainable style today.
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
                <div className="feature">
                  <i className="fas fa-star"></i>
                  <span>Earn Points</span>
                </div>
              </div>
              <div className="stats">
                <div className="stat">
                  <span className="number">10K+</span>
                  <span className="label">Active Members</span>
                </div>
                <div className="stat">
                  <span className="number">50K+</span>
                  <span className="label">Items Swapped</span>
                </div>
                <div className="stat">
                  <span className="number">95%</span>
                  <span className="label">Satisfaction Rate</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Signup Form */}
          <div className="form-section">
            <div className="form-container">
              <div className="form-header">
                <h2>Create Your Account</h2>
                <p>Start your sustainable fashion journey with ReWear</p>
              </div>

              <form className="signup-form" onSubmit={handleSubmit}>
                <div className="input-group">
                  <label htmlFor="fullName">Full Name</label>
                  <div className="input-wrapper">
                    <i className="fas fa-user"></i>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

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
                      type={showPassword.password ? "text" : "password"}
                      id="password"
                      name="password"
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                    />
                    <button
                      type="button"
                      className="toggle-password"
                      onClick={() => togglePassword('password')}
                    >
                      <i className={`fas ${showPassword.password ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                    </button>
                  </div>
                  <div className="password-strength">
                    <div className="strength-bar">
                      <div 
                        className="strength-fill" 
                        style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                      ></div>
                    </div>
                    <span className="strength-text">{passwordStrength.text}</span>
                  </div>
                </div>

                <div className="input-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <div className="input-wrapper">
                    <i className="fas fa-lock"></i>
                    <input
                      type={showPassword.confirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                    />
                    <button
                      type="button"
                      className="toggle-password"
                      onClick={() => togglePassword('confirmPassword')}
                    >
                      <i className={`fas ${showPassword.confirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                    </button>
                  </div>
                  {passwordMatch && (
                    <div className={`password-match ${passwordMatch === 'Passwords match' ? 'success' : 'error'}`}>
                      {passwordMatch}
                    </div>
                  )}
                </div>

                <div className="form-options">
                  <label className="checkbox-container required-checkbox">
                    <input
                      type="checkbox"
                      id="terms"
                      name="terms"
                      checked={formData.terms}
                      onChange={handleInputChange}
                      required
                    />
                    <span className="checkmark"></span>
                    I agree to the <a href="#" className="link">Terms & Conditions</a> and <a href="#" className="link">Privacy Policy</a>
                  </label>
                  
                  <label className="checkbox-container">
                    <input
                      type="checkbox"
                      id="newsletter"
                      name="newsletter"
                      checked={formData.newsletter}
                      onChange={handleInputChange}
                    />
                    <span className="checkmark"></span>
                    Subscribe to ReWear newsletter for updates and eco-fashion tips
                  </label>
                </div>

                <button 
                  type="submit" 
                  className="signup-btn"
                  disabled={loading}
                >
                  <span>{loading ? 'Creating Account...' : 'Create Account'}</span>
                  <i className="fas fa-arrow-right"></i>
                </button>

                <div className="divider">
                  <span>or sign up with</span>
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

                <div className="login-link">
                  <p>Already have an account? <Link to="/login">Sign in</Link></p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <i className="fas fa-check-circle"></i>
              <h3>Welcome to ReWear!</h3>
            </div>
            <div className="modal-body">
              <p>
                Your account has been created successfully. Start by browsing our 
                collection or listing your first item to earn points.
              </p>
            </div>
            <div className="modal-footer">
              <button className="btn-primary" onClick={closeModal}>
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SignUp;
