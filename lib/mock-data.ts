import type { Product, Subscription, Order, ProductId } from "./types"

export const products: Record<ProductId, Product> = {
  vision: {
    id: "vision",
    name: "Vitalis Vision",
    description: "Foundational support for eye health and antioxidant protection",
    price: 39.99,
    image: "/placeholder.svg?height=300&width=300",
  },
  neuro: {
    id: "neuro",
    name: "Vitalis Neuro",
    description: "Enhancing cardiovascular & cognitive vitality",
    price: 44.99,
    image: "/placeholder.svg?height=300&width=300",
  },
  fortify: {
    id: "fortify",
    name: "Vitalis Fortify",
    description: "Supporting metabolic health & natural defenses",
    price: 42.99,
    image: "/placeholder.svg?height=300&width=300",
  },
  complete: {
    id: "complete",
    name: "Vitalis Complete Pack",
    description: "All three Vitalis products for comprehensive support",
    price: 99.99,
    image: "/placeholder.svg?height=300&width=300",
  },
}

export const getSubscriptionPrice = (productId: ProductId, frequency: "monthly" | "annual"): number => {
  const basePrice = products[productId].price
  if (frequency === "annual") {
    // 20% discount for annual subscriptions
    return Number((basePrice * 0.8 * 12).toFixed(2))
  }
  return basePrice
}

export const getMockSubscriptions = (userId: string): Subscription[] => {
  return [
    {
      id: "sub_1",
      userId,
      productId: "complete",
      frequency: "annual",
      status: "active",
      nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      price: getSubscriptionPrice("complete", "annual"),
      createdAt: new Date(Date.now() - 335 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ]
}

export const getMockOrders = (userId: string): Order[] => {
  return [
    {
      id: "ord_1",
      userId,
      orderNumber: "VIT-10045",
      date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      items: [
        {
          productId: "complete",
          name: "Vitalis Complete Pack",
          quantity: 1,
          price: 99.99,
        },
      ],
      total: 99.99,
      status: "delivered",
      shippingAddress: {
        name: "John Doe",
        line1: "123 Main St",
        city: "San Francisco",
        state: "CA",
        postalCode: "94105",
        country: "United States",
      },
      paymentMethod: {
        type: "credit_card",
        last4: "4242",
      },
    },
    {
      id: "ord_2",
      userId,
      orderNumber: "VIT-10032",
      date: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
      items: [
        {
          productId: "vision",
          name: "Vitalis Vision",
          quantity: 1,
          price: 39.99,
        },
        {
          productId: "neuro",
          name: "Vitalis Neuro",
          quantity: 1,
          price: 44.99,
        },
      ],
      total: 84.98,
      status: "delivered",
      shippingAddress: {
        name: "John Doe",
        line1: "123 Main St",
        city: "San Francisco",
        state: "CA",
        postalCode: "94105",
        country: "United States",
      },
      paymentMethod: {
        type: "paypal",
      },
    },
  ]
}
