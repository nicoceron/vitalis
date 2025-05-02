"use client";

import React from "react";
import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { getAdminDashboardStats, getRecentOrders } from "@/lib/admin-data";
import {
  BarChart3,
  LineChart,
  PieChart,
  Calendar,
  Download,
  ArrowUpDown,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

// Define interfaces for our data types
interface OrderStatus {
  [key: string]: number;
}

export default function AdminAnalyticsPage() {
  const { user } = useAuth();
  const [timeRange, setTimeRange] = useState("30");
  const [stats] = useState(getAdminDashboardStats());
  const [orders] = useState(getRecentOrders(100));

  // Mock analytics data
  const monthlySales = [
    { month: "Jan", sales: 89250 },
    { month: "Feb", sales: 92500 },
    { month: "Mar", sales: 101200 },
    { month: "Apr", sales: 85400 },
    { month: "May", sales: 91700 },
    { month: "Jun", sales: 105300 },
    { month: "Jul", sales: 117800 },
    { month: "Aug", sales: 123400 },
    { month: "Sep", sales: 135900 },
    { month: "Oct", sales: 142300 },
    { month: "Nov", sales: 156700 },
    { month: "Dec", sales: 168200 },
  ];

  const userGrowth = [
    { month: "Jan", users: 1850 },
    { month: "Feb", users: 1920 },
    { month: "Mar", users: 1980 },
    { month: "Apr", users: 2050 },
    { month: "May", users: 2110 },
    { month: "Jun", users: 2190 },
    { month: "Jul", users: 2260 },
    { month: "Aug", users: 2310 },
    { month: "Sep", users: 2370 },
    { month: "Oct", users: 2420 },
    { month: "Nov", users: 2450 },
    { month: "Dec", users: 2470 },
  ];

  const productPerformance = [
    { name: "Vitalis Vision", sales: 6240, revenue: 492960 },
    { name: "Vitalis Neuro", sales: 5870, revenue: 522430 },
    { name: "Vitalis Fortify", sales: 4980, revenue: 423300 },
    { name: "Complete Bundle", sales: 1840, revenue: 366160 },
  ];

  // Calculate some stats
  const totalRevenue = productPerformance.reduce(
    (sum, product) => sum + product.revenue,
    0
  );
  const totalSalesQty = productPerformance.reduce(
    (sum, product) => sum + product.sales,
    0
  );

  // Calculate growth percentages (mock data)
  const revenueGrowth = 12.4;
  const userGrowthRate = 8.6;
  const salesGrowth = 15.2;
  const averageOrderGrowth = 3.8;

  // Get max bar height for chart scaling
  const maxSales = Math.max(...monthlySales.map((month) => month.sales));
  const maxUsers = Math.max(...userGrowth.map((month) => month.users));

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          Analytics
        </h1>
        <div className="flex items-center space-x-4">
          <select
            className="block w-36 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
            <option value="365">Last 12 months</option>
          </select>
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
            <div className="mr-2">
              <Download size={16} />
            </div>
            Export
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium text-gray-500 mb-1">
              Revenue
            </div>
            <div
              className={`flex items-center text-sm ${
                revenueGrowth >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {revenueGrowth >= 0 ? (
                <div className="mr-1">
                  <TrendingUp size={16} />
                </div>
              ) : (
                <div className="mr-1">
                  <TrendingDown size={16} />
                </div>
              )}
              {Math.abs(revenueGrowth)}%
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            ${totalRevenue.toLocaleString()}
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium text-gray-500 mb-1">
              Total Users
            </div>
            <div
              className={`flex items-center text-sm ${
                userGrowthRate >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {userGrowthRate >= 0 ? (
                <div className="mr-1">
                  <TrendingUp size={16} />
                </div>
              ) : (
                <div className="mr-1">
                  <TrendingDown size={16} />
                </div>
              )}
              {Math.abs(userGrowthRate)}%
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {stats.totalUsers.toLocaleString()}
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium text-gray-500 mb-1">
              Total Sales
            </div>
            <div
              className={`flex items-center text-sm ${
                salesGrowth >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {salesGrowth >= 0 ? (
                <div className="mr-1">
                  <TrendingUp size={16} />
                </div>
              ) : (
                <div className="mr-1">
                  <TrendingDown size={16} />
                </div>
              )}
              {Math.abs(salesGrowth)}%
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {totalSalesQty.toLocaleString()}
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium text-gray-500 mb-1">
              Avg. Order Value
            </div>
            <div
              className={`flex items-center text-sm ${
                averageOrderGrowth >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {averageOrderGrowth >= 0 ? (
                <div className="mr-1">
                  <TrendingUp size={16} />
                </div>
              ) : (
                <div className="mr-1">
                  <TrendingDown size={16} />
                </div>
              )}
              {Math.abs(averageOrderGrowth)}%
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            ${stats.averageOrderValue.toFixed(2)}
          </div>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
        <div className="flex items-center mb-4">
          <div className="mr-2 text-emerald-700">
            <BarChart3 size={24} />
          </div>
          <h2 className="text-lg font-medium text-gray-900">Revenue Trends</h2>
        </div>
        <div className="h-80">
          {/* Simple bar chart visualization */}
          <div className="flex h-64 items-end space-x-2">
            {monthlySales.map((month, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <div
                  className="w-full bg-emerald-500 rounded-t hover:bg-emerald-600 transition-all"
                  style={{
                    height: `${(month.sales / maxSales) * 100}%`,
                  }}
                ></div>
                <div className="text-xs mt-2 text-gray-600 font-medium">
                  {month.month}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* User Growth Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center mb-4">
            <div className="mr-2 text-emerald-700">
              <LineChart size={24} />
            </div>
            <h2 className="text-lg font-medium text-gray-900">User Growth</h2>
          </div>
          <div className="h-60">
            {/* Simple bar chart visualization */}
            <div className="flex h-44 items-end space-x-1">
              {userGrowth.map((month, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div
                    className="w-full bg-blue-400 rounded-t hover:bg-blue-500 transition-all"
                    style={{
                      height: `${(month.users / maxUsers) * 100}%`,
                    }}
                  ></div>
                  <div className="text-xs mt-2 text-gray-600 font-medium">
                    {month.month}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Product Performance */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center mb-4">
            <div className="mr-2 text-emerald-700">
              <PieChart size={24} />
            </div>
            <h2 className="text-lg font-medium text-gray-900">
              Product Performance
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Product
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Sales
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Revenue
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    % of Total
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {productPerformance.map((product, index) => (
                  <tr key={index}>
                    <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                      {product.name}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                      {product.sales.toLocaleString()}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                      ${product.revenue.toLocaleString()}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                      {((product.revenue / totalRevenue) * 100).toFixed(1)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Sales by Status */}
      <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
        <h2 className="text-lg font-medium mb-4">Orders by Status</h2>

        {/* Calculate order counts by status */}
        {(() => {
          const statusCounts: OrderStatus = orders.reduce(
            (acc: OrderStatus, order) => {
              acc[order.status] = (acc[order.status] || 0) + 1;
              return acc;
            },
            {}
          );

          const totalOrders = orders.length;
          const statuses = Object.keys(statusCounts);

          return (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {statuses.map((status) => (
                <div key={status} className="border rounded-lg p-4">
                  <div className="text-sm font-medium text-gray-500 mb-1">
                    {status}
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    {statusCounts[status]}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {((statusCounts[status] / totalOrders) * 100).toFixed(1)}%
                    of total
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div
                      className={`h-2 rounded-full ${
                        status === "Completed"
                          ? "bg-green-500"
                          : status === "Shipped"
                          ? "bg-blue-500"
                          : status === "Processing"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                      style={{
                        width: `${(statusCounts[status] / totalOrders) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          );
        })()}
      </div>
    </div>
  );
}
