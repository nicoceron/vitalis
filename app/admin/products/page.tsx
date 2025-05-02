"use client";

import { useState } from "react";
import { Package, Search, Plus, Filter } from "lucide-react";

export default function AdminProductsPage() {
  const [products] = useState([
    {
      id: "prod_001",
      name: "Vitalis Vision",
      price: 79.0,
      status: "Active",
      stock: 432,
      category: "Supplements",
    },
    {
      id: "prod_002",
      name: "Vitalis Neuro",
      price: 89.0,
      status: "Active",
      stock: 289,
      category: "Supplements",
    },
    {
      id: "prod_003",
      name: "Vitalis Fortify",
      price: 85.0,
      status: "Active",
      stock: 350,
      category: "Supplements",
    },
    {
      id: "prod_004",
      name: "Complete Bundle",
      price: 199.0,
      status: "Active",
      stock: 178,
      category: "Bundles",
    },
  ]);

  return (
    <div className="p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center">
            <div className="mr-3 text-emerald-700">
              <Package size={24} />
            </div>
            Products
          </h1>
          <button className="bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 rounded flex items-center">
            <div className="mr-2">
              <Plus size={16} />
            </div>
            Add Product
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
          <div className="flex flex-col md:flex-row md:items-center mb-6 space-y-4 md:space-y-0 md:space-x-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <Search size={18} />
              </div>
              <input
                type="text"
                placeholder="Search products..."
                className="pl-10 pr-4 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>
            <div className="flex space-x-2">
              <button className="flex items-center px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50">
                <div className="mr-2">
                  <Filter size={16} />
                </div>
                Filter
              </button>
              <select className="px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-600">
                <option value="newest">Name: A-Z</option>
                <option value="oldest">Name: Z-A</option>
                <option value="price-high">Price: High to Low</option>
                <option value="price-low">Price: Low to High</option>
              </select>
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
                    Product
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Price
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
                    Stock
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Category
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
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {product.name}
                      </div>
                      <div className="text-sm text-gray-500">{product.id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        ${product.price.toFixed(2)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {product.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.stock} units
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-emerald-600 hover:text-emerald-900 mr-4">
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

          <div className="flex justify-between items-center mt-6">
            <div className="text-sm text-gray-500">
              Showing <span className="font-medium">{products.length}</span>{" "}
              products
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
