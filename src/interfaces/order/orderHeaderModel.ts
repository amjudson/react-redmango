import {OrderDetailModel} from './orderDetailModel'
import {OrderStatus} from '../../utility/sd'

export interface OrderHeaderModel {
  orderHeaderId?:         number;
  pickupName?:            string;
  pickupPhoneNumber?:     string;
  pickupEmail?:           string;
  applicationUserId?:     string;
  user?:                  null;
  orderTotal?:            number;
  orderDate?:             Date;
  stripePaymentIntentID?: string;
  status?:                OrderStatus;
  totalItems?:            number;
  orderDetails?:          OrderDetailModel[];
}

