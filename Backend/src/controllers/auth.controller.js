// 🔧 Auth Controller
// Handles authentication-related HTTP requests

import userService from "../services/userService.js";
import { AppError } from "../middleware/errorMiddleware.js";

const authController = {
  // 🔐 POST /api/auth/register
  // Register a new user
  register: async (req, res, next) => {
    try {
      const { name, email, password } = req.body;

      const result = await userService.register({ name, email, password });

      res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: {
          user: result.user,
          token: result.token
        }
      });
    } catch (error) {
      next(error);
    }
  },

  // 🔐 POST /api/auth/login
  // Login user with email and password
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const result = await userService.login({ email, password });

      res.status(200).json({
        success: true,
        message: "Login successful",
        data: {
          user: result.user,
          token: result.token
        }
      });
    } catch (error) {
      next(error);
    }
  },

  // 🔐 GET /api/auth/profile
  // Get current user profile (protected route)
  getProfile: async (req, res, next) => {
    try {
      const userId = req.userId; // From auth middleware

      const user = await userService.getProfile(userId);

      res.status(200).json({
        success: true,
        message: "Profile retrieved successfully",
        data: {
          user
        }
      });
    } catch (error) {
      next(error);
    }
  },

  // 🔐 PUT /api/auth/profile
  // Update current user profile (protected route)
  updateProfile: async (req, res, next) => {
    try {
      const userId = req.userId; // From auth middleware
      const updateData = req.body;

      const user = await userService.updateProfile(userId, updateData);

      res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        data: {
          user
        }
      });
    } catch (error) {
      next(error);
    }
  },

  // 🔐 POST /api/auth/change-password
  // Change user password (protected route)
  changePassword: async (req, res, next) => {
    try {
      const userId = req.userId; // From auth middleware
      const { currentPassword, newPassword } = req.body;

      const result = await userService.changePassword(userId, {
        currentPassword,
        newPassword,
      });

      res.status(200).json({
        success: true,
        message: result.message,
        data: null
      });
    } catch (error) {
      next(error);
    }
  },

  // 🔐 POST /api/auth/logout
  // Logout user (optional - mainly for client-side token removal)
  logout: async (req, res, next) => {
    try {
      // In JWT-based auth, logout is mainly handled client-side
      // You could implement token blacklisting here if needed

      res.status(200).json({
        success: true,
        message: "Logout successful",
        data: null
      });
    } catch (error) {
      next(error);
    }
  },

  // 🔐 DELETE /api/auth/account
  // Delete user account (protected route)
  deleteAccount: async (req, res, next) => {
    try {
      const userId = req.userId; // From auth middleware

      const result = await userService.deleteAccount(userId);

      res.status(200).json({
        success: true,
        message: result.message,
        data: null
      });
    } catch (error) {
      next(error);
    }
  },

  // 🔐 POST /api/auth/verify-token
  // Verify if token is valid (protected route)
  verifyToken: async (req, res, next) => {
    try {
      // If we reach here, token is valid (auth middleware passed)
      const user = req.user;

      res.status(200).json({
        success: true,
        message: "Token is valid",
        data: {
          isValid: true,
          user: user.toJSON(),
        }
      });
    } catch (error) {
      next(error);
    }
  },

  // 🛠 Additional auth endpoints you might need:

  // 📧 Email verification
  // verifyEmail: async (req, res, next) => {
  //   try {
  //     const { token } = req.params;
  //     // Implement email verification logic
  //     responseFormatter.success(res, null, 'Email verified successfully');
  //   } catch (error) {
  //     next(error);
  //   }
  // },

  // 🔑 Password reset request
  // forgotPassword: async (req, res, next) => {
  //   try {
  //     const { email } = req.body;
  //     // Implement forgot password logic
  //     responseFormatter.success(res, null, 'Password reset email sent');
  //   } catch (error) {
  //     next(error);
  //   }
  // },

  // 🔑 Password reset
  // resetPassword: async (req, res, next) => {
  //   try {
  //     const { token } = req.params;
  //     const { password } = req.body;
  //     // Implement password reset logic
  //     responseFormatter.success(res, null, 'Password reset successful');
  //   } catch (error) {
  //     next(error);
  //   }
  // }
};

export default authController;
