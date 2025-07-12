import dotenv from "dotenv";
dotenv.config();

const NODE_ENV = process.env.NODE_ENV || "development";
const isDevelopment = NODE_ENV === "development";
const isProduction = NODE_ENV === "production";
const isTest = NODE_ENV === "test";

//utility function
function parseBoolean(value, defaultValue = false) {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") {
    return value.toLowerCase() === "true";
  }
  return defaultValue;
}
function parseInteger(value, defaultValue = 0) {
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? defaultValue : parsed;
}
function parseArray(value, defaultValue = []) {
  if (Array.isArray(value)) return value;
  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }
  return defaultValue;
}

function validateRequiredEnvVars() {
  const required = {
    development: ["MONGODB_URI"],
    production: [
      "MONGODB_URI",
      "JWT_SECRET",
      "JWT_REFRESH_SECRET",
      "SESSION_SECRET",
    ],
    test: ["MONGODB_TEST_URI"],
  };
  const requiredEnv = required[NODE_ENV.toLowerCase()] || require.development;
  const missing = requiredEnv.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    if (isProduction) {
      throw new Error(
        `Missing required environment variables: ${missing.join(", ")}`
      );
    } else {
      console.warn(
        `Warning: Missing required environment variables: ${missing.join(", ")}`
      );
      console.warn(
        "Using default values for missing variables in development mode."
      );
    }
  }
}
function validateConfiguration(config) {
  const errors = [];
  if (isProduction) {
    if (!config.JWT_SECRET || config.JWT_SECRET.length < 32) {
      errors.push("JWT_SECRET must be at least 32 characters in production");
    }

    if (!config.SESSION_SECRET || config.SESSION_SECRET.length < 32) {
      errors.push(
        "SESSION_SECRET must be at least 32 characters in production"
      );
    }

    if (config.BCRYPT_ROUNDS < 10) {
      errors.push("BCRYPT_ROUNDS should be at least 10 in production");
    }
  }

  if (errors.length > 0) {
    throw Error(`Configuration validation failed:\n${errors.join("\n")}`);
  }
}

function sanitizeonfigForLogging(config) {
  const sensitiveKeys = [
    "JWT_SECRET",
    "JWT_REFRESH_SECRET",
    "SESSION_SECRET",
    "COOKIE_SECRET",
    "MONGODB_URI",
    "MONGODB_TEST_URI",
    "REDIS_URL",
    "REDIS_PASSWORD",
  ];
  const sanitizedConfig = { ...config };
  sensitiveKeys.forEach((key) => {
    if (sanitizedConfig[key]) {
      sanitizedConfig[key] = "******"; // Mask sensitive values
    }
  });
  return sanitizedConfig;
}

//run validateRequiredEnvVars and validateConfiguration
validateRequiredEnvVars();

const config = {
  NODE_ENV,
  isDevelopment,
  isProduction,
  isTest,

  // Application settings
  APP_NAME: process.env.APP_NAME || "reWear",
  APP_VERSION: process.env.APP_VERSION || "1.0.0",
  PORT: parseInteger(process.env.PORT, 4000),
  HOST: process.env.HOST || "localhost",

  // Database configuration
  MONGODB_URI: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/reWear",
  MONGODB_TEST_URI:
    process.env.MONGODB_TEST_URI || "mongodb://127.0.0.1:27017/reWear_test",

  //Database pool settings
  DB_MAX_POOL_SIZE: parseInteger(
    process.env.DB_MAX_POOL_SIZE,
    isProduction ? 20 : 10
  ),
  DB_MIN_POOL_SIZE: parseInteger(
    process.env.DB_MIN_POOL_SIZE,
    isProduction ? 5 : 2
  ),
  DB_MAX_IDLE_TIME: parseInteger(process.env.DB_MAX_IDLE_TIME, 30000),
  DB_SERVER_SELECTION_TIMEOUT: parseInteger(
    process.env.DB_SERVER_SELECTION_TIMEOUT,
    10000
  ),
  DB_SOCKET_TIMEOUT: parseInteger(process.env.DB_SOCKET_TIMEOUT, 45000),
  DB_CONNECT_TIMEOUT: parseInteger(process.env.DB_CONNECT_TIMEOUT, 30000),

  // JWT Configuration
  JWT_SECRET: process.env.JWT_SECRET || "dev-secret-change-in-production-2024",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "15m",
  JWT_REFRESH_SECRET:
    process.env.JWT_REFRESH_SECRET ||
    "dev-refresh-secret-change-in-production-2024",
  JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
  JWT_ALGORITHM: process.env.JWT_ALGORITHM || "HS256",
  JWT_ISSUER: process.env.JWT_ISSUER || "versenest-api",
  JWT_AUDIENCE: process.env.JWT_AUDIENCE || "versenest-client",

  //Secuirity Configuration
  BCRYPT_ROUNDS: parseInteger(process.env.BCRYPT_ROUNDS, 12),
  SESSION_SECRET:
    process.env.SESSION_SECRET || "session-secret-change-in-production",
  COOKIE_SECRET: process.env.COOKIE_SECRET,
  COOKIE_SECURE: parseBoolean(process.env.COOKIE_SECURE, isProduction),
  COOKIE_SAME_SITE:
    process.env.COOKIE_SAME_SITE || (isProduction ? "strict" : "lax"),
  COOKIE_MAX_AGE: parseInteger(process.env.COOKIE_MAX_AGE, 24 * 60 * 60 * 1000), // 24 hours

  //Rate Limiting Configuration
  RATE_LIMIT_WINDOW: parseInteger(
    process.env.RATE_LIMIT_WINDOW,
    15 * 60 * 1000
  ),
  RATE_LIMIT_MAX_REQUESTS: parseInteger(
    process.env.RATE_LIMIT_MAX_REQUESTS,
    100
  ),
  AUTH_RATE_LIMIT_MAX: parseInteger(process.env.AUTH_RATE_LIMIT_MAX, 5),

  //client configuration
  CLIENT_URL: process.env.CLIENT_URL || "http://localhost:5173",

  //redis configuration
  REDIS_URL: process.env.REDIS_URL,
  REDIS_PASSWORD: process.env.REDIS_PASSWORD,
  REDIS_DB: parseInteger(process.env.REDIS_DB, 0),
  REDIS_KEY_PREFIX: process.env.REDIS_KEY_PREFIX || "reWear:",
  ENABLE_REDIS: parseBoolean(process.env.ENABLE_REDIS, !!process.env.REDIS_URL),

  //server timeout and limits
  SERVER_TIMEOUT: parseInteger(process.env.SERVER_TIMEOUT, 120000),
  KEEP_ALIVE_TIMEOUT: parseInteger(process.env.KEEP_ALIVE_TIMEOUT, 65000),
  HEADERS_TIMEOUT: parseInteger(process.env.HEADERS_TIMEOUT, 66000),
  SHUTDOWN_TIMEOUT: parseInteger(process.env.SHUTDOWN_TIMEOUT, 30000),
  MAX_LISTENERS: parseInteger(process.env.MAX_LISTENERS, 20),
  MAX_HEADERS_COUNT: parseInteger(process.env.MAX_HEADERS_COUNT, 2000),
  MAX_REQUESTS_PER_SOCKET: parseInteger(
    process.env.MAX_REQUESTS_PER_SOCKET,
    1000
  ),
  //Health and monitoring
  HEALTH_CHECK_INTERVAL: parseInteger(process.env.HEALTH_CHECK_INTERVAL, 60000),
  MEMORY_THRESHOLD: parseInteger(process.env.MEMORY_THRESHOLD, 500), // MB
  ENABLE_METRICS: parseBoolean(process.env.ENABLE_METRICS, isProduction),
  METRICS_PORT: parseInteger(process.env.METRICS_PORT, 9090),
};

//validate configuration
validateConfiguration(config);

console.log("configration loaded successfully", {
  enviorment: config.NODE_ENV,
  port: config.PORT,
  database: config.MONGODB_URI ? "connected" : "not connected",
});

export {
  config,
  config as default,
  sanitizeonfigForLogging,
  validateConfiguration,
  parseArray,
  parseBoolean,
  parseInteger,
};
