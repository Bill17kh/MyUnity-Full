import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import communityReducer from './slices/communitySlice';
import eventReducer from './slices/eventSlice';
import helpReducer from './slices/helpSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    community: communityReducer,
    event: eventReducer,
    help: helpReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 