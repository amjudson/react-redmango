import {OrderStatus} from '../utility/sd'

const getStatusColor = (status: OrderStatus) => {
  switch (status) {
    case OrderStatus.CONFIRMED:
      return 'primary'
    case OrderStatus.PENDING:
      return 'secondary'
    case OrderStatus.CANCELLED:
      return 'danger'
    case OrderStatus.COMPLETED:
      return 'success'
    case OrderStatus.BEING_COOKED:
      return 'info'
    case OrderStatus.READY_FOR_PICKUP:
      return 'warning'
    default:
      return 'warning'
  }
}

export default getStatusColor
