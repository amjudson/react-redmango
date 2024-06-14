import React from 'react'
import {useParams} from 'react-router-dom'
import {useGetOrderDetailsQuery} from '../../api/orderApi'
import {OrderSummary} from '../../components/page/order'

const OrderDetails = () => {
  const {id} = useParams()
  const {data, isLoading} = useGetOrderDetailsQuery(id)
  console.log(data)
  let userInput, orderDetails
  if (!isLoading && data.result) {
    userInput = {
      name: data.result.pickupName,
      email: data.result.pickupEmail,
      phoneNumber: data.result.pickupPhoneNumber,
    }

    orderDetails = {
      id: data.result.orderHeaderId,
      cartItems: data.result.orderDetails,
      cartTotal: data.result.orderTotal,
      status: data.result.status,
    }
  }

  console.log('Order Details:', orderDetails, 'User Input:', userInput)

  return (
    <div
      className={'container my-5 mx-auto p-5 w-100'}
      style={{maxWidth: '750px'}}
    >
      {!isLoading && orderDetails && userInput && (
        <OrderSummary data={orderDetails} userInput={userInput} />
      )}
    </div>
  )
}

export default OrderDetails
