import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = ({ userPoints = 1250 }) => {
    return (
        <nav className="navbar">
            <div className="nav-container">
                <div className="logo">
                    <i className="fas fa-recycle"></i>
                    <span>ReWear</span>
                </div>
                <div className="nav-links">
                    <Link to="/item-detail" className="nav-link">Browse</Link>
                    <Link to="/success-stories" className="nav-link">Success Stories</Link>
                    <div className="points-display">
                        <i className="fas fa-coins"></i>
                        <span>{userPoints.toLocaleString()} pts</span>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;
