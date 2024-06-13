import React, {useEffect} from 'react'
import {MenuItemModel} from '../../../interfaces'
import {MenuItemCard} from './index'
import {useGetMenuItemsQuery} from '../../../api/menuItemApi'
import {useDispatch} from 'react-redux'
import {setMenuItem} from '../../../storage/redux/menuItemSlice'

const MenuItemList = () => {
  const dispatch = useDispatch()
  // const [menuItems, setMenuItems] = useState<MenuItemModel[]>([])
  const {data, isLoading} = useGetMenuItemsQuery(null)

  useEffect(() => {
    if (!isLoading) {
      dispatch(setMenuItem(data.result))
    }
  }, [isLoading])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className={'container row'}>
      {data.result.length > 0 && data.result.map((menuItem: MenuItemModel, index: number) => (
        <MenuItemCard key={index} menuItem={menuItem}/>
      ))}
    </div>
  )
}

export default MenuItemList
