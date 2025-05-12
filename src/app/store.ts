// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners }   from '@reduxjs/toolkit/query';
import { api }              from './api';
import './adminApi';
// import your slices as you add them:
 import authReducer from '../features/auth/authSlice';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(api.middleware)
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
