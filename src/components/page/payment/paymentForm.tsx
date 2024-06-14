import {
  useStripe,
  useElements,
  PaymentElement,
} from '@stripe/react-stripe-js'
import React, {useState} from 'react'
import {OrderSummaryProps} from '../order/orderSummaryProps'
import {ApiResponse, OrderDetailsDto, OrderDetailsModel} from '../../../interfaces'
import {useCreateOrderMutation} from '../../../api/orderApi'
import {PaymentStatus} from '../../../utility/sd'

const PaymentForm = ({data, userInput}: OrderSummaryProps) => {
  const stripe = useStripe()
  const elements = useElements()
  const [createOrder] = useCreateOrderMutation()
  const [processing, setProcessing] = useState(false)

  console.log('DATA:', data)
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setProcessing(true)
    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: 'https://example.com/order/123/complete',
      },
      redirect: 'if_required',
    })

    console.log(result)
    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message)
    } else {
      let grandTotal = 0
      let totalItems = 0
      const orderDetailsDto: OrderDetailsDto[] = []
      data.cartItems.forEach((cartItem) => {
        orderDetailsDto.push({
          menuItemId: cartItem.menuItem?.id ?? 0,
          quantity: cartItem.quantity ?? 0,
          itemName: cartItem.menuItem?.name ?? '',
          price: cartItem.menuItem?.price ?? 0,
        })
        grandTotal += (cartItem.menuItem?.price ?? 0) * (cartItem.quantity ?? 0)
        totalItems += cartItem.quantity ?? 0
      })

      const order: OrderDetailsModel = {
        orderDetailsDtos: orderDetailsDto,
        totalItems: totalItems,
        orderTotal: grandTotal,
        pickupName: userInput.name,
        pickupEmail: userInput.email,
        pickupPhoneNumber: userInput.phoneNumber,
        stripePaymentIntentID: data.stripePaymentIntentId ?? '',
        applicationUserId: data.userId ?? '',
        status: result.paymentIntent.status === 'succeeded'
          ? PaymentStatus.CONFIRMED
          : PaymentStatus.PENDING,
      }

      const response: ApiResponse = await createOrder(order)
      console.log(response)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button className={'btn btn-success mt-5 w-100'}>
        Submit
      </button>
    </form>
  )
}

export default PaymentForm
