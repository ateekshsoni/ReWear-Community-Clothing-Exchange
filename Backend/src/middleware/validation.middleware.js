// 🔧 Validation Middleware using Joi
// Validates request data against defined schemas

import Joi from "joi";
import { AppError } from "./errorMiddleware.js";

// 🔧 Main validation middleware factory
const validate = (schema, property = "body") => {
  return (req, res, next) => {
    const { error } = schema.validate(req[property], {
      abortEarly: false, // Return all validation errors
      allowUnknown: false, // Don't allow unknown fields
      stripUnknown: true, // Remove unknown fields from the request
    });

    if (error) {
      // Create a Joi-compatible error for our error handler
      const validationError = new Error("Validation failed");
      validationError.isJoi = true;
      validationError.details = error.details;
      return next(validationError);
    }

    next();
  };
};

// 🔧 Common validation schemas that you can reuse

// User registration validation
const registerSchema = Joi.object({
  name: Joi.string().min(2).max(50).required().messages({
    "string.min": "Name must be at least 2 characters long",
    "string.max": "Name cannot exceed 50 characters",
    "any.required": "Name is required",
  }),

  email: Joi.string().email().required().messages({
    "string.email": "Please provide a valid email address",
    "any.required": "Email is required",
  }),

  password: Joi.string()
    .min(6)
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)"))
    .required()
    .messages({
      "string.min": "Password must be at least 6 characters long",
      "string.pattern.base":
        "Password must contain at least one uppercase letter, one lowercase letter, and one number",
      "any.required": "Password is required",
    }),
});

// User login validation
const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Please provide a valid email address",
    "any.required": "Email is required",
  }),

  password: Joi.string().required().messages({
    "any.required": "Password is required",
  }),
});

// Change password validation
const changePasswordSchema = Joi.object({
  currentPassword: Joi.string().required().messages({
    "any.required": "Current password is required",
  }),

  newPassword: Joi.string()
    .min(6)
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)"))
    .required()
    .messages({
      "string.min": "New password must be at least 6 characters long",
      "string.pattern.base":
        "New password must contain at least one uppercase letter, one lowercase letter, and one number",
      "any.required": "New password is required",
    }),
});

// Task validation schema
const taskSchema = Joi.object({
  title: Joi.string().min(3).max(100).required().messages({
    "string.min": "Title must be at least 3 characters long",
    "string.max": "Title cannot exceed 100 characters",
    "any.required": "Title is required",
  }),

  description: Joi.string().max(500).optional().messages({
    "string.max": "Description cannot exceed 500 characters",
  }),

  status: Joi.string()
    .valid("pending", "in-progress", "completed")
    .default("pending")
    .messages({
      "any.only": "Status must be one of: pending, in-progress, completed",
    }),

  priority: Joi.string()
    .valid("low", "medium", "high")
    .default("medium")
    .messages({
      "any.only": "Priority must be one of: low, medium, high",
    }),

  dueDate: Joi.date().optional().messages({
    "date.base": "Due date must be a valid date",
  }),
});

// Task update validation (all fields optional)
const taskUpdateSchema = Joi.object({
  title: Joi.string().min(3).max(100).optional(),

  description: Joi.string().max(500).optional(),

  status: Joi.string().valid("pending", "in-progress", "completed").optional(),

  priority: Joi.string().valid("low", "medium", "high").optional(),

  dueDate: Joi.date().optional(),
});

// MongoDB ObjectId validation
const objectIdSchema = Joi.object({
  id: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
      "string.pattern.base": "Invalid ID format",
      "any.required": "ID is required",
    }),
});

// Pagination validation
const paginationSchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),

  limit: Joi.number().integer().min(1).max(100).default(10),

  sort: Joi.string().optional(),

  search: Joi.string().optional(),
});

// 🛠 Ready-to-use validation middleware
const validateRegister = validate(registerSchema);
const validateLogin = validate(loginSchema);
const validateChangePassword = validate(changePasswordSchema);
const validateTask = validate(taskSchema);
const validateTaskUpdate = validate(taskUpdateSchema);
const validateObjectId = validate(objectIdSchema, "params");
const validatePagination = validate(paginationSchema, "query");

// Create schemas object for export
const schemas = {
  registerSchema,
  loginSchema,
  changePasswordSchema,
  taskSchema,
  taskUpdateSchema,
  objectIdSchema,
  paginationSchema,
};

export {
  validate,
  validateRegister,
  validateLogin,
  validateChangePassword,
  validateTask,
  validateTaskUpdate,
  validateObjectId,
  validatePagination,
  schemas,
};
