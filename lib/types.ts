export type ProductId = 'vision' | 'neuro' | 'fortify' | 'complete';
export type ProductCategory = 'Supplements' | 'Bundles';
export type SubscriptionFrequency = 'Monthly Subscription' | 'Annual Subscription';

export type SubscriptionStatus = 'active' | 'paused' | 'canceled';

export type UserAccount = {
  id: string; // UUID from Supabase Auth
  full_name: string;
  address_id?: number;
  is_admin: boolean;
  email: string;
  created_at: string;
  last_sign_in_at: string;
};

export interface Product {
  id: ProductId;
  name: string;
  description: string;
  price: number;
  image: string;
  is_active: boolean;
  category: ProductCategory;
  stock: number;
}

export type Subscription = {
  id: number;
  user_id: string;
  address_id: number;
  start_date: string;
  end_date: string;
  status: string;
  next_payment_due_date: string;
  created_at: string;
  plan_type: SubscriptionFrequency;
  product_type: ProductId;
  // Joined data
  address?: Address;
  payments?: Payment[];
};

// export interface Order {
//   id: string;
//   userId: string;
//   orderNumber: string;
//   date: string;
//   items: OrderItem[];
//   total: number;
//   status: 'processing' | 'shipped' | 'delivered' | 'canceled';
//   shippingAddress: Address;
//   paymentMethod: {
//     type: 'credit_card' | 'paypal';
//     last4?: string;
//   };
// }

// export interface OrderItem {
//   productId: ProductId;
//   name: string;
//   quantity: number;
//   price: number;
// }

export type Address = {
  id: number;
  street: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
  is_default: boolean;
};

export type Payment = {
  id: number;
  subscription_id: number;
  payment_date: string;
  amount: number;
  status: string;
  transaction_id: string;
};

export type Shipping = {
  id: number;
  subscription_id: number;
  address_id: number;
  shipment_date: string;
  delivery_status: string;
  tracking_number: string;
  created_at: string;
};

export type CampaignStatus = 'Active' | 'Scheduled' | 'Completed';

export interface Campaign {
  id: number;
  name: string;
  type: string;
  status: CampaignStatus;
  start_date: string; // ISO string
  end_date?: string | null;
  budget: number;
  spent: number;
  leads: number;
  conversions: number;
  created_at: string;
}
