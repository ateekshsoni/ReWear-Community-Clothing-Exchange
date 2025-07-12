/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import BrandSection from "../components/common/BrandSection";
import LoginForm from "../components/forms/LoginForm";
import "../styles/Login.css";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const showNotification = (message, type) => {
    // Simple notification - in a real app, you'd use a proper notification library
    alert(message);
  };

  const handleLogin = async (formData) => {
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

  const features = [
    { icon: "fas fa-exchange-alt", text: "Smart Swapping" },
    { icon: "fas fa-leaf", text: "Eco-Friendly" },
    { icon: "fas fa-users", text: "Community Driven" }
  ];

  return (
    <Layout showHeader={false} showFooter={false}>
      <div className="container">
        <div className="login-wrapper">
          {/* Left side - Branding */}
          <BrandSection
            title="Sustainable Fashion Revolution"
            subtitle="Join thousands of fashion lovers making a positive impact on the planet through conscious clothing choices."
            features={features}
          />

          {/* Right side - Login Form */}
          <div className="form-section">
            <div className="form-content">
              <div className="form-header">
                <h2>Welcome Back</h2>
                <p>Sign in to your ReWear account</p>
              </div>

              <LoginForm onSubmit={handleLogin} isLoading={isLoading} />

              <div className="signup-link">
                <p>
                  Don't have an account?{" "}
                  <Link to="/signup">Sign up here</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
