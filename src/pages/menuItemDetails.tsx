import React, {useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {useGetMenuItemByIdQuery} from '../api/menuItemApi'
import {useUpdateShoppingCartMutation} from '../api/shoppingCartApi'
import {MainLoader, MiniLoader} from '../components/page/common'
import {toastNotify} from '../helper'
import {ApiResponse} from '../interfaces'
import {useAppSelector} from '../storage/redux/hooks'

const style = {
  height: '40px',
  fontSize: '20px',
}

const MenuItemDetails = () => {
  const {menuItemId} = useParams()
  const navigate = useNavigate()
  const {data, isLoading} = useGetMenuItemByIdQuery(menuItemId)
  const [quantity, setQuantity] = useState(1)
  const [addingToCart, setAddingToCart] = useState(false)
  const [updateShoppingCart] = useUpdateShoppingCartMutation()
  const userData = useAppSelector((state) => state.userAuth)

  const handleQuantity = (value: number) => {
    let newQuantity = quantity + value
    if (newQuantity <= 0) {
      newQuantity = 1
    }
    setQuantity(newQuantity)
    return
  }

  const handleAddToCart = async (menuItemId: number) => {
    if (!userData.id) {
      navigate('/login')
      return
    }

    setAddingToCart(true)
    const response: ApiResponse = await updateShoppingCart({
      userId: userData.id,
      menuItemId: menuItemId,
      updateQuantityBy: quantity,
    })

    if (response.data && response.data.success) {
      toastNotify('Item added to cart successfully')
    }
    setAddingToCart(false)
  }

  return (
    <div className={'container pt-4 pt-md-5'}>
      {!isLoading ? (
          <div className={'row'}>
            <div className={'col-7'}>
              <h2 className={'text-success'}>
                {data.result.name}
              </h2>
              <span>
            <span
              className={'badge text-bg-dark pt-2'}
              style={style}
            >
              {data.result.category}
            </span>
          </span>
              <span>
            <span
              className={'badge text-bg-light pt-2'}
              style={style}
            >
              {data.result.specialTag}
            </span>
          </span>
              <p style={{fontSize: '20px'}} className={'pt-2'}>
                {data.result.description}
              </p>
              <span className={'h3'}>
                ${data.result.price}
              </span> &nbsp;&nbsp;&nbsp;
              <span
                className={'pb-2  p-3'}
                style={{border: '1px solid #333', borderRadius: '30px'}}
              >
            <i
              className={'bi bi-dash p-1'}
              style={{fontSize: '25px', cursor: 'pointer'}}
              onClick={() => {
                handleQuantity(-1)
              }}
            ></i>
            <span className={'h3 mt-3 px-3'}>{quantity}</span>
            <i
              className={'bi bi-plus p-1'}
              style={{fontSize: '25px', cursor: 'pointer'}}
              onClick={() => {
                handleQuantity(1)
              }}
            ></i>
          </span>
              <div className={'row pt-4'}>
                {addingToCart
                  ? (
                    <button disabled className={'btn btn-success form-control'}>
                      <MiniLoader size={50}/>
                    </button>
                  )
                  : (
                    <div className={'col-5'}>
                      <button
                        className={'btn btn-success form-control'}
                        onClick={() => handleAddToCart(data.result.id)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  )}

                <div className={'col-5 '}>
                  <button
                    className={'btn btn-secondary form-control'}
                    onClick={() => navigate(-1)}
                  >
                    Back to Home
                  </button>
                </div>
              </div>
            </div>
            <div className={'col-5'}>
              <img
                src={data.result.image}
                width='100%'
                style={{borderRadius: '50%'}}
                alt={'No content'}
              ></img>
            </div>
          </div>)
        : <MainLoader/>}
    </div>)
}

export default MenuItemDetails
