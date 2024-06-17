import {
  CartItemModel,
  // ShoppingCartModel,
} from '../../../interfaces'
import {PaymentStatus} from '../../../utility/sd'

export interface OrderSummaryProps {
  data: {
    id: number
    cartItems: CartItemModel[]
    cartTotal: number
    stripePaymentIntentId?: string
    userId?: string
    clientSecret?: string
    status?: PaymentStatus
  }
  userInput: {
    name: string
    email: string
    phoneNumber: string
  }
}
