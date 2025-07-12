// 🔧 User Service
// Business logic for user-related operations

import User from '../models/User.js';
import { generateToken } from '../utils/generateToken.js';
import { AppError } from '../middleware/errorMiddleware.js';

const userService = {
  // 🔐 Register new user
  register: async ({ name, email, password }) => {
    try {
      // Check if user already exists
      const existingUser = await User.findByEmail(email);
      if (existingUser) {
        throw new AppError('User with this email already exists', 409);
      }

      // Validate input
      if (!name || !email || !password) {
        throw new AppError('Please provide name, email and password', 400);
      }

      if (password.length < 6) {
        throw new AppError('Password must be at least 6 characters long', 400);
      }

      // Create new user
      const user = new User({
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password
      });

      await user.save();

      // Generate JWT token
      const token = generateToken(user._id, user.email, user.role);

      // Return user (password excluded) and token
      return {
        user: user.toJSON(),
        token
      };
    } catch (error) {
      throw error;
    }
  },

  // 🔐 Login user
  login: async ({ email, password }) => {
    try {
      // Validate input
      if (!email || !password) {
        throw new AppError('Please provide email and password', 400);
      }

      // Find user and include password field
      const user = await User.findByEmail(email).select('+password');
      
      if (!user) {
        throw new AppError('Invalid email or password', 401);
      }

      // Check if account is locked
      if (user.isLocked) {
        throw new AppError('Account temporarily locked due to too many failed login attempts', 423);
      }

      // Check if user is active
      if (!user.isActive) {
        throw new AppError('Account has been deactivated', 401);
      }

      // Compare password
      const isPasswordCorrect = await user.comparePassword(password);
      
      if (!isPasswordCorrect) {
        // Increment login attempts
        await user.incLoginAttempts();
        throw new AppError('Invalid email or password', 401);
      }

      // Reset login attempts on successful login
      await user.resetLoginAttempts();

      // Generate JWT token
      const token = generateToken(user._id, user.email, user.role);

      // Return user (password excluded) and token
      return {
        user: user.toJSON(),
        token
      };
    } catch (error) {
      throw error;
    }
  },

  // 🔐 Get user profile
  getProfile: async (userId) => {
    try {
      const user = await User.findById(userId);
      
      if (!user) {
        throw new AppError('User not found', 404);
      }

      if (!user.isActive) {
        throw new AppError('Account has been deactivated', 401);
      }

      return user.toJSON();
    } catch (error) {
      throw error;
    }
  },

  // 🔐 Update user profile
  updateProfile: async (userId, updateData) => {
    try {
      // Fields that can be updated
      const allowedUpdates = ['name', 'bio', 'avatar'];
      
      // Filter update data to only allowed fields
      const filteredUpdates = {};
      Object.keys(updateData).forEach(key => {
        if (allowedUpdates.includes(key)) {
          filteredUpdates[key] = updateData[key];
        }
      });

      // Validate name if provided
      if (filteredUpdates.name && filteredUpdates.name.trim().length < 2) {
        throw new AppError('Name must be at least 2 characters long', 400);
      }

      // Find and update user
      const user = await User.findByIdAndUpdate(
        userId,
        filteredUpdates,
        { 
          new: true, 
          runValidators: true 
        }
      );

      if (!user) {
        throw new AppError('User not found', 404);
      }

      return user.toJSON();
    } catch (error) {
      throw error;
    }
  },

  // 🔐 Change user password
  changePassword: async (userId, { currentPassword, newPassword }) => {
    try {
      // Find user with password
      const user = await User.findById(userId).select('+password');
      
      if (!user) {
        throw new AppError('User not found', 404);
      }

      // Verify current password
      const isCurrentPasswordCorrect = await user.comparePassword(currentPassword);
      
      if (!isCurrentPasswordCorrect) {
        throw new AppError('Current password is incorrect', 401);
      }

      // Validate new password
      if (newPassword.length < 6) {
        throw new AppError('New password must be at least 6 characters long', 400);
      }

      // Check if new password is different from current
      const isSamePassword = await user.comparePassword(newPassword);
      if (isSamePassword) {
        throw new AppError('New password must be different from current password', 400);
      }

      // Update password
      user.password = newPassword;
      await user.save();

      return { message: 'Password changed successfully' };
    } catch (error) {
      throw error;
    }
  },

  // 🔐 Delete user account
  deleteAccount: async (userId) => {
    try {
      const user = await User.findById(userId);
      
      if (!user) {
        throw new AppError('User not found', 404);
      }

      // Soft delete - deactivate account instead of removing from database
      user.isActive = false;
      await user.save();

      return { message: 'Account deleted successfully' };
    } catch (error) {
      throw error;
    }
  },

  // 🔐 Get user by ID (for internal use)
  getUserById: async (userId) => {
    try {
      const user = await User.findById(userId);
      
      if (!user || !user.isActive) {
        throw new AppError('User not found', 404);
      }

      return user.toJSON();
    } catch (error) {
      throw error;
    }
  },

  // 🔐 Get user statistics (for dashboard)
  getUserStats: async (userId) => {
    try {
      const user = await User.findById(userId);
      
      if (!user) {
        throw new AppError('User not found', 404);
      }

      // You can add more statistics here as your platform grows
      const stats = {
        joinDate: user.createdAt,
        lastLogin: user.lastLogin,
        isEmailVerified: user.isEmailVerified,
        role: user.role,
        // Add product-related stats here when you integrate with Product model
        // totalProducts: await Product.countDocuments({ owner: userId, isActive: true }),
        // totalRentals: await Product.aggregate([...]) 
      };

      return stats;
    } catch (error) {
      throw error;
    }
  },

  // 🔐 Update last login time
  updateLastLogin: async (userId) => {
    try {
      await User.findByIdAndUpdate(userId, {
        lastLogin: new Date()
      });
    } catch (error) {
      // Don't throw error for this non-critical operation
      console.error('Failed to update last login:', error);
    }
  }
};

export default userService;
