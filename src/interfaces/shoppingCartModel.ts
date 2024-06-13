import CartItemModel from './cartItemModel'

export default interface ShoppingCartModel {
  id:                    number;
  userId:                string;
  cartItems:             CartItemModel[];
  cartTotal:             number;
  stripePaymentIntentId?: string;
  clientSecret?:          string;
}
