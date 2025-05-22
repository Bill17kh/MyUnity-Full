import { User } from './auth.types';
import { Community } from './community.types';

export type HelpCategory =
  | 'LANGUAGE'
  | 'HOUSING'
  | 'LEGAL'
  | 'EDUCATION'
  | 'HEALTHCARE'
  | 'EMPLOYMENT'
  | 'OTHER';

export type HelpStatus =
  | 'open'
  | 'in_progress'
  | 'completed'
  | 'cancelled';

export type UrgencyLevel =
  | 'low'
  | 'medium'
  | 'high'
  | 'urgent';

export interface HelpRequest {
  id: string;
  title: string;
  description: string;
  category: HelpCategory;
  urgencyLevel: UrgencyLevel;
  status: HelpStatus;
  location: string;
  contactInfo: string;
  createdAt: string;
  updatedAt: string;
  requester: User;
  community: Community;
  helper?: User;
  helperCount: number;
  offers?: HelpOffer[];
}

export interface HelpOffer {
  id: string;
  helper: User;
  message: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

export interface HelpRequestStats {
  totalRequests: number;
  openRequests: number;
  inProgressRequests: number;
  completedRequests: number;
  cancelledRequests: number;
}

export interface HelpRequestFilters {
  category?: HelpCategory;
  status?: HelpStatus;
  urgencyLevel?: UrgencyLevel;
  communityId?: string;
  search?: string;
} 