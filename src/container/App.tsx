import React, {useEffect} from 'react'
import {useAppDispatch} from '../storage/redux/hooks'
import {Route, Routes} from 'react-router-dom'
import {Footer, Header} from '../components/layout'
import {
  Home,
  Login,
  MenuItemDetails,
  NotFound,
  Register,
  ShoppingCart,
  AccessDenied,
  AuthenticationTest,
  AuthenticationTestAdmin,
} from '../pages'
import {useGetShoppingCartQuery} from '../api/shoppingCartApi'
import {setShoppingCart} from '../storage/redux/shoppingCartSlice'
import {UserModel} from '../interfaces'
import jwt_decode from 'jwt-decode'
import {setLoggedInUser} from '../storage/redux/userAuthSlice'

const USER_ID = 'a4111e25-b17c-4b64-b583-9df853db5249'

const App = () => {
  const dispatch = useAppDispatch()
  const {data, isLoading} = useGetShoppingCartQuery(USER_ID)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      const {fullName, id, email, role}: UserModel = jwt_decode(token)
      dispatch(setLoggedInUser({fullName, id, email, role}))
    }
  }, [])

  useEffect(() => {
    if (!isLoading) {
      dispatch(setShoppingCart(data.result?.cartItems))
    }
  }, [isLoading, data, dispatch])

  return (
    <div>
      <Header/>
      <div className={'pb-5'}>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route
            path='/login'
            element={<Login/>}
          />
          <Route
            path='/register'
            element={<Register/>}
          />
          <Route
            path='/menuItemDetails/:menuItemId'
            element={<MenuItemDetails/>}
          />
          <Route
            path='/shoppingCart'
            element={<ShoppingCart/>}
          />
          <Route
            path='/authentication'
            element={<AuthenticationTest/>}
          />
          <Route
            path='/authorization'
            element={<AuthenticationTestAdmin/>}
          />
          <Route
            path='/accessDenied'
            element={<AccessDenied/>}
          />
          <Route path='*' element={<NotFound/>}/>
        </Routes>
      </div>
      <Footer/>
    </div>
  )
}

export default App
