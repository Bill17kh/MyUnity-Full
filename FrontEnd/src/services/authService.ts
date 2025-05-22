import { api } from './api';

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

  getUserProfile: () => api.get('/auth/profile'),

  updateProfile: (profileData: FormData) =>
    api.put('/auth/profile', profileData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),

  changePassword: (passwords: {
    currentPassword: string;
    newPassword: string;
  }) => api.put('/auth/password', passwords),

  forgotPassword: (email: string) =>
    api.post('/auth/forgot-password', { email }),

  resetPassword: (data: {
    token: string;
    password: string;
  }) => api.post('/auth/reset-password', data),

  verifyEmail: (token: string) =>
    api.post('/auth/verify-email', { token }),

  resendVerification: () =>
    api.post('/auth/resend-verification'),
}; 