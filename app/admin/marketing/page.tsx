"use client";

import React from "react";
import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { getMarketingCampaigns } from "@/lib/admin-data";
import {
  Search,
  PlusCircle,
  ArrowUpDown,
  Calendar,
  Mail,
  Instagram,
  Globe,
  Share2,
  BarChart,
} from "lucide-react";

export default function AdminMarketingPage() {
  const { user } = useAuth();
  const [campaigns, setCampaigns] = useState(getMarketingCampaigns());
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Calculate total performance metrics
  const totalBudget = campaigns.reduce(
    (sum, campaign) => sum + campaign.budget,
    0
  );
  const totalSpent = campaigns.reduce(
    (sum, campaign) => sum + campaign.spent,
    0
  );
  const totalConversions = campaigns.reduce(
    (sum, campaign) => sum + campaign.conversions,
    0
  );
  const totalLeads = campaigns.reduce(
    (sum, campaign) => sum + campaign.leads,
    0
  );
  const conversionRate =
    totalLeads > 0 ? (totalConversions / totalLeads) * 100 : 0;
  const activeCampaigns = campaigns.filter(
    (campaign) => campaign.status === "Active"
  ).length;

  // Filter campaigns based on search and status
  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesSearch = campaign.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || campaign.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Get campaign type icon
  const getCampaignTypeIcon = (type: string) => {
    switch (type) {
      case "Email":
        return <Mail size={16} />;
      case "Social Media":
        return <Instagram size={16} />;
      case "Google Ads":
        return <Globe size={16} />;
      case "Referral":
        return <Share2 size={16} />;
      default:
        return <BarChart size={16} />;
    }
  };

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          Marketing
        </h1>
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
          <div className="mr-2">
            <PlusCircle size={16} />
          </div>
          New Campaign
        </button>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="text-sm font-medium text-gray-500 mb-1">
            Active Campaigns
          </div>
          <div className="text-2xl font-bold text-emerald-600">
            {activeCampaigns}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {((activeCampaigns / campaigns.length) * 100).toFixed(0)}% of total
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="text-sm font-medium text-gray-500 mb-1">
            Budget Utilization
          </div>
          <div className="text-2xl font-bold text-gray-900">
            ${totalSpent.toLocaleString()} / ${totalBudget.toLocaleString()}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {((totalSpent / totalBudget) * 100).toFixed(1)}% used
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="text-sm font-medium text-gray-500 mb-1">
            Total Conversions
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {totalConversions.toLocaleString()}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            From {totalLeads.toLocaleString()} leads
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="text-sm font-medium text-gray-500 mb-1">
            Conversion Rate
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {conversionRate.toFixed(1)}%
          </div>
          <div className="text-xs text-gray-500 mt-1">
            Avg. across all campaigns
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6 border">
        <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <Search size={20} />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
              placeholder="Search campaigns..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="w-full md:w-48">
            <select
              className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm rounded-md"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Scheduled">Scheduled</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Campaigns Table */}
      <div className="bg-white overflow-hidden shadow-sm rounded-lg border">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  <div className="flex items-center">
                    Name
                    <div className="ml-1 text-gray-400">
                      <ArrowUpDown size={14} />
                    </div>
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Type
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  <div className="flex items-center">
                    <div className="mr-1">
                      <Calendar size={14} />
                    </div>
                    Date Range
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Budget/Spent
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Leads
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Conversions
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCampaigns.map((campaign) => (
                <tr key={campaign.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {campaign.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <span className="mr-2 text-gray-400">
                        {getCampaignTypeIcon(campaign.type)}
                      </span>
                      {campaign.type}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {campaign.startDate.toLocaleDateString()}
                    {campaign.endDate &&
                      ` - ${campaign.endDate.toLocaleDateString()}`}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex flex-col">
                      <span>
                        ${campaign.spent.toLocaleString()} / $
                        {campaign.budget.toLocaleString()}
                      </span>
                      <div className="w-24 bg-gray-200 rounded-full h-2 mt-1">
                        <div
                          className="bg-emerald-600 h-2 rounded-full"
                          style={{
                            width: `${Math.min(
                              100,
                              (campaign.spent / campaign.budget) * 100
                            )}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {campaign.leads.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex flex-col">
                      <span>{campaign.conversions.toLocaleString()}</span>
                      <span className="text-xs text-gray-500">
                        {campaign.leads > 0
                          ? `${(
                              (campaign.conversions / campaign.leads) *
                              100
                            ).toFixed(1)}%`
                          : "0%"}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                    <button className="text-emerald-600 hover:text-emerald-900 mr-3">
                      Edit
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6">
        <div className="text-sm text-gray-700">
          Showing{" "}
          <span className="font-medium">{filteredCampaigns.length}</span> of{" "}
          <span className="font-medium">{campaigns.length}</span> campaigns
        </div>
        <div className="flex-1 flex justify-end">
          <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            Previous
          </button>
          <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
