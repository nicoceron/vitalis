"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import Link from "next/link";
import {
  BarChart3,
  Users,
  Package,
  Tag,
  ShoppingCart,
  Settings,
  LineChart,
  LogOut,
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();

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

  const handleLogout = () => {
    logout();
    router.push("/sign-in");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="hidden md:flex md:flex-col md:w-64 md:bg-white md:border-r">
        <div className="flex items-center justify-center h-16 border-b">
          <span className="text-lg font-bold text-emerald-700">
            Vitalis Admin
          </span>
        </div>
        <div className="flex flex-col flex-1 overflow-y-auto">
          <nav className="flex-1 px-2 py-4 space-y-1">
            <Link
              href="/admin"
              className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 group"
            >
              <div className="mr-3 text-gray-500 group-hover:text-emerald-600">
                <BarChart3 size={20} />
              </div>
              Dashboard
            </Link>
            <Link
              href="/admin/users"
              className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 group"
            >
              <div className="mr-3 text-gray-500 group-hover:text-emerald-600">
                <Users size={20} />
              </div>
              Users
            </Link>
            <Link
              href="/admin/orders"
              className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 group"
            >
              <div className="mr-3 text-gray-500 group-hover:text-emerald-600">
                <ShoppingCart size={20} />
              </div>
              Orders
            </Link>
            <Link
              href="/admin/products"
              className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 group"
            >
              <div className="mr-3 text-gray-500 group-hover:text-emerald-600">
                <Package size={20} />
              </div>
              Products
            </Link>
            <Link
              href="/admin/marketing"
              className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 group"
            >
              <div className="mr-3 text-gray-500 group-hover:text-emerald-600">
                <Tag size={20} />
              </div>
              Marketing
            </Link>
            <Link
              href="/admin/analytics"
              className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 group"
            >
              <div className="mr-3 text-gray-500 group-hover:text-emerald-600">
                <LineChart size={20} />
              </div>
              Analytics
            </Link>
            <Link
              href="/admin/settings"
              className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 group"
            >
              <div className="mr-3 text-gray-500 group-hover:text-emerald-600">
                <Settings size={20} />
              </div>
              Settings
            </Link>
          </nav>
          <div className="px-2 py-4 border-t">
            <button
              onClick={handleLogout}
              className="flex w-full items-center px-4 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 group"
            >
              <div className="mr-3 text-gray-500 group-hover:text-emerald-600">
                <LogOut size={20} />
              </div>
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top navigation */}
        <header className="bg-white shadow-sm lg:hidden">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <span className="text-lg font-bold text-emerald-700">
                  Vitalis Admin
                </span>
              </div>
              <div>{/* Mobile nav toggle would go here */}</div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-gray-50">{children}</main>
      </div>
    </div>
  );
}
