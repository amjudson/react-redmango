import React from 'react'
import {MainLoader} from '../common'
import {OrderHeaderModel} from '../../../interfaces'
import OrderListProps from './orderListProps'
import {withAuth} from '../../../hoc'
import {useNavigate} from 'react-router-dom'
import {getStatusColor} from '../../../helper'

const OrderList = ({orderData, isLoading}: OrderListProps) => {
  const navigate = useNavigate()

  return (
    <>
      {isLoading && <MainLoader/>}
      {!isLoading && orderData && (
        <div className={'table p-5'}>
          <h1 className={'text-success'}>Orders List</h1>
          <div className={'p-2'}>
            <div className={'row border'}>
              <div className={'col-1'}>ID</div>
              <div className={'col-2'}>Name</div>
              <div className={'col-2'}>Phone</div>
              <div className={'col-1'}>Total</div>
              <div className={'col-1'}>Items</div>
              <div className={'col-2'}>Date</div>
              <div className={'col-2'}>Status</div>
              <div className={'col-1'}></div>
            </div>
            {orderData.map((orderItem: OrderHeaderModel) => {
              const badgeColor = getStatusColor(orderItem.status!)
              return (
                <div className={'row border'} key={orderItem.orderHeaderId}>
                  <div className={'col-1'}>{orderItem.orderHeaderId}</div>
                  <div className={'col-2'}>{orderItem.pickupName}</div>
                  <div className={'col-2'}>{orderItem.pickupPhoneNumber}</div>
                  <div className={'col-1'}>${orderItem.orderTotal?.toFixed(2)}</div>
                  <div className={'col-1'}>{orderItem.totalItems}</div>
                  <div className={'col-2'}>{new Date(orderItem.orderDate!).toLocaleDateString()}</div>
                  <div className={'col-2'}>
                    {orderItem.status}
                  </div>
                  <div className={'col-1'}>
                    <button
                      className={'btn btn-success'}
                      onClick={() => navigate(`/order/orderdetails/${orderItem.orderHeaderId}`)}
                    >
                      Details
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </>
  )
}

export default withAuth(OrderList)
