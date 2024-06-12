import React, {useEffect, useState} from 'react'
import {MenuItemModel} from '../../../interfaces'
import {MenuItemCard} from './index'

const MenuItemList = () => {
  const [menuItems, setMenuItems] = useState<MenuItemModel[]>([])

  useEffect(() => {
    fetch('https://localhost:7079/api/MenuItem')
      .then(response => response.json())
      .then(data => setMenuItems(data.result))
  }, [])

  console.log(menuItems)
  return (
    <div className={'container row'}>
      {menuItems.length > 0 && menuItems.map((menuItem: MenuItemModel, index: number) => (
        <MenuItemCard key={index} menuItem={menuItem}/>
      ))}
    </div>
  )
}

export default MenuItemList
