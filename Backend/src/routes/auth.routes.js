// 🔧 Authentication Routes
// Defines all auth-related endpoints

import express from 'express';
import authController from '../controllers/auth.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { 
  validateRegister, 
  validateLogin,
  validate,
  schemas 
} from '../middleware/validation.middleware.js';

const router = express.Router();

// 🔐 Public routes (no authentication required)

// POST /api/auth/register - Register new user
router.post('/register', 
  validateRegister,  // Validate registration data
  authController.register
);

// POST /api/auth/login - Login user
router.post('/login', 
  validateLogin,     // Validate login credentials
  authController.login
);

// 🔐 Protected routes (authentication required)

// GET /api/auth/profile - Get current user profile
router.get('/profile', 
  authMiddleware,    // Require authentication
  authController.getProfile
);

// PUT /api/auth/profile - Update current user profile
router.put('/profile', 
  authMiddleware,    // Require authentication
  // 🛠 Add validation for profile update if needed
  // validate(schemas.profileUpdateSchema),
  authController.updateProfile
);

// POST /api/auth/change-password - Change user password
router.post('/change-password', 
  authMiddleware,    // Require authentication
  validate(schemas.changePasswordSchema),
  authController.changePassword
);

// POST /api/auth/verify-token - Verify if token is valid
router.post('/verify-token', 
  authMiddleware,    // Require authentication
  authController.verifyToken
);

// POST /api/auth/logout - Logout user (optional endpoint)
router.post('/logout', 
  authMiddleware,    // Require authentication
  authController.logout
);

// DELETE /api/auth/account - Delete user account
router.delete('/account', 
  authMiddleware,    // Require authentication
  authController.deleteAccount
);

// 🛠 Additional auth routes you might need for your hackathon:

// 📧 Email verification routes
// router.get('/verify-email/:token', authController.verifyEmail);
// router.post('/resend-verification', authMiddleware, authController.resendVerification);

// 🔑 Password reset routes
// router.post('/forgot-password', 
//   validate(Joi.object({ email: Joi.string().email().required() })),
//   authController.forgotPassword
// );
// router.post('/reset-password/:token', 
//   validate(Joi.object({ password: schemas.registerSchema.extract('password') })),
//   authController.resetPassword
// );

// 🔐 Two-factor authentication routes
// router.post('/enable-2fa', authMiddleware, authController.enable2FA);
// router.post('/verify-2fa', authMiddleware, authController.verify2FA);
// router.post('/disable-2fa', authMiddleware, authController.disable2FA);

// 🔒 Session management routes
// router.get('/sessions', authMiddleware, authController.getUserSessions);
// router.delete('/sessions/:sessionId', authMiddleware, authController.terminateSession);
// router.delete('/sessions', authMiddleware, authController.terminateAllSessions);

export default router;