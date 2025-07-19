// 📝 Reusable Input Component
// Consistent form input styling and validation

import React, { useState, forwardRef } from 'react';
import PropTypes from 'prop-types';
import './Input.css';

const Input = forwardRef(({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  onBlur,
  onFocus,
  error,
  helperText,
  required = false,
  disabled = false,
  icon,
  iconPosition = 'left',
  showPasswordToggle = false,
  className = '',
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const inputType = type === 'password' && showPassword ? 'text' : type;

  const handleFocus = (e) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const inputClass = [
    'input-field',
    error ? 'input-error' : '',
    disabled ? 'input-disabled' : '',
    isFocused ? 'input-focused' : '',
    icon ? `input-with-icon-${iconPosition}` : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className="input-group">
      {label && (
        <label className="input-label">
          {label}
          {required && <span className="input-required">*</span>}
        </label>
      )}
      <div className="input-wrapper">
        {icon && iconPosition === 'left' && (
          <span className="input-icon input-icon-left">{icon}</span>
        )}
        
        <input
          ref={ref}
          type={inputType}
          className={inputClass}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          required={required}
          {...props}
        />
        
        {icon && iconPosition === 'right' && !showPasswordToggle && (
          <span className="input-icon input-icon-right">{icon}</span>
        )}
        
        {type === 'password' && showPasswordToggle && (
          <button
            type="button"
            className="password-toggle"
            onClick={togglePassword}
          >
            <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
          </button>
        )}
      </div>
      
      {(error || helperText) && (
        <div className={`input-message ${error ? 'input-message-error' : 'input-message-helper'}`}>
          {error || helperText}
        </div>
      )}
    </div>
  );
});

Input.displayName = 'Input';

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  error: PropTypes.string,
  helperText: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  icon: PropTypes.node,
  iconPosition: PropTypes.oneOf(['left', 'right']),
  showPasswordToggle: PropTypes.bool,
  className: PropTypes.string
};

export default Input;
