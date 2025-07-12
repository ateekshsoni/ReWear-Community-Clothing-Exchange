# Configuration Documentation

## Overview

The `config` folder contains the centralized configuration management system for the ReWear backend application. This folder is responsible for managing all application settings, environment variables, database configurations, and security parameters across different environments (development, production, and test).

## Purpose of the Config Folder

The configuration system serves several critical purposes:

1. **Environment Management**: Handles different settings for development, production, and test environments
2. **Security Configuration**: Manages sensitive data like JWT secrets, database URIs, and authentication settings
3. **Database Configuration**: Provides optimized database connection settings for different environments
4. **Application Settings**: Centralizes all application-level configurations
5. **Validation & Safety**: Ensures required environment variables are present and validates configuration integrity

## File Structure

### 1. `index.js` - Main Configuration Manager

This is the central configuration file that:

#### **Core Functionality:**
- **Environment Detection**: Automatically detects and sets the current environment (development/production/test)
- **Environment Variable Loading**: Uses dotenv to load environment variables from `.env` files
- **Configuration Validation**: Ensures all required environment variables are present
- **Security Validation**: Validates security settings (JWT secrets, session secrets, etc.)
- **Type Parsing**: Provides utility functions to parse environment variables into proper types

#### **Key Features:**

**Utility Functions:**
- `parseBoolean()`: Converts string environment variables to boolean values
- `parseInteger()`: Safely parses integer values with fallbacks
- `parseArray()`: Converts comma-separated strings to arrays
- `validateRequiredEnvVars()`: Ensures critical environment variables are present
- `validateConfiguration()`: Validates security and configuration requirements
- `sanitizeonfigForLogging()`: Masks sensitive information in logs

**Configuration Categories:**

1. **Application Settings:**
   - App name, version, port, and host configuration
   - Environment-specific settings

2. **Database Configuration:**
   - MongoDB URI for different environments
   - Connection pool settings (max/min pool size, timeouts)
   - Database performance optimization settings

3. **JWT & Authentication:**
   - JWT secrets and expiration times
   - Refresh token configuration
   - Security algorithms and settings

4. **Security Configuration:**
   - BCrypt rounds for password hashing
   - Session and cookie security settings
   - CORS and security headers

5. **Rate Limiting:**
   - API rate limiting configuration
   - Authentication-specific rate limits

6. **Client Configuration:**
   - Frontend URL configuration
   - CORS settings

7. **Redis Configuration:**
   - Redis connection settings
   - Caching configuration

8. **Server Performance:**
   - Server timeouts and limits
   - Connection management settings

9. **Health & Monitoring:**
   - Health check intervals
   - Memory thresholds
   - Metrics configuration

### 2. `database.js` - Database Configuration Manager

This file provides specialized database configuration:

#### **Core Functionality:**
- **Environment-Specific Database Settings**: Different database configurations optimized for each environment
- **Connection Pool Management**: Manages database connection pools efficiently
- **Performance Optimization**: Provides optimized settings for different deployment scenarios
- **URI Management**: Handles database connection URIs with fallbacks

#### **Configuration by Environment:**

**Development Environment:**
- Smaller connection pools (2-10 connections)
- Shorter timeouts for faster feedback
- Primary read preference for consistency
- Lower retry attempts for quick failure detection

**Production Environment:**
- Larger connection pools (5-20 connections)
- Longer timeouts for stability
- Secondary preferred reads for better performance
- Higher retry attempts for reliability
- Compression enabled for network efficiency
- Authentication source configuration

**Test Environment:**
- Minimal connection pools (1-5 connections)
- Very short timeouts for fast test execution
- Minimal write concern for speed
- Reduced retry attempts

#### **Key Features:**

**Connection Management:**
- `maxPoolSize`: Maximum number of connections in the pool
- `minPoolSize`: Minimum number of connections to maintain
- `serverSelectionTimeoutMS`: Timeout for selecting a server
- `socketTimeoutMS`: Socket timeout for operations
- `connectTimeoutMS`: Connection establishment timeout
- `maxIdleTimeMS`: Maximum time a connection can be idle

**Write Safety:**
- `writeConcern`: Ensures data durability and consistency
- `readPreference`: Optimizes read operations

**Functions:**
- `getDataBaseConfig()`: Returns environment-specific database configuration
- `getConnectionUris()`: Provides fallback database URIs for different environments

## Environment Variables

The configuration system expects the following environment variables:

### Required Variables:
- **Development**: `MONGODB_URI`
- **Production**: `MONGODB_URI`, `JWT_SECRET`, `JWT_REFRESH_SECRET`, `SESSION_SECRET`
- **Test**: `MONGODB_TEST_URI`

### Optional Variables:
- Database settings: `DB_MAX_POOL_SIZE`, `DB_MIN_POOL_SIZE`, etc.
- Security settings: `BCRYPT_ROUNDS`, `COOKIE_SECURE`, etc.
- Performance settings: `SERVER_TIMEOUT`, `RATE_LIMIT_MAX_REQUESTS`, etc.
- Redis settings: `REDIS_URL`, `REDIS_PASSWORD`, etc.

## Security Features

1. **Sensitive Data Protection**: Automatically masks sensitive information in logs
2. **Production Validation**: Enforces stronger security requirements in production
3. **Environment Isolation**: Separate configurations prevent cross-environment issues
4. **Required Variable Validation**: Ensures critical security variables are present

## Usage Examples

```javascript
// Import the main configuration
import config from './config/index.js';

// Access configuration values
const dbUri = config.MONGODB_URI;
const jwtSecret = config.JWT_SECRET;
const isProduction = config.isProduction;

// Import database-specific configuration
import { getDataBaseConfig } from './config/database.js';
const dbConfig = getDataBaseConfig();
```

## Best Practices

1. **Never commit sensitive environment variables** to version control
2. **Use different `.env` files** for different environments
3. **Validate configuration** before starting the application
4. **Use strong secrets** in production (minimum 32 characters)
5. **Monitor configuration changes** in production deployments

## Error Handling

The configuration system provides comprehensive error handling:
- Missing required variables trigger warnings in development and errors in production
- Invalid configuration values are caught and reported
- Database connection issues are handled with retry logic
- Sensitive information is automatically sanitized in error logs

This configuration system ensures that the ReWear application is secure, performant, and properly configured across all deployment environments.