import {
  useStripe,
  useElements,
  PaymentElement,
} from '@stripe/react-stripe-js'
import React, {useState} from 'react'

const PaymentForm = () => {
  const stripe = useStripe()
  const elements = useElements()
  const [processing, setProcessing] = useState(false)

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
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
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
