import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Signup.css';

const Signup = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        terms: false,
        newsletter: false
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState({ strength: 0, feedback: [] });
    const [passwordMatch, setPasswordMatch] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const togglePassword = (field) => {
        if (field === 'password') {
            setShowPassword(!showPassword);
        } else if (field === 'confirmPassword') {
            setShowConfirmPassword(!showConfirmPassword);
        }
    };

    const checkPasswordStrength = (password) => {
        let strength = 0;
        let feedback = [];

        if (password.length >= 8) strength += 1;
        else feedback.push('At least 8 characters');

        if (/[A-Z]/.test(password)) strength += 1;
        else feedback.push('One uppercase letter');

        if (/[a-z]/.test(password)) strength += 1;
        else feedback.push('One lowercase letter');

        if (/\d/.test(password)) strength += 1;
        else feedback.push('One number');

        if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 1;
        else feedback.push('One special character');

        return { strength, feedback };
    };

    const updatePasswordStrength = useCallback(() => {
        const { strength, feedback } = checkPasswordStrength(formData.password);
        setPasswordStrength({ strength, feedback });
    }, [formData.password]);

    const checkPasswordMatch = useCallback(() => {
        if (formData.confirmPassword === '') {
            setPasswordMatch('');
            return;
        }

        if (formData.password === formData.confirmPassword) {
            setPasswordMatch('Passwords match');
        } else {
            setPasswordMatch('Passwords do not match');
        }
    }, [formData.password, formData.confirmPassword]);

    useEffect(() => {
        updatePasswordStrength();
    }, [formData.password, updatePasswordStrength]);

    useEffect(() => {
        checkPasswordMatch();
    }, [formData.password, formData.confirmPassword, checkPasswordMatch]);

    const getStrengthClass = () => {
        const { strength } = passwordStrength;
        if (strength <= 2) return 'weak';
        if (strength <= 3) return 'fair';
        if (strength <= 4) return 'good';
        return 'strong';
    };

    const getStrengthText = () => {
        const { strength } = passwordStrength;
        if (formData.password.length === 0) return 'Password strength';
        if (strength <= 2) return 'Weak password';
        if (strength <= 3) return 'Fair password';
        if (strength <= 4) return 'Good password';
        return 'Strong password';
    };

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const showNotification = (message) => {
        // Simple notification - in a real app, you'd use a proper notification library
        alert(message);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
            showNotification('Please fill in all fields', 'error');
            return;
        }

        if (!isValidEmail(formData.email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            showNotification('Passwords do not match', 'error');
            return;
        }

        if (passwordStrength.strength < 3) {
            showNotification('Please create a stronger password', 'error');
            return;
        }

        if (!formData.terms) {
            showNotification('Please accept the terms and conditions', 'error');
            return;
        }

        setIsLoading(true);
        
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            setShowModal(true);
        }, 2000);
    };

    const handleSocialLogin = (provider) => {
        console.log(`Signing up with ${provider}`);
        // Implement social login logic here
    };

    const closeModal = () => {
        setShowModal(false);
        navigate('/');
    };

    return (
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
                        <p>Ready to revolutionize your wardrobe while helping the planet? Create your account and start swapping sustainable style today.</p>
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
                                        type={showPassword ? 'text' : 'password'}
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
                                        <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                                    </button>
                                </div>
                                <div className="password-strength">
                                    <div className="strength-bar">
                                        <div className={`strength-fill ${getStrengthClass()}`}></div>
                                    </div>
                                    <span className={`strength-text ${getStrengthClass()}`}>{getStrengthText()}</span>
                                </div>
                            </div>

                            <div className="input-group">
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <div className="input-wrapper">
                                    <i className="fas fa-lock"></i>
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
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
                                        <i className={`fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                                    </button>
                                </div>
                                <div className={`password-match ${passwordMatch === 'Passwords match' ? 'match' : passwordMatch === 'Passwords do not match' ? 'no-match' : ''}`}>
                                    {passwordMatch}
                                </div>
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

                            <button type="submit" className={`signup-btn ${isLoading ? 'loading' : ''}`}>
                                <span>Create Account</span>
                                <i className="fas fa-arrow-right"></i>
                            </button>

                            <div className="divider">
                                <span>or sign up with</span>
                            </div>

                            <div className="social-login">
                                <button
                                    type="button"
                                    className="social-btn google"
                                    onClick={() => handleSocialLogin('google')}
                                >
                                    <i className="fab fa-google"></i>
                                    <span>Google</span>
                                </button>
                                <button
                                    type="button"
                                    className="social-btn facebook"
                                    onClick={() => handleSocialLogin('facebook')}
                                >
                                    <i className="fab fa-facebook-f"></i>
                                    <span>Facebook</span>
                                </button>
                            </div>

                            <div className="login-link">
                                <p>Already have an account? <Link to="/">Sign in</Link></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Success Modal */}
            {showModal && (
                <div className="modal show">
                    <div className="modal-content">
                        <div className="modal-header">
                            <i className="fas fa-check-circle"></i>
                            <h3>Welcome to ReWear!</h3>
                        </div>
                        <div className="modal-body">
                            <p>Your account has been created successfully. Start by browsing our collection or listing your first item to earn points.</p>
                        </div>
                        <div className="modal-footer">
                            <button className="btn-primary" onClick={closeModal}>Get Started</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Signup;
