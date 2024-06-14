import {configureStore} from '@reduxjs/toolkit'
import {menuItemSlice} from './menuItemSlice'
import {menuItemApi, shoppingCartApi} from '../../api'
import {shoppingCart} from './shoppingCartSlice'
import userAuthSlice from './userAuthSlice'
import {authApi} from '../../api'

const store = configureStore({
  reducer: {
    shoppingCart: shoppingCart,
    menuItem: menuItemSlice,
    userAuth: userAuthSlice,
    [menuItemApi.reducerPath]: menuItemApi.reducer,
    [shoppingCartApi.reducerPath]: shoppingCartApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(menuItemApi.middleware)
      .concat(authApi.middleware)
      .concat(shoppingCartApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
