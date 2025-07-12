// 🔧 Product Routes
// Defines all product-related endpoints for reWear platform

import express from 'express';
import productController from '../controllers/productController.js';
import { authMiddleware, optionalAuth } from '../middleware/auth.middleware.js';

const router = express.Router();

// 🔐 Public routes (no authentication required)

// GET /api/products - Get all products with filtering
router.get('/', 
  optionalAuth, // Optional auth to show personalized results if logged in
  productController.getAllProducts
);

// GET /api/products/categories - Get all available categories
router.get('/categories', 
  productController.getCategories
);

// GET /api/products/:id - Get single product by ID
router.get('/:id', 
  optionalAuth, // Optional auth for personalized view
  productController.getProductById
);

// 🔐 Protected routes (authentication required)

// POST /api/products - Create new product
router.post('/', 
  authMiddleware, // Require authentication
  productController.createProduct
);

// GET /api/products/user/my-products - Get current user's products
router.get('/user/my-products', 
  authMiddleware, // Require authentication
  productController.getMyProducts
);

// PUT /api/products/:id - Update product (owner only)
router.put('/:id', 
  authMiddleware, // Require authentication
  productController.updateProduct
);

// DELETE /api/products/:id - Delete product (owner only)
router.delete('/:id', 
  authMiddleware, // Require authentication
  productController.deleteProduct
);

// POST /api/products/:id/rent - Rent a product
router.post('/:id/rent', 
  authMiddleware, // Require authentication
  productController.rentProduct
);

// POST /api/products/:id/return - Return a rented product
router.post('/:id/return', 
  authMiddleware, // Require authentication
  productController.returnProduct
);

// 🛠 Future enhancement routes (currently commented out)
// You can uncomment and implement these as your platform grows

// 📝 Reviews and ratings
// router.post('/:id/reviews', authMiddleware, productController.addReview);
// router.get('/:id/reviews', productController.getProductReviews);
// router.put('/reviews/:reviewId', authMiddleware, productController.updateReview);
// router.delete('/reviews/:reviewId', authMiddleware, productController.deleteReview);

// 🔖 Favorites/Wishlist
// router.post('/:id/favorite', authMiddleware, productController.addToFavorites);
// router.delete('/:id/favorite', authMiddleware, productController.removeFromFavorites);
// router.get('/user/favorites', authMiddleware, productController.getUserFavorites);

// 📊 Analytics and reporting (for owners)
// router.get('/:id/analytics', authMiddleware, productController.getProductAnalytics);
// router.get('/user/earnings', authMiddleware, productController.getUserEarnings);

// 💬 Product inquiries/messaging
// router.post('/:id/inquire', authMiddleware, productController.sendInquiry);
// router.get('/user/inquiries', authMiddleware, productController.getUserInquiries);

// 📅 Availability calendar
// router.get('/:id/availability', productController.getProductAvailability);
// router.put('/:id/availability', authMiddleware, productController.updateAvailability);

// 🚀 Product promotion (featured listings)
// router.post('/:id/promote', authMiddleware, productController.promoteProduct);
// router.get('/featured', productController.getFeaturedProducts);

// 🏷️ Custom tags management
// router.put('/:id/tags', authMiddleware, productController.updateProductTags);
// router.get('/tags/popular', productController.getPopularTags);

export default router;
