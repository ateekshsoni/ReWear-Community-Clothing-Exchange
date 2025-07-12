import React from 'react';

const ExchangeOptions = ({ onSwapProposal, onWishlistView, onPointsRedemption }) => {
    return (
        <div className="exchange-options">
            <h3>Exchange Options</h3>
            
            <div className="option-card">
                <div className="option-header">
                    <i className="fas fa-exchange-alt"></i>
                    <span>Direct Swap</span>
                </div>
                <p>Suggest items from your closet in exchange</p>
                <div className="option-actions">
                    <button className="btn-primary" onClick={onSwapProposal}>
                        <i className="fas fa-handshake"></i>
                        Propose a Swap
                    </button>
                    <button className="btn-secondary" onClick={onWishlistView}>
                        <i className="fas fa-heart"></i>
                        Browse Sarah's Wishlist
                    </button>
                </div>
            </div>

            <div className="option-card">
                <div className="option-header">
                    <i className="fas fa-coins"></i>
                    <span>Points Redemption</span>
                </div>
                <div className="points-info">
                    <div className="points-required">
                        <span className="points-number">850</span>
                        <span className="points-label">points required</span>
                    </div>
                    <div className="points-available">
                        <span>You have 1,250 points available</span>
                    </div>
                </div>
                <button className="btn-points" onClick={onPointsRedemption}>
                    <i className="fas fa-coins"></i>
                    Redeem with Points
                </button>
            </div>
        </div>
    );
};

export default ExchangeOptions;
