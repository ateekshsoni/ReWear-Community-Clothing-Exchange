import React, { useState } from 'react';
import './LoginForm.css';

const LoginForm = ({ onSubmit, isLoading }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
    });
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!validateEmail(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            onSubmit(formData);
        }
    };

    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <div className="input-wrapper">
                    <i className="fas fa-envelope input-icon"></i>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={errors.email ? 'error' : ''}
                        placeholder="Enter your email"
                        autoComplete="email"
                    />
                </div>
                {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="input-wrapper">
                    <i className="fas fa-lock input-icon"></i>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className={errors.password ? 'error' : ''}
                        placeholder="Enter your password"
                        autoComplete="current-password"
                    />
                    <button
                        type="button"
                        className="password-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                        <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                    </button>
                </div>
                {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            <div className="form-options">
                <label className="checkbox-wrapper">
                    <input
                        type="checkbox"
                        name="rememberMe"
                        checked={formData.rememberMe}
                        onChange={handleInputChange}
                    />
                    <span className="checkmark"></span>
                    Remember me
                </label>
                <a href="#" className="forgot-password">Forgot Password?</a>
            </div>

            <button 
                type="submit" 
                className={`submit-btn ${isLoading ? 'loading' : ''}`}
                disabled={isLoading}
            >
                {isLoading ? (
                    <>
                        <i className="fas fa-spinner fa-spin"></i>
                        Signing In...
                    </>
                ) : (
                    <>
                        <i className="fas fa-sign-in-alt"></i>
                        Sign In
                    </>
                )}
            </button>

            <div className="social-login">
                <div className="divider">
                    <span>Or continue with</span>
                </div>
                <div className="social-buttons">
                    <button type="button" className="social-btn google">
                        <i className="fab fa-google"></i>
                        Google
                    </button>
                    <button type="button" className="social-btn facebook">
                        <i className="fab fa-facebook-f"></i>
                        Facebook
                    </button>
                </div>
            </div>
        </form>
    );
};

export default LoginForm;
