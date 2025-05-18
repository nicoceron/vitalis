"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { useAuth } from "@/lib/auth-context";
import { getAdminDashboardStats } from "@/api/routes/admin";
import { getRecentUsers } from "@/api/routes/auth";
import { getRecentSubscriptions } from "@/api/routes/commerce";
import { Users, ShoppingBag, CreditCard, Activity, Mail } from "lucide-react";

export default function AdminDashboard() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  const [stats, setStats] = useState<any>(null);
  const [recentUsers, setRecentUsers] = useState<any[]>([]);
  const [recentSubscriptions, setRecentSubscriptions] = useState<any[]>([]);
  const [campaigns, setCampaigns] = useState<any[]>([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      const [statsData, users, subscriptions] = await Promise.all([
        getAdminDashboardStats(),
        getRecentUsers(5),
        getRecentSubscriptions(5),
      ]);

      setStats(statsData);
      setRecentUsers(users);
      setRecentSubscriptions(subscriptions);
      setCampaigns(statsData?.campaigns ?? []);
    };

    fetchDashboardData();
  }, []);

  useEffect(() => {
    if (!isLoading && (!user || !user.isAdmin)) {
      router.push("/sign-in");
    }
  }, [user, isLoading, router]);

  if (isLoading || !stats) {
    return (
      <div className="flex-1 flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  const activeCampaigns = campaigns.filter(
    (campaign) => campaign.status === "Active"
  ).length;

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1 p-6 md:p-10 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Admin Dashboard
            </h1>
            <div className="text-sm text-gray-500">Welcome, {user?.name}</div>
          </div>

          {/* User Statistics */}
          <SectionHeader icon={<Users size={24} />} title="User Statistics" />
          <StatsGrid
            stats={[
              { label: "Total Users", value: stats.totalUsers },
              { label: "Standard Users", value: stats.standardUsers },
              {
                label: "Admin Users",
                value: stats.adminUsers,
                highlight: true,
              },
            ]}
          />

          {/* Sales Stats */}
          <SectionHeader
            icon={<ShoppingBag size={24} />}
            title="Sales Statistics"
          />
          <StatsGrid
            stats={[
              {
                label: "Total Sales",
                value: `${stats.totalSales} subscriptions`,
              },
              { label: "Revenue", value: `$${stats.revenue.toLocaleString()}` },
              {
                label: "Average Order Value",
                value: `$${stats.averageOrderValue.toFixed(2)}`,
              },
            ]}
          />

          {/* Marketing Campaigns */}
          <SectionHeader
            icon={<Activity size={24} />}
            title="Marketing Overview"
          />
          <StatsGrid
            stats={[
              {
                label: "Active Campaigns",
                value: `${activeCampaigns} / ${campaigns.length}`,
              },
              {
                label: "Total Budget",
                value: `$${campaigns
                  .reduce((sum, c) => sum + c.budget, 0)
                  .toLocaleString()}`,
              },
              {
                label: "Total Conversions",
                value: campaigns
                  .reduce((sum, c) => sum + c.conversions, 0)
                  .toLocaleString(),
              },
            ]}
          />

          {/* Recent Users + Subscriptions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <RecentTable
              title="Recent Users"
              headers={["Name", "Email", "Join Date"]}
              rows={recentUsers.map((user) => [
                user.full_name,
                user.email,
                new Date(user.created_at).toLocaleDateString(),
              ])}
            />

            <RecentTable
              title="Recent Subscriptions"
              headers={["ID", "User", "Start Date", "Plan", "Status"]}
              rows={recentSubscriptions.map((sub) => [
                sub.id,
                `${sub.user_name} (${sub.user_email})`,
                new Date(sub.start_date).toLocaleDateString(),
                sub.plan_type,
                sub.status,
              ])}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

// Helper Components
function SectionHeader({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
      <div className="mr-2 text-emerald-700">{icon}</div>
      {title}
    </h2>
  );
}

function StatsGrid({
  stats,
}: {
  stats: { label: string; value: any; highlight?: boolean }[];
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {stats.map((stat, i) => (
        <div key={i} className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="text-sm font-medium text-gray-500 mb-1">
            {stat.label}
          </div>
          <div
            className={`text-2xl font-bold ${
              stat.highlight ? "text-emerald-700" : "text-gray-900"
            }`}
          >
            {stat.value}
          </div>
        </div>
      ))}
    </div>
  );
}

function RecentTable({
  title,
  headers,
  rows,
}: {
  title: string;
  headers: string[];
  rows: (string | number)[][];
}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h2 className="text-lg font-medium mb-4">{title}</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              {headers.map((h, i) => (
                <th
                  key={i}
                  className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {rows.map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td
                    key={j}
                    className="px-3 py-2 whitespace-nowrap text-sm text-gray-900"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
