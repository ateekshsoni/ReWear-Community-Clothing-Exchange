// 🔧 Logger Utility
// Simple logger with timestamps and color coding for different log levels

const logger = {
  // 🔧 Info level logging (general information)
  info: (message, ...args) => {
    console.log(`[${new Date().toISOString()}] ℹ️  INFO: ${message}`, ...args);
  },

  // 🔧 Error level logging (errors and exceptions)
  error: (message, ...args) => {
    console.error(`[${new Date().toISOString()}] ❌ ERROR: ${message}`, ...args);
  },

  // 🔧 Warning level logging (warnings and deprecations)
  warn: (message, ...args) => {
    console.warn(`[${new Date().toISOString()}] ⚠️  WARN: ${message}`, ...args);
  },

  // 🔧 Debug level logging (detailed debugging information)
  debug: (message, ...args) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[${new Date().toISOString()}] 🐛 DEBUG: ${message}`, ...args);
    }
  },

  // 🔧 Success level logging (successful operations)
  success: (message, ...args) => {
    console.log(`[${new Date().toISOString()}] ✅ SUCCESS: ${message}`, ...args);
  }
};

export default logger;