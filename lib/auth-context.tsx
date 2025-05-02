"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import type { Order, Subscription } from "./types";
import { getMockOrders, getMockSubscriptions } from "./mock-data";

type User = {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  orders: Order[];
  subscriptions: Subscription[];
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  adminLogin: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom event to notify components of auth changes
const AUTH_CHANGE_EVENT = "auth_state_changed";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);

  // Helper function to notify components of auth changes
  const notifyAuthChange = () => {
    // Dispatch a storage event to notify all components
    window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
    // Also dispatch a storage event to notify other tabs/windows
    window.dispatchEvent(
      new StorageEvent("storage", {
        key: "vitalis_user",
        newValue: user ? JSON.stringify(user) : null,
        storageArea: localStorage,
      })
    );
  };

  useEffect(() => {
    // Check if user is stored in localStorage on initial load
    const storedUser = localStorage.getItem("vitalis_user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setOrders(getMockOrders(parsedUser.id));
        setSubscriptions(getMockSubscriptions(parsedUser.id));
      } catch (error) {
        console.error("Error parsing stored user:", error);
        localStorage.removeItem("vitalis_user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // In a real app, this would make an API call to validate credentials
    // For demo purposes, we'll simulate a successful login with any valid-looking email
    try {
      setIsLoading(true);

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Simple validation
      if (!email.includes("@")) {
        return false;
      }

      // Create mock user
      const mockUser = {
        id: `user_${Math.random().toString(36).substring(2, 9)}`,
        name: email.split("@")[0],
        email,
        isAdmin: false,
      };

      // Store user in state and localStorage
      setUser(mockUser);
      localStorage.setItem("vitalis_user", JSON.stringify(mockUser));

      // Set mock orders and subscriptions
      const mockOrders = getMockOrders(mockUser.id);
      const mockSubscriptions = getMockSubscriptions(mockUser.id);
      setOrders(mockOrders);
      setSubscriptions(mockSubscriptions);

      // Notify components about auth change
      notifyAuthChange();

      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    // In a real app, this would make an API call to create a user
    try {
      setIsLoading(true);

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Simple validation
      if (!email.includes("@") || !name || password.length < 6) {
        return false;
      }

      // Create mock user
      const mockUser = {
        id: `user_${Math.random().toString(36).substring(2, 9)}`,
        name,
        email,
        isAdmin: false,
      };

      // Store user in state and localStorage
      setUser(mockUser);
      localStorage.setItem("vitalis_user", JSON.stringify(mockUser));

      // Initialize with empty orders and subscriptions for new users
      setOrders([]);
      setSubscriptions([]);

      // Notify components about auth change
      notifyAuthChange();

      return true;
    } catch (error) {
      console.error("Registration error:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const adminLogin = async (email: string, password: string) => {
    try {
      setIsLoading(true);

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Simple validation
      if (!email.includes("@")) {
        return false;
      }

      // Create admin user
      const adminUser = {
        id: `admin_${Math.random().toString(36).substring(2, 9)}`,
        name: `Admin ${email.split("@")[0]}`,
        email,
        isAdmin: true,
      };

      // Store user in state and localStorage
      setUser(adminUser);
      localStorage.setItem("vitalis_user", JSON.stringify(adminUser));

      // Set mock orders and subscriptions
      const mockOrders = getMockOrders(adminUser.id);
      const mockSubscriptions = getMockSubscriptions(adminUser.id);
      setOrders(mockOrders);
      setSubscriptions(mockSubscriptions);

      // Notify components about auth change
      notifyAuthChange();

      return true;
    } catch (error) {
      console.error("Admin login error:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setOrders([]);
    setSubscriptions([]);
    localStorage.removeItem("vitalis_user");

    // Notify components about auth change
    notifyAuthChange();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        orders,
        subscriptions,
        login,
        register,
        adminLogin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
