import {OrderHeaderModel} from '../../../interfaces'

export default interface OrderListProps {
  isLoading: boolean;
  orderData: OrderHeaderModel[];
}
