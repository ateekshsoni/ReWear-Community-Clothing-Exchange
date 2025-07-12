import React from 'react';

const FormInput = ({
    label,
    type = 'text',
    id,
    name,
    placeholder,
    value,
    onChange,
    required = false,
    icon,
    showToggle = false,
    showPassword = false,
    onTogglePassword,
    toggleId,
    className = '',
    error = '',
    success = ''
}) => {
    return (
        <div className={`input-group ${className}`}>
            {label && <label htmlFor={id}>{label}</label>}
            <div className={`input-wrapper ${error ? 'error' : ''} ${success ? 'success' : ''}`}>
                {icon && <i className={icon}></i>}
                <input
                    type={showToggle ? (showPassword ? 'text' : 'password') : type}
                    id={id}
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    required={required}
                />
                {showToggle && (
                    <button
                        type="button"
                        className="toggle-password"
                        onClick={onTogglePassword}
                    >
                        <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} id={toggleId}></i>
                    </button>
                )}
            </div>
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}
        </div>
    );
};

export default FormInput;
