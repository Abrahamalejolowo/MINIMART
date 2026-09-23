export interface OrderItem {
  id: string
  name: string
  price: number
  quantity: number
  image?: string
}

export interface AddressInfo {
  address_line1: string
  address_line2?: string
  city: string
  state: string
  country: string
  postal_code?: string
}

export interface OrderPayload {
  id: string
  flutterwave_tx_id?: string
  user_email: string
  user_name?: string
  user_phone?: string
  address_line1?: string
  address_line2?: string
  city?: string
  state?: string
  country?: string
  postal_code?: string
  amount: number
  currency?: string
  status: string
  items: OrderItem[]
}