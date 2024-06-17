import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  menuItem: [],
  search: '',
}

export const menuItemsSlice = createSlice({
  name: 'menuItem',
  initialState,
  reducers: {
    setMenuItem: (state, action) => {
      state.menuItem = action.payload
    },
    setSearchItem: (state, action) => {
      state.search = action.payload
    },
  },
})

export const {
  setMenuItem,
  setSearchItem,
} = menuItemsSlice.actions
export const menuItemSlice = menuItemsSlice.reducer
