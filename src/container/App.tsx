import React from 'react'
import {Footer, Header} from '../components/layout'
import {Home, MenuItemDetails, NotFound} from '../pages'
import {Route, Routes} from 'react-router-dom'

const App = () => {
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
          <Route path='*' element={<NotFound/>}/>
        </Routes>
      </div>
      <Footer/>
    </div>
  )
}

export default App
