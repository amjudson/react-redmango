import {
  CartItemModel,
  // ShoppingCartModel,
} from '../../../interfaces'

export interface OrderSummaryProps {
  data: {
    id: number
    cartItems: CartItemModel[]
    cartTotal: number
  }
  userInput: {
    name: string
    email: string
    phoneNumber: string
  }
}
