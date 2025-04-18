export type ProductId = "vision" | "neuro" | "fortify" | "complete"

export type SubscriptionFrequency = "monthly" | "annual"

export type SubscriptionStatus = "active" | "paused" | "canceled"

export interface Product {
  id: ProductId
  name: string
  description: string
  price: number
  image: string
}

export interface Subscription {
  id: string
  userId: string
  productId: ProductId
  frequency: SubscriptionFrequency
  status: SubscriptionStatus
  nextBillingDate: string
  price: number
  createdAt: string
}

export interface Order {
  id: string
  userId: string
  orderNumber: string
  date: string
  items: OrderItem[]
  total: number
  status: "processing" | "shipped" | "delivered" | "canceled"
  shippingAddress: Address
  paymentMethod: {
    type: "credit_card" | "paypal"
    last4?: string
  }
}

export interface OrderItem {
  productId: ProductId
  name: string
  quantity: number
  price: number
}

export interface Address {
  name: string
  line1: string
  line2?: string
  city: string
  state: string
  postalCode: string
  country: string
}
