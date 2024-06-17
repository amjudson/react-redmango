import React, {useState} from 'react'
import {ApiResponse, MenuItemModel} from '../../../interfaces'
import {Link, useNavigate} from 'react-router-dom'
import {useUpdateShoppingCartMutation} from '../../../api/shoppingCartApi'
import {MiniLoader} from '../common'
import {toastNotify} from '../../../helper'
import {useAppSelector} from '../../../storage/redux/hooks'

interface MenuItemCardProps {
  menuItem: MenuItemModel
}

const MenuItemCard = (props: MenuItemCardProps) => {
  const navigate = useNavigate()
  const [addingToCart, setAddingToCart] = useState(false)
  const [updateShoppingCart] = useUpdateShoppingCartMutation()
  const userData = useAppSelector((state) => state.userAuth)

  const handleAddToCart = async (menuItemId: number) => {
    if (!userData.id) {
      navigate('/login')
      return
    }

    setAddingToCart(true)
    const response: ApiResponse = await updateShoppingCart({
      userId: userData.id,
      menuItemId: menuItemId,
      updateQuantityBy: 1,
    })

    if (response.data && response.data.success) {
      toastNotify('Item added to cart successfully')
    }
    setAddingToCart(false)
  }

  return (
    <div className={'col-md-4 col-12 p-4'}>
      <div
        className={'card'}
        style={{boxShadow: '0 1px 7px 0 rgb(0 0 0 / 50%)'}}
      >
        <div className={'card-body pt-2'}>
          <div className={'row col-10 offset-1 p-4'}>
            <Link to={`/menuItemDetails/${props.menuItem.id}`}>
              <img
                src={props.menuItem.image}
                style={{borderRadius: '50%'}}
                alt=''
                className={'w-100 mt-5 image-box'}
              />
            </Link>
          </div>
          {props.menuItem.specialTag && props.menuItem.specialTag.length > 0 && (
            <i
              className={'bi bi-star btn btn-success menu-icon menu-icon-left'}
            >
              &nbsp; {props.menuItem.specialTag}
            </i>
          )}

          {addingToCart ? (
            <div className={'base-icon'}>
              <MiniLoader/>
            </div>
          ) : (
            <i
              className={'bi bi-cart-plus btn btn-outline-danger menu-icon menu-icon-right'}
              onClick={() => handleAddToCart(props.menuItem.id)}
            ></i>
          )}

          <div className={'text-center'}>
            <p className={'card-title m-0 text-success fs-3'}>
              <Link
                to={`/menuItemDetails/${props.menuItem.id}`}
                style={{textDecoration: 'none', color: 'green'}}
              >
                {props.menuItem.name}
              </Link>
            </p>
            <p className={'badge bg-secondary'} style={{fontSize: '12px'}}>
              {props.menuItem.category}
            </p>
          </div>
          <p className={'card-text'} style={{textAlign: 'center'}}>
            {props.menuItem.description}
          </p>
          <div className={'row text-center'}>
            <h4>${props.menuItem.price}</h4>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MenuItemCard
