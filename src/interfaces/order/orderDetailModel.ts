import MenuItemModel from '../menuItemModel'

export interface OrderDetailModel {
  orderDetailId?: number;
  orderHeaderId?: number;
  menuItemId?:    number;
  menuItem?:      MenuItemModel;
  quantity?:      number;
  itemName?:      string;
  price?:         number;
}
