import {
  CartItemModel,
  // ShoppingCartModel,
} from '../../../interfaces'
import {OrderStatus} from '../../../utility/sd'

export interface OrderSummaryProps {
  data: {
    id: number
    cartItems: CartItemModel[]
    cartTotal: number
    stripePaymentIntentId?: string
    userId?: string
    clientSecret?: string
    status?: OrderStatus
  }
  userInput: {
    name: string
    email: string
    phoneNumber: string
  }
}
