import { User } from './auth.types';
import { Event } from './event.types';
import { HelpRequest } from './help.types';

export type CommunityType =
  | 'ARAB'
  | 'AFRICAN'
  | 'REFUGEE'
  | 'DISABLED'
  | 'STUDENT'
  | 'CULTURAL'
  | 'IMMIGRATION'
  | 'JOB';

export interface Community {
  id: string;
  name: string;
  description: string;
  type: CommunityType;
  language: string;
  memberCount: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  creator: User;
  members?: User[];
  events?: Event[];
  helpRequests?: HelpRequest[];
  settings: CommunitySettings;
}

export interface CommunitySettings {
  isPrivate: boolean;
  allowMemberInvites: boolean;
  allowEventCreation: boolean;
  allowHelpRequests: boolean;
}

export interface CommunityMember {
  user: User;
  role: 'admin' | 'moderator' | 'member';
  joinedAt: string;
}

export interface CommunityStats {
  totalMembers: number;
  activeMembers: number;
  totalEvents: number;
  upcomingEvents: number;
  totalHelpRequests: number;
  activeHelpRequests: number;
}

export interface CommunityFilters {
  type?: CommunityType;
  language?: string;
  isActive?: boolean;
  search?: string;
} 