/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const showNotification = (message, type) => {
    // Simple notification - in a real app, you'd use a proper notification library
    alert(message);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      showNotification("Please fill in all fields", "error");
      return;
    }

    if (!isValidEmail(formData.email)) {
      showNotification("Please enter a valid email address", "error");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      showNotification("Login successful! Redirecting...", "success");

      // Simulate redirect after successful login
      setTimeout(() => {
        navigate("/item-detail");
      }, 1500);
    }, 2000);
  };

  const handleSocialLogin = (provider) => {
    console.log(`Logging in with ${provider}`);
    // Implement social login logic here
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
                    <i
                      className={`fas ${
                        showPassword ? "fa-eye-slash" : "fa-eye"
                      }`}
                    ></i>
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
                <a href="#" className="forgot-password">
                  Forgot Password?
                </a>
              </div>

              <button
                type="submit"
                className={`login-btn ${isLoading ? "loading" : ""}`}
              >
                <span>Sign In</span>
                <i className="fas fa-arrow-right"></i>
              </button>

              <div className="divider">
                <span>or continue with</span>
              </div>

              <div className="social-login">
                <button
                  type="button"
                  className="social-btn google"
                  onClick={() => handleSocialLogin("google")}
                >
                  <i className="fab fa-google"></i>
                  <span>Google</span>
                </button>
                <button
                  type="button"
                  className="social-btn facebook"
                  onClick={() => handleSocialLogin("facebook")}
                >
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
