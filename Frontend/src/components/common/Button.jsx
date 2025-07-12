import React from 'react';

const Button = ({ 
    type = 'button', 
    variant = 'primary', 
    size = 'medium',
    loading = false,
    disabled = false,
    onClick,
    children,
    className = '',
    icon
}) => {
    const baseClass = 'btn';
    const variantClass = variant === 'primary' ? 'btn-primary' : 
                        variant === 'secondary' ? 'btn-secondary' : 
                        variant === 'points' ? 'btn-points' : 'btn-primary';
    
    const sizeClass = size === 'small' ? 'btn-small' : 
                     size === 'large' ? 'btn-large' : '';
    
    const loadingClass = loading ? 'loading' : '';
    
    const buttonClass = `${baseClass} ${variantClass} ${sizeClass} ${loadingClass} ${className}`.trim();

    return (
        <button
            type={type}
            className={buttonClass}
            onClick={onClick}
            disabled={disabled || loading}
        >
            {icon && <i className={icon}></i>}
            <span>{children}</span>
            {loading && <i className="fas fa-spinner fa-spin"></i>}
        </button>
    );
};

export default Button;
