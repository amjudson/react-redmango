import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://localhost:7079/api/',
    prepareHeaders: (headers: Headers) => {
      const token = localStorage.getItem('token')
      token && (headers.append('Authorization', `Bearer ${token}`))
    },
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
    updateOrderHeader: builder.mutation({
      query: (orderDetails) => ({
        url: `order/${orderDetails.orderHeaderId}`,
        method: 'PUT',
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
  useUpdateOrderHeaderMutation,
} = orderApi
export default orderApi
