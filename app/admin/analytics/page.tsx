'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import {
  getAdminDashboardStats,
  getRecentSubscriptions,
} from '@/api/adminDashboard';
import {
  BarChart3,
  LineChart,
  PieChart,
  Download,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';

export default function AdminAnalyticsPage() {
  const { user } = useAuth();
  const [timeRange, setTimeRange] = useState('30');

  const [stats, setStats] = useState<any | null>(null);
  const [subscriptions, setSubscriptions] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      const statsData = await getAdminDashboardStats();
      setStats(statsData);

      const subsData = await getRecentSubscriptions(100);
      setSubscriptions(subsData || []);
    }

    fetchData();
  }, []);

  if (!stats) return <p className='p-10'>Loading dashboard...</p>;

  const revenueGrowth = stats.revenueGrowth;
  const userGrowthRate = stats.userGrowthRate;
  const salesGrowth = stats.salesGrowth;
  const averageOrderGrowth = stats.averageOrderGrowth;

  const totalRevenue = stats.revenue;
  const totalSalesQty = stats.totalSales;

  return (
    <div className='p-6 md:p-10 max-w-7xl mx-auto'>
      <div className='flex justify-between items-center mb-8'>
        <h1 className='text-2xl md:text-3xl font-bold text-gray-900'>
          Analytics
        </h1>
        <div className='flex items-center space-x-4'>
          <select
            className='block w-36 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm'
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value='7'>Last 7 days</option>
            <option value='30'>Last 30 days</option>
            <option value='90'>Last 90 days</option>
            <option value='365'>Last 12 months</option>
          </select>
          <button className='inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500'>
            <Download size={16} className='mr-2' />
            Export
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className='grid grid-cols-1 md:grid-cols-4 gap-6 mb-8'>
        {[
          {
            label: 'Revenue',
            value: `$${totalRevenue.toLocaleString()}`,
            growth: revenueGrowth,
          },
          {
            label: 'Total Users',
            value: stats.totalUsers,
            growth: userGrowthRate,
          },
          {
            label: 'Total Sales',
            value: totalSalesQty,
            growth: salesGrowth,
          },
          {
            label: 'Avg. Order Value',
            value: `$${stats.averageOrderValue.toFixed(2)}`,
            growth: averageOrderGrowth,
          },
        ].map(({ label, value, growth }, index) => (
          <div key={index} className='bg-white p-6 rounded-lg shadow-sm border'>
            <div className='flex items-center justify-between'>
              <div className='text-sm font-medium text-gray-500 mb-1'>
                {label}
              </div>
              <div
                className={`flex items-center text-sm ${
                  growth >= 0 ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {growth >= 0 ? (
                  <TrendingUp size={16} className='mr-1' />
                ) : (
                  <TrendingDown size={16} className='mr-1' />
                )}
                {Math.abs(growth)}%
              </div>
            </div>
            <div className='text-2xl font-bold text-gray-900'>{value}</div>
          </div>
        ))}
      </div>

      {/* Orders by Status */}
      <div className='bg-white p-6 rounded-lg shadow-sm border mb-8'>
        <h2 className='text-lg font-medium mb-4'>Subscriptions by Status</h2>

        {(() => {
          const statusCounts = subscriptions.reduce((acc: any, sub) => {
            acc[sub.status] = (acc[sub.status] || 0) + 1;
            return acc;
          }, {});

          const total = subscriptions.length;
          const statuses = Object.keys(statusCounts);

          return (
            <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
              {statuses.map((status) => (
                <div key={status} className='border rounded-lg p-4'>
                  <div className='text-sm font-medium text-gray-500 mb-1'>
                    {status}
                  </div>
                  <div className='text-2xl font-bold text-gray-900'>
                    {statusCounts[status]}
                  </div>
                  <div className='text-xs text-gray-500 mt-1'>
                    {((statusCounts[status] / total) * 100).toFixed(1)}% of
                    total
                  </div>
                  <div className='w-full bg-gray-200 rounded-full h-2 mt-2'>
                    <div
                      className={`h-2 rounded-full ${
                        status === 'active'
                          ? 'bg-green-500'
                          : status === 'cancelled'
                          ? 'bg-red-500'
                          : 'bg-yellow-500'
                      }`}
                      style={{
                        width: `${(statusCounts[status] / total) * 100}%`,
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
