import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import cors from "cors";
import hpp from "hpp";
import rateLimit from "express-rate-limit";
import compression from "compression";
import morgan from "morgan";

//importing database connections
import { connectDB } from "./src/database/connection.js";
import { config } from "./src/config/database.js";

//importing routes
import authRoutes from "./src/routes/auth.routes.js";
import productRoutes from "./src/routes/productRoutes.js";
import { errorMiddleware, notFoundMiddleware } from "./src/middleware/errorMiddleware.js";


//initializing express app
const app = express();

app.set("trust proxy", 1);

//connecting to database
connectDB();

if (config.isProduction) {
  app.use(morgan("combined"));
} else {
  app.use(morgan("dev"));
}

//security middlewares
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https:"],
        connectSrc: ["'self'"],
        fontSrc: ["'self'"],
        objectSrc: ["'none'"],
        mediaSrc: ["'self'"],
        frameSrc: ["'none'"],
      },
    },
    crossOriginEmbedderPolicy: false,
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true,
    },
  })
);

//general protection
const generalLimiter = rateLimit({
  windowMs: config.RATE_LIMIT_WINDOW || 15 * 60 * 1000,
  max: config.RATE_LIMIT_MAX_REQUESTS || 100,
  message: {
    success: false,
    error: "Too many requests, please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(generalLimiter);
app.use(hpp());
app.use(compression());

//cors configuration
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (mobile apps, curl, postman)
      if (!origin) return callback(null, true);

      const allowedOrigins = config.CLIENT_URL
        ? config.CLIENT_URL.split(",")
        : ["http://localhost:3000", "http://localhost:5173"];

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "X-HTTP-Method-Override",
      "Accept",
      "Cache-Control",
    ],
    exposedHeaders: ["X-Total-Count"],
    maxAge: 86400, // 24 hours
  })
);

//request parsers middlewares
app.use(
  express.json({
    limit: "10mb",
    verify: (req, res, buf) => {
      try {
        JSON.parse(buf);
      } catch (e) {
        res.status(400).json({
          success: false,
          message: "Invalid JSON",
        });
        return;
      }
    },
  })
);
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

//routes
// API routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to reWear - Community Clothing Exchange API",
    version: "1.0.0",
    status: "running",
    timestamp: new Date().toISOString(),
    endpoints: {
      auth: "/api/auth",
      products: "/api/products",
      health: "/health",
      docs: "/api/docs", // Future API documentation
    },
  });
});

//health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "reWear server is running smoothly",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: {
      used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024) + " MB",
      total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024) + " MB",
    },
    environment: config.NODE_ENV,
  });
});

// 404 handler for unknown routes
app.use(notFoundMiddleware);

//global error handler
app.use(errorMiddleware);

export default app;
