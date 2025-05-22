import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { eventAPI } from '../../services/api';
import { Event } from '../../types/event.types';

interface EventState {
  events: Event[];
  currentEvent: Event | null;
  loading: boolean;
  error: string | null;
}

const initialState: EventState = {
  events: [],
  currentEvent: null,
  loading: false,
  error: null,
};

export const fetchEvents = createAsyncThunk(
  'event/fetchAll',
  async () => {
    const response = await eventAPI.getEvents();
    return response.data;
  }
);

export const fetchEventById = createAsyncThunk(
  'event/fetchById',
  async (id: string) => {
    const response = await eventAPI.getEventById(id);
    return response.data;
  }
);

export const createEvent = createAsyncThunk(
  'event/create',
  async (eventData: {
    title: string;
    description: string;
    type: string;
    startTime: string;
    endTime: string;
    location: string;
    capacity: number;
    communityId: string;
  }) => {
    const response = await eventAPI.createEvent(eventData);
    return response.data;
  }
);

export const registerForEvent = createAsyncThunk(
  'event/register',
  async (eventId: string) => {
    const response = await eventAPI.registerForEvent(eventId);
    return response.data;
  }
);

const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentEvent: (state) => {
      state.currentEvent = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Events
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch events';
      })
      // Fetch Event by ID
      .addCase(fetchEventById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEventById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentEvent = action.payload;
      })
      .addCase(fetchEventById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch event';
      })
      // Create Event
      .addCase(createEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.events.push(action.payload);
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create event';
      })
      // Register for Event
      .addCase(registerForEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerForEvent.fulfilled, (state, action) => {
        state.loading = false;
        if (state.currentEvent) {
          state.currentEvent.registeredCount += 1;
        }
      })
      .addCase(registerForEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to register for event';
      });
  },
});

export const { clearError, clearCurrentEvent } = eventSlice.actions;
export default eventSlice.reducer; 