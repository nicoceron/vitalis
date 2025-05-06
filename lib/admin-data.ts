// import { supabase } from './apiClient';

// export async function getAdminDashboardStats() {
//   try {
//     const [
//       { count: totalUsers },
//       { count: adminUsers },
//       { count: totalSales },
//       revenueData,
//       { count: activeSubscriptions },
//     ] = await Promise.all([
//       supabase.from('user_account').select('*', { count: 'exact', head: true }),
//       supabase
//         .from('user_account')
//         .select('*', { count: 'exact', head: true })
//         .eq('is_admin', true),
//       supabase.from('payment').select('*', { count: 'exact', head: true }),
//       supabase.from('payment').select('amount'),
//       supabase
//         .from('subscription')
//         .select('*', { count: 'exact', head: true })
//         .eq('status', 'active'),
//     ]);

//     const revenue =
//       revenueData?.data?.reduce(
//         (acc: number, row: any) => acc + parseFloat(row.amount || 0),
//         0
//       ) || 0;

//     const averageOrderValue = revenue / (totalSales || 1);

//     return {
//       totalUsers: totalUsers || 0,
//       standardUsers: (totalUsers || 0) - (adminUsers || 0),
//       adminUsers: adminUsers || 0,
//       totalSales: totalSales || 0,
//       revenue,
//       activeSubscriptions: activeSubscriptions || 0,
//       averageOrderValue: parseFloat(averageOrderValue.toFixed(2)),
//     };
//   } catch (error) {
//     console.error('Error fetching admin stats:', error);
//     return null;
//   }
// }

export async function getRecentUsers(limit = 10) {
  try {
    const { data, error } = await supabase
      .from('user_account')
      .select('id, full_name, is_admin, created_at')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;

    return data?.map((user) => ({
      id: user.id,
      name: user.full_name,
      email: '', // if you want to show it, you'll need to join with auth.users
      joinDate: user.created_at,
      isAdmin: user.is_admin,
    }));
  } catch (err) {
    console.error('Error fetching recent users:', err);
    return [];
  }
}

export async function getRecentOrders(limit = 10) {
  try {
    const { data, error } = await supabase
      .from('payment')
      .select('*, subscription(id, user_id)')
      .order('payment_date', { ascending: false })
      .limit(limit);

    if (error) throw error;

    return data?.map((order) => ({
      id: order.transaction_id || order.id,
      customerId: order.subscription?.user_id,
      date: order.payment_date,
      amount: order.amount,
      status: order.status,
    }));
  } catch (err) {
    console.error('Error fetching recent orders:', err);
    return [];
  }
}
