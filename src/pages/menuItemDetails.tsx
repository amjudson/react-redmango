import React, {useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {useGetMenuItemByIdQuery} from '../api/menuItemApi'
import {useUpdateShoppingCartMutation} from '../api/shoppingCartApi'

const style = {
  height: '40px',
  fontSize: '20px',
}

const USER_ID = 'a4111e25-b17c-4b64-b583-9df853db5249'

const MenuItemDetails = () => {
  const {menuItemId} = useParams()
  const navigate = useNavigate()
  const {data, isLoading} = useGetMenuItemByIdQuery(menuItemId)
  const [quantity, setQuantity] = useState(1)
  const [addingToCart, setAddingToCart] = useState(false)
  const [updateShoppingCart] = useUpdateShoppingCartMutation()

  const handleQuantity = (value: number) => {
    let newQuantity = quantity + value
    if (newQuantity <= 0) {
      newQuantity = 1
    }
    setQuantity(newQuantity)
    return
  }

  const handleAddToCart = async (menuItemId: number) => {
    setAddingToCart(true)
    const response = await updateShoppingCart({
      userId: USER_ID,
      menuItemId: menuItemId,
      updateQuantityBy: quantity,
    })

    console.log(response)
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
                <div className={'col-5'}>
                  <button
                    className={'btn btn-success form-control'}
                    onClick={() => handleAddToCart(data.result.id)}
                  >
                    Add to Cart
                  </button>
                </div>

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
        : <div>Loading...</div>}
    </div>)
}

export default MenuItemDetails
