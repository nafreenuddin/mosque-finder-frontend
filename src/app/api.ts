// // src/app/api.ts
// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// export const api = createApi({
//   reducerPath: 'api',
//   baseQuery: fetchBaseQuery({
//     baseUrl: import.meta.env.VITE_API_URL // e.g. http://localhost:3000/api/v1
//   }),
//   tagTypes: ['Auth', 'Mosque', 'Prayer', 'Lookup'],
//   endpoints: () => ({})
// });
// src/app/api.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,         
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    }
  }),
  tagTypes: ['Auth','Mosque','Prayer','Lookup'],
  endpoints: () => ({})
});
