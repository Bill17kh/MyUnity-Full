import { User } from './auth.types';
import { Community } from './community.types';

export type EventType =
  | 'CULTURAL'
  | 'WORKSHOP'
  | 'NETWORKING'
  | 'SUPPORT'
  | 'EDUCATION';

export type EventStatus =
  | 'upcoming'
  | 'ongoing'
  | 'completed'
  | 'cancelled';

export interface Event {
  id: string;
  title: string;
  description: string;
  type: EventType;
  startTime: string;
  endTime: string;
  location: string;
  capacity: number;
  registeredCount: number;
  status: EventStatus;
  createdAt: string;
  updatedAt: string;
  organizer: User;
  community: Community;
  participants?: User[];
}

export interface EventParticipant {
  user: User;
  registeredAt: string;
  status: 'registered' | 'attended' | 'cancelled';
}

export interface EventStats {
  totalParticipants: number;
  registeredParticipants: number;
  attendedParticipants: number;
  cancelledParticipants: number;
}

export interface EventFilters {
  type?: EventType;
  status?: EventStatus;
  communityId?: string;
  startDate?: string;
  endDate?: string;
  search?: string;
} 