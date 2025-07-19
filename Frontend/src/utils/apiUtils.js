// 🔧 API Utilities
// Helper functions for API calls and error handling

import { toast } from 'react-toastify';

/**
 * Handle API errors consistently
 */
export const handleApiError = (error, customMessage = null) => {
  console.error('API Error:', error);
  
  if (error.response) {
    // Server responded with error status
    const status = error.response.status;
    const message = error.response.data?.message || error.response.data?.error;
    
    switch (status) {
      case 400:
        toast.error(message || 'Invalid request. Please check your input.');
        break;
      case 401:
        toast.error('You need to log in to continue.');
        // Redirect to login or refresh token
        window.location.href = '/login';
        break;
      case 403:
        toast.error('You don\'t have permission to perform this action.');
        break;
      case 404:
        toast.error(message || 'The requested resource was not found.');
        break;
      case 422:
        toast.error(message || 'Please check your input and try again.');
        break;
      case 429:
        toast.error('Too many requests. Please wait a moment and try again.');
        break;
      case 500:
        toast.error('Server error. Please try again later.');
        break;
      default:
        toast.error(customMessage || message || 'Something went wrong. Please try again.');
    }
    
    return {
      status,
      message: message || 'An error occurred',
      data: error.response.data
    };
  } else if (error.request) {
    // Network error
    toast.error('Network error. Please check your connection and try again.');
    return {
      status: 0,
      message: 'Network error',
      data: null
    };
  } else {
    // Other error
    toast.error(customMessage || 'An unexpected error occurred.');
    return {
      status: -1,
      message: error.message || 'Unknown error',
      data: null
    };
  }
};

/**
 * Format API response consistently
 */
export const formatApiResponse = (response) => {
  return {
    success: true,
    data: response.data,
    message: response.data?.message || 'Success',
    status: response.status
  };
};

/**
 * Retry API call with exponential backoff
 */
export const retryApiCall = async (apiCall, maxRetries = 3, baseDelay = 1000) => {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await apiCall();
    } catch (error) {
      if (attempt === maxRetries) {
        throw error;
      }
      
      // Don't retry on client errors (4xx)
      if (error.response?.status >= 400 && error.response?.status < 500) {
        throw error;
      }
      
      // Wait before retrying with exponential backoff
      const delay = baseDelay * Math.pow(2, attempt - 1);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
};

/**
 * Create pagination params
 */
export const createPaginationParams = (page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc') => {
  return {
    page,
    limit,
    sortBy,
    sortOrder
  };
};

/**
 * Create filter params for API calls
 */
export const createFilterParams = (filters = {}) => {
  const params = {};
  
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== '') {
      if (Array.isArray(value)) {
        params[key] = value.join(',');
      } else {
        params[key] = value;
      }
    }
  });
  
  return params;
};

/**
 * Transform form data for API submission
 */
export const transformFormData = (formData, transformations = {}) => {
  const transformed = { ...formData };
  
  Object.entries(transformations).forEach(([key, transformer]) => {
    if (transformed[key] !== undefined) {
      transformed[key] = transformer(transformed[key]);
    }
  });
  
  return transformed;
};

/**
 * Upload file with progress tracking
 */
export const uploadFile = async (file, uploadUrl, onProgress = null) => {
  const formData = new FormData();
  formData.append('file', file);
  
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: (progressEvent) => {
      if (onProgress && progressEvent.total) {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        onProgress(percentCompleted);
      }
    },
  };
  
  // This would typically use your axios instance
  // return axiosInstance.post(uploadUrl, formData, config);
};

/**
 * Cache API responses in sessionStorage
 */
export const cacheApiResponse = (key, data, ttl = 5 * 60 * 1000) => { // 5 minutes default
  const cacheData = {
    data,
    timestamp: Date.now(),
    ttl
  };
  
  try {
    sessionStorage.setItem(`api_cache_${key}`, JSON.stringify(cacheData));
  } catch (error) {
    console.warn('Failed to cache API response:', error);
  }
};

/**
 * Get cached API response
 */
export const getCachedApiResponse = (key) => {
  try {
    const cached = sessionStorage.getItem(`api_cache_${key}`);
    if (!cached) return null;
    
    const cacheData = JSON.parse(cached);
    const now = Date.now();
    
    if (now - cacheData.timestamp > cacheData.ttl) {
      sessionStorage.removeItem(`api_cache_${key}`);
      return null;
    }
    
    return cacheData.data;
  } catch (error) {
    console.warn('Failed to get cached API response:', error);
    return null;
  }
};

/**
 * Clear API cache
 */
export const clearApiCache = (pattern = null) => {
  try {
    const keys = Object.keys(sessionStorage);
    keys.forEach(key => {
      if (key.startsWith('api_cache_')) {
        if (!pattern || key.includes(pattern)) {
          sessionStorage.removeItem(key);
        }
      }
    });
  } catch (error) {
    console.warn('Failed to clear API cache:', error);
  }
};
