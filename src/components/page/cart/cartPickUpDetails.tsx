import React, {useState, useEffect} from 'react'
import {
  // useAppDispatch,
  useAppSelector,
} from '../../../storage/redux/hooks'
import {inputHelper} from '../../../helper'
import {MiniLoader} from '../common'
import {useInitiatePaymentMutation} from '../../../api/paymentApi'
import {useNavigate} from 'react-router-dom'
import {ApiResponse} from '../../../interfaces'

// const USER_ID = 'a4111e25-b17c-4b64-b583-9df853db5249'

const CartPickUpDetails = () => {
  const navigate = useNavigate()
  const [initiatePayment] = useInitiatePaymentMutation()

  const [loading, setLoading] = useState(false)

  const shoppingCartFromStore = useAppSelector((state) => state.shoppingCart ?? [])
  const userData = useAppSelector((state) => state.userAuth ?? {})
  const initialUserData = {
    name: userData.fullName ?? '',
    email: userData.email ?? '',
    phoneNumber: '',
  }
  const [userInput, setUserInput] = useState(initialUserData)

  let grandTotal = 0
  let totalItems = 0

  shoppingCartFromStore.cartItems?.map((cartItem) => {
    totalItems += cartItem.quantity ?? 0
    grandTotal += (cartItem.menuItem?.price ?? 0) * (cartItem.quantity ?? 0)
    return null
  })

  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tempData = inputHelper(e, userInput)
    setUserInput(tempData)
  }

  useEffect(() => {
    setUserInput({
        name: userData.fullName ?? '',
        email: userData.email ?? '',
        phoneNumber: '',
      },
    )
  }, [userData])

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const {data}: ApiResponse = await initiatePayment(userData.id)

    navigate('/payment', {
      state: {
        apiResult: data?.result,
        userInput,
      },
    })
  }

  return (
    <div className={'border pb-5 pt-3'}>
      <h1 style={{fontWeight: '300'}} className={'text-center text-success'}>
        Pickup Details
      </h1>
      <hr/>
      <form onSubmit={handleSubmit} className={'col-10 mx-auto'}>
        <div className={'form-group mt-3'}>
          Pickup Name
          <input
            type={'text'}
            className={'form-control'}
            placeholder={'name...'}
            name={'name'}
            value={userInput.name}
            onChange={handleUserInput}
            required
          />
        </div>
        <div className={'form-group mt-3'}>
          Pickup Email
          <input
            type={'email'}
            className={'form-control'}
            placeholder={'email...'}
            name={'email'}
            value={userInput.email}
            onChange={handleUserInput}
            required
          />
        </div>

        <div className={'form-group mt-3'}>
          Pickup Phone Number
          <input
            type={'number'}
            className={'form-control'}
            placeholder={'phone number...'}
            name={'phoneNumber'}
            value={userInput.phoneNumber}
            onChange={handleUserInput}
            required
          />
        </div>
        <div className={'form-group mt-3'}>
          <div className={'card p-3'} style={{background: 'ghostwhite'}}>
            <h5>Grand Total : ${grandTotal.toFixed(2)}</h5>
            <h5>No of items : {totalItems}</h5>
          </div>
        </div>
        <button
          type={'submit'}
          disabled={loading}
          className={'btn btn-lg btn-success form-control mt-3'}
        >
          {loading ? <MiniLoader/> : 'Looks Good? Place Order!'}
        </button>
      </form>
    </div>)
}

export default CartPickUpDetails
