import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import communityReducer from './slices/communitySlice';
import eventReducer from './slices/eventSlice';
import helpRequestReducer from './slices/helpRequestSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    community: communityReducer,
    event: eventReducer,
    helpRequest: helpRequestReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 