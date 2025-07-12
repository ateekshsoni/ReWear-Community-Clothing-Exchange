import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Navigation, 
  ImageGallery, 
  ExchangeOptions, 
  OwnerInfo, 
  ZoomModal 
} from "../components/common";
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
            <ImageGallery
              mainImage={mainImage}
              thumbnails={thumbnails}
              activeThumb={activeThumb}
              onImageChange={changeMainImage}
              onZoomToggle={toggleZoom}
            />

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
              <ExchangeOptions
                onSwapProposal={handleSwapProposal}
                onWishlistView={handleWishlistView}
                onPointsRedemption={handlePointsRedemption}
              />
            </div>

            {/* Owner Information */}
            <OwnerInfo onProfileView={handleProfileView} />
          </div>
        </div>
      </main>

      {/* Zoom Modal */}
      <ZoomModal
        isOpen={showZoom}
        onClose={toggleZoom}
        imageSrc={mainImage}
        alt="Zoomed image"
      />
    </>
  );
};

export default ItemDetail;
