export interface OrderDetailsModel {
  pickupName:            string;
  pickupPhoneNumber:     string;
  pickupEmail:           string;
  applicationUserId:     string;
  orderTotal:            number;
  stripePaymentIntentID: string;
  status:                string;
  totalItems:            number;
  orderDetailsDtos:          OrderDetailsDto[];
}

export interface OrderDetailsDto {
  menuItemId: number;
  quantity:   number;
  itemName:   string;
  price:      number;
}
