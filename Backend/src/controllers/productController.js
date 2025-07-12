// 🔧 Product Controller
// Handles product-related HTTP requests for reWear platform

import Product from "../models/Product.js";
import User from "../models/User.js";
import { AppError } from "../middleware/errorMiddleware.js";

const productController = {
  // 📦 POST /api/products - Create new product (Protected)
  createProduct: async (req, res, next) => {
    try {
      const {
        title,
        description,
        category,
        brand,
        size,
        color,
        pricePerDay,
        condition,
        images,
        location,
        tags,
        specifications,
      } = req.body;

      // Basic validation
      if (!title || !description || !category || !size || !color || !pricePerDay || !condition) {
        throw new AppError("Please provide all required fields", 400);
      }

      if (!location || !location.city) {
        throw new AppError("Please provide location information", 400);
      }

      // Create product with owner as current user
      const product = new Product({
        title,
        description,
        category,
        brand,
        size,
        color,
        pricePerDay,
        condition,
        images: images || [],
        location,
        tags: tags || [],
        specifications: specifications || {},
        owner: req.userId, // From auth middleware
      });

      await product.save();

      // Populate owner information for response
      await product.populate("owner", "name email");

      res.status(201).json({
        success: true,
        message: "Product created successfully",
        data: {
          product,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  // 📦 GET /api/products - Get all products with filtering and pagination
  getAllProducts: async (req, res, next) => {
    try {
      const {
        page = 1,
        limit = 10,
        category,
        city,
        state,
        minPrice,
        maxPrice,
        size,
        condition,
        available,
        search,
        sortBy = "createdAt",
        sortOrder = "desc",
      } = req.query;

      // Build filter object
      const filters = { isActive: true };

      if (category) filters.category = category;
      if (size) filters.size = size;
      if (condition) filters.condition = condition;
      if (available === "true") filters.isAvailable = true;

      // Price range filter
      if (minPrice || maxPrice) {
        filters.pricePerDay = {};
        if (minPrice) filters.pricePerDay.$gte = parseFloat(minPrice);
        if (maxPrice) filters.pricePerDay.$lte = parseFloat(maxPrice);
      }

      // Location filter
      if (city) filters["location.city"] = new RegExp(city, "i");
      if (state) filters["location.state"] = new RegExp(state, "i");

      // Build query
      let query = Product.find(filters).populate("owner", "name email");

      // Text search if provided
      if (search) {
        query = Product.find({
          ...filters,
          $text: { $search: search },
        }).populate("owner", "name email");
      }

      // Sorting
      const sortOptions = {};
      sortOptions[sortBy] = sortOrder === "desc" ? -1 : 1;
      query = query.sort(sortOptions);

      // Pagination
      const skip = (parseInt(page) - 1) * parseInt(limit);
      query = query.skip(skip).limit(parseInt(limit));

      // Execute query
      const products = await query;
      const total = await Product.countDocuments(filters);

      res.status(200).json({
        success: true,
        message: "Products retrieved successfully",
        data: {
          products,
          pagination: {
            current: parseInt(page),
            pages: Math.ceil(total / parseInt(limit)),
            total,
            limit: parseInt(limit),
          },
        },
      });
    } catch (error) {
      next(error);
    }
  },

  // 📦 GET /api/products/:id - Get single product by ID
  getProductById: async (req, res, next) => {
    try {
      const { id } = req.params;

      const product = await Product.findById(id)
        .populate("owner", "name email avatar")
        .populate("currentRenter", "name email");

      if (!product || !product.isActive) {
        throw new AppError("Product not found", 404);
      }

      res.status(200).json({
        success: true,
        message: "Product retrieved successfully",
        data: {
          product,
        },
      });
    } catch (error) {
      if (error.name === "CastError") {
        return next(new AppError("Invalid product ID", 400));
      }
      next(error);
    }
  },

  // 📦 PUT /api/products/:id - Update product (Protected - Owner only)
  updateProduct: async (req, res, next) => {
    try {
      const { id } = req.params;
      const updateData = req.body;

      // Find product and check ownership
      const product = await Product.findById(id);

      if (!product || !product.isActive) {
        throw new AppError("Product not found", 404);
      }

      // Check if user owns the product
      if (product.owner.toString() !== req.userId.toString()) {
        throw new AppError("Access denied. You can only update your own products", 403);
      }

      // Prevent updating certain fields
      delete updateData.owner;
      delete updateData.totalRentals;
      delete updateData.currentRenter;
      delete updateData.rentedUntil;

      // Update product
      Object.assign(product, updateData);
      await product.save();

      // Populate owner for response
      await product.populate("owner", "name email");

      res.status(200).json({
        success: true,
        message: "Product updated successfully",
        data: {
          product,
        },
      });
    } catch (error) {
      if (error.name === "CastError") {
        return next(new AppError("Invalid product ID", 400));
      }
      next(error);
    }
  },

  // 📦 DELETE /api/products/:id - Delete product (Protected - Owner only)
  deleteProduct: async (req, res, next) => {
    try {
      const { id } = req.params;

      // Find product and check ownership
      const product = await Product.findById(id);

      if (!product || !product.isActive) {
        throw new AppError("Product not found", 404);
      }

      // Check if user owns the product
      if (product.owner.toString() !== req.userId.toString()) {
        throw new AppError("Access denied. You can only delete your own products", 403);
      }

      // Check if product is currently rented
      if (product.isCurrentlyRented) {
        throw new AppError("Cannot delete product that is currently rented", 400);
      }

      // Soft delete - mark as inactive instead of removing from database
      product.isActive = false;
      await product.save();

      res.status(200).json({
        success: true,
        message: "Product deleted successfully",
        data: null,
      });
    } catch (error) {
      if (error.name === "CastError") {
        return next(new AppError("Invalid product ID", 400));
      }
      next(error);
    }
  },

  // 📦 GET /api/products/user/my-products - Get current user's products (Protected)
  getMyProducts: async (req, res, next) => {
    try {
      const { page = 1, limit = 10, status = "all" } = req.query;

      // Build filter
      const filters = { owner: req.userId };

      if (status === "active") filters.isActive = true;
      if (status === "available") {
        filters.isActive = true;
        filters.isAvailable = true;
      }
      if (status === "rented") {
        filters.isActive = true;
        filters.isAvailable = false;
      }

      // Pagination
      const skip = (parseInt(page) - 1) * parseInt(limit);

      const products = await Product.find(filters)
        .populate("currentRenter", "name email")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit));

      const total = await Product.countDocuments(filters);

      res.status(200).json({
        success: true,
        message: "Your products retrieved successfully",
        data: {
          products,
          pagination: {
            current: parseInt(page),
            pages: Math.ceil(total / parseInt(limit)),
            total,
            limit: parseInt(limit),
          },
        },
      });
    } catch (error) {
      next(error);
    }
  },

  // 📦 POST /api/products/:id/rent - Rent a product (Protected)
  rentProduct: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { days = 1 } = req.body;

      // Validate days
      if (!days || days < 1 || days > 30) {
        throw new AppError("Rental period must be between 1 and 30 days", 400);
      }

      // Find product
      const product = await Product.findById(id).populate("owner", "name email");

      if (!product || !product.isActive) {
        throw new AppError("Product not found", 404);
      }

      // Check if product is available
      if (!product.isAvailable || product.isCurrentlyRented) {
        throw new AppError("Product is not available for rent", 400);
      }

      // Check if user is trying to rent their own product
      if (product.owner._id.toString() === req.userId.toString()) {
        throw new AppError("You cannot rent your own product", 400);
      }

      // Rent the product
      await product.rentTo(req.userId, parseInt(days));

      // Calculate total cost
      const totalCost = product.pricePerDay * parseInt(days);

      res.status(200).json({
        success: true,
        message: "Product rented successfully",
        data: {
          product,
          rental: {
            renter: req.userId,
            days: parseInt(days),
            totalCost,
            rentedUntil: product.rentedUntil,
          },
        },
      });
    } catch (error) {
      if (error.name === "CastError") {
        return next(new AppError("Invalid product ID", 400));
      }
      next(error);
    }
  },

  // 📦 POST /api/products/:id/return - Return a rented product (Protected)
  returnProduct: async (req, res, next) => {
    try {
      const { id } = req.params;

      // Find product
      const product = await Product.findById(id);

      if (!product || !product.isActive) {
        throw new AppError("Product not found", 404);
      }

      // Check if user is the current renter or the owner
      const isRenter = product.currentRenter && product.currentRenter.toString() === req.userId.toString();
      const isOwner = product.owner.toString() === req.userId.toString();

      if (!isRenter && !isOwner) {
        throw new AppError("You can only return products you have rented or own", 403);
      }

      // Check if product is actually rented
      if (!product.isCurrentlyRented) {
        throw new AppError("Product is not currently rented", 400);
      }

      // Return the product
      await product.returnProduct();

      res.status(200).json({
        success: true,
        message: "Product returned successfully",
        data: {
          product,
        },
      });
    } catch (error) {
      if (error.name === "CastError") {
        return next(new AppError("Invalid product ID", 400));
      }
      next(error);
    }
  },

  // 📦 GET /api/products/categories - Get all available categories
  getCategories: async (req, res, next) => {
    try {
      const categories = [
        "dresses",
        "tops",
        "bottoms",
        "outerwear",
        "footwear",
        "accessories",
        "formal-wear",
        "casual-wear",
        "sportswear",
        "vintage",
        "designer",
        "other"
      ];

      res.status(200).json({
        success: true,
        message: "Categories retrieved successfully",
        data: {
          categories,
        },
      });
    } catch (error) {
      next(error);
    }
  },
};

export default productController;
