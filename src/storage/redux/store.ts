import {configureStore} from '@reduxjs/toolkit'
import {menuItemSlice} from './menuItemSlice'
import {menuItemApi, shoppingCartApi} from '../../api'
import {shoppingCart} from './shoppingCartSlice'

const store = configureStore({
  reducer: {
    shoppingCart: shoppingCart,
    menuItem: menuItemSlice,
    [menuItemApi.reducerPath]: menuItemApi.reducer,
    [shoppingCartApi.reducerPath]: shoppingCartApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(menuItemApi.middleware)
      .concat(shoppingCartApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
