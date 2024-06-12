import React from 'react'
import {MenuItemModel} from '../../../interfaces'

interface MenuItemCardProps {
  menuItem: MenuItemModel
}

const MenuItemCard = (props: MenuItemCardProps) => {
  return (
    <div>
      {props.menuItem.name}
    </div>
  )
}

export default MenuItemCard
