import React from 'react'
import {useGetAllOrdersQuery} from '../../api/orderApi'
import {useAppSelector} from '../../storage/redux/hooks'
import {OrderHeaderModel} from '../../interfaces'
import OrderList from '../../components/page/order/orderList'
import {MainLoader} from '../../components/page/common'

const MyOrders = () => {
  const userId = useAppSelector((state) => state.userAuth.id)
  const {data, isLoading} = useGetAllOrdersQuery({userId})

  return (
    <>
      {isLoading && <MainLoader/>}
      {!isLoading && (
        <>
          <div className={'d-flex align-items-center justify-content-between mx-5 mt-5'}>
            <h1 className={'text-success'}>My Orders</h1>
          </div>
          <OrderList orderData={data?.apiResponse.result as OrderHeaderModel[]} isLoading={isLoading} />
        </>
      )}
    </>
  )
}

export default MyOrders
