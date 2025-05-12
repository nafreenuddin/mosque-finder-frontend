// src/app/mosqueApi.ts
import { api } from './api';

export interface Mosque {
  id: string;
  name: string;
  address_line: string;
  city: string;
  state?: string;
  country: string;
  postal_code?: string;
  location_type?: string;
  latitude: number;
  longitude: number;
  status: string;
  is_mosque_approved: boolean;
}

export interface NewMosque {
  name: string;
  address_line: string;
  city: string;
  state?: string;
  country: string;
  postal_code?: string;
  location_type?: string;
  latitude: number;
  longitude: number;
}

export const mosqueApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createMosque: builder.mutation<{ mosque: Mosque }, NewMosque>({
      query: (body) => ({
        url: '/mosques',
        method: 'POST',
        body
      }),
      invalidatesTags: ['Mosque','Auth']
    }),
    // you can add list, getById, update, etc. here later
  }),
  overrideExisting: false
});

export const { useCreateMosqueMutation } = mosqueApi;
