import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const menuItemApi = createApi({
  reducerPath: 'menuItemApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://localhost:7079/api/',
  }),
  tagTypes: ['MenuItems'],
  endpoints: (builder) => ({
    getMenuItems: builder.query({
      query: () => ({
        url: 'menuItem',
      }),
      providesTags: ['MenuItems'],
    }),
    getMenuItemById: builder.query({
      query: (id) => ({
        url: `menuItem/${id}`,
      }),
      providesTags: ['MenuItems'],
    }),
    createMenuItem: builder.mutation({
      query: (data) => ({
        url: `menuItem`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['MenuItems'],
    }),
    updateMenuItem: builder.mutation({
      query: ({data, id}) => ({
        url: `menuItem/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['MenuItems'],
    }),
    deleteMenuItem: builder.mutation({
      query: (id) => ({
        url: `menuItem/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['MenuItems'],
    }),
  }),
})

export const {
  useGetMenuItemsQuery,
  useGetMenuItemByIdQuery,
  useCreateMenuItemMutation,
  useUpdateMenuItemMutation,
  useDeleteMenuItemMutation,
} = menuItemApi
export default menuItemApi
