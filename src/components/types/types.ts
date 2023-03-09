export interface Restaurant {
  id: number
  name: string
  street_address: string
  zip_code: string
  city: string
  category: string
  category_label: string
  ratings_average: number
  ratings_count: number
  profile_picture: string
  cover_picture: string
  dishes: Dishes
}

export interface Dishes {
  data: Dish[]
}

export interface Menu {
  starter?: Dish[];
  main?: Dish[];
  dessert?: Dish[];
  drink?: Dish[];
}

export interface Dish {
  name: string
  type: 'starter' | 'main' | 'drink' | 'dessert'
  price: number
  id?: number | string
}

export interface ShippingAddress {
  first_name: string
  last_name: string
  delivery_street_address: string
  delivery_zip_code: string
  delivery_city: string
  delivery_method: string
}

export interface ItemOrder {
  id: string
  quantity: number
}

export interface Order extends ShippingAddress {
  items: ItemOrder[]
}

export interface DeliveryMethod {
  value: string
  label: string
  price: number
  eta: number
}

export interface ItemSummary {
  name: string
  quantity: number
  price: number
}

export interface ItemsSummary {
  data: ItemSummary[]
  total_amount: number
}

export interface OrderSummary extends ShippingAddress {
  id: number
  delivery_fee: number
  items: ItemsSummary
  total_amount: number
  delivery_eta: string
  created_at: string
}
