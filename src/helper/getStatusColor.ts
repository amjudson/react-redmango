import {PaymentStatus} from '../utility/sd'

const getStatusColor = (status: PaymentStatus) => {
  switch (status) {
    case PaymentStatus.CONFIRMED:
      return 'primary'
    case PaymentStatus.PENDING:
      return 'secondary'
    case PaymentStatus.CANCELLED:
      return 'danger'
    case PaymentStatus.COMPLETED:
      return 'success'
    case PaymentStatus.BEING_COOKED:
      return 'info'
    case PaymentStatus.READY_FOR_PICKUP:
      return 'warning'
    default:
      return 'warning'
  }
}

export default getStatusColor
