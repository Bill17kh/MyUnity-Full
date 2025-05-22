import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { helpAPI } from '../../services/api';
import { HelpRequest } from '../../types/help.types';

interface HelpState {
  helpRequests: HelpRequest[];
  currentRequest: HelpRequest | null;
  loading: boolean;
  error: string | null;
}

const initialState: HelpState = {
  helpRequests: [],
  currentRequest: null,
  loading: false,
  error: null,
};

export const fetchHelpRequests = createAsyncThunk(
  'help/fetchAll',
  async () => {
    const response = await helpAPI.getHelpRequests();
    return response.data;
  }
);

export const fetchHelpRequestById = createAsyncThunk(
  'help/fetchById',
  async (id: string) => {
    const response = await helpAPI.getHelpRequestById(id);
    return response.data;
  }
);

export const createHelpRequest = createAsyncThunk(
  'help/create',
  async (requestData: {
    title: string;
    description: string;
    category: string;
    urgencyLevel: string;
    location: string;
    contactInfo: string;
  }) => {
    const response = await helpAPI.createHelpRequest(requestData);
    return response.data;
  }
);

export const offerHelp = createAsyncThunk(
  'help/offer',
  async (requestId: string) => {
    const response = await helpAPI.offerHelp(requestId);
    return response.data;
  }
);

const helpSlice = createSlice({
  name: 'help',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentRequest: (state) => {
      state.currentRequest = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Help Requests
      .addCase(fetchHelpRequests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHelpRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.helpRequests = action.payload;
      })
      .addCase(fetchHelpRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch help requests';
      })
      // Fetch Help Request by ID
      .addCase(fetchHelpRequestById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHelpRequestById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentRequest = action.payload;
      })
      .addCase(fetchHelpRequestById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch help request';
      })
      // Create Help Request
      .addCase(createHelpRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createHelpRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.helpRequests.push(action.payload);
      })
      .addCase(createHelpRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create help request';
      })
      // Offer Help
      .addCase(offerHelp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(offerHelp.fulfilled, (state, action) => {
        state.loading = false;
        if (state.currentRequest) {
          state.currentRequest.helperCount += 1;
        }
      })
      .addCase(offerHelp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to offer help';
      });
  },
});

export const { clearError, clearCurrentRequest } = helpSlice.actions;
export default helpSlice.reducer; 