// 🔐 JWT Authentication Middleware
// Protects routes by verifying JWT tokens

import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { AppError } from './errorMiddleware.js';
import logger from '../utils/logger.js';

// 🔧 Main authentication middleware
const authMiddleware = async (req, res, next) => {
  try {
    // 🔧 Get token from header
    const authHeader = req.header('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError('Access denied. No token provided or invalid format', 401);
    }

    // Extract token (remove 'Bearer ' prefix)
    const token = authHeader.substring(7);

    // 🔧 Verify token
    if (!process.env.JWT_SECRET) {
      logger.error('JWT_SECRET is not defined in environment variables');
      throw new AppError('Server configuration error', 500);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 🔧 Get user from database (optional: remove if you don't need fresh user data)
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
      throw new AppError('User not found', 401);
    }

    // 🔧 Attach user to request object
    req.user = user;
    req.userId = user._id; // For convenience

    logger.debug(`User authenticated: ${user.email}`);
    next();

  } catch (error) {
    next(error);
  }
};

// 🔧 Optional middleware for routes that work with or without auth
const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select('-password');
      
      if (user) {
        req.user = user;
        req.userId = user._id;
      }
    }
    
    next();
  } catch (error) {
    // In optional auth, we don't throw errors for invalid tokens
    logger.debug('Optional auth failed:', error.message);
    next();
  }
};

// 🔧 Role-based authorization middleware
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      throw new AppError('Authentication required', 401);
    }

    if (!roles.includes(req.user.role)) {
      throw new AppError('Insufficient permissions', 403);
    }

    next();
  };
};

// 🔧 Check if user owns the resource
const checkOwnership = (Model, paramName = 'id') => {
  return async (req, res, next) => {
    try {
      const resourceId = req.params[paramName];
      const resource = await Model.findById(resourceId);

      if (!resource) {
        throw new AppError('Resource not found', 404);
      }

      // Check if user owns the resource or is admin
      if (resource.userId && resource.userId.toString() !== req.userId.toString() && req.user.role !== 'admin') {
        throw new AppError('Access denied. You can only access your own resources', 403);
      }

      req.resource = resource; // Attach resource to request for use in controller
      next();
    } catch (error) {
      next(error);
    }
  };
};

export {
  authMiddleware,
  optionalAuth,
  authorize,
  checkOwnership
};
