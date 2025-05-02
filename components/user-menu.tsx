"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { ChevronDown, User } from "lucide-react";

// Custom event to listen for auth state changes
const AUTH_CHANGE_EVENT = "auth_state_changed";

export function UserMenu() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [authState, setAuthState] = useState(0); // Force re-render when auth changes
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Listen for auth state changes
  useEffect(() => {
    const handleAuthChange = () => {
      // Increment counter to force re-render
      setAuthState((prev) => prev + 1);
    };

    window.addEventListener(AUTH_CHANGE_EVENT, handleAuthChange);
    return () => {
      window.removeEventListener(AUTH_CHANGE_EVENT, handleAuthChange);
    };
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Force component to re-render when localStorage changes
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "vitalis_user") {
        // Force re-render based on localStorage change
        setAuthState((prev) => prev + 1);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    router.push("/");
  };

  if (!user) {
    return (
      <div className="flex items-center gap-4">
        <Button variant="outline" asChild>
          <Link
            href="/sign-in"
            className="border-emerald-700 text-emerald-700 hover:bg-emerald-50"
          >
            Sign In
          </Link>
        </Button>
        <Button asChild>
          <Link
            href="/register"
            className="bg-emerald-700 hover:bg-emerald-800 text-white"
          >
            Register
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="flex items-center gap-2 py-2 px-3 rounded-md hover:bg-gray-100 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 text-emerald-700">
          <User size={16} />
        </div>
        <span className="text-sm font-medium">
          Hi, {user?.name?.split(" ")[0] || "User"}
        </span>
        <span className={`transition-transform ${isOpen ? "rotate-180" : ""}`}>
          <ChevronDown size={16} />
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg z-10 border">
          <div className="py-2">
            {user.isAdmin && (
              <Link
                href="/admin"
                className="block px-4 py-2 text-sm hover:bg-gray-100 text-emerald-700 font-medium"
                onClick={() => setIsOpen(false)}
              >
                Admin Dashboard
              </Link>
            )}
            <Link
              href="/account/subscriptions"
              className="block px-4 py-2 text-sm hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              Subscriptions
            </Link>
            <Link
              href="/account/orders"
              className="block px-4 py-2 text-sm hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              Orders
            </Link>
            <Link
              href="/account"
              className="block px-4 py-2 text-sm hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              Account
            </Link>
            <button
              className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              onClick={handleLogout}
            >
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
