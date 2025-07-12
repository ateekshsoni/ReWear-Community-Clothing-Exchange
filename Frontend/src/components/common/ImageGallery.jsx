import React from 'react';

const ImageGallery = ({ mainImage, thumbnails, activeThumb, onImageChange, onZoomToggle }) => {
    return (
        <div className="image-gallery">
            <div className="main-image-container">
                <img
                    src={mainImage}
                    alt="Vintage Floral Dress"
                    className="main-image"
                />
                <button className="zoom-btn" onClick={onZoomToggle}>
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
                        className={`thumbnail ${activeThumb === index ? 'active' : ''}`}
                        onClick={() => onImageChange(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default ImageGallery;
