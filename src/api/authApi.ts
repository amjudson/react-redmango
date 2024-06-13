import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
//
// export type UserCredentials = {
//   username: string
//   password: string
// }
//
// export type UserData = {
//   username: string
//   name: string
//   password: string
//   role: string
// }

const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://localhost:7079/api/',
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (userData) => ({
        url: `auth/register`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: userData,
      }),
    }),
    loginUser: builder.mutation({
      query: (userCredentials) => ({
        url: `auth/login`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: userCredentials,
      }),
    }),
  }),
})

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
} = authApi

export default authApi
