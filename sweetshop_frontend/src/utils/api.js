/**
 * API Utility Functions
 * 
 * This file contains utility functions for making API calls to the backend.
 * It provides centralized error handling and authentication management.
 */

// API Configuration
const API_BASE_URL = 'http://127.0.0.1:8000/api';

/**
 * Get authentication headers
 * @returns {Object} Headers object with auth token if available
 */
export const getAuthHeaders = () => {
  const headers = {
    'Content-Type': 'application/json'
  };
  
  const token = localStorage.getItem('token');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return headers;
};

/**
 * Make a generic API request
 * @param {string} endpoint - API endpoint (without base URL)
 * @param {Object} options - Fetch options
 * @returns {Promise} Response data
 */
export const apiRequest = async (endpoint, options = {}) => {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    const headers = getAuthHeaders();
    
    const response = await fetch(url, {
      ...options,
      headers: {
        ...headers,
        ...options.headers
      }
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error);
    throw error;
  }
};

/**
 * GET request
 * @param {string} endpoint - API endpoint
 * @returns {Promise} Response data
 */
export const apiGet = (endpoint) => apiRequest(endpoint, { method: 'GET' });

/**
 * POST request
 * @param {string} endpoint - API endpoint
 * @param {Object} data - Request body data
 * @returns {Promise} Response data
 */
export const apiPost = (endpoint, data) => apiRequest(endpoint, {
  method: 'POST',
  body: JSON.stringify(data)
});

/**
 * PUT request
 * @param {string} endpoint - API endpoint
 * @param {Object} data - Request body data
 * @returns {Promise} Response data
 */
export const apiPut = (endpoint, data) => apiRequest(endpoint, {
  method: 'PUT',
  body: JSON.stringify(data)
});

/**
 * DELETE request
 * @param {string} endpoint - API endpoint
 * @returns {Promise} Response data
 */
export const apiDelete = (endpoint) => apiRequest(endpoint, { method: 'DELETE' });

// Sweet-specific API functions
export const sweetsAPI = {
  getAll: () => apiGet('/sweets/'),
  getById: (id) => apiGet(`/sweets/${id}/`),
  create: (data) => apiPost('/sweets/create/', data),
  update: (id, data) => apiPut(`/sweets/${id}/update/`, data),
  delete: (id) => apiDelete(`/sweets/${id}/delete/`),
  getCategories: () => apiGet('/categories/')
};

// Auth-specific API functions
export const authAPI = {
  login: (credentials) => apiPost('/auth/login/', credentials),
  register: (userData) => apiPost('/auth/register/', userData),
  getProfile: () => apiGet('/auth/profile/')
};

// Cart-specific API functions
export const cartAPI = {
  addItem: (data) => apiPost('/cart/add/', data),
  getCart: () => apiGet('/cart/'),
  updateItem: (id, data) => apiPut(`/cart/${id}/update/`, data),
  removeItem: (id) => apiDelete(`/cart/${id}/remove/`)
}; 