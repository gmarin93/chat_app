import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';

// Base URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// Create axios instance with defaults
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds
});

// Request interceptor (add auth token)
apiClient.interceptors.request.use(
  (config) => {
    // Get token from localStorage (where Zustand persists it)
    const authStorage = localStorage.getItem('auth-storage');
    
    if (authStorage) {
      const { state } = JSON.parse(authStorage);
      const token = state?.token;
      
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor (handle errors globally)
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // Handle specific error codes
    if (error.response?.status === 401) {
      // Unauthorized - clear auth and redirect
      localStorage.removeItem('auth-storage');
      window.location.href = '/login';
    }
    
    if (error.response?.status === 500) {
      console.error('Server error:', error);
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;