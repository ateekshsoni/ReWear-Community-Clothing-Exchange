// 📝 SignUp Page Component
// User registration page with reusable components and enhanced validation

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../hooks/useAuth';
import { validateForm, validatePassword, validateEmail, validateName } from '../utils/validation';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';
import Loading from '../components/ui/Loading';
import SEO from '../components/common/SEO';
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
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));

    // Real-time validation
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateField = (name, value) => {
    switch (name) {
      case 'fullName':
        return validateName(value);
      case 'email':
        return validateEmail(value);
      case 'password':
        return validatePassword(value);
      case 'confirmPassword':
        return value === formData.password ? '' : 'Passwords do not match';
      case 'terms':
        return value ? '' : 'You must accept the terms and conditions';
      default:
        return '';
    }
  };

  useEffect(() => {
    if (formData.confirmPassword && formData.password) {
      const error = validateField('confirmPassword', formData.confirmPassword);
      if (error !== errors.confirmPassword) {
        setErrors(prev => ({
          ...prev,
          confirmPassword: error
        }));
      }
    }
  }, [formData.password, formData.confirmPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const validationResult = validateForm(formData, {
      fullName: (value) => validateName(value),
      email: (value) => validateEmail(value),
      password: (value) => validatePassword(value),
      confirmPassword: (value) => value === formData.password ? '' : 'Passwords do not match',
      terms: (value) => value ? '' : 'You must accept the terms and conditions'
    });

    if (!validationResult.isValid) {
      setErrors(validationResult.errors);
      toast.error('Please fix the errors below');
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const { confirmPassword, terms, newsletter, ...registrationData } = formData;
      await register(registrationData);
      
      setShowSuccessModal(true);
      toast.success('Account created successfully!');
    } catch (error) {
      console.error('Registration error:', error);
      toast.error(error.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO 
        title="Sign Up - ReWear Community"
        description="Join ReWear's sustainable fashion community. Create your account to start swapping clothes and reducing fashion waste."
        keywords="signup, register, sustainable fashion, clothing exchange, eco-friendly"
        canonicalUrl="/signup"
      />
      
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
            <Card className="form-container">
              <div className="form-header">
                <h2>Create Your Account</h2>
                <p>Start your sustainable fashion journey with ReWear</p>
              </div>

              {loading && <Loading text="Creating your account..." />}

              <form className="signup-form" onSubmit={handleSubmit}>
                <Input
                  type="text"
                  name="fullName"
                  label="Full Name"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  error={errors.fullName}
                  icon="fas fa-user"
                  required
                />

                <Input
                  type="email"
                  name="email"
                  label="Email Address"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  error={errors.email}
                  icon="fas fa-envelope"
                  required
                />

                <Input
                  type="password"
                  name="password"
                  label="Password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleInputChange}
                  error={errors.password}
                  icon="fas fa-lock"
                  showPasswordToggle
                  required
                />

                <Input
                  type="password"
                  name="confirmPassword"
                  label="Confirm Password"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  error={errors.confirmPassword}
                  icon="fas fa-lock"
                  showPasswordToggle
                  required
                />
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
                    {errors.terms && <span className="error-text">{errors.terms}</span>}
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

                <Button 
                  type="submit" 
                  variant="primary"
                  size="large"
                  loading={loading}
                  disabled={loading}
                  className="signup-btn"
                >
                  {loading ? 'Creating Account...' : 'Create Account'}
                </Button>

                <div className="divider">
                  <span>or sign up with</span>
                </div>

                <div className="social-login">
                  <Button variant="outline" size="medium" className="social-btn google">
                    <i className="fab fa-google"></i>
                    <span>Google</span>
                  </Button>
                  <Button variant="outline" size="medium" className="social-btn facebook">
                    <i className="fab fa-facebook-f"></i>
                    <span>Facebook</span>
                  </Button>
                </div>

                <div className="login-link">
                  <p>Already have an account? <Link to="/login">Sign in</Link></p>
                </div>
              </form>
            </Card>
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
              <Button variant="primary" onClick={() => {
                setShowSuccessModal(false);
                navigate('/dashboard');
              }}>
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SignUp;
