// src/app/adminApi.ts
import { api } from './api';

export interface MosqueStatus {
  status:            'under_review' | 'approved' | 'rejected';
  isMosqueApproved:  boolean;
  review_notes?:     string;
}

/** Full dashboard payload */
export interface FullMosqueData {
  mosque:        any;
  profile:       any;
  prayerTimings: any;
}

export const adminApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMosqueStatus: builder.query<MosqueStatus, void>({
      query: () => '/admin/mosque/status',
      providesTags: ['Mosque']
    }),
    getFullMosque: builder.query<FullMosqueData, void>({
      query: () => '/admin/mosque',
      providesTags: ['Mosque']
    }),
  }),
  overrideExisting: false
});

export const {
  useLazyGetMosqueStatusQuery,
  useGetFullMosqueQuery
} = adminApi;
