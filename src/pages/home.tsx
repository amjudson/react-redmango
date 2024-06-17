import React from 'react'
import {MenuItemList} from '../components/page/home'
import {Banner} from '../components/page/common'

const Home = () => {
  return (
    <div>
      <Banner/>
      <div className={'container p-2'}>
        <MenuItemList/>
      </div>
    </div>
  )
}

export default Home
