import { ERROR_MESSAGES } from './constants';

// Email validation
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateEmail = (email: string): string | null => {
  if (!email) return ERROR_MESSAGES.REQUIRED_FIELD;
  if (!isValidEmail(email)) return ERROR_MESSAGES.INVALID_EMAIL;
  return null;
};

// Password validation
export const isValidPassword = (password: string): boolean => {
  return password.length >= 8;
};

export const validatePassword = (password: string): string | null => {
  if (!password) return ERROR_MESSAGES.REQUIRED_FIELD;
  if (!isValidPassword(password)) return ERROR_MESSAGES.INVALID_PASSWORD;
  return null;
};

// Username validation
export const isValidUsername = (username: string): boolean => {
  const usernameRegex = /^[a-zA-Z0-9_-]{3,20}$/;
  return usernameRegex.test(username);
};

export const validateUsername = (username: string): string | null => {
  if (!username) return ERROR_MESSAGES.REQUIRED_FIELD;
  if (!isValidUsername(username)) {
    return 'Username must be 3-20 characters long and can only contain letters, numbers, underscores, and hyphens';
  }
  return null;
};

// Display name validation
export const isValidDisplayName = (displayName: string): boolean => {
  return displayName.length >= 2 && displayName.length <= 50;
};

export const validateDisplayName = (displayName: string): string | null => {
  if (!displayName) return ERROR_MESSAGES.REQUIRED_FIELD;
  if (!isValidDisplayName(displayName)) {
    return 'Display name must be 2-50 characters long';
  }
  return null;
};

// Phone number validation
export const isValidPhoneNumber = (phoneNumber: string): boolean => {
  const phoneRegex = /^\+?[\d\s-]{10,}$/;
  return phoneRegex.test(phoneNumber);
};

export const validatePhoneNumber = (phoneNumber: string): string | null => {
  if (!phoneNumber) return null; // Optional field
  if (!isValidPhoneNumber(phoneNumber)) {
    return 'Please enter a valid phone number';
  }
  return null;
};

// URL validation
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const validateUrl = (url: string): string | null => {
  if (!url) return null; // Optional field
  if (!isValidUrl(url)) {
    return 'Please enter a valid URL';
  }
  return null;
};

// Required field validation
export const validateRequired = (value: any): string | null => {
  if (value === undefined || value === null || value === '') {
    return ERROR_MESSAGES.REQUIRED_FIELD;
  }
  return null;
};

// Number validation
export const validateNumber = (
  value: number,
  min?: number,
  max?: number
): string | null => {
  if (value === undefined || value === null) {
    return ERROR_MESSAGES.REQUIRED_FIELD;
  }

  if (typeof value !== 'number' || isNaN(value)) {
    return 'Please enter a valid number';
  }

  if (min !== undefined && value < min) {
    return `Value must be greater than or equal to ${min}`;
  }

  if (max !== undefined && value > max) {
    return `Value must be less than or equal to ${max}`;
  }

  return null;
};

// Date validation
export const validateDate = (
  date: string | Date,
  minDate?: Date,
  maxDate?: Date
): string | null => {
  if (!date) return ERROR_MESSAGES.REQUIRED_FIELD;

  const parsedDate = typeof date === 'string' ? new Date(date) : date;

  if (isNaN(parsedDate.getTime())) {
    return 'Please enter a valid date';
  }

  if (minDate && parsedDate < minDate) {
    return `Date must be after ${minDate.toLocaleDateString()}`;
  }

  if (maxDate && parsedDate > maxDate) {
    return `Date must be before ${maxDate.toLocaleDateString()}`;
  }

  return null;
};

// File validation
export const validateFile = (
  file: File,
  maxSize: number,
  allowedTypes: string[]
): string | null => {
  if (!file) return ERROR_MESSAGES.REQUIRED_FIELD;

  if (file.size > maxSize) {
    return `File size must be less than ${maxSize / (1024 * 1024)}MB`;
  }

  if (!allowedTypes.includes(file.type)) {
    return 'File type not supported';
  }

  return null;
};

// Form validation
export const validateForm = (
  values: Record<string, any>,
  validationRules: Record<string, (value: any) => string | null>
): Record<string, string> => {
  const errors: Record<string, string> = {};

  Object.entries(validationRules).forEach(([field, validator]) => {
    const error = validator(values[field]);
    if (error) {
      errors[field] = error;
    }
  });

  return errors;
};

// Password confirmation validation
export const validatePasswordConfirmation = (
  password: string,
  confirmation: string
): string | null => {
  if (!confirmation) return ERROR_MESSAGES.REQUIRED_FIELD;
  if (password !== confirmation) return ERROR_MESSAGES.PASSWORD_MISMATCH;
  return null;
}; 