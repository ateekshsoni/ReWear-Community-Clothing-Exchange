import React from 'react';
import Layout from '../components/layout/Layout';
import HeroSection from '../components/sections/HeroSection';
import './Profile.css';

const Profile = () => {
  return (
    <Layout>
      <div className="profile-page">
        <HeroSection
          title="My Profile"
          subtitle="Manage your ReWear account, view your items, and track your impact"
          showButton={false}
        />
        
        <div className="profile-content">
          <div className="container">
            <div className="profile-grid">
              {/* Profile Sidebar */}
              <div className="profile-sidebar">
                <div className="profile-card">
                  <div className="profile-avatar">
                    <img src="https://via.placeholder.com/100x100" alt="Profile" />
                    <button className="edit-avatar-btn">
                      <i className="fas fa-camera"></i>
                    </button>
                  </div>
                  <h3>Sarah Johnson</h3>
                  <p>@sarah_eco</p>
                  <div className="profile-stats">
                    <div className="stat-item">
                      <span className="stat-number">1,245</span>
                      <span className="stat-label">Points</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-number">23</span>
                      <span className="stat-label">Items Shared</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-number">15</span>
                      <span className="stat-label">Items Received</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Profile Main Content */}
              <div className="profile-main">
                <div className="profile-tabs">
                  <button className="tab-btn active">My Items</button>
                  <button className="tab-btn">Favorites</button>
                  <button className="tab-btn">Settings</button>
                </div>

                <div className="tab-content">
                  <div className="my-items-section">
                    <div className="section-header">
                      <h3>My Listed Items</h3>
                      <button className="add-item-btn">
                        <i className="fas fa-plus"></i>
                        Add New Item
                      </button>
                    </div>
                    
                    <div className="items-grid">
                      <div className="item-card">
                        <div className="item-image">
                          <img src="https://via.placeholder.com/200x200" alt="Item" />
                          <div className="item-status available">Available</div>
                        </div>
                        <div className="item-content">
                          <h4>Vintage Denim Jacket</h4>
                          <p className="item-brand">Levi's</p>
                          <div className="item-details">
                            <span className="item-size">Size: M</span>
                            <span className="item-points">150 points</span>
                          </div>
                          <div className="item-actions">
                            <button className="edit-btn">
                              <i className="fas fa-edit"></i>
                            </button>
                            <button className="delete-btn">
                              <i className="fas fa-trash"></i>
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="item-card">
                        <div className="item-image">
                          <img src="https://via.placeholder.com/200x200" alt="Item" />
                          <div className="item-status traded">Traded</div>
                        </div>
                        <div className="item-content">
                          <h4>Floral Summer Dress</h4>
                          <p className="item-brand">H&M</p>
                          <div className="item-details">
                            <span className="item-size">Size: S</span>
                            <span className="item-points">120 points</span>
                          </div>
                          <div className="item-actions">
                            <button className="edit-btn">
                              <i className="fas fa-edit"></i>
                            </button>
                            <button className="delete-btn">
                              <i className="fas fa-trash"></i>
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="item-card">
                        <div className="item-image">
                          <img src="https://via.placeholder.com/200x200" alt="Item" />
                          <div className="item-status pending">Pending</div>
                        </div>
                        <div className="item-content">
                          <h4>Black Leather Boots</h4>
                          <p className="item-brand">Dr. Martens</p>
                          <div className="item-details">
                            <span className="item-size">Size: 8</span>
                            <span className="item-points">200 points</span>
                          </div>
                          <div className="item-actions">
                            <button className="edit-btn">
                              <i className="fas fa-edit"></i>
                            </button>
                            <button className="delete-btn">
                              <i className="fas fa-trash"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
