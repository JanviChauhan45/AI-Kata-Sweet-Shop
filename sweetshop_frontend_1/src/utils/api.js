/**
 * API Utility Functions
 * 
 * This file contains utility functions for making API calls to the backend.
 * It provides centralized error handling and authentication management.
 */

// API Configuration
const API_BASE_URL = 'http://127.0.0.1:8000/api';

export const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

export const apiRequest = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: getAuthHeaders(),
      ...options
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || `HTTP error! status: ${response.status}`);
    }
    
    return data;
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
};

export const apiGet = (endpoint) => apiRequest(endpoint, { method: 'GET' });
export const apiPost = (endpoint, data) => apiRequest(endpoint, { 
  method: 'POST', 
  body: JSON.stringify(data) 
});
export const apiPut = (endpoint, data) => apiRequest(endpoint, { 
  method: 'PUT', 
  body: JSON.stringify(data) 
});
export const apiDelete = (endpoint) => apiRequest(endpoint, { method: 'DELETE' });

// Sweets API
export const sweetsAPI = {
  getAll: () => apiGet('/sweets/'),
  getById: (id) => apiGet(`/sweets/${id}/`),
  create: (data) => apiPost('/sweets/create/', data),
  update: (id, data) => apiPut(`/sweets/${id}/update/`, data),
  delete: (id) => apiDelete(`/sweets/${id}/delete/`),
  getCategories: () => apiGet('/categories/')
};

// Auth API
export const authAPI = {
  register: (data) => apiPost('/auth/register/', data),
  login: (data) => apiPost('/auth/login/', data),
  getProfile: () => apiGet('/auth/profile/')
};

// Cart API
export const cartAPI = {
  getCart: () => apiGet('/cart/'),
  addToCart: (sweetId, quantity) => apiPost('/cart/add/', {
    sweet_id: sweetId,
    quantity: quantity
  }),
  updateCartItem: (itemId, quantity) => apiPut(`/cart/update/${itemId}/`, {
    quantity: quantity
  }),
  removeFromCart: (itemId) => apiDelete(`/cart/remove/${itemId}/`),
  clearCart: () => apiDelete('/cart/clear/')
};

// Orders API
export const ordersAPI = {
  getOrders: () => apiGet('/orders/'),
  getOrder: (orderId) => apiGet(`/orders/${orderId}/`),
  createOrder: () => apiPost('/orders/create/', {})
}; 