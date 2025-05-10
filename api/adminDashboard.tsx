import { getAllUserAccounts } from './user';
import { getAllPayments } from './payment';
import { getAllSubscriptions } from './subscription';
import { getRecentUsers as fetchRecentUsers } from './user';
import { getRecentSubscriptions as fetchRecentSubscriptions } from './subscription';
import { supabase } from './apiClient';

export async function getAdminDashboardStats() {
  const now = new Date();
  const startOfThisMonth = new Date(
    now.getFullYear(),
    now.getMonth(),
    1
  ).toISOString();
  const startOfLastMonth = new Date(
    now.getFullYear(),
    now.getMonth() - 1,
    1
  ).toISOString();

  try {
    const [
      { data: usersThisMonth },
      { data: usersLastMonth },
      { data: paymentsThisMonth },
      { data: paymentsLastMonth },
      { data: allPayments },
      { count: totalUsers },
      { count: adminUsers },
      { count: activeSubscriptions },
    ] = await Promise.all([
      supabase
        .from('user_account')
        .select('id, created_at')
        .gte('created_at', startOfThisMonth),
      supabase
        .from('user_account')
        .select('id, created_at')
        .gte('created_at', startOfLastMonth)
        .lt('created_at', startOfThisMonth),
      supabase
        .from('payment')
        .select('amount, payment_date')
        .gte('payment_date', startOfThisMonth),
      supabase
        .from('payment')
        .select('amount, payment_date')
        .gte('payment_date', startOfLastMonth)
        .lt('payment_date', startOfThisMonth),
      supabase.from('payment').select('amount'),
      supabase.from('user_account').select('*', { count: 'exact', head: true }),
      supabase
        .from('user_account')
        .select('*', { count: 'exact', head: true })
        .eq('is_admin', true),
      supabase
        .from('subscription')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'active'),
    ]);

    const totalRevenue = allPayments.reduce(
      (acc, p) => acc + Number(p.amount),
      0
    );
    const totalSales = allPayments.length;
    const averageOrderValue = totalRevenue / (totalSales || 1);

    const revenueThisMonth = paymentsThisMonth.reduce(
      (acc, p) => acc + Number(p.amount),
      0
    );
    const revenueLastMonth = paymentsLastMonth.reduce(
      (acc, p) => acc + Number(p.amount),
      0
    );

    const avgOrderThisMonth = paymentsThisMonth.length
      ? revenueThisMonth / paymentsThisMonth.length
      : 0;
    const avgOrderLastMonth = paymentsLastMonth.length
      ? revenueLastMonth / paymentsLastMonth.length
      : 0;

    return {
      totalUsers,
      standardUsers: (totalUsers || 0) - (adminUsers || 0),
      adminUsers,
      totalSales,
      revenue: totalRevenue,
      activeSubscriptions,
      averageOrderValue,
      revenueGrowth: calcGrowth(revenueLastMonth, revenueThisMonth),
      userGrowthRate: calcGrowth(usersLastMonth.length, usersThisMonth.length),
      salesGrowth: calcGrowth(
        paymentsLastMonth.length,
        paymentsThisMonth.length
      ),
      averageOrderGrowth: calcGrowth(avgOrderLastMonth, avgOrderThisMonth),
    };
  } catch (err) {
    console.error('Dashboard stats error:', err);
    return null;
  }
}

// Helper
function calcGrowth(prev: number, current: number): number {
  if (prev === 0 && current === 0) return 0;
  if (prev === 0) return 100;
  return ((current - prev) / prev) * 100;
}

export async function getRecentUsers(limit = 10) {
  return await fetchRecentUsers(limit);
}

export async function getRecentSubscriptions(limit = 10) {
  return await fetchRecentSubscriptions(limit);
}
