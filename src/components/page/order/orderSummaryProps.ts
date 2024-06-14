import {
  CartItemModel,
  // ShoppingCartModel,
} from '../../../interfaces'

export interface OrderSummaryProps {
  data: {
    id: number
    cartItems: CartItemModel[]
    cartTotal: number
    stripePaymentIntentId?: string
    userId?: string
    clientSecret?: string
    status?: string
  }
  userInput: {
    name: string
    email: string
    phoneNumber: string
  }
}
