// 🧭 Navigation Component
// Reusable navigation header with authentication

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Button from '../ui/Button';
import './Navigation.css';

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const publicNavItems = [
    { label: 'Home', href: '#home' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Featured', href: '#featured' },
    { label: 'About', href: '#about' }
  ];

  const authenticatedNavItems = [
    { label: 'Dashboard', to: '/dashboard' },
    { label: 'Browse', to: '/browse' },
    { label: 'My Items', to: '/my-items' },
    { label: 'Messages', to: '/messages' }
  ];

  const navItems = isAuthenticated ? authenticatedNavItems : publicNavItems;

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <i className="fas fa-recycle"></i>
          <span>ReWear</span>
        </Link>

        <ul className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`}>
          {navItems.map((item) => (
            <li key={item.label} className="nav-item">
              {item.href ? (
                <a href={item.href} className="nav-link">
                  {item.label}
                </a>
              ) : (
                <Link to={item.to} className="nav-link">
                  {item.label}
                </Link>
              )}
            </li>
          ))}
          
          <li className="nav-item nav-auth">
            {isAuthenticated ? (
              <div className="user-menu">
                <div className="user-profile">
                  <div className="profile-avatar">
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <span className="user-name">{user?.name}</span>
                </div>
                <Button
                  variant="outline"
                  size="small"
                  onClick={handleLogout}
                  icon={<i className="fas fa-sign-out-alt"></i>}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="auth-buttons">
                <Link to="/login">
                  <Button variant="outline" size="medium">
                    Log In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button variant="primary" size="medium">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </li>
        </ul>

        <div className="hamburger" onClick={toggleMobileMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
