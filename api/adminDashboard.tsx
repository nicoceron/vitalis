import { getAllUserAccounts } from './user';
// import { getAllPayments } from './payment'; // assumed to exist
import { getAllSubscriptions } from './subscription'; // assumed to exist
import { getRecentUsers as fetchRecentUsers } from './user';
import { getRecentSubscriptions as fetchRecentSubscriptions } from './subscription';
import type { UserAccount } from '@/lib/types';

export async function getAdminDashboardStats() {
  const users = await getAllUserAccounts();
  const subscriptions = await getAllSubscriptions();
  // const payments = await getAllPayments();

  const totalUsers = users.length;
  const adminUsers = users.filter((u) => u.is_admin).length;
  const standardUsers = totalUsers - adminUsers;

  // const totalSales = payments.length;
  // const revenue = payments.reduce((sum, p) => sum + Number(p.amount), 0);
  // const activeSubscriptions = subscriptions.length;
  // const averageOrderValue = totalSales > 0 ? revenue / totalSales : 0;

  return {
    totalUsers,
    standardUsers,
    adminUsers,
    // totalSales,
    // revenue,
    // activeSubscriptions,
    // averageOrderValue,
  };
}

export async function getRecentUsers(limit = 10) {
  return await fetchRecentUsers(limit);
}

export async function getRecentSubscriptions(limit = 10) {
  return await fetchRecentSubscriptions(limit);
}
