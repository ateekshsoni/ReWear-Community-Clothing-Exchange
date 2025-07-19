// ⏳ Loading Component
// Reusable loading indicators and skeletons

import React from 'react';
import PropTypes from 'prop-types';
import './Loading.css';

const Loading = ({
  type = 'spinner',
  size = 'medium',
  text,
  fullScreen = false,
  overlay = false,
  className = ''
}) => {
  const baseClass = 'loading';
  const typeClass = `loading-${type}`;
  const sizeClass = `loading-${size}`;
  const fullScreenClass = fullScreen ? 'loading-fullscreen' : '';
  const overlayClass = overlay ? 'loading-overlay' : '';

  const loadingClass = [
    baseClass,
    typeClass,
    sizeClass,
    fullScreenClass,
    overlayClass,
    className
  ].filter(Boolean).join(' ');

  const renderSpinner = () => (
    <div className="spinner">
      <div className="spinner-circle"></div>
    </div>
  );

  const renderDots = () => (
    <div className="dots">
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
    </div>
  );

  const renderPulse = () => (
    <div className="pulse">
      <div className="pulse-circle"></div>
    </div>
  );

  const renderSkeleton = () => (
    <div className="skeleton">
      <div className="skeleton-line skeleton-line-1"></div>
      <div className="skeleton-line skeleton-line-2"></div>
      <div className="skeleton-line skeleton-line-3"></div>
    </div>
  );

  const renderLoader = () => {
    switch (type) {
      case 'dots':
        return renderDots();
      case 'pulse':
        return renderPulse();
      case 'skeleton':
        return renderSkeleton();
      default:
        return renderSpinner();
    }
  };

  return (
    <div className={loadingClass}>
      <div className="loading-content">
        {renderLoader()}
        {text && <div className="loading-text">{text}</div>}
      </div>
    </div>
  );
};

// Skeleton components for specific use cases
export const SkeletonCard = ({ className = '' }) => (
  <div className={`skeleton-card ${className}`}>
    <div className="skeleton-image"></div>
    <div className="skeleton-content">
      <div className="skeleton-title"></div>
      <div className="skeleton-text"></div>
      <div className="skeleton-text short"></div>
    </div>
  </div>
);

export const SkeletonList = ({ count = 3, className = '' }) => (
  <div className={`skeleton-list ${className}`}>
    {Array.from({ length: count }).map((_, index) => (
      <div key={index} className="skeleton-list-item">
        <div className="skeleton-avatar"></div>
        <div className="skeleton-content">
          <div className="skeleton-title"></div>
          <div className="skeleton-text"></div>
        </div>
      </div>
    ))}
  </div>
);

Loading.propTypes = {
  type: PropTypes.oneOf(['spinner', 'dots', 'pulse', 'skeleton']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  text: PropTypes.string,
  fullScreen: PropTypes.bool,
  overlay: PropTypes.bool,
  className: PropTypes.string
};

export default Loading;
