// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    PROFILE: '/auth/profile',
    PASSWORD: '/auth/password',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    VERIFY_EMAIL: '/auth/verify-email',
    RESEND_VERIFICATION: '/auth/resend-verification',
  },
  COMMUNITY: {
    BASE: '/communities',
    MEMBERS: (id: string) => `/communities/${id}/members`,
    EVENTS: (id: string) => `/communities/${id}/events`,
    HELP_REQUESTS: (id: string) => `/communities/${id}/help-requests`,
    SETTINGS: (id: string) => `/communities/${id}/settings`,
  },
  EVENT: {
    BASE: '/events',
    UPCOMING: '/events/upcoming',
    PAST: '/events/past',
    SEARCH: '/events/search',
    PARTICIPANTS: (id: string) => `/events/${id}/participants`,
    REGISTER: (id: string) => `/events/${id}/register`,
    CANCEL: (id: string) => `/events/${id}/cancel-registration`,
  },
  HELP: {
    BASE: '/help-requests',
    MY_REQUESTS: '/help-requests/my-requests',
    MY_OFFERS: '/help-requests/my-offers',
    SEARCH: '/help-requests/search',
    OFFERS: (id: string) => `/help-requests/${id}/offers`,
    OFFER: (id: string) => `/help-requests/${id}/offer`,
    CANCEL_OFFER: (id: string) => `/help-requests/${id}/cancel-offer`,
  },
};

// Community Types
export const COMMUNITY_TYPES = {
  ARAB: 'ARAB',
  AFRICAN: 'AFRICAN',
  REFUGEE: 'REFUGEE',
  DISABLED: 'DISABLED',
  STUDENT: 'STUDENT',
  CULTURAL: 'CULTURAL',
  IMMIGRATION: 'IMMIGRATION',
  JOB: 'JOB',
} as const;

// Event Types
export const EVENT_TYPES = {
  CULTURAL: 'CULTURAL',
  WORKSHOP: 'WORKSHOP',
  NETWORKING: 'NETWORKING',
  SUPPORT: 'SUPPORT',
  EDUCATION: 'EDUCATION',
} as const;

// Event Status
export const EVENT_STATUS = {
  UPCOMING: 'upcoming',
  ONGOING: 'ongoing',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
} as const;

// Help Categories
export const HELP_CATEGORIES = {
  LANGUAGE: 'LANGUAGE',
  HOUSING: 'HOUSING',
  LEGAL: 'LEGAL',
  EDUCATION: 'EDUCATION',
  HEALTHCARE: 'HEALTHCARE',
  EMPLOYMENT: 'EMPLOYMENT',
  OTHER: 'OTHER',
} as const;

// Help Status
export const HELP_STATUS = {
  OPEN: 'open',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
} as const;

// Urgency Levels
export const URGENCY_LEVELS = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  URGENT: 'urgent',
} as const;

// User Roles
export const USER_ROLES = {
  ADMIN: 'admin',
  MODERATOR: 'moderator',
  MEMBER: 'member',
} as const;

// Pagination
export const DEFAULT_PAGE_SIZE = 10;
export const MAX_PAGE_SIZE = 100;

// File Upload
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/gif'];

// Local Storage Keys
export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user',
  THEME: 'theme',
  LANGUAGE: 'language',
} as const;

// Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  PROFILE: '/profile',
  COMMUNITIES: '/communities',
  EVENTS: '/events',
  HELP: '/help',
  SETTINGS: '/settings',
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  REQUIRED_FIELD: 'This field is required',
  INVALID_EMAIL: 'Please enter a valid email address',
  INVALID_PASSWORD: 'Password must be at least 8 characters long',
  PASSWORD_MISMATCH: 'Passwords do not match',
  INVALID_FILE_SIZE: 'File size must be less than 5MB',
  INVALID_FILE_TYPE: 'File type not supported',
  NETWORK_ERROR: 'Network error. Please try again',
  UNAUTHORIZED: 'Please log in to continue',
  FORBIDDEN: 'You do not have permission to perform this action',
  NOT_FOUND: 'Resource not found',
  SERVER_ERROR: 'Server error. Please try again later',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  PROFILE_UPDATED: 'Profile updated successfully',
  PASSWORD_CHANGED: 'Password changed successfully',
  EMAIL_VERIFIED: 'Email verified successfully',
  COMMUNITY_CREATED: 'Community created successfully',
  EVENT_CREATED: 'Event created successfully',
  HELP_REQUEST_CREATED: 'Help request created successfully',
  HELP_OFFERED: 'Help offered successfully',
  HELP_ACCEPTED: 'Help request accepted successfully',
  HELP_COMPLETED: 'Help request completed successfully',
} as const; 