import React from 'react'
import {useGetAllOrdersQuery} from '../../api/orderApi'
import {useAppSelector} from '../../storage/redux/hooks'
import {OrderHeaderModel} from '../../interfaces'
import OrderList from '../../components/page/order/orderList'
import {MainLoader} from '../../components/page/common'

const MyOrders = () => {
  const userId = useAppSelector((state) => state.userAuth.id)
  const {data, isLoading} = useGetAllOrdersQuery(userId)
  console.log('DATA:', data)

  return (
    <>
      {isLoading && <MainLoader/>}
      {!isLoading && (
        <OrderList orderData={data.result as OrderHeaderModel[]} isLoading={isLoading} />
      )}
    </>
  )
}

export default MyOrders
