import React from 'react';

const Modal = ({ isOpen, onClose, children, className = '' }) => {
    if (!isOpen) return null;

    return (
        <div className={`modal ${className}`} onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export const ZoomModal = ({ isOpen, onClose, imageSrc, alt = 'Zoomed image' }) => {
    if (!isOpen) return null;

    return (
        <div className="zoom-modal show">
            <div className="zoom-content">
                <button className="zoom-close" onClick={onClose}>
                    <i className="fas fa-times"></i>
                </button>
                <img src={imageSrc} alt={alt} className="zoomed-image" />
            </div>
        </div>
    );
};

export default Modal;
