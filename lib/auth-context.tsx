'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react';
import type { Subscription } from './types';
import { getMockSubscriptions } from './mock-data';
import { loginUser, registerUser } from '../api/auth';
import { getUserSubscriptions } from '../api/subscription';

type User = {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
};

type AuthResult = {
  success: boolean;
  error?: string;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  subscriptions: Subscription[];
  login: (email: string, password: string) => Promise<AuthResult>;
  register: (
    name: string,
    email: string,
    password: string
  ) => Promise<AuthResult>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom event to notify components of auth changes
const AUTH_CHANGE_EVENT = 'auth_state_changed';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);

  // Helper function to notify components of auth changes
  const notifyAuthChange = () => {
    // Dispatch a storage event to notify all components
    window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
    // Also dispatch a storage event to notify other tabs/windows
    window.dispatchEvent(
      new StorageEvent('storage', {
        key: 'vitalis_user',
        newValue: user ? JSON.stringify(user) : null,
        storageArea: localStorage,
      })
    );
  };

  useEffect(() => {
    // Check if user is stored in localStorage on initial load
    const storedUser = localStorage.getItem('vitalis_user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setSubscriptions(getMockSubscriptions(parsedUser.id));
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('vitalis_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (
    email: string,
    password: string
  ): Promise<AuthResult> => {
    try {
      setIsLoading(true);

      const response = await loginUser(email, password);

      if (
        !response.success ||
        !response.data?.authUser ||
        !response.data?.userAccount
      ) {
        return { success: false, error: response.error || 'Login failed' };
      }

      const { authUser, userAccount } = response.data;

      const formattedUser = {
        id: authUser.id,
        name:
          userAccount.full_name ||
          authUser.user_metadata.full_name ||
          authUser.user_metadata.name,
        email:
          authUser.email ||
          authUser.user_metadata.email ||
          'no-email@unknown.com',
        isAdmin: userAccount.is_admin === true,
      };

      setUser(formattedUser);
      localStorage.setItem('vitalis_user', JSON.stringify(formattedUser));

      // Fetch real subscriptions from Supabase
      const subsResponse = await getUserSubscriptions(authUser.id);

      if (subsResponse.success) {
        const subscriptions = subsResponse.data || [];
        setSubscriptions(subscriptions);
      } else {
        console.error('Failed to fetch subscriptions:', subsResponse.error);
      }

      notifyAuthChange();

      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Unexpected error occurred' };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string
  ): Promise<AuthResult> => {
    try {
      setIsLoading(true);

      const response = await registerUser(name, email, password);

      if (!response.success) {
        return {
          success: false,
          error: response.error || 'Registration failed',
        };
      }

      return { success: true };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: 'Unexpected error occurred' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setSubscriptions([]);
    localStorage.removeItem('vitalis_user');

    // Notify components about auth change
    notifyAuthChange();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        subscriptions,
        login,
        register,
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
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
