// 🔧 JWT Token Generator Utility
// Handles JWT token generation and verification for authentication

import jwt from 'jsonwebtoken';

/**
 * Generate JWT token for user authentication
 * @param {string} userId - User's MongoDB ObjectId
 * @param {string} email - User's email address
 * @param {string} role - User's role (user, admin, moderator)
 * @returns {string} JWT token
 */
const generateToken = (userId, email, role = 'user') => {
  // Check if JWT_SECRET is available
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }

  // Payload to include in token
  const payload = {
    id: userId,
    email: email,
    role: role,
    iat: Date.now() // Issued at timestamp
  };

  // Token options
  const options = {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d', // Default 7 days
    issuer: 'reWear-platform', // Token issuer
    audience: 'reWear-users' // Token audience
  };

  try {
    // Generate and return token
    const token = jwt.sign(payload, process.env.JWT_SECRET, options);
    return token;
  } catch (error) {
    throw new Error(`Token generation failed: ${error.message}`);
  }
};

/**
 * Verify JWT token and return decoded payload
 * @param {string} token - JWT token to verify
 * @returns {object} Decoded token payload
 */
const verifyToken = (token) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      throw new Error('Token has expired');
    } else if (error.name === 'JsonWebTokenError') {
      throw new Error('Invalid token');
    } else {
      throw new Error(`Token verification failed: ${error.message}`);
    }
  }
};

/**
 * Decode JWT token without verification (useful for getting token info)
 * @param {string} token - JWT token to decode
 * @returns {object} Decoded token payload (unverified)
 */
const decodeToken = (token) => {
  try {
    return jwt.decode(token);
  } catch (error) {
    throw new Error(`Token decoding failed: ${error.message}`);
  }
};

/**
 * Generate refresh token (longer expiration)
 * @param {string} userId - User's MongoDB ObjectId
 * @returns {string} Refresh token
 */
const generateRefreshToken = (userId) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }

  const payload = {
    id: userId,
    type: 'refresh',
    iat: Date.now()
  };

  const options = {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30d', // Default 30 days
    issuer: 'reWear-platform',
    audience: 'reWear-refresh'
  };

  try {
    return jwt.sign(payload, process.env.JWT_SECRET, options);
  } catch (error) {
    throw new Error(`Refresh token generation failed: ${error.message}`);
  }
};

/**
 * Get token expiration date
 * @param {string} token - JWT token
 * @returns {Date} Expiration date
 */
const getTokenExpiration = (token) => {
  try {
    const decoded = decodeToken(token);
    return new Date(decoded.exp * 1000); // Convert from seconds to milliseconds
  } catch (error) {
    throw new Error(`Failed to get token expiration: ${error.message}`);
  }
};

/**
 * Check if token is expired
 * @param {string} token - JWT token
 * @returns {boolean} True if token is expired
 */
const isTokenExpired = (token) => {
  try {
    const expirationDate = getTokenExpiration(token);
    return new Date() > expirationDate;
  } catch (error) {
    return true; // Assume expired if we can't decode
  }
};

/**
 * Extract token from Authorization header
 * @param {string} authHeader - Authorization header value
 * @returns {string|null} Extracted token or null
 */
const extractTokenFromHeader = (authHeader) => {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  return authHeader.substring(7); // Remove 'Bearer ' prefix
};

export {
  generateToken,
  verifyToken,
  decodeToken,
  generateRefreshToken,
  getTokenExpiration,
  isTokenExpired,
  extractTokenFromHeader
};

// Default export for backward compatibility
export default {
  generateToken,
  verifyToken,
  decodeToken,
  generateRefreshToken,
  getTokenExpiration,
  isTokenExpired,
  extractTokenFromHeader
};
