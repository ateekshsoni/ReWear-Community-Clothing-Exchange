// 🎛️ Dashboard Page Component
// User dashboard with reusable components and enhanced UX

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Loading from '../components/ui/Loading';
import SEO from '../components/common/SEO';
import Navigation from '../components/layout/Navigation';
import '../user.css';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('listed');
  const [userData, setUserData] = useState(null);
  const [userItems, setUserItems] = useState([]);
  const [swaps, setSwaps] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserData();
    fetchUserItems();
    fetchSwaps();
  }, []);

  const fetchUserData = async () => {
    try {
      // This would fetch user profile data from API
      setUserData({
        name: user?.name || 'User',
        initials: user?.name?.charAt(0) || 'U',
        itemsListed: 12,
        swapsCompleted: 8,
        pointsEarned: 240,
        co2Saved: 15.6
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const fetchUserItems = async () => {
    try {
      // Mock data - replace with actual API call
      setUserItems([
        {
          id: 1,
          title: 'Vintage Denim Jacket',
          description: 'Classic 90s style, excellent condition',
          category: 'Outerwear',
          size: 'M',
          status: 'active',
          image: '🧥',
          dateAdded: '2 days ago'
        },
        {
          id: 2,
          title: 'Summer Floral Dress',
          description: 'Perfect for warm weather',
          category: 'Dresses',
          size: 'S',
          status: 'pending',
          image: '👗',
          dateAdded: '1 week ago'
        },
        {
          id: 3,
          title: 'Designer Sneakers',
          description: 'Limited edition, barely worn',
          category: 'Shoes',
          size: '9',
          status: 'swapped',
          image: '👟',
          dateAdded: '2 weeks ago'
        }
      ]);
    } catch (error) {
      console.error('Error fetching user items:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSwaps = async () => {
    try {
      // Mock data - replace with actual API call
      setSwaps([
        {
          id: 1,
          type: 'incoming',
          title: 'Someone wants your Vintage Denim Jacket',
          details: 'Sarah offered her Black Leather Boots',
          status: 'pending',
          date: 'Today'
        },
        {
          id: 2,
          type: 'outgoing',
          title: 'Your offer for Blue Silk Scarf',
          details: 'Waiting for Emma\'s response',
          status: 'pending',
          date: 'Yesterday'
        }
      ]);
    } catch (error) {
      console.error('Error fetching swaps:', error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    toast.success('Logged out successfully');
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'active': return 'status-active';
      case 'pending': return 'status-pending';
      case 'swapped': return 'status-swapped';
      case 'paused': return 'status-paused';
      default: return 'status-active';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active': return 'Active';
      case 'pending': return 'Pending Swap';
      case 'swapped': return 'Swapped';
      case 'paused': return 'Paused';
      default: return 'Active';
    }
  };

  const filteredItems = userItems.filter(item => {
    switch (activeTab) {
      case 'listed': return item.status === 'active';
      case 'pending': return item.status === 'pending';
      case 'swapped': return item.status === 'swapped';
      default: return true;
    }
  });

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <i className="fas fa-recycle"></i>
              <span>ReWear</span>
            </div>
            <nav>
              <ul className="nav-menu">
                <li><Link to="/browse" className="nav-link">Browse</Link></li>
                <li><Link to="/list-item" className="nav-link">List Item</Link></li>
                <li><Link to="/dashboard" className="nav-link active">Dashboard</Link></li>
                <li><Link to="/profile" className="nav-link">Profile</Link></li>
              </ul>
            </nav>
            <div className="user-profile">
              <div className="profile-avatar">
                {userData?.initials}
              </div>
              <button onClick={handleLogout} className="btn btn-secondary">
                <i className="fas fa-sign-out-alt"></i>
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container">
        <div className="dashboard-grid">
          {/* Profile Overview */}
          <div className="section-card profile-overview">
            <div className="section-header">
              <i className="section-icon fas fa-user-circle"></i>
              <h2 className="section-title">Welcome back, {userData?.name}!</h2>
            </div>
            
            <div className="profile-stats">
              <div className="stat-item">
                <div className="stat-number">{userData?.itemsListed}</div>
                <div className="stat-label">Items Listed</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">{userData?.swapsCompleted}</div>
                <div className="stat-label">Swaps Completed</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">{userData?.pointsEarned}</div>
                <div className="stat-label">Points Earned</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">{userData?.co2Saved}kg</div>
                <div className="stat-label">CO₂ Saved</div>
              </div>
            </div>

            <div className="impact-message">
              <i className="fas fa-leaf"></i>
              Amazing! You've helped save {userData?.co2Saved}kg of CO₂ through sustainable fashion choices.
            </div>
          </div>

          {/* Quick Actions */}
          <div className="section-card">
            <div className="section-header">
              <i className="section-icon fas fa-bolt"></i>
              <h2 className="section-title">Quick Actions</h2>
            </div>
            
            <div className="quick-actions-grid">
              <Link to="/list-item" className="action-button">
                <i className="action-icon fas fa-plus-circle"></i>
                <span>List New Item</span>
              </Link>
              <Link to="/browse" className="action-button">
                <i className="action-icon fas fa-search"></i>
                <span>Browse Items</span>
              </Link>
              <Link to="/swaps" className="action-button">
                <i className="action-icon fas fa-exchange-alt"></i>
                <span>Manage Swaps</span>
              </Link>
              <Link to="/messages" className="action-button">
                <i className="action-icon fas fa-comments"></i>
                <span>Messages</span>
              </Link>
            </div>
          </div>

          {/* My Items */}
          <div className="section-card items-grid">
            <div className="section-header">
              <i className="section-icon fas fa-tshirt"></i>
              <h2 className="section-title">My Items</h2>
            </div>

            <div className="items-tabs">
              <button 
                className={`tab-button ${activeTab === 'listed' ? 'active' : ''}`}
                onClick={() => setActiveTab('listed')}
              >
                Listed ({userItems.filter(item => item.status === 'active').length})
              </button>
              <button 
                className={`tab-button ${activeTab === 'pending' ? 'active' : ''}`}
                onClick={() => setActiveTab('pending')}
              >
                Pending ({userItems.filter(item => item.status === 'pending').length})
              </button>
              <button 
                className={`tab-button ${activeTab === 'swapped' ? 'active' : ''}`}
                onClick={() => setActiveTab('swapped')}
              >
                Swapped ({userItems.filter(item => item.status === 'swapped').length})
              </button>
            </div>

            <div className="items-list">
              {filteredItems.length > 0 ? (
                filteredItems.map(item => (
                  <div key={item.id} className="item-card">
                    <div className="item-image">{item.image}</div>
                    <div className="item-details">
                      <h3 className="item-title">{item.title}</h3>
                      <p className="item-description">{item.description}</p>
                      <div className="item-meta">
                        <span>{item.category}</span>
                        <span>Size: {item.size}</span>
                        <span>{item.dateAdded}</span>
                      </div>
                    </div>
                    <div className="item-status">
                      <span className={`status-badge ${getStatusBadgeClass(item.status)}`}>
                        {getStatusText(item.status)}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="empty-state">
                  <p>No items in this category yet.</p>
                  <Link to="/list-item" className="btn btn-primary">
                    List Your First Item
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Recent Swaps */}
          <div className="section-card swaps-grid">
            <div className="section-header">
              <i className="section-icon fas fa-exchange-alt"></i>
              <h2 className="section-title">Recent Swaps</h2>
            </div>

            <div className="swaps-section">
              <h3 className="swaps-subtitle">
                <i className="fas fa-inbox"></i>
                Incoming Requests
              </h3>
              {swaps.filter(swap => swap.type === 'incoming').map(swap => (
                <div key={swap.id} className="swap-card">
                  <div className="swap-info">
                    <h4 className="swap-title">{swap.title}</h4>
                    <p className="swap-details">{swap.details}</p>
                    <small>{swap.date}</small>
                  </div>
                  <div className="swap-actions">
                    <button className="btn btn-primary">
                      <i className="fas fa-check"></i>
                      Accept
                    </button>
                    <button className="btn btn-secondary">
                      <i className="fas fa-times"></i>
                      Decline
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="swaps-section">
              <h3 className="swaps-subtitle">
                <i className="fas fa-paper-plane"></i>
                Outgoing Requests
              </h3>
              {swaps.filter(swap => swap.type === 'outgoing').map(swap => (
                <div key={swap.id} className="swap-card">
                  <div className="swap-info">
                    <h4 className="swap-title">{swap.title}</h4>
                    <p className="swap-details">{swap.details}</p>
                    <small>{swap.date}</small>
                  </div>
                  <div className="swap-actions">
                    <button className="btn btn-secondary">
                      <i className="fas fa-eye"></i>
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Dashboard;
