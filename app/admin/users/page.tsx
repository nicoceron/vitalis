"use client";

import { useEffect, useState } from "react";
import {
  getAllUserAccounts,
  createUserAccount,
  updateUserAccount,
  deleteUserAccount,
} from "@/api/routes/auth";
import { Users, Search, UserPlus, Filter } from "lucide-react";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getAllUserAccounts();
      setUsers(data || []);
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this user?")) {
      const success = await deleteUserAccount(id);
      if (success) {
        setUsers((prev) => prev.filter((u) => u.id !== id));
      }
    }
  };

  const handleEdit = async (id: string) => {
    const name = prompt("New full name:");
    const isAdmin = confirm("Make admin?");

    if (name) {
      const updated = await updateUserAccount(id, {
        full_name: name,
        is_admin: isAdmin,
      });
      if (updated) {
        setUsers((prev) =>
          prev.map((u) => (u.id === id ? { ...u, ...updated } : u))
        );
      }
    }
  };

  const handleAddUser = async () => {
    const full_name = prompt("Full name:");
    const email = prompt("Email:");
    const isAdmin = confirm("Is admin?");

    if (full_name && email) {
      const newUser = await createUserAccount({
        full_name,
        email,
        is_admin: isAdmin,
        address_id: 1, // Dummy placeholder, update if necessary
      });
      if (newUser) {
        setUsers((prev) => [newUser, ...prev]);
      }
    }
  };

  return (
    <div className="p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center">
            <div className="mr-3 text-emerald-700">
              <Users size={24} />
            </div>
            Users
          </h1>
          <button
            onClick={handleAddUser}
            className="bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 rounded flex items-center"
          >
            <div className="mr-2">
              <UserPlus size={16} />
            </div>
            Add User
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
                placeholder="Search users..."
                className="pl-10 pr-4 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-emerald-600"
                value={searchQuery}
                onChange={handleSearchChange}
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
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="a-z">A-Z</option>
                <option value="z-a">Z-A</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Joined
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-medium">
                          {user.full_name.charAt(0)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {user.full_name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.isAdmin ? (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                          Admin
                        </span>
                      ) : (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          User
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(user.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEdit(user.id)}
                        className="text-emerald-600 hover:text-emerald-900 mr-4"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="text-red-600 hover:text-red-900"
                      >
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
              Showing{" "}
              <span className="font-medium">{filteredUsers.length}</span> of{" "}
              <span className="font-medium">{users.length}</span> users
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
