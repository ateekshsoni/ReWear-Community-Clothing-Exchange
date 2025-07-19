// ✅ Form Validation Utilities
// Reusable validation functions for forms

/**
 * Email validation
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return 'Email is required';
  if (!emailRegex.test(email)) return 'Please enter a valid email address';
  return null;
};

/**
 * Password validation
 */
export const validatePassword = (password) => {
  if (!password) return 'Password is required';
  if (password.length < 8) return 'Password must be at least 8 characters long';
  if (!/(?=.*[a-z])/.test(password)) return 'Password must contain at least one lowercase letter';
  if (!/(?=.*[A-Z])/.test(password)) return 'Password must contain at least one uppercase letter';
  if (!/(?=.*\d)/.test(password)) return 'Password must contain at least one number';
  return null;
};

/**
 * Confirm password validation
 */
export const validateConfirmPassword = (password, confirmPassword) => {
  if (!confirmPassword) return 'Please confirm your password';
  if (password !== confirmPassword) return 'Passwords do not match';
  return null;
};

/**
 * Name validation
 */
export const validateName = (name) => {
  if (!name) return 'Name is required';
  if (name.length < 2) return 'Name must be at least 2 characters long';
  if (name.length > 50) return 'Name must be less than 50 characters';
  if (!/^[a-zA-Z\s]+$/.test(name)) return 'Name can only contain letters and spaces';
  return null;
};

/**
 * Phone number validation
 */
export const validatePhone = (phone) => {
  if (!phone) return 'Phone number is required';
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  if (!phoneRegex.test(phone.replace(/\s/g, ''))) return 'Please enter a valid phone number';
  return null;
};

/**
 * Required field validation
 */
export const validateRequired = (value, fieldName = 'This field') => {
  if (!value || (typeof value === 'string' && value.trim() === '')) {
    return `${fieldName} is required`;
  }
  return null;
};

/**
 * URL validation
 */
export const validateUrl = (url) => {
  if (!url) return null; // Optional field
  try {
    new URL(url);
    return null;
  } catch {
    return 'Please enter a valid URL';
  }
};

/**
 * File validation
 */
export const validateFile = (file, options = {}) => {
  const {
    required = false,
    maxSize = 5 * 1024 * 1024, // 5MB default
    allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
  } = options;

  if (!file) {
    return required ? 'File is required' : null;
  }

  if (file.size > maxSize) {
    return `File size must be less than ${Math.round(maxSize / (1024 * 1024))}MB`;
  }

  if (!allowedTypes.includes(file.type)) {
    return `File type must be one of: ${allowedTypes.join(', ')}`;
  }

  return null;
};

/**
 * Price validation
 */
export const validatePrice = (price) => {
  if (!price) return 'Price is required';
  const numPrice = parseFloat(price);
  if (isNaN(numPrice)) return 'Price must be a valid number';
  if (numPrice < 0) return 'Price must be positive';
  if (numPrice > 10000) return 'Price must be less than $10,000';
  return null;
};

/**
 * Description validation
 */
export const validateDescription = (description, minLength = 10, maxLength = 1000) => {
  if (!description) return 'Description is required';
  if (description.length < minLength) return `Description must be at least ${minLength} characters`;
  if (description.length > maxLength) return `Description must be less than ${maxLength} characters`;
  return null;
};

/**
 * Form validation orchestrator
 */
export const validateForm = (formData, validationRules) => {
  const errors = {};
  let isValid = true;

  Object.entries(validationRules).forEach(([fieldName, validators]) => {
    const value = formData[fieldName];
    
    for (const validator of validators) {
      const error = validator(value, formData);
      if (error) {
        errors[fieldName] = error;
        isValid = false;
        break; // Stop at first error for this field
      }
    }
  });

  return { isValid, errors };
};

/**
 * Real-time field validation
 */
export const validateField = (fieldName, value, validationRules, formData = {}) => {
  const validators = validationRules[fieldName];
  if (!validators) return null;

  for (const validator of validators) {
    const error = validator(value, formData);
    if (error) return error;
  }

  return null;
};

/**
 * Password strength checker
 */
export const checkPasswordStrength = (password) => {
  if (!password) return { score: 0, text: 'Enter a password' };

  let score = 0;
  const feedback = [];

  // Length check
  if (password.length >= 8) score++;
  else feedback.push('Use at least 8 characters');

  // Lowercase check
  if (/[a-z]/.test(password)) score++;
  else feedback.push('Use lowercase letters');

  // Uppercase check
  if (/[A-Z]/.test(password)) score++;
  else feedback.push('Use uppercase letters');

  // Number check
  if (/\d/.test(password)) score++;
  else feedback.push('Use numbers');

  // Special character check
  if (/[^A-Za-z0-9]/.test(password)) score++;
  else feedback.push('Use special characters');

  const strengthTexts = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
  const strengthText = strengthTexts[Math.min(score, 4)];

  return {
    score,
    text: strengthText,
    feedback: feedback.slice(0, 2) // Show max 2 suggestions
  };
};

/**
 * Format validation errors for display
 */
export const formatValidationErrors = (errors) => {
  if (!errors || Object.keys(errors).length === 0) return null;

  const errorList = Object.entries(errors).map(([field, message]) => ({
    field,
    message
  }));

  return errorList;
};
