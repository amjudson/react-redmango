import React, {useEffect, useState} from 'react'
import {MenuItemModel} from '../../../interfaces'
import {MenuItemCard} from './index'
import {useGetMenuItemsQuery} from '../../../api/menuItemApi'
import {useDispatch} from 'react-redux'
import {setMenuItem} from '../../../storage/redux/menuItemSlice'
import {MainLoader} from '../common'
import {useAppSelector} from '../../../storage/redux/hooks'
import {SortTypes} from '../../../utility/sd'

const MenuItemList = () => {
  const dispatch = useDispatch()
  const [menuItems, setMenuItems] = useState<MenuItemModel[]>([])
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [categoryList, setCategoryList] = useState<string[]>([])
  const [sortName, setSortName] = useState(SortTypes.NAME_A_Z)

  const sortOptions: Array<SortTypes> = [
    SortTypes.NAME_A_Z,
    SortTypes.NAME_Z_A,
    SortTypes.PRICE_LOW_HIGH,
    SortTypes.PRICE_HIGH_LOW,
  ]

  const {data, isLoading} = useGetMenuItemsQuery(null)

  const searchValue = useAppSelector(state => state.menuItem.search)

  useEffect(() => {
    if (data && data.result) {
      const tempMenuArray = handleFilters(sortName, selectedCategory, searchValue)
      setMenuItems(tempMenuArray)
    }
  }, [searchValue])

  useEffect(() => {
    if (!isLoading) {
      dispatch(setMenuItem(data.result))
      setMenuItems(data.result)
      const tempCategoryList = ['All']
      data.result.forEach((item: MenuItemModel) => {
        if (tempCategoryList.indexOf(item.category) === -1) {
          tempCategoryList.push(item.category)
        }
      })

      setCategoryList(tempCategoryList)
    }
  }, [isLoading, data, dispatch])

  const handleSortClick = (i: number) => {
    setSortName(sortOptions[i])
    const tempArray = handleFilters(
      sortOptions[i],
      selectedCategory,
      searchValue,
    )
    setMenuItems(tempArray)
  }

  const handleCategoryClick = (i: number) => {
    const buttons = document.querySelectorAll('.custom-buttons')
    let localCategory
    buttons.forEach((button, index) => {
      if (index === i) {
        button.classList.add('active')
        if (index === 0) {
          localCategory = 'All'
        } else {
          localCategory = categoryList[index]
        }
        setSelectedCategory(localCategory ?? '')
        const tempMenuArray = handleFilters(sortName, localCategory, searchValue)
        setMenuItems(tempMenuArray)
      } else {
        button.classList.remove('active')
      }
    })

  }

  const handleFilters = (sortType:SortTypes, category: string, search: string) => {
    let tempArray = category === 'All'
      ? [...data.result]
      : data.result.filter((item: MenuItemModel) => item.category.toUpperCase() === category.toUpperCase())
    if (search) {
      const tempArray2 = [...tempArray]
      tempArray = tempArray2.filter((item: MenuItemModel) => (
        item.name.toLowerCase().includes(search.toLowerCase())
      ))
    }

    switch (sortType) {
      case SortTypes.PRICE_LOW_HIGH:
        tempArray.sort((a: MenuItemModel, b: MenuItemModel) => a.price - b.price)
        break
      case SortTypes.PRICE_HIGH_LOW:
        tempArray.sort((a: MenuItemModel, b: MenuItemModel) => b.price - a.price)
        break
      case SortTypes.NAME_A_Z:
        tempArray.sort((a: MenuItemModel, b: MenuItemModel) => a.name.localeCompare(b.name))
        break
      case SortTypes.NAME_Z_A:
        tempArray.sort((a: MenuItemModel, b: MenuItemModel) => b.name.localeCompare(a.name))
        break
    }

    return tempArray
  }

  if (isLoading) {
    return <MainLoader/>
  }

  return (
    <div className={'container row'}>
      <div className={'my-3'}>
        <ul className={'nav w-100 d-flex justify-content-center'}>
          {categoryList.map((categoryName: string, index: number) => (
            <li className={'nav-item'} key={index}>
              <button
                className={`nav-link p-0 pb-2 custom-buttons fs-5 ${index === 0 && 'active'}`}
                onClick={() => handleCategoryClick(index)}
              >
                {categoryName}
              </button>
            </li>
          ))}
          <li className={'nav-item dropdown'} style={{marginLeft: 'auto'}}>
            <div
              className={'nav-link dropdown-toggle text-dark fs-6 border'}
              role={'button'}
              data-bs-toggle={'dropdown'}
              aria-expanded={'false'}
            >
              {sortName}
            </div>
            <ul className={'dropdown-menu'}>
              {sortOptions.map((sortType: SortTypes, index: number) => (
                <li
                  className={'dropdown-item drop-down-pointer'} key={index}
                  onClick={() => handleSortClick(index)}
                >
                    {sortType}
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </div>
      {menuItems.length > 0 && menuItems.map((menuItem: MenuItemModel, index: number) => (
        <MenuItemCard key={index} menuItem={menuItem}/>
      ))}
    </div>
  )
}

export default MenuItemList
