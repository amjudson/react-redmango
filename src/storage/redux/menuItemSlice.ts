import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  menuItem: [],
}

export const menuItemsSlice = createSlice({
  name: 'menuItem',
  initialState,
  reducers: {
    setMenuItem: (state, action) => {
      state.menuItem = action.payload
    },
  },
})

export const {setMenuItem} = menuItemsSlice.actions
export const menuItemSlice = menuItemsSlice.reducer
