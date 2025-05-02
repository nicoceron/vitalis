"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { useAuth } from "@/lib/auth-context";
import {
  getAdminDashboardStats,
  getRecentUsers,
  getRecentOrders,
  getMarketingCampaigns,
} from "@/lib/admin-data";
import { Users, ShoppingBag, CreditCard, Activity, Mail } from "lucide-react";

export default function AdminDashboard() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState(getAdminDashboardStats());
  const [recentUsers, setRecentUsers] = useState(getRecentUsers(5));
  const [recentOrders, setRecentOrders] = useState(getRecentOrders(5));
  const [campaigns, setCampaigns] = useState(getMarketingCampaigns());

  // Calculate active campaigns count
  const activeCampaigns = campaigns.filter(
    (campaign) => campaign.status === "Active"
  ).length;

  // Protect admin route
  useEffect(() => {
    if (!isLoading && (!user || !user.isAdmin)) {
      router.push("/sign-in");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  if (!user || !user.isAdmin) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1 p-6 md:p-10 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Admin Dashboard
            </h1>
            <div className="text-sm text-gray-500">Welcome, {user.name}</div>
          </div>

          {/* User Stats Overview */}
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <div className="mr-2 text-emerald-700">
              <Users size={24} />
            </div>
            User Statistics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="text-sm font-medium text-gray-500 mb-1">
                Total Users
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {stats.totalUsers.toLocaleString()}
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="text-sm font-medium text-gray-500 mb-1">
                Standard Users
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {stats.standardUsers.toLocaleString()}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {((stats.standardUsers / stats.totalUsers) * 100).toFixed(1)}%
                of total users
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="text-sm font-medium text-gray-500 mb-1">
                Admin Users
              </div>
              <div className="text-2xl font-bold text-emerald-700">
                {stats.adminUsers.toLocaleString()}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {((stats.adminUsers / stats.totalUsers) * 100).toFixed(1)}% of
                total users
              </div>
            </div>
          </div>

          {/* Sales Stats Overview */}
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <div className="mr-2 text-emerald-700">
              <ShoppingBag size={24} />
            </div>
            Sales Statistics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="text-sm font-medium text-gray-500 mb-1">
                Total Sales
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {stats.totalSales.toLocaleString()} orders
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="text-sm font-medium text-gray-500 mb-1">
                Revenue
              </div>
              <div className="text-2xl font-bold text-gray-900">
                ${stats.revenue.toLocaleString()}
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="text-sm font-medium text-gray-500 mb-1">
                Average Order Value
              </div>
              <div className="text-2xl font-bold text-gray-900">
                ${stats.averageOrderValue.toFixed(2)}
              </div>
            </div>
          </div>

          {/* Marketing Overview */}
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <div className="mr-2 text-emerald-700">
              <Activity size={24} />
            </div>
            Marketing Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="text-sm font-medium text-gray-500 mb-1">
                Active Campaigns
              </div>
              <div className="text-2xl font-bold text-emerald-600">
                {activeCampaigns} / {campaigns.length}
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="text-sm font-medium text-gray-500 mb-1">
                Total Budget
              </div>
              <div className="text-2xl font-bold text-gray-900">
                $
                {campaigns
                  .reduce((sum, campaign) => sum + campaign.budget, 0)
                  .toLocaleString()}
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="text-sm font-medium text-gray-500 mb-1">
                Total Conversions
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {campaigns
                  .reduce((sum, campaign) => sum + campaign.conversions, 0)
                  .toLocaleString()}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Recent Users */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-lg font-medium mb-4">Recent Users</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Join Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {recentUsers.map((user) => (
                      <tr key={user.id}>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                          {user.name}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                          {user.email}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                          {user.joinDate.toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-lg font-medium mb-4">Recent Orders</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Order ID
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {recentOrders.map((order) => (
                      <tr key={order.id}>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                          {order.id}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                          {order.customerName}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                          {order.date.toLocaleDateString()}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                          ${order.total.toFixed(2)}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              order.status === "Completed"
                                ? "bg-green-100 text-green-800"
                                : order.status === "Shipped"
                                ? "bg-blue-100 text-blue-800"
                                : order.status === "Processing"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Marketing Campaigns */}
          <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
            <h2 className="text-lg font-medium mb-4 flex items-center">
              <div className="mr-2 text-emerald-700">
                <Mail size={20} />
              </div>
              Marketing Campaigns
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Start Date
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Budget
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Spent
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Conversions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {campaigns.map((campaign) => (
                    <tr key={campaign.id}>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                        {campaign.name}
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                        {campaign.type}
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            campaign.status === "Active"
                              ? "bg-green-100 text-green-800"
                              : campaign.status === "Scheduled"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {campaign.status}
                        </span>
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                        {campaign.startDate.toLocaleDateString()}
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                        ${campaign.budget.toLocaleString()}
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                        ${campaign.spent.toLocaleString()}
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                        {campaign.conversions.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
