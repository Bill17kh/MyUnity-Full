export interface User {
  id: string;
  username: string;
  email: string;
  displayName: string;
  preferredLanguage: string;
  avatar?: string;
  bio?: string;
  location?: string;
  phoneNumber?: string;
  createdAt: string;
  updatedAt: string;
  isVerified: boolean;
  communities?: Community[];
  events?: Event[];
  helpRequests?: HelpRequest[];
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  displayName: string;
  preferredLanguage: string;
}

export interface ProfileUpdateData {
  displayName?: string;
  email?: string;
  preferredLanguage?: string;
  bio?: string;
  location?: string;
  phoneNumber?: string;
  avatar?: File;
}

export interface PasswordChangeData {
  currentPassword: string;
  newPassword: string;
}

export interface PasswordResetData {
  token: string;
  password: string;
}

// Import these types to avoid circular dependencies
import { Community } from './community.types';
import { Event } from './event.types';
import { HelpRequest } from './help.types'; 