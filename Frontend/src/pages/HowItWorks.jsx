import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import './HowItWorks.css';

const HowItWorks = () => {
  return (
    <Layout>
      <div className="how-it-works-page">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="container">
            <div className="hero-content">
              <h1>How ReWear Works</h1>
              <p>Join our sustainable fashion community in just a few simple steps</p>
            </div>
          </div>
        </section>

        {/* Steps Section */}
        <section className="steps-section">
          <div className="container">
            <h2>Get Started in 4 Easy Steps</h2>
            <div className="steps-grid">
              <div className="step-card">
                <div className="step-number">1</div>
                <div className="step-icon">
                  <i className="fas fa-user-plus"></i>
                </div>
                <h3>Create Your Account</h3>
                <p>Sign up with your email and create your ReWear profile. Tell us about your style preferences and sizes.</p>
                <Link to="/signup" className="step-link">
                  Sign Up Now <i className="fas fa-arrow-right"></i>
                </Link>
              </div>

              <div className="step-card">
                <div className="step-number">2</div>
                <div className="step-icon">
                  <i className="fas fa-camera"></i>
                </div>
                <h3>Upload Your Items</h3>
                <p>Take photos of clothes you no longer wear. Add descriptions, sizes, and set point values for each item.</p>
                <div className="step-link">
                  Upload Items <i className="fas fa-arrow-right"></i>
                </div>
              </div>

              <div className="step-card">
                <div className="step-number">3</div>
                <div className="step-icon">
                  <i className="fas fa-search"></i>
                </div>
                <h3>Browse & Exchange</h3>
                <p>Explore items from other members. Use your earned points to get clothes you love from the community.</p>
                <Link to="/browse" className="step-link">
                  Browse Items <i className="fas fa-arrow-right"></i>
                </Link>
              </div>

              <div className="step-card">
                <div className="step-number">4</div>
                <div className="step-icon">
                  <i className="fas fa-handshake"></i>
                </div>
                <h3>Meet & Exchange</h3>
                <p>Connect with other members, arrange meetups, and complete your sustainable fashion exchanges.</p>
                <Link to="/messages" className="step-link">
                  Start Messaging <i className="fas fa-arrow-right"></i>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Points System Section */}
        <section className="points-section">
          <div className="container">
            <div className="points-content">
              <div className="points-info">
                <h2>Understanding Our Points System</h2>
                <p>Our point-based system ensures fair exchanges and encourages active participation in the community.</p>
                
                <div className="points-rules">
                  <div className="rule-item">
                    <div className="rule-icon">
                      <i className="fas fa-plus-circle"></i>
                    </div>
                    <div className="rule-text">
                      <h4>Earn Points</h4>
                      <p>Get points when others choose your items. Higher quality items earn more points.</p>
                    </div>
                  </div>

                  <div className="rule-item">
                    <div className="rule-icon">
                      <i className="fas fa-shopping-cart"></i>
                    </div>
                    <div className="rule-text">
                      <h4>Spend Points</h4>
                      <p>Use your points to get items you love. No money needed, just community participation.</p>
                    </div>
                  </div>

                  <div className="rule-item">
                    <div className="rule-icon">
                      <i className="fas fa-star"></i>
                    </div>
                    <div className="rule-text">
                      <h4>Quality Matters</h4>
                      <p>Better condition items are worth more points. We encourage sharing your best pieces.</p>
                    </div>
                  </div>

                  <div className="rule-item">
                    <div className="rule-icon">
                      <i className="fas fa-gift"></i>
                    </div>
                    <div className="rule-text">
                      <h4>Starter Bonus</h4>
                      <p>New members get 100 free points to start their sustainable fashion journey.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="points-visual">
                <div className="points-card">
                  <div className="points-header">
                    <h3>Your Points</h3>
                    <div className="points-balance">
                      <i className="fas fa-coins"></i>
                      <span>1,245</span>
                    </div>
                  </div>
                  <div className="points-breakdown">
                    <div className="breakdown-item">
                      <span>Items Shared</span>
                      <span>+850 pts</span>
                    </div>
                    <div className="breakdown-item">
                      <span>Community Bonus</span>
                      <span>+295 pts</span>
                    </div>
                    <div className="breakdown-item">
                      <span>Starter Bonus</span>
                      <span>+100 pts</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Safety Section */}
        <section className="safety-section">
          <div className="container">
            <h2>Safe & Secure Exchanges</h2>
            <div className="safety-grid">
              <div className="safety-card">
                <div className="safety-icon">
                  <i className="fas fa-shield-alt"></i>
                </div>
                <h3>Verified Profiles</h3>
                <p>All members verify their identity through email and phone verification for a trusted community.</p>
              </div>

              <div className="safety-card">
                <div className="safety-icon">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <h3>Safe Meetup Locations</h3>
                <p>We recommend public places for exchanges and provide a list of safe meetup locations on campus.</p>
              </div>

              <div className="safety-card">
                <div className="safety-icon">
                  <i className="fas fa-comments"></i>
                </div>
                <h3>In-App Messaging</h3>
                <p>All communication happens through our secure messaging system for privacy and safety.</p>
              </div>

              <div className="safety-card">
                <div className="safety-icon">
                  <i className="fas fa-star"></i>
                </div>
                <h3>Rating System</h3>
                <p>Rate your exchange experiences to help build trust and maintain community standards.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <div className="container">
            <div className="cta-content">
              <h2>Ready to Start Your Sustainable Fashion Journey?</h2>
              <p>Join thousands of students who are already making a difference, one outfit at a time.</p>
              <div className="cta-buttons">
                <Link to="/signup" className="cta-btn primary">
                  Get Started Now
                </Link>
                <Link to="/browse" className="cta-btn secondary">
                  Browse Items
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default HowItWorks;
