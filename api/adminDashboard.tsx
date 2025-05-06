import { supabase } from './apiClient';

export async function getAdminDashboardStats() {
  // Fetch users
  const { data: users, error: userError } = await supabase
    .from('user_account')
    .select('id, is_admin');

  // Fetch subscriptions
  const { data: subscriptions, error: subError } = await supabase
    .from('subscription')
    .select('id, plan_type');

  // Fetch payments
  const { data: payments, error: paymentError } = await supabase
    .from('payment')
    .select('amount');

  if (userError || subError || paymentError) {
    console.error('Dashboard error:', userError || subError || paymentError);
    return null;
  }

  const totalUsers = users.length;
  const adminUsers = users.filter((u) => u.is_admin === true).length;
  const standardUsers = totalUsers - adminUsers;

  const totalSales = payments.length;
  const revenue = payments.reduce((sum, p) => sum + Number(p.amount), 0);
  const activeSubscriptions = subscriptions.length;
  const averageOrderValue = totalSales > 0 ? revenue / totalSales : 0;

  return {
    totalUsers,
    standardUsers,
    adminUsers,
    totalSales,
    revenue,
    activeSubscriptions,
    averageOrderValue,
  };
}

export async function getRecentUsers(limit = 10) {
  const { data, error } = await supabase
    .from('user_account')
    .select('id, full_name, is_admin')
    .order('id', { ascending: false }) // Or by creation time if available
    .limit(limit);

  if (error) {
    console.error('Recent users error:', error.message);
    return [];
  }

  return data.map((user) => ({
    id: user.id,
    name: user.full_name,
    email: `no-email@supabase.com`, // Placeholder since no email in user_account
    joinDate: new Date(), // Replace with actual timestamp if you add one
    isAdmin: user.is_admin === true,
  }));
}

export async function getRecentSubscriptions(limit = 10) {
  try {
    const { data, error } = await supabase
      .from('subscription')
      .select(`
        id,
        user_id,
        address_id,
        start_date,
        end_date,
        status,
        next_payment_due_date,
        created_at,
        plan_type,
        product_type
      `)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching recent subscriptions:', error.message);
      return [];
    }

    return data;
  } catch (err) {
    console.error('Unexpected error fetching recent subscriptions:', err);
    return [];
  }
}

// export async function getRecentOrders(limit = 10) {
//   const { data, error } = await supabase
//     .from('orders')
//     .select(
//       `
//         id,
//         total,
//         date,
//         status,
//         customer:users ( full_name, email )
//       `
//     )
//     .order('date', { ascending: false })
//     .limit(limit);

//   if (error) {
//     console.error('Recent orders error:', error.message);
//     return [];
//   }

//   return data.map((order) => ({
//     id: order.id,
//     customerName: order.customer.full_name,
//     customerEmail: order.customer.email,
//     date: new Date(order.date),
//     subtotal: order.total, // Assume total already includes tax + shipping, or split if not
//     status: order.status,
//   }));
// }

//   export async function getMarketingCampaigns() {
//     const { data, error } = await supabase
//       .from('campaigns')
//       .select('*')
//       .order('startDate', { ascending: false });

//     if (error) {
//       console.error('Marketing campaigns error:', error.message);
//       return [];
//     }

//     return data;
//   }
