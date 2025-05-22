import { api } from './api';

export const communityAPI = {
  getCommunities: () => api.get('/communities'),

  getCommunityById: (id: string) => api.get(`/communities/${id}`),

  createCommunity: (communityData: {
    name: string;
    description: string;
    type: string;
    language: string;
  }) => api.post('/communities', communityData),

  updateCommunity: (
    id: string,
    communityData: {
      name?: string;
      description?: string;
      type?: string;
      language?: string;
    }
  ) => api.put(`/communities/${id}`, communityData),

  deleteCommunity: (id: string) => api.delete(`/communities/${id}`),

  joinCommunity: (id: string) => api.post(`/communities/${id}/join`),

  leaveCommunity: (id: string) => api.post(`/communities/${id}/leave`),

  getCommunityMembers: (id: string) =>
    api.get(`/communities/${id}/members`),

  getCommunityEvents: (id: string) =>
    api.get(`/communities/${id}/events`),

  getCommunityHelpRequests: (id: string) =>
    api.get(`/communities/${id}/help-requests`),

  updateCommunitySettings: (
    id: string,
    settings: {
      isPrivate?: boolean;
      allowMemberInvites?: boolean;
      allowEventCreation?: boolean;
      allowHelpRequests?: boolean;
    }
  ) => api.put(`/communities/${id}/settings`, settings),
}; 