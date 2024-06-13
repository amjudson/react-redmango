import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const shoppingCartApi = createApi({
  reducerPath: 'shoppingCartApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://localhost:7079/api/',
  }),
  tagTypes: ['ShoppingCart'],
  endpoints: (builder) => ({
    getShoppingCart: builder.query({
      query: (userId) => ({
        url: `shoppingCart`,
        params: {
          userId,
        },
      }),
      providesTags: ['ShoppingCart'],
    }),
    updateShoppingCart: builder.mutation({
      query: ({userId, menuItemId, updateQuantityBy}) => ({
        url: `shoppingCart`,
        method: 'POST',
        params: {
          userId,
          menuItemId,
          updateQuantityBy,
        },
      }),
      invalidatesTags: ['ShoppingCart'],
    }),
  }),
})

export const {useGetShoppingCartQuery, useUpdateShoppingCartMutation} = shoppingCartApi
export default shoppingCartApi
