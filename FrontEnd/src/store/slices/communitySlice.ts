import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { communityAPI } from '../../services/api';
import { Community } from '../../types/community.types';

interface CommunityState {
  communities: Community[];
  currentCommunity: Community | null;
  loading: boolean;
  error: string | null;
}

const initialState: CommunityState = {
  communities: [],
  currentCommunity: null,
  loading: false,
  error: null,
};

export const fetchCommunities = createAsyncThunk(
  'community/fetchAll',
  async () => {
    const response = await communityAPI.getCommunities();
    return response.data;
  }
);

export const fetchCommunityById = createAsyncThunk(
  'community/fetchById',
  async (id: string) => {
    const response = await communityAPI.getCommunityById(id);
    return response.data;
  }
);

export const createCommunity = createAsyncThunk(
  'community/create',
  async (communityData: {
    name: string;
    description: string;
    type: string;
    language: string;
  }) => {
    const response = await communityAPI.createCommunity(communityData);
    return response.data;
  }
);

export const joinCommunity = createAsyncThunk(
  'community/join',
  async (communityId: string) => {
    const response = await communityAPI.joinCommunity(communityId);
    return response.data;
  }
);

const communitySlice = createSlice({
  name: 'community',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentCommunity: (state) => {
      state.currentCommunity = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Communities
      .addCase(fetchCommunities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCommunities.fulfilled, (state, action) => {
        state.loading = false;
        state.communities = action.payload;
      })
      .addCase(fetchCommunities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch communities';
      })
      // Fetch Community by ID
      .addCase(fetchCommunityById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCommunityById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentCommunity = action.payload;
      })
      .addCase(fetchCommunityById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch community';
      })
      // Create Community
      .addCase(createCommunity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCommunity.fulfilled, (state, action) => {
        state.loading = false;
        state.communities.push(action.payload);
      })
      .addCase(createCommunity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create community';
      })
      // Join Community
      .addCase(joinCommunity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(joinCommunity.fulfilled, (state, action) => {
        state.loading = false;
        if (state.currentCommunity) {
          state.currentCommunity.memberCount += 1;
        }
      })
      .addCase(joinCommunity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to join community';
      });
  },
});

export const { clearError, clearCurrentCommunity } = communitySlice.actions;
export default communitySlice.reducer; 