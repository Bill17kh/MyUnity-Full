import { api } from './api';

export const eventAPI = {
  getEvents: () => api.get('/events'),

  getEventById: (id: string) => api.get(`/events/${id}`),

  createEvent: (eventData: {
    title: string;
    description: string;
    type: string;
    startTime: string;
    endTime: string;
    location: string;
    capacity: number;
    communityId: string;
  }) => api.post('/events', eventData),

  updateEvent: (
    id: string,
    eventData: {
      title?: string;
      description?: string;
      type?: string;
      startTime?: string;
      endTime?: string;
      location?: string;
      capacity?: number;
    }
  ) => api.put(`/events/${id}`, eventData),

  deleteEvent: (id: string) => api.delete(`/events/${id}`),

  registerForEvent: (id: string) =>
    api.post(`/events/${id}/register`),

  cancelRegistration: (id: string) =>
    api.post(`/events/${id}/cancel-registration`),

  getEventParticipants: (id: string) =>
    api.get(`/events/${id}/participants`),

  updateEventStatus: (
    id: string,
    status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled'
  ) => api.put(`/events/${id}/status`, { status }),

  getUpcomingEvents: () => api.get('/events/upcoming'),

  getPastEvents: () => api.get('/events/past'),

  searchEvents: (query: string) =>
    api.get('/events/search', { params: { q: query } }),
}; 