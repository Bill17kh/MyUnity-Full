import axios from 'axios';
import { authAPI } from './authService';
import { communityAPI } from './communityService';
import { eventAPI } from './eventService';
import { helpAPI } from './helpService';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to add the auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (credentials: { email: string; password: string }) =>
    api.post('/auth/login', credentials),
  register: (userData: {
    username: string;
    email: string;
    password: string;
    displayName: string;
    preferredLanguage: string;
  }) => api.post('/auth/register', userData),
};

// Community API
export const communityAPI = {
  getCommunities: () => api.get('/communities'),
  getCommunity: (id: string) => api.get(`/communities/${id}`),
  createCommunity: (data: {
    name: string;
    description: string;
    type: string;
    language: string;
  }) => api.post('/communities', data),
  joinCommunity: (id: string) => api.post(`/communities/${id}/join`),
  leaveCommunity: (id: string) => api.post(`/communities/${id}/leave`),
};

// Event API
export const eventAPI = {
  getEvents: () => api.get('/events'),
  getEvent: (id: string) => api.get(`/events/${id}`),
  createEvent: (data: {
    title: string;
    description: string;
    date: string;
    location: string;
    type: string;
    communityId: string;
    maxParticipants: number;
  }) => api.post('/events', data),
  joinEvent: (id: string) => api.post(`/events/${id}/join`),
  leaveEvent: (id: string) => api.post(`/events/${id}/leave`),
};

// Help Exchange API
export const helpAPI = {
  getRequests: () => api.get('/help'),
  getRequest: (id: string) => api.get(`/help/${id}`),
  createRequest: (data: {
    title: string;
    description: string;
    type: string;
    communityId: string;
    isUrgent: boolean;
  }) => api.post('/help', data),
  updateRequest: (id: string, data: {
    status: string;
    helperId?: string;
  }) => api.put(`/help/${id}`, data),
  offerHelp: (id: string) => api.post(`/help/${id}/offer`),
  cancelHelp: (id: string) => api.post(`/help/${id}/cancel`),
};

// User API
export const userAPI = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data: {
    displayName?: string;
    preferredLanguage?: string;
  }) => api.put('/users/profile', data),
  getCommunities: () => api.get('/users/communities'),
  getEvents: () => api.get('/users/events'),
  getHelpRequests: () => api.get('/users/help-requests'),
};

export { api }; 