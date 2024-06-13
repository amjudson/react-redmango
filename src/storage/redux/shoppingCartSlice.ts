import {createSlice} from '@reduxjs/toolkit'
import {ShoppingCartModel} from '../../interfaces'



const initialState :ShoppingCartModel = {
  cartItems: [],
}

export const shoppingCartSlice = createSlice({
  name: 'cartItems',
  initialState,
  reducers: {
    setShoppingCart: (state, action) => {
      state.cartItems = action.payload
    },
    updateQuantity: (state, action) => {
      state.cartItems = state.cartItems?.map((item) => {
        if (item.id === action.payload.cartItem?.id) {
          item.quantity = action.payload.quantity
        }
        return item
      })
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems?.filter((cartItem) => {
        if (cartItem.menuItem?.id === action.payload.menuItem?.id) {
          return null
        }
        return cartItem
      })
    },
  },
})

export const {
  setShoppingCart,
  updateQuantity,
  removeFromCart,
} = shoppingCartSlice.actions
export const shoppingCart = shoppingCartSlice.reducer
