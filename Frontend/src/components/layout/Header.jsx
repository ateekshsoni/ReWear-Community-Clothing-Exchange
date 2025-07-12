import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = ({ userPoints = 1250, showPoints = true }) => {
    const location = useLocation();

    return (
        <header className="header">
            <nav className="navbar">
                <div className="nav-container">
                    <Link to="/" className="logo">
                        <i className="fas fa-recycle"></i>
                        <span>ReWear</span>
                    </Link>
                    <div className="nav-links">
                        <Link 
                            to="/item-detail" 
                            className={`nav-link ${location.pathname === '/item-detail' ? 'active' : ''}`}
                        >
                            Browse
                        </Link>
                        <Link 
                            to="/success-stories" 
                            className={`nav-link ${location.pathname === '/success-stories' ? 'active' : ''}`}
                        >
                            Success Stories
                        </Link>
                        {showPoints && (
                            <div className="points-display">
                                <i className="fas fa-coins"></i>
                                <span>{userPoints.toLocaleString()} pts</span>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
