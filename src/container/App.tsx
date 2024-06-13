import React, {useEffect} from 'react'
import {useAppDispatch} from '../storage/redux/hooks'
import {Route, Routes} from 'react-router-dom'
import {Footer, Header} from '../components/layout'
import {
  Home,
  MenuItemDetails,
  NotFound,
  ShoppingCart,
} from '../pages'
import {useGetShoppingCartQuery} from '../api/shoppingCartApi'
import {setShoppingCart} from '../storage/redux/shoppingCartSlice'

const USER_ID = 'a4111e25-b17c-4b64-b583-9df853db5249'

const App = () => {
  const dispatch = useAppDispatch()
  const {data, isLoading} = useGetShoppingCartQuery(USER_ID)

  useEffect(() => {
    if (!isLoading) {
      dispatch(setShoppingCart(data.result?.cartItems))
    }
  }, [isLoading, data])

  return (
    <div>
      <Header/>
      <div className={'pb-5'}>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route
            path='/menuItemDetails/:menuItemId'
            element={<MenuItemDetails/>}
          />
          <Route
            path='/shoppingCart'
            element={<ShoppingCart/>}
          />
          <Route path='*' element={<NotFound/>}/>
        </Routes>
      </div>
      <Footer/>
    </div>
  )
}

export default App
