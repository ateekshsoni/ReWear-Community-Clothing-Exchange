import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-content">
                    <div className="footer-section">
                        <div className="footer-logo">
                            <i className="fas fa-recycle"></i>
                            <span>ReWear</span>
                        </div>
                        <p className="footer-description">
                            Building a sustainable future through community-driven clothing exchange.
                        </p>
                        <div className="social-links">
                            <a href="#" className="social-link">
                                <i className="fab fa-facebook"></i>
                            </a>
                            <a href="#" className="social-link">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a href="#" className="social-link">
                                <i className="fab fa-instagram"></i>
                            </a>
                            <a href="#" className="social-link">
                                <i className="fab fa-linkedin"></i>
                            </a>
                        </div>
                    </div>
                    
                    <div className="footer-section">
                        <h3>Quick Links</h3>
                        <ul className="footer-links">
                            <li><Link to="/item-detail">Browse Items</Link></li>
                            <li><Link to="/success-stories">Success Stories</Link></li>
                            <li><Link to="/signup">Join Community</Link></li>
                            <li><a href="#">How It Works</a></li>
                        </ul>
                    </div>
                    
                    <div className="footer-section">
                        <h3>Support</h3>
                        <ul className="footer-links">
                            <li><a href="#">Help Center</a></li>
                            <li><a href="#">Safety Guidelines</a></li>
                            <li><a href="#">Community Rules</a></li>
                            <li><a href="#">Contact Us</a></li>
                        </ul>
                    </div>
                    
                    <div className="footer-section">
                        <h3>Legal</h3>
                        <ul className="footer-links">
                            <li><a href="#">Privacy Policy</a></li>
                            <li><a href="#">Terms of Service</a></li>
                            <li><a href="#">Cookie Policy</a></li>
                            <li><a href="#">Accessibility</a></li>
                        </ul>
                    </div>
                </div>
                
                <div className="footer-bottom">
                    <div className="footer-bottom-content">
                        <p>&copy; 2025 ReWear. All rights reserved.</p>
                        <div className="footer-bottom-links">
                            <span>Made with ♻️ for a sustainable future</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
