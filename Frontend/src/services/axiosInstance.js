// 🔧 Enhanced Axios Configuration for reWear Frontend
// Centralized API configuration with auth token handling, retry logic, and error management

import axios from 'axios';
import { toast } from 'react-toastify';

// Get base URL from environment or fallback
const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

// Create axios instance with enhanced configuration
const axiosInstance = axios.create({
  baseURL,
  timeout: 15000, // 15 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
});

// Request interceptor to add auth token and logging
axiosInstance.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Add request metadata for tracking
    config.metadata = { 
      startTime: new Date(),
      requestId: Math.random().toString(36).substr(2, 9)
    };

    // Log request in development
    if (import.meta.env.VITE_DEBUG_MODE === 'true') {
      console.log(`🚀 API Request [${config.metadata.requestId}]:`, {
        method: config.method?.toUpperCase(),
        url: config.url,
        data: config.data
      });
    }

    return config;
  },
  (error) => {
    console.error('🚨 Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors and logging
axiosInstance.interceptors.response.use(
  (response) => {
    // Log successful response in development
    if (import.meta.env.VITE_DEBUG_MODE === 'true') {
      const duration = new Date() - response.config.metadata.startTime;
      console.log(`✅ API Response [${response.config.metadata.requestId}]:`, {
        status: response.status,
        duration: `${duration}ms`
      });
    }
    
    return response;
  },
  (error) => {
    // Log error in development
    if (import.meta.env.VITE_DEBUG_MODE === 'true') {
      console.error(`❌ API Error:`, {
        status: error.response?.status,
        message: error.message,
        data: error.response?.data
      });
    }

    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // Only redirect if not already on auth pages
      if (window.location.pathname !== '/login' && window.location.pathname !== '/signup') {
        toast.error('Your session has expired. Please log in again.');
        window.location.href = '/login';
      }
    } else if (error.response?.status === 403) {
      toast.error('You don\'t have permission to perform this action.');
    } else if (error.response?.status >= 500) {
      toast.error('Server error. Please try again later.');
    } else if (!error.response) {
      // Network error
      toast.error('Network error. Please check your connection.');
    }
    
    return Promise.reject(error);
  }
);

// Enhanced retry logic for failed requests
const retryRequest = async (originalRequest, retryCount = 0) => {
  const maxRetries = parseInt(import.meta.env.VITE_API_MAX_RETRIES) || 3;
  const retryDelay = parseInt(import.meta.env.VITE_API_RETRY_DELAY) || 1000;

  if (retryCount >= maxRetries) {
    return Promise.reject(originalRequest);
  }

  // Wait before retrying
  await new Promise(resolve => setTimeout(resolve, retryDelay * Math.pow(2, retryCount)));

  try {
    return await axiosInstance(originalRequest);
  } catch (error) {
    if (shouldRetry(error)) {
      return retryRequest(originalRequest, retryCount + 1);
    }
    throw error;
  }
};

// Determine if request should be retried
const shouldRetry = (error) => {
  // Retry on network errors or 5xx server errors
  return !error.response || (error.response.status >= 500 && error.response.status <= 599);
};

// Add retry functionality to axios instance
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Don't retry if already retried or for auth errors
    if (originalRequest._retry || error.response?.status === 401 || error.response?.status === 403) {
      return Promise.reject(error);
    }

    if (shouldRetry(error)) {
      originalRequest._retry = true;
      return retryRequest(originalRequest);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
