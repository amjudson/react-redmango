import React from 'react'
import {useLocation} from 'react-router'
import {Elements} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'
import {PaymentForm} from '../components/page/payment'
import {OrderSummary} from '../components/page/order'

const Payment = () => {
  const {
    state: {
      apiResult,
      userInput,
    },
  } = useLocation()

  const stripePromise
    = loadStripe(`pk_test_51PQq7lDs5n2nZkCpxgmgL2cHje33WDcOmyTGiht6lDwgHPHTjfKSOYe0QDTirZJF5D69dVEht8IzfMYATlJ8Gu8u00sqWFh5Hm`)
  const options = {
    // passing the client secret obtained from the server
    clientSecret: apiResult?.clientSecret,
  }

  console.log(apiResult)
  return (
    <Elements stripe={stripePromise} options={options}>
      <div className={'container m-5 p-5'}>
        <div className={'row'}>
          <div className={'col-md-7'}>
            <OrderSummary data={apiResult} userInput={userInput} />
          </div>
          <div className={'col-md-4 offset-md-1'}>
            <h3 className={'text-success'}>Payment</h3>
            <div className={'mt-5'}>
              <PaymentForm data={apiResult} userInput={userInput} />
            </div>
          </div>
        </div>
      </div>
    </Elements>
  )
}

export default Payment
