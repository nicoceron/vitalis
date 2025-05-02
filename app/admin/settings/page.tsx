"use client";

import React, { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import {
  Save,
  Settings as SettingsIcon,
  Bell,
  Users,
  Shield,
  CreditCard,
  Mail,
  Globe,
  CheckCircle,
} from "lucide-react";

export default function AdminSettingsPage() {
  const { user } = useAuth();
  const [generalSettings, setGeneralSettings] = useState({
    siteName: "Vitalis",
    siteDescription:
      "Premium health supplements for optimal wellness and vitality.",
    supportEmail: "support@vitalis.com",
    enableMaintenanceMode: false,
  });

  const [userSettings, setUserSettings] = useState({
    enableUserRegistration: true,
    requireEmailVerification: true,
    defaultUserRole: "customer",
    sessionTimeout: 60,
  });

  const [notificationSettings, setNotificationSettings] = useState({
    orderConfirmation: true,
    orderShipped: true,
    orderDelivered: true,
    lowStockAlert: true,
    newUserRegistration: true,
    enableMarketingEmails: true,
  });

  // Handle form submissions
  const handleGeneralSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would save to a database
    console.log("Saving general settings:", generalSettings);
    // Show success message
    alert("General settings saved successfully!");
  };

  const handleUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would save to a database
    console.log("Saving user settings:", userSettings);
    // Show success message
    alert("User settings saved successfully!");
  };

  const handleNotificationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would save to a database
    console.log("Saving notification settings:", notificationSettings);
    // Show success message
    alert("Notification settings saved successfully!");
  };

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto">
      <div className="flex items-center mb-8">
        <div className="mr-2 text-emerald-700">
          <SettingsIcon size={24} />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          Settings
        </h1>
      </div>

      {/* General Settings */}
      <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
        <div className="flex items-center mb-4">
          <div className="mr-2 text-emerald-700">
            <Globe size={20} />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">
            General Settings
          </h2>
        </div>
        <form onSubmit={handleGeneralSubmit}>
          <div className="grid grid-cols-1 gap-6 mb-6">
            <div>
              <label
                htmlFor="siteName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Site Name
              </label>
              <input
                type="text"
                id="siteName"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                value={generalSettings.siteName}
                onChange={(e) =>
                  setGeneralSettings({
                    ...generalSettings,
                    siteName: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label
                htmlFor="siteDescription"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Site Description
              </label>
              <textarea
                id="siteDescription"
                rows={3}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                value={generalSettings.siteDescription}
                onChange={(e) =>
                  setGeneralSettings({
                    ...generalSettings,
                    siteDescription: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label
                htmlFor="supportEmail"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Support Email
              </label>
              <input
                type="email"
                id="supportEmail"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                value={generalSettings.supportEmail}
                onChange={(e) =>
                  setGeneralSettings({
                    ...generalSettings,
                    supportEmail: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex items-center">
              <input
                id="enableMaintenanceMode"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                checked={generalSettings.enableMaintenanceMode}
                onChange={(e) =>
                  setGeneralSettings({
                    ...generalSettings,
                    enableMaintenanceMode: e.target.checked,
                  })
                }
              />
              <label
                htmlFor="enableMaintenanceMode"
                className="ml-2 block text-sm text-gray-900"
              >
                Enable Maintenance Mode
              </label>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            >
              <div className="mr-2">
                <Save size={16} />
              </div>
              Save Changes
            </button>
          </div>
        </form>
      </div>

      {/* User Management Settings */}
      <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
        <div className="flex items-center mb-4">
          <div className="mr-2 text-emerald-700">
            <Users size={20} />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">
            User Management
          </h2>
        </div>
        <form onSubmit={handleUserSubmit}>
          <div className="grid grid-cols-1 gap-6 mb-6">
            <div className="flex items-center">
              <input
                id="enableUserRegistration"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                checked={userSettings.enableUserRegistration}
                onChange={(e) =>
                  setUserSettings({
                    ...userSettings,
                    enableUserRegistration: e.target.checked,
                  })
                }
              />
              <label
                htmlFor="enableUserRegistration"
                className="ml-2 block text-sm text-gray-900"
              >
                Allow New User Registration
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="requireEmailVerification"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                checked={userSettings.requireEmailVerification}
                onChange={(e) =>
                  setUserSettings({
                    ...userSettings,
                    requireEmailVerification: e.target.checked,
                  })
                }
              />
              <label
                htmlFor="requireEmailVerification"
                className="ml-2 block text-sm text-gray-900"
              >
                Require Email Verification
              </label>
            </div>
            <div>
              <label
                htmlFor="defaultUserRole"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Default User Role
              </label>
              <select
                id="defaultUserRole"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                value={userSettings.defaultUserRole}
                onChange={(e) =>
                  setUserSettings({
                    ...userSettings,
                    defaultUserRole: e.target.value,
                  })
                }
              >
                <option value="customer">Customer</option>
                <option value="contributor">Contributor</option>
                <option value="moderator">Moderator</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="sessionTimeout"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Session Timeout (minutes)
              </label>
              <input
                type="number"
                id="sessionTimeout"
                min="15"
                max="240"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                value={userSettings.sessionTimeout}
                onChange={(e) =>
                  setUserSettings({
                    ...userSettings,
                    sessionTimeout: parseInt(e.target.value),
                  })
                }
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            >
              <div className="mr-2">
                <Save size={16} />
              </div>
              Save Changes
            </button>
          </div>
        </form>
      </div>

      {/* Notification Settings */}
      <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
        <div className="flex items-center mb-4">
          <div className="mr-2 text-emerald-700">
            <Bell size={20} />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">
            Notification Preferences
          </h2>
        </div>
        <form onSubmit={handleNotificationSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="flex items-center">
              <input
                id="orderConfirmation"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                checked={notificationSettings.orderConfirmation}
                onChange={(e) =>
                  setNotificationSettings({
                    ...notificationSettings,
                    orderConfirmation: e.target.checked,
                  })
                }
              />
              <label
                htmlFor="orderConfirmation"
                className="ml-2 block text-sm text-gray-900"
              >
                Order Confirmation
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="orderShipped"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                checked={notificationSettings.orderShipped}
                onChange={(e) =>
                  setNotificationSettings({
                    ...notificationSettings,
                    orderShipped: e.target.checked,
                  })
                }
              />
              <label
                htmlFor="orderShipped"
                className="ml-2 block text-sm text-gray-900"
              >
                Order Shipped
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="orderDelivered"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                checked={notificationSettings.orderDelivered}
                onChange={(e) =>
                  setNotificationSettings({
                    ...notificationSettings,
                    orderDelivered: e.target.checked,
                  })
                }
              />
              <label
                htmlFor="orderDelivered"
                className="ml-2 block text-sm text-gray-900"
              >
                Order Delivered
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="lowStockAlert"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                checked={notificationSettings.lowStockAlert}
                onChange={(e) =>
                  setNotificationSettings({
                    ...notificationSettings,
                    lowStockAlert: e.target.checked,
                  })
                }
              />
              <label
                htmlFor="lowStockAlert"
                className="ml-2 block text-sm text-gray-900"
              >
                Low Stock Alerts
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="newUserRegistration"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                checked={notificationSettings.newUserRegistration}
                onChange={(e) =>
                  setNotificationSettings({
                    ...notificationSettings,
                    newUserRegistration: e.target.checked,
                  })
                }
              />
              <label
                htmlFor="newUserRegistration"
                className="ml-2 block text-sm text-gray-900"
              >
                New User Registration
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="enableMarketingEmails"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                checked={notificationSettings.enableMarketingEmails}
                onChange={(e) =>
                  setNotificationSettings({
                    ...notificationSettings,
                    enableMarketingEmails: e.target.checked,
                  })
                }
              />
              <label
                htmlFor="enableMarketingEmails"
                className="ml-2 block text-sm text-gray-900"
              >
                Marketing Emails
              </label>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            >
              <div className="mr-2">
                <Save size={16} />
              </div>
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
