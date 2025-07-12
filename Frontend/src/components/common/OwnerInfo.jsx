import React from 'react';

const OwnerInfo = ({ onProfileView }) => {
    return (
        <div className="owner-info">
            <div className="owner-card">
                <h3>Meet the Owner</h3>
                <div className="owner-profile">
                    <div className="owner-avatar">
                        <img
                            src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face"
                            alt="Sarah Johnson"
                        />
                        <div className="verified-badge">
                            <i className="fas fa-check"></i>
                        </div>
                    </div>
                    <div className="owner-details">
                        <h4>Sarah Johnson</h4>
                        <div className="owner-stats">
                            <div className="stat">
                                <i className="fas fa-calendar"></i>
                                <span>Member since 2022</span>
                            </div>
                            <div className="stat">
                                <i className="fas fa-exchange-alt"></i>
                                <span>47 successful swaps</span>
                            </div>
                            <div className="stat">
                                <i className="fas fa-star"></i>
                                <span>4.9 rating</span>
                            </div>
                        </div>
                        <button className="btn-profile" onClick={onProfileView}>
                            <i className="fas fa-user"></i>
                            View Profile
                        </button>
                    </div>
                </div>
            </div>

            {/* Similar Items */}
            <div className="similar-items">
                <h3>Similar Items</h3>
                <div className="similar-grid">
                    <div className="similar-item">
                        <img
                            src="https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=150&h=200&fit=crop"
                            alt="Similar dress"
                        />
                        <div className="similar-info">
                            <span className="similar-title">Floral Midi Dress</span>
                            <span className="similar-points">720 pts</span>
                        </div>
                    </div>
                    <div className="similar-item">
                        <img
                            src="https://images.unsplash.com/photo-1566479179817-c0b2b2b6e9b3?w=150&h=200&fit=crop"
                            alt="Similar dress"
                        />
                        <div className="similar-info">
                            <span className="similar-title">Summer Dress</span>
                            <span className="similar-points">650 pts</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OwnerInfo;
