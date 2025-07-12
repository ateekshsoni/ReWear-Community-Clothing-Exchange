// 🔧 Landing Page Component
// Main landing page converted from HTML to React

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../LandingPage.css';

const LandingPage = () => {
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate loading screen
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleSignUp = (e) => {
    e.preventDefault();
    if (email) {
      toast.success('Thanks for joining! Redirecting to sign up...');
      navigate('/signup');
    } else {
      toast.error('Please enter a valid email address');
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      {/* Loading Screen */}
      {loading && (
        <div className="loading-screen">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading ReWear...</p>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <h2>ReWear</h2>
          </div>
          <ul className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`}>
            <li><a href="#home">Home</a></li>
            <li><a href="#how-it-works">How It Works</a></li>
            <li><a href="#featured">Featured</a></li>
            <li><a href="#about">About</a></li>
            <li>
              <button className="nav-cta">
                <Link to="/signup">Sign Up</Link>
              </button>
            </li>
          </ul>
          <div className="hamburger" onClick={toggleMobileMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-bg-leaves">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 1440 320"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="hero-leaves-svg"
          >
            <path
              fill="#e8e6c3"
              fillOpacity="0.3"
              d="M0,160L60,170.7C120,181,240,203,360,197.3C480,192,600,160,720,133.3C840,107,960,85,1080,101.3C1200,117,1320,171,1380,197.3L1440,224L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
            ></path>
          </svg>
        </div>
        <div className="hero-container">
          <div className="hero-content">
            <span className="badge-eco">Sustainable Fashion</span>
            <h1 className="hero-title">Give Your Clothes a Second Life</h1>
            <p className="hero-subtitle">
              Join ReWear – the sustainable fashion community where your unworn
              clothes find new homes while you discover pre-loved treasures.
            </p>
            <div className="hero-buttons">
              <button 
                className="btn btn-primary" 
                onClick={() => navigate('/browse')}
              >
                Start Swapping
              </button>
              <button 
                className="btn btn-secondary"
                onClick={() => navigate('/browse')}
              >
                Browse Items
              </button>
              <button 
                className="btn btn-tertiary"
                onClick={() => navigate('/list-item')}
              >
                List an Item
              </button>
            </div>
            <div className="trust-badge">
              <span>🌿 Trusted by 5,000+ eco-conscious users</span>
            </div>
          </div>
          <div className="hero-image">
            <div className="hero-visual">
              <div className="clothing-item item-1">👕</div>
              <div className="clothing-item item-2">👗</div>
              <div className="clothing-item item-3">👖</div>
              <div className="clothing-item item-4">🧥</div>
            </div>
          </div>
        </div>
        <div className="scroll-indicator">
          <div className="scroll-arrow">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 5L12 19M12 19L19 12M12 19L5 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
        <div className="wavy-divider">
          <svg
            viewBox="0 0 1440 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#f8f7f3"
              d="M0,32L60,37.3C120,43,240,53,360,53.3C480,53,600,43,720,37.3C840,32,960,32,1080,37.3C1200,43,1320,53,1380,58.7L1440,64L1440,80L1380,80C1320,80,1200,80,1080,80C960,80,840,80,720,80C600,80,480,80,360,80C240,80,120,80,60,80L0,80Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* Aesthetic Sign Up Form Section */}
      <section className="signup-form-section fade-in">
        <div className="container">
          <form className="aesthetic-form" onSubmit={handleSignUp}>
            <h2>Join the ReWear Community</h2>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-icon">
                <input
                  type="email"
                  id="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <span className="icon">@</span>
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              <span>Sign Up</span>
              <span className="btn-icon">🌱</span>
            </button>
            <div className="privacy-note">
              We respect your privacy. No spam, ever.
            </div>
          </form>
        </div>
      </section>

      {/* Platform Introduction */}
      <section className="platform-intro">
        <div className="container">
          <h2 className="section-title">Fashion Forward, Planet Friendly</h2>
          <p className="intro-text">
            Every year, millions of tons of clothing end up in landfills while
            people crave fresh styles. ReWear bridges this gap with a sustainable
            solution that benefits everyone.
          </p>
          <div className="stats-container">
            <div className="stat-item">
              <span className="stat-number">5,000+</span>
              <span className="stat-label">Happy Users</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">15,000+</span>
              <span className="stat-label">Items Swapped</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">95%</span>
              <span className="stat-label">Satisfaction Rate</span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="how-it-works">
        <div className="container">
          <h2 className="section-title">How ReWear Works</h2>
          <div className="steps-container">
            <div className="step">
              <div className="step-icon">📷</div>
              <h3>List Your Items</h3>
              <p>Take photos of clothes you no longer wear and list them on our platform</p>
            </div>
            <div className="step">
              <div className="step-icon">🔍</div>
              <h3>Browse & Connect</h3>
              <p>Discover items you love and connect with other fashion enthusiasts</p>
            </div>
            <div className="step">
              <div className="step-icon">🔄</div>
              <h3>Swap & Enjoy</h3>
              <p>Exchange items safely and give your wardrobe a sustainable refresh</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Items */}
      <section id="featured" className="featured-items">
        <div className="container">
          <h2 className="section-title">Featured Items</h2>
          <div className="items-grid">
            <div className="item-card">
              <div className="item-image">👗</div>
              <h3>Vintage Summer Dress</h3>
              <p>Size M • Like New</p>
              <div className="item-tags">
                <span>Vintage</span>
                <span>Summer</span>
              </div>
            </div>
            <div className="item-card">
              <div className="item-image">👕</div>
              <h3>Designer T-Shirt</h3>
              <p>Size L • Excellent</p>
              <div className="item-tags">
                <span>Designer</span>
                <span>Casual</span>
              </div>
            </div>
            <div className="item-card">
              <div className="item-image">🧥</div>
              <h3>Winter Coat</h3>
              <p>Size S • Good</p>
              <div className="item-tags">
                <span>Winter</span>
                <span>Warm</span>
              </div>
            </div>
          </div>
          <div className="view-more">
            <button 
              className="btn btn-secondary"
              onClick={() => navigate('/browse')}
            >
              View All Items
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2>About ReWear</h2>
              <p>
                ReWear was born from a simple idea: fashion should be sustainable,
                accessible, and fun. We're building a community where style meets
                sustainability, where every swap reduces waste and creates connections.
              </p>
              <div className="impact-stats">
                <div className="impact-item">
                  <span className="impact-number">50,000 lbs</span>
                  <span className="impact-label">Waste Prevented</span>
                </div>
                <div className="impact-item">
                  <span className="impact-number">10,000</span>
                  <span className="impact-label">Trees Saved</span>
                </div>
              </div>
            </div>
            <div className="about-image">
              <div className="planet-icon">🌍</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Transform Your Wardrobe?</h2>
            <p>Join thousands of fashion lovers making a positive impact</p>
            <div className="cta-buttons">
              <button 
                className="btn btn-primary"
                onClick={() => navigate('/signup')}
              >
                Get Started Today
              </button>
              <button 
                className="btn btn-secondary"
                onClick={() => navigate('/login')}
              >
                Already a Member?
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <h3>ReWear</h3>
              <p>Sustainable fashion for a better future</p>
            </div>
            <div className="footer-links">
              <div className="link-group">
                <h4>Platform</h4>
                <ul>
                  <li><Link to="/browse">Browse Items</Link></li>
                  <li><Link to="/list-item">List an Item</Link></li>
                  <li><Link to="/success-stories">Success Stories</Link></li>
                </ul>
              </div>
              <div className="link-group">
                <h4>Account</h4>
                <ul>
                  <li><Link to="/login">Log In</Link></li>
                  <li><Link to="/signup">Sign Up</Link></li>
                  <li><Link to="/dashboard">Dashboard</Link></li>
                </ul>
              </div>
              <div className="link-group">
                <h4>Support</h4>
                <ul>
                  <li><a href="#help">Help Center</a></li>
                  <li><a href="#contact">Contact Us</a></li>
                  <li><a href="#privacy">Privacy Policy</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 ReWear. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default LandingPage;
