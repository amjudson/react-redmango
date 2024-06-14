import {OrderDetailModel} from './orderDetailModel'

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
  status?:                string;
  totalItems?:            number;
  orderDetails?:          OrderDetailModel[];
}

