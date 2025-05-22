import { api } from './api';

export const helpAPI = {
  getHelpRequests: () => api.get('/help-requests'),

  getHelpRequestById: (id: string) => api.get(`/help-requests/${id}`),

  createHelpRequest: (requestData: {
    title: string;
    description: string;
    category: string;
    urgencyLevel: string;
    location: string;
    contactInfo: string;
  }) => api.post('/help-requests', requestData),

  updateHelpRequest: (
    id: string,
    requestData: {
      title?: string;
      description?: string;
      category?: string;
      urgencyLevel?: string;
      location?: string;
      contactInfo?: string;
    }
  ) => api.put(`/help-requests/${id}`, requestData),

  deleteHelpRequest: (id: string) =>
    api.delete(`/help-requests/${id}`),

  offerHelp: (id: string) => api.post(`/help-requests/${id}/offer`),

  cancelHelpOffer: (id: string) =>
    api.post(`/help-requests/${id}/cancel-offer`),

  getHelpRequestOffers: (id: string) =>
    api.get(`/help-requests/${id}/offers`),

  updateHelpRequestStatus: (
    id: string,
    status: 'open' | 'in_progress' | 'completed' | 'cancelled'
  ) => api.put(`/help-requests/${id}/status`, { status }),

  getMyHelpRequests: () => api.get('/help-requests/my-requests'),

  getMyHelpOffers: () => api.get('/help-requests/my-offers'),

  searchHelpRequests: (query: string) =>
    api.get('/help-requests/search', { params: { q: query } }),
}; 