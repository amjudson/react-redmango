import React from 'react'
import {withAdminAuth} from '../../hoc'
import {useGetAllOrdersQuery} from '../../api/orderApi'
import {MainLoader} from '../../components/page/common'
import OrderList from '../../components/page/order/orderList'
import {OrderHeaderModel} from '../../interfaces'

const AllOrders = () => {
  const {data, isLoading} = useGetAllOrdersQuery('')
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

export default withAdminAuth(AllOrders)
