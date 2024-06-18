export enum Roles {
  ADMIN = 'admin',
  CUSTOMER = 'customer',
}

export enum OrderStatus {
  PENDING = 'Pending',
  CONFIRMED = 'Confirmed',
  BEING_COOKED = 'Being Cooked',
  READY_FOR_PICKUP = 'Ready for Pickup',
  COMPLETED = 'Completed',
  CANCELLED = 'Cancelled',
}

export enum Category {
  APPETIZER = 'Appetizer',
  ENTREE = 'Entrée',
  DESSERT = 'Dessert',
  BEVERAGES = 'Beverages',
}

export enum SortTypes {
  PRICE_LOW_HIGH = 'Price: Low to High',
  PRICE_HIGH_LOW = 'Price: High to Low',
  NAME_A_Z = 'Name: A to Z',
  NAME_Z_A = 'Name: Z to A',
}
