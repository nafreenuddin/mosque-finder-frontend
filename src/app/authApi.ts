// src/app/authApi.ts
import { api } from './api';

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    registerAdmin: builder.mutation<{ otp: string }, { mobile: string; name: string; email: string }>({
      query: (body) => ({
        url: '/auth/register-admin',
        method: 'POST',
        body
      }),
      invalidatesTags: []
    }),
    verifyRegistration: builder.mutation<
      { message: string },
      { mobile: string; code: string; name: string; email: string; pin: string; pinConfirm: string }
    >({
      query: (body) => ({
        url: '/auth/verify-registration',
        method: 'POST',
        body
      }),
      invalidatesTags: []
    }),
    login: builder.mutation<{ token: string }, { mobile: string; pin: string }>({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        body
      }),
      // When we get a token back, store it
      async onQueryStarted(_, { queryFulfilled }) {
        const { data } = await queryFulfilled;
        localStorage.setItem('token', data.token);
      }
    }),
    requestPinReset: builder.mutation<{ otp: string }, { mobile: string }>({
      query: (body) => ({
        url: '/auth/request-pin-reset',
        method: 'POST',
        body
      })
    }),
    verifyPinReset: builder.mutation<
      { success: boolean; message?: string },
      { mobile: string; code: string; newPin: string; newPinConfirm: string }
    >({
      query: (body) => ({
        url: '/auth/verify-pin-reset',
        method: 'POST',
        body
      })
    })
  }),
  overrideExisting: false
});

export const {
  useRegisterAdminMutation,
  useVerifyRegistrationMutation,
  useLoginMutation,
  useRequestPinResetMutation,
  useVerifyPinResetMutation
} = authApi;
