import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://localhost:7079/api/',
  }),
  tagTypes: ['Orders'],
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: (userId) => ({
        url: `order`,
        params: {
          userId,
        },
      }),
      providesTags: ['Orders'],
    }),
    getOrderDetails: builder.query({
      query: (id) => ({
        url: `order/${id}`,
      }),
      providesTags: ['Orders'],
    }),
    createOrder: builder.mutation({
      query: (orderDetails) => ({
        url: 'order',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: orderDetails,
      }),
      invalidatesTags: ['Orders'],
    }),
  }),
})

export const {
  useCreateOrderMutation,
  useGetAllOrdersQuery,
  useGetOrderDetailsQuery,
} = orderApi
export default orderApi
