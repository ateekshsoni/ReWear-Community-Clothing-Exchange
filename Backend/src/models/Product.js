// 🔧 Product Model
// Mongoose schema for fashion items available for rent/exchange

import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    // 🔧 Basic product information
    title: {
      type: String,
      required: [true, "Product title is required"],
      trim: true,
      minlength: [3, "Title must be at least 3 characters long"],
      maxlength: [100, "Title cannot exceed 100 characters"],
    },

    description: {
      type: String,
      required: [true, "Product description is required"],
      trim: true,
      minlength: [10, "Description must be at least 10 characters long"],
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },

    // 🔧 Product categorization
    category: {
      type: String,
      required: [true, "Product category is required"],
      enum: [
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
      ],
    },

    brand: {
      type: String,
      trim: true,
      maxlength: [50, "Brand name cannot exceed 50 characters"],
    },

    size: {
      type: String,
      required: [true, "Size is required"],
      enum: ["XS", "S", "M", "L", "XL", "XXL", "XXXL", "One Size"],
    },

    color: {
      type: String,
      required: [true, "Color is required"],
      trim: true,
      maxlength: [30, "Color cannot exceed 30 characters"],
    },

    // 🔧 Pricing and availability
    pricePerDay: {
      type: Number,
      required: [true, "Price per day is required"],
      min: [0, "Price cannot be negative"],
      max: [10000, "Price cannot exceed $10,000 per day"],
    },

    condition: {
      type: String,
      required: [true, "Condition is required"],
      enum: ["excellent", "good", "fair", "worn"],
    },

    // 🔧 Product status and availability
    isAvailable: {
      type: Boolean,
      default: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    // 🔧 Product images
    images: [{
      type: String,
      validate: {
        validator: function(v) {
          return /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(v);
        },
        message: 'Please provide a valid image URL'
      }
    }],

    // 🔧 Owner information
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Product owner is required"],
    },

    // 🔧 Location and delivery
    location: {
      city: {
        type: String,
        required: [true, "City is required"],
        trim: true,
        maxlength: [50, "City name cannot exceed 50 characters"],
      },
      state: {
        type: String,
        trim: true,
        maxlength: [50, "State name cannot exceed 50 characters"],
      },
      zipCode: {
        type: String,
        trim: true,
        match: [/^\d{5}(-\d{4})?$/, "Please provide a valid ZIP code"],
      },
    },

    // 🔧 Rental tracking
    totalRentals: {
      type: Number,
      default: 0,
    },

    currentRenter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    rentedUntil: {
      type: Date,
      default: null,
    },

    // 🔧 Product metrics and feedback
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },

    reviewCount: {
      type: Number,
      default: 0,
    },

    // 🔧 Additional features for future development
    tags: [{
      type: String,
      trim: true,
      maxlength: [20, "Tag cannot exceed 20 characters"],
    }],

    specifications: {
      material: {
        type: String,
        trim: true,
        maxlength: [100, "Material description cannot exceed 100 characters"],
      },
      careInstructions: {
        type: String,
        trim: true,
        maxlength: [200, "Care instructions cannot exceed 200 characters"],
      },
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// 🔧 Indexes for better performance
productSchema.index({ category: 1 });
productSchema.index({ isAvailable: 1, isActive: 1 });
productSchema.index({ pricePerDay: 1 });
productSchema.index({ "location.city": 1 });
productSchema.index({ owner: 1 });
productSchema.index({ createdAt: -1 });
productSchema.index({ rating: -1 });

// 🔧 Text index for search functionality
productSchema.index({
  title: "text",
  description: "text",
  brand: "text",
  tags: "text"
});

// 🔧 Virtual for product URL
productSchema.virtual("productUrl").get(function () {
  return `/api/products/${this._id}`;
});

// 🔧 Virtual to check if product is currently rented
productSchema.virtual("isCurrentlyRented").get(function () {
  return this.currentRenter && this.rentedUntil && new Date() < this.rentedUntil;
});

// 🔧 Virtual for days until available (if rented)
productSchema.virtual("daysUntilAvailable").get(function () {
  if (!this.isCurrentlyRented) return 0;
  const diffTime = this.rentedUntil - new Date();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
});

// 🔧 Pre-save middleware to update availability based on rental status
productSchema.pre("save", function (next) {
  // If rentedUntil date has passed, make product available again
  if (this.rentedUntil && new Date() > this.rentedUntil) {
    this.isAvailable = true;
    this.currentRenter = null;
    this.rentedUntil = null;
  }
  
  // If product is rented, mark as unavailable
  if (this.currentRenter && this.rentedUntil && new Date() < this.rentedUntil) {
    this.isAvailable = false;
  }

  next();
});

// 🔧 Static method to find available products
productSchema.statics.findAvailable = function (filters = {}) {
  return this.find({
    isAvailable: true,
    isActive: true,
    ...filters,
  }).populate("owner", "name email");
};

// 🔧 Static method to find products by category
productSchema.statics.findByCategory = function (category) {
  return this.find({
    category: category,
    isActive: true,
  }).populate("owner", "name email");
};

// 🔧 Static method to find products by location
productSchema.statics.findByLocation = function (city, state = null) {
  const query = { "location.city": new RegExp(city, "i"), isActive: true };
  if (state) {
    query["location.state"] = new RegExp(state, "i");
  }
  return this.find(query).populate("owner", "name email");
};

// 🔧 Instance method to rent product
productSchema.methods.rentTo = function (renterId, days) {
  this.currentRenter = renterId;
  this.rentedUntil = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
  this.isAvailable = false;
  this.totalRentals += 1;
  return this.save();
};

// 🔧 Instance method to return product
productSchema.methods.returnProduct = function () {
  this.currentRenter = null;
  this.rentedUntil = null;
  this.isAvailable = true;
  return this.save();
};

// 🔧 Transform output for API responses
productSchema.methods.toJSON = function () {
  const productObject = this.toObject();
  // Add computed fields
  productObject.isCurrentlyRented = this.isCurrentlyRented;
  productObject.daysUntilAvailable = this.daysUntilAvailable;
  return productObject;
};

const Product = mongoose.model("Product", productSchema);

export default Product;
