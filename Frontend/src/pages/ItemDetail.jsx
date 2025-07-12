import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "../components/common/Navigation";
import "../styles/ItemDetail.css";

const ItemDetail = () => {
  const [mainImage, setMainImage] = useState(
    "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=800&fit=crop"
  );
  const [activeThumb, setActiveThumb] = useState(0);
  const [showZoom, setShowZoom] = useState(false);

  const thumbnails = [
    "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=150&h=200&fit=crop",
    "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=150&h=200&fit=crop",
    "https://images.unsplash.com/photo-1566479179817-c0b2b2b6e9b3?w=150&h=200&fit=crop",
    "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=150&h=200&fit=crop",
  ];

  const mainImages = [
    "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=800&fit=crop",
    "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=800&fit=crop",
    "https://images.unsplash.com/photo-1566479179817-c0b2b2b6e9b3?w=600&h=800&fit=crop",
    "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&h=800&fit=crop",
  ];

  const changeMainImage = (index) => {
    setMainImage(mainImages[index]);
    setActiveThumb(index);
  };

  const toggleZoom = () => {
    setShowZoom(!showZoom);
  };

  const handleSwapProposal = () => {
    console.log("Proposing a swap...");
    // Implement swap proposal logic
  };

  const handleWishlistView = () => {
    console.log("Viewing wishlist...");
    // Implement wishlist view logic
  };

  const handlePointsRedemption = () => {
    console.log("Redeeming with points...");
    // Implement points redemption logic
  };

  const handleProfileView = () => {
    console.log("Viewing profile...");
    // Implement profile view logic
  };

  return (
    <>
      {/* Navigation */}
      <Navigation userPoints={1250} />

      {/* Main Content */}
      <main className="main-content">
        <div className="container">
          {/* Breadcrumb */}
          <nav className="breadcrumb">
            <Link to="#" className="breadcrumb-link">
              Home
            </Link>
            <i className="fas fa-chevron-right"></i>
            <Link to="#" className="breadcrumb-link">
              Women's Clothing
            </Link>
            <i className="fas fa-chevron-right"></i>
            <span className="breadcrumb-current">Dresses</span>
          </nav>

          {/* Item Detail Grid */}
          <div className="item-detail-grid">
            {/* Image Gallery */}
            <div className="image-gallery">
              <div className="main-image-container">
                <img
                  src={mainImage}
                  alt="Vintage Floral Dress"
                  className="main-image"
                />
                <button className="zoom-btn" onClick={toggleZoom}>
                  <i className="fas fa-search-plus"></i>
                </button>
                <div className="condition-badge">
                  <span className="condition-excellent">Excellent</span>
                </div>
              </div>
              <div className="thumbnail-grid">
                {thumbnails.map((thumb, index) => (
                  <img
                    key={index}
                    src={thumb}
                    alt={`View ${index + 1}`}
                    className={`thumbnail ${
                      activeThumb === index ? "active" : ""
                    }`}
                    onClick={() => changeMainImage(index)}
                  />
                ))}
              </div>
            </div>

            {/* Item Information */}
            <div className="item-info">
              <div className="item-header">
                <h1 className="item-title">Vintage Floral Summer Dress</h1>
                <div className="item-meta">
                  <span className="brand">Zara</span>
                  <span className="category">
                    Women's Clothing &gt; Dresses
                  </span>
                </div>
              </div>

              <div className="item-details">
                <div className="detail-grid">
                  <div className="detail-item">
                    <span className="detail-label">Size</span>
                    <span className="detail-value">Medium (EU 38)</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Condition</span>
                    <span className="detail-value condition-excellent">
                      Excellent
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Original Price</span>
                    <span className="detail-value">$89</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Fit</span>
                    <span className="detail-value">Regular Fit</span>
                  </div>
                </div>
              </div>

              <div className="availability-status">
                <div className="status-badge available">
                  <i className="fas fa-check-circle"></i>
                  <span>Available - Ready to swap or redeem</span>
                </div>
              </div>

              <div className="description">
                <h3>Description</h3>
                <p>
                  Beautiful vintage-inspired floral dress perfect for summer
                  occasions. Features a flattering A-line silhouette with a midi
                  length. The dress has been worn only twice and is in excellent
                  condition. The fabric is lightweight and breathable, making it
                  perfect for warm weather. Originally purchased from Zara last
                  season.
                </p>

                <div className="tags">
                  <span className="tag">vintage</span>
                  <span className="tag">floral</span>
                  <span className="tag">summer</span>
                  <span className="tag">midi</span>
                  <span className="tag">casual</span>
                </div>
              </div>

              {/* Exchange Options */}
              <div className="exchange-options">
                <h3>Exchange Options</h3>

                <div className="option-card">
                  <div className="option-header">
                    <i className="fas fa-exchange-alt"></i>
                    <span>Direct Swap</span>
                  </div>
                  <p>Suggest items from your closet in exchange</p>
                  <div className="option-actions">
                    <button
                      className="btn-primary"
                      onClick={handleSwapProposal}
                    >
                      <i className="fas fa-handshake"></i>
                      Propose a Swap
                    </button>
                    <button
                      className="btn-secondary"
                      onClick={handleWishlistView}
                    >
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
                  <button
                    className="btn-points"
                    onClick={handlePointsRedemption}
                  >
                    <i className="fas fa-coins"></i>
                    Redeem with Points
                  </button>
                </div>
              </div>
            </div>

            {/* Owner Information */}
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
                    <button className="btn-profile" onClick={handleProfileView}>
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
          </div>
        </div>
      </main>

      {/* Zoom Modal */}
      {showZoom && (
        <div className="zoom-modal show">
          <div className="zoom-content">
            <button className="zoom-close" onClick={toggleZoom}>
              <i className="fas fa-times"></i>
            </button>
            <img src={mainImage} alt="Zoomed image" className="zoomed-image" />
          </div>
        </div>
      )}
    </>
  );
};

export default ItemDetail;
