"use client";

import { useState } from "react";
import { getRecentOrders } from "@/lib/admin-data";
import {
  ShoppingCart,
  Search,
  Filter,
  ChevronDown,
  ArrowUpDown,
  Check,
  Clock,
  Truck,
  X,
} from "lucide-react";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState(getRecentOrders(50));
  const [searchQuery, setSearchQuery] = useState("");

  // Filter orders based on search query
  const filteredOrders = orders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Type-safe event handling
  const handleSearchChange = (e: { target: { value: string } }) => {
    setSearchQuery(e.target.value);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return (
          <div className="text-green-500">
            <Check size={16} />
          </div>
        );
      case "Shipped":
        return (
          <div className="text-blue-500">
            <Truck size={16} />
          </div>
        );
      case "Processing":
        return (
          <div className="text-yellow-500">
            <Clock size={16} />
          </div>
        );
      case "Cancelled":
        return (
          <div className="text-red-500">
            <X size={16} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center">
            <div className="mr-3 text-emerald-700">
              <ShoppingCart size={24} />
            </div>
            Orders
          </h1>
          <button className="bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 rounded">
            Export Orders
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="text-sm font-medium text-gray-500 mb-1">
              Total Orders
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {orders.length}
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="text-sm font-medium text-gray-500 mb-1">
              Processing
            </div>
            <div className="text-2xl font-bold text-yellow-500">
              {orders.filter((o) => o.status === "Processing").length}
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="text-sm font-medium text-gray-500 mb-1">
              Shipping
            </div>
            <div className="text-2xl font-bold text-blue-500">
              {orders.filter((o) => o.status === "Shipped").length}
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="text-sm font-medium text-gray-500 mb-1">
              Completed
            </div>
            <div className="text-2xl font-bold text-green-500">
              {orders.filter((o) => o.status === "Completed").length}
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
          <div className="flex flex-col md:flex-row md:items-center mb-6 space-y-4 md:space-y-0 md:space-x-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <Search size={18} />
              </div>
              <input
                type="text"
                placeholder="Search orders by ID, customer name, or email..."
                className="pl-10 pr-4 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-emerald-600"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
            <div className="flex space-x-2">
              <div className="relative">
                <button className="flex items-center px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50">
                  <div className="mr-2">
                    <Filter size={16} />
                  </div>
                  Status
                  <div className="ml-2">
                    <ChevronDown size={16} />
                  </div>
                </button>
                {/* Dropdown menu would go here */}
              </div>
              <div className="flex items-center px-4 py-2 border rounded-md text-gray-700">
                <div className="mr-2">
                  <ArrowUpDown size={16} />
                </div>
                Sort by
                <select className="ml-2 focus:outline-none bg-transparent">
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="price-low">Price: Low to High</option>
                </select>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Order ID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Customer
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Items
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Total
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {order.id}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {order.customerName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {order.customerEmail}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {order.date.toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {order.products.length} items
                      </div>
                      <div className="text-xs text-gray-500">
                        {order.products
                          .map((p) => p.name)
                          .join(", ")
                          .substring(0, 30)}
                        {order.products.map((p) => p.name).join(", ").length >
                        30
                          ? "..."
                          : ""}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        ${order.total.toFixed(2)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getStatusIcon(order.status)}
                        <span
                          className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
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
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-emerald-600 hover:text-emerald-900">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center mt-6">
            <div className="text-sm text-gray-500">
              Showing{" "}
              <span className="font-medium">{filteredOrders.length}</span> of{" "}
              <span className="font-medium">{orders.length}</span> orders
            </div>
            <div className="flex space-x-2">
              <button
                className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                disabled
              >
                Previous
              </button>
              <button className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
