// 🔐 Login Page Component
// User authentication page with reusable components and enhanced UX

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';
import Loading from '../components/ui/Loading';
import SEO from '../components/common/SEO';
import { validateEmail, validateRequired, validateForm } from '../utils/validation';
import '../login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    
    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    // Clear errors on input change
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    const validationResult = validateForm(formData, {
      email: (value) => validateEmail(value),
      password: (value) => validateRequired(value, 'Password')
    });

    if (!validationResult.isValid) {
      setErrors(validationResult.errors);
      toast.error('Please fix the errors below');
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      await login({
        email: formData.email,
        password: formData.password,
      });

      toast.success("Welcome back! Redirecting to your dashboard...");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO 
        title="Login - ReWear Community"
        description="Log in to your ReWear account to continue your sustainable fashion journey. Access your swaps, listings, and eco-friendly community."
        keywords="login, signin, sustainable fashion, clothing exchange"
        canonicalUrl="/login"
      />
      
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
            <Card className="form-container">
              <div className="form-header">
                <h2>Welcome Back to ReWear</h2>
                <p>
                  Continue your sustainable fashion journey. Log in to check your
                  swaps, browse new arrivals, and manage your listings.
                </p>
              </div>

              {loading && <Loading text="Signing you in..." />}

              <form className="login-form" onSubmit={handleSubmit}>
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
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  error={errors.password}
                  icon="fas fa-lock"
                  showPasswordToggle
                  required
                />
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
                  <a href="#" className="forgot-password">
                    Forgot Password?
                  </a>
                </div>

                <Button 
                  type="submit" 
                  variant="primary"
                  size="large"
                  loading={loading}
                  disabled={loading}
                  className="login-btn"
                >
                  {loading ? "Signing In..." : "Sign In"}
                </Button>

                <div className="divider">
                  <span>or continue with</span>
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

                <div className="signup-link">
                  <p>
                    New to ReWear? <Link to="/signup">Create an account</Link>
                  </p>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
