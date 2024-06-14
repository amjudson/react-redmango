import {configureStore} from '@reduxjs/toolkit'
import {menuItemSlice} from './menuItemSlice'
import {
  menuItemApi,
  shoppingCartApi,
  authApi,
  paymentApi,
} from '../../api'
import {shoppingCart} from './shoppingCartSlice'
import userAuthSlice from './userAuthSlice'

const store = configureStore({
  reducer: {
    shoppingCart: shoppingCart,
    menuItem: menuItemSlice,
    userAuth: userAuthSlice,
    [menuItemApi.reducerPath]: menuItemApi.reducer,
    [shoppingCartApi.reducerPath]: shoppingCartApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [paymentApi.reducerPath]: paymentApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(menuItemApi.middleware)
      .concat(authApi.middleware)
      .concat(paymentApi.middleware)
      .concat(shoppingCartApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
