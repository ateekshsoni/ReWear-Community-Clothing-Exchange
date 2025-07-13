// 🔧 API Service Functions
// Centralized API calls for all backend endpoints

import axiosInstance from './axiosInstance';

// 🔐 Authentication APIs
export const authAPI = {
  register: async (userData) => {
    const response = await axiosInstance.post('/auth/register', userData);
    return response.data;
  },

  login: async (credentials) => {
    const response = await axiosInstance.post('/auth/login', credentials);
    return response.data;
  },

  getProfile: async () => {
    const response = await axiosInstance.get('/auth/profile');
    return response.data;
  },

  updateProfile: async (profileData) => {
    const response = await axiosInstance.put('/auth/profile', profileData);
    return response.data;
  },

  changePassword: async (passwordData) => {
    const response = await axiosInstance.post('/auth/change-password', passwordData);
    return response.data;
  },

  verifyToken: async () => {
    const response = await axiosInstance.post('/auth/verify-token');
    return response.data;
  },

  logout: async () => {
    const response = await axiosInstance.post('/auth/logout');
    return response.data;
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

