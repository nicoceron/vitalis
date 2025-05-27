import type { Product, Subscription, ProductId } from "./types";

export const products: Record<ProductId, Product> = {
  vision: {
    id: "vision",
    name: "Vitalis Vision",
    description:
      "Foundational support for eye health and antioxidant protection",
    price: 39.99,
    image: "/vision.png",
    is_active: true,
    category: "Supplements",
    stock: 100,
  },
  neuro: {
    id: "neuro",
    name: "Vitalis Neuro",
    description: "Enhancing cardiovascular & cognitive vitality",
    price: 44.99,
    image: "/neuro.png",
    is_active: true,
    category: "Supplements",
    stock: 100,
  },
  fortify: {
    id: "fortify",
    name: "Vitalis Fortify",
    description: "Supporting metabolic health & natural defenses",
    price: 42.99,
    image: "/fortify.png",
    is_active: true,
    category: "Supplements",
    stock: 100,
  },
  complete: {
    id: "complete",
    name: "Vitalis Complete Pack",
    description: "All three Vitalis products for comprehensive support",
    price: 99.99,
    image: "/placeholder.jpg",
    is_active: true,
    category: "Bundles",
    stock: 50,
  },
};

export const getSubscriptionPrice = (
  productId: ProductId,
  frequency: "monthly" | "annual"
): number => {
  const basePrice = products[productId].price;
  if (frequency === "annual") {
    // 20% discount for annual subscriptions
    return Number((basePrice * 0.8 * 12).toFixed(2));
  }
  return basePrice;
};

export const getMockSubscriptions = (userId: string): Subscription[] => {
  return [
    {
      id: 1,
      user_id: userId,
      address_id: 1,
      start_date: new Date(
        Date.now() - 335 * 24 * 60 * 60 * 1000
      ).toISOString(),
      end_date: "",
      status: "active",
      next_payment_due_date: new Date(
        Date.now() + 30 * 24 * 60 * 60 * 1000
      ).toISOString(),
      created_at: new Date(
        Date.now() - 335 * 24 * 60 * 60 * 1000
      ).toISOString(),
      plan_type: "Annual Subscription",
      product_type: "complete",
      payments: [
        {
          id: 1,
          subscription_id: 1,
          payment_date: new Date(
            Date.now() - 5 * 24 * 60 * 60 * 1000
          ).toISOString(),
          amount: getSubscriptionPrice("complete", "annual"),
          status: "SUCCESS",
          transaction_id: "tx_12345",
        },
      ],
    },
  ];
};

// Remove Order type since it's commented out in types.ts
// export const getMockOrders = (userId: string): Order[] => {
//   return [
//     {
//       id: "ord_1",
//       userId,
//       orderNumber: "VIT-10045",
//       date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
//       items: [
//         {
//           productId: "complete",
//           name: "Vitalis Complete Pack",
//           quantity: 1,
//           price: 99.99,
//         },
//       ],
//       total: 99.99,
//       status: "delivered",
//       shippingAddress: {
//         name: "John Doe",
//         line1: "123 Main St",
//         city: "San Francisco",
//         state: "CA",
//         postalCode: "94105",
//         country: "United States",
//       },
//       paymentMethod: {
//         type: "credit_card",
//         last4: "4242",
//       },
//     },
//     {
//       id: "ord_2",
//       userId,
//       orderNumber: "VIT-10032",
//       date: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
//       items: [
//         {
//           productId: "vision",
//           name: "Vitalis Vision",
//           quantity: 1,
//           price: 39.99,
//         },
//         {
//           productId: "neuro",
//           name: "Vitalis Neuro",
//           quantity: 1,
//           price: 44.99,
//         },
//       ],
//       total: 84.98,
//       status: "delivered",
//       shippingAddress: {
//         name: "John Doe",
//         line1: "123 Main St",
//         city: "San Francisco",
//         state: "CA",
//         postalCode: "94105",
//         country: "United States",
//       },
//       paymentMethod: {
//         type: "paypal",
//       },
//     },
//   ]
// }
