import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_ENDPOINTS } from '../../utils/constants';
import { getStoredToken } from '../../utils/helpers';
import { COMMUNITY_TYPES } from '../../utils/constants';

interface Community {
  id: string;
  name: string;
  description: string;
  type: keyof typeof COMMUNITY_TYPES;
  memberCount: number;
  createdAt: string;
  imageUrl?: string;
}

interface CommunityState {
  communities: Community[];
  currentCommunity: Community | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: CommunityState = {
  communities: [],
  currentCommunity: null,
  isLoading: false,
  error: null,
};

export const fetchCommunities = createAsyncThunk(
  'community/fetchCommunities',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(API_ENDPOINTS.COMMUNITY.BASE, {
        headers: {
          Authorization: `Bearer ${getStoredToken()}`,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message);
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue('Failed to fetch communities');
    }
  }
);

export const fetchCommunityById = createAsyncThunk(
  'community/fetchCommunityById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_ENDPOINTS.COMMUNITY.BASE}/${id}`, {
        headers: {
          Authorization: `Bearer ${getStoredToken()}`,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message);
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue('Failed to fetch community');
    }
  }
);

export const createCommunity = createAsyncThunk(
  'community/createCommunity',
  async (communityData: Omit<Community, 'id' | 'memberCount' | 'createdAt'>, { rejectWithValue }) => {
    try {
      const response = await fetch(API_ENDPOINTS.COMMUNITY.BASE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getStoredToken()}`,
        },
        body: JSON.stringify(communityData),
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message);
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue('Failed to create community');
    }
  }
);

export const updateCommunity = createAsyncThunk(
  'community/updateCommunity',
  async (
    { id, data }: { id: string; data: Partial<Community> },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(`${API_ENDPOINTS.COMMUNITY.BASE}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getStoredToken()}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message);
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue('Failed to update community');
    }
  }
);

export const deleteCommunity = createAsyncThunk(
  'community/deleteCommunity',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_ENDPOINTS.COMMUNITY.BASE}/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${getStoredToken()}`,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message);
      }

      return id;
    } catch (error) {
      return rejectWithValue('Failed to delete community');
    }
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
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCommunities.fulfilled, (state, action) => {
        state.isLoading = false;
        state.communities = action.payload;
      })
      .addCase(fetchCommunities.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch Community by ID
      .addCase(fetchCommunityById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCommunityById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentCommunity = action.payload;
      })
      .addCase(fetchCommunityById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Create Community
      .addCase(createCommunity.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createCommunity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.communities.push(action.payload);
      })
      .addCase(createCommunity.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Update Community
      .addCase(updateCommunity.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateCommunity.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.communities.findIndex(
          (community) => community.id === action.payload.id
        );
        if (index !== -1) {
          state.communities[index] = action.payload;
        }
        if (state.currentCommunity?.id === action.payload.id) {
          state.currentCommunity = action.payload;
        }
      })
      .addCase(updateCommunity.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Delete Community
      .addCase(deleteCommunity.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteCommunity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.communities = state.communities.filter(
          (community) => community.id !== action.payload
        );
        if (state.currentCommunity?.id === action.payload) {
          state.currentCommunity = null;
        }
      })
      .addCase(deleteCommunity.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, clearCurrentCommunity } = communitySlice.actions;
export default communitySlice.reducer; 