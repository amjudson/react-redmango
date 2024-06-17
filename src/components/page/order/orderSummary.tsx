import React from 'react'
import {OrderSummaryProps} from './orderSummaryProps'
import {getStatusColor} from '../../../helper'
import {useNavigate} from 'react-router-dom'
import {PaymentStatus, Roles} from '../../../utility/sd'
import {useAppSelector} from '../../../storage/redux/hooks'

const OrderSummary = ({data, userInput}: OrderSummaryProps) => {
  const navigate = useNavigate()
  const badgeTypeColor = getStatusColor(data.status!)
  const userData = useAppSelector((state) => state.userAuth)

  const nextStatus: any = data.status! === PaymentStatus.CONFIRMED
    ? {color: 'info', value: PaymentStatus.BEING_COOKED}
    : data.status! === PaymentStatus.BEING_COOKED
      ? {color: 'warning', value: PaymentStatus.READY_FOR_PICKUP}
      : data.status! === PaymentStatus.READY_FOR_PICKUP
      && {color: 'success', value: PaymentStatus.COMPLETED}

  return (
    <div>
      {' '}
      <div className={'d-flex justify-content-between align-items-center'}>
        <h3 className={'text-success'}>Order Summary</h3>
        <span className={`btn btn-outline-${badgeTypeColor} fs-6`}>
          {data.status}
        </span>
      </div>
      <div className={'mt-3'}>
        <div className={'border py-3 px-2'}>Name: {userInput.name}</div>
        <div className={'border py-3 px-2'}>Email: {userInput.email}</div>
        <div className={'border py-3 px-2'}>Phone: {userInput.phoneNumber}</div>
        <div className={'border py-3 px-2'}>
          <h4 className={'text-success'}>Menu Items</h4>
          <div className={'p-3'}>
            {data.cartItems?.map((cartItem, index: number) => {
                return (
                  <div className={'d-flex'} key={index}>
                    <div className={'d-flex w-100 justify-content-between'}>
                      <p>{cartItem.menuItem?.name}</p>
                      <p>${cartItem.menuItem?.price} x {cartItem.quantity} =</p>
                    </div>
                    <p style={{width: '70px', textAlign: 'right'}}>
                      ${(cartItem.menuItem?.price ?? 0) * (cartItem?.quantity ?? 0)}
                    </p>
                  </div>
                )
              },
            )}
            <hr/>
            <h4 className={'text-danger'} style={{textAlign: 'right'}}>
              ${data.cartTotal?.toFixed(2)}
            </h4>
          </div>
        </div>
      </div>
      <div className={'d-flex justify-content-between align-items-center mt-3'}>
        <button
          className={'btn btn-secondary'}
          onClick={() => navigate(-1)}
        >
          Back to Orders
        </button>
        {userData.role === Roles.ADMIN && (
          <div className={'d-flex'}>
            <button
              className={`btn btn-danger me-1`}
            >
              Cancel
            </button>
            <button
              className={`btn btn-${nextStatus.color}`}
            >
              {nextStatus.value}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default OrderSummary
