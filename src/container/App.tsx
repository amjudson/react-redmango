import React, {useEffect} from 'react'
import {useAppDispatch, useAppSelector} from '../storage/redux/hooks'
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
  Payment,
} from '../pages'
import {useGetShoppingCartQuery} from '../api/shoppingCartApi'
import {setShoppingCart} from '../storage/redux/shoppingCartSlice'
import {UserModel} from '../interfaces'
import jwt_decode from 'jwt-decode'
import {setLoggedInUser} from '../storage/redux/userAuthSlice'

const App = () => {
  const dispatch = useAppDispatch()
  const userData = useAppSelector((state) => state.userAuth)
  const {data, isLoading} = useGetShoppingCartQuery(userData.id)

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
  }, [data])

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
            path='/payment'
            element={<Payment/>}
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
