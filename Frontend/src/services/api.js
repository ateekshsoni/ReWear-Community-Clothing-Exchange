// 🔧 Enhanced API Service Functions
// Centralized API calls with error handling, caching, and retry logic

import axiosInstance from './axiosInstance';
import { 
  handleApiError, 
  formatApiResponse, 
  retryApiCall,
  cacheApiResponse,
  getCachedApiResponse,
  createPaginationParams,
  createFilterParams
} from '../utils/apiUtils';

// 🔐 Authentication APIs
export const authAPI = {
  register: async (userData) => {
    try {
      const response = await retryApiCall(() => 
        axiosInstance.post('/auth/register', userData)
      );
      const result = formatApiResponse(response);
      
      // Cache user data after successful registration
      if (result.data.user) {
        cacheApiResponse('current_user', result.data.user, 30 * 60 * 1000); // 30 min
      }
      
      return result.data;
    } catch (error) {
      handleApiError(error, 'Registration failed');
      throw error;
    }
  },

  login: async (credentials) => {
    try {
      const response = await retryApiCall(() => 
        axiosInstance.post('/auth/login', credentials)
      );
      const result = formatApiResponse(response);
      
      // Cache user data after successful login
      if (result.data.user) {
        cacheApiResponse('current_user', result.data.user, 30 * 60 * 1000); // 30 min
      }
      
      return result.data;
    } catch (error) {
      handleApiError(error, 'Login failed');
      throw error;
    }
  },

  getProfile: async (useCache = true) => {
    try {
      // Check cache first
      if (useCache) {
        const cached = getCachedApiResponse('current_user');
        if (cached) return { user: cached };
      }
      
      const response = await axiosInstance.get('/auth/profile');
      const result = formatApiResponse(response);
      
      // Update cache
      if (result.data.user) {
        cacheApiResponse('current_user', result.data.user, 30 * 60 * 1000);
      }
      
      return result.data;
    } catch (error) {
      handleApiError(error, 'Failed to load profile');
      throw error;
    }
  },

  updateProfile: async (profileData) => {
    try {
      const response = await axiosInstance.put('/auth/profile', profileData);
      const result = formatApiResponse(response);
      
      // Update cache with new profile data
      if (result.data.user) {
        cacheApiResponse('current_user', result.data.user, 30 * 60 * 1000);
      }
      
      return result.data;
    } catch (error) {
      handleApiError(error, 'Failed to update profile');
      throw error;
    }
  },

  changePassword: async (passwordData) => {
    try {
      const response = await axiosInstance.post('/auth/change-password', passwordData);
      return formatApiResponse(response).data;
    } catch (error) {
      handleApiError(error, 'Failed to change password');
      throw error;
    }
  },

  verifyToken: async () => {
    try {
      const response = await axiosInstance.post('/auth/verify-token');
      return formatApiResponse(response).data;
    } catch (error) {
      handleApiError(error, 'Token verification failed');
      throw error;
    }
  },

  logout: async () => {
    try {
      const response = await axiosInstance.post('/auth/logout');
      
      // Clear all cached data on logout
      sessionStorage.clear();
      
      return formatApiResponse(response).data;
    } catch (error) {
      // Still clear cache even if logout request fails
      sessionStorage.clear();
      handleApiError(error, 'Logout failed');
      throw error;
    }
  },

  forgotPassword: async (email) => {
    try {
      const response = await axiosInstance.post('/auth/forgot-password', { email });
      return formatApiResponse(response).data;
    } catch (error) {
      handleApiError(error, 'Failed to send reset email');
      throw error;
    }
  },

  resetPassword: async (token, newPassword) => {
    try {
      const response = await axiosInstance.post('/auth/reset-password', {
        token,
        password: newPassword
      });
      return formatApiResponse(response).data;
    } catch (error) {
      handleApiError(error, 'Failed to reset password');
      throw error;
    }
  }
};

// 📦 Products APIs
export const productsAPI = {
  getAll: async (params = {}) => {
    const response = await axiosInstance.get('/products', { params });
    return response.data;
  },

  getById: async (id) => {
    const response = await axiosInstance.get(`/products/${id}`);
    return response.data;
  },

  create: async (productData) => {
    const response = await axiosInstance.post('/products', productData);
    return response.data;
  },

  update: async (id, productData) => {
    const response = await axiosInstance.put(`/products/${id}`, productData);
    return response.data;
  },

  delete: async (id) => {
    const response = await axiosInstance.delete(`/products/${id}`);
    return response.data;
  },

  getMyProducts: async (params = {}) => {
    const response = await axiosInstance.get('/products/user/my-products', { params });
    return response.data;
  },

  rent: async (id, rentalData) => {
    const response = await axiosInstance.post(`/products/${id}/rent`, rentalData);
    return response.data;
  },

  returnProduct: async (id) => {
    const response = await axiosInstance.post(`/products/${id}/return`);
    return response.data;
  },

  getCategories: async () => {
    const response = await axiosInstance.get('/products/categories');
    return response.data;
  }
};

// 🔧 Helper function to handle API errors
export const handleAPIError = (error) => {
  if (error.response) {
    // Server responded with error status
    return error.response.data.message || 'An error occurred';
  } else if (error.request) {
    // Request was made but no response received
    return 'Network error. Please check your connection.';
  } else {
    // Something else happened
    return error.message || 'An unexpected error occurred';
  }
};

