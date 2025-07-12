// 🔧 User Service
// Business logic layer for user operations

import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { AppError } from "../middlewares/errorHandler.js";
import logger from "../utils/logger.js";

class UserService {
  // 🔧 Generate JWT token
  generateToken(userId) {
    if (!process.env.JWT_SECRET) {
      throw new AppError("JWT_SECRET is not configured", 500);
    }

    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE || "24h",
    });
  }

  // 🔧 Register new user
  async register(userData) {
    try {
      const { name, email, password } = userData;

      // Check if user already exists
      const existingUser = await User.findByEmail(email);
      if (existingUser) {
        throw new AppError("User with this email already exists", 409);
      }

      // Create new user
      const user = new User({
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password,
      });

      await user.save();

      // Generate token
      const token = this.generateToken(user._id);

      logger.info(`New user registered: ${email}`);

      return {
        user: user.toJSON(), // This removes password and sensitive data
        token,
      };
    } catch (error) {
      logger.error("Registration failed:", error.message);
      throw error;
    }
  }

  // 🔧 Login user
  async login(credentials) {
    try {
      const { email, password } = credentials;

      // Find user and include password for comparison
      const user = await User.findByEmail(email).select("+password");

      if (!user) {
        throw new AppError("Invalid email or password", 401);
      }

      // Check if account is locked
      if (user.isLocked) {
        throw new AppError(
          "Account temporarily locked due to too many failed login attempts",
          423
        );
      }

      // Check if account is active
      if (!user.isActive) {
        throw new AppError("Account is deactivated", 401);
      }

      // Verify password
      const isPasswordValid = await user.comparePassword(password);

      if (!isPasswordValid) {
        // Increment login attempts
        await user.incLoginAttempts();
        throw new AppError("Invalid email or password", 401);
      }

      // Reset login attempts on successful login
      await user.resetLoginAttempts();

      // Generate token
      const token = this.generateToken(user._id);

      logger.info(`User logged in: ${email}`);

      return {
        user: user.toJSON(),
        token,
      };
    } catch (error) {
      logger.error("Login failed:", error.message);
      throw error;
    }
  }

  // 🔧 Get user profile
  async getProfile(userId) {
    try {
      const user = await User.findById(userId);

      if (!user) {
        throw new AppError("User not found", 404);
      }

      if (!user.isActive) {
        throw new AppError("Account is deactivated", 401);
      }

      return user.toJSON();
    } catch (error) {
      logger.error("Get profile failed:", error.message);
      throw error;
    }
  }

  // 🔧 Update user profile
  async updateProfile(userId, updateData) {
    try {
      const allowedUpdates = ["name", "bio", "avatar"]; // 🛠 Add more fields as needed
      const updates = {};

      // Filter allowed updates
      Object.keys(updateData).forEach((key) => {
        if (allowedUpdates.includes(key)) {
          updates[key] = updateData[key];
        }
      });

      if (Object.keys(updates).length === 0) {
        throw new AppError("No valid fields to update", 400);
      }

      const user = await User.findByIdAndUpdate(userId, updates, {
        new: true,
        runValidators: true,
      });

      if (!user) {
        throw new AppError("User not found", 404);
      }

      logger.info(`Profile updated for user: ${user.email}`);

      return user.toJSON();
    } catch (error) {
      logger.error("Profile update failed:", error.message);
      throw error;
    }
  }

  // 🔧 Change password
  async changePassword(userId, passwordData) {
    try {
      const { currentPassword, newPassword } = passwordData;

      const user = await User.findById(userId).select("+password");

      if (!user) {
        throw new AppError("User not found", 404);
      }

      // Verify current password
      const isCurrentPasswordValid = await user.comparePassword(
        currentPassword
      );
      if (!isCurrentPasswordValid) {
        throw new AppError("Current password is incorrect", 401);
      }

      // Update password
      user.password = newPassword;
      await user.save();

      logger.info(`Password changed for user: ${user.email}`);

      return { message: "Password updated successfully" };
    } catch (error) {
      logger.error("Password change failed:", error.message);
      throw error;
    }
  }

  // 🔧 Get all users (admin only)
  async getAllUsers(options = {}) {
    try {
      const {
        page = 1,
        limit = 10,
        sort = "createdAt",
        search = "",
        role = "",
        isActive,
      } = options;

      // Build query
      const query = {};

      if (search) {
        query.$or = [
          { name: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
        ];
      }

      if (role) {
        query.role = role;
      }

      if (typeof isActive === "boolean") {
        query.isActive = isActive;
      }

      // Execute query with pagination
      const users = await User.find(query)
        .sort({ [sort]: -1 })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .select("-password");

      const total = await User.countDocuments(query);

      return {
        users,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      logger.error("Get all users failed:", error.message);
      throw error;
    }
  }

  // 🔧 Delete user account
  async deleteAccount(userId) {
    try {
      const user = await User.findById(userId);

      if (!user) {
        throw new AppError("User not found", 404);
      }

      // Instead of hard delete, deactivate the account
      // await User.findByIdAndDelete(userId); // Hard delete

      // Soft delete (recommended)
      user.isActive = false;
      user.email = `deleted_${Date.now()}_${user.email}`;
      await user.save();

      logger.info(`Account deleted for user: ${user.email}`);

      return { message: "Account deleted successfully" };
    } catch (error) {
      logger.error("Account deletion failed:", error.message);
      throw error;
    }
  }
}

export default new UserService();
