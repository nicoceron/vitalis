// Consolidated API handler for Vitalis
// This reduces the number of serverless functions by combining several API endpoints

import { registerUser, loginUser } from "../../api/auth";
import {
  getUserSubscriptions,
  createSubscription,
  getRecentSubscriptions as fetchRecentSubscriptions,
} from "../../api/subscription";
import { getAllProducts, getProductById } from "../../api/product";
import { getUserPayments, createPayment } from "../../api/payment";
import {
  getUserById,
  getAllUsers,
  updateUser,
  getRecentUsers as fetchRecentUsers,
  createUserAccount,
} from "../../api/user";
import { getMarketingCampaigns, createCampaign } from "../../api/campaign";
import { createShippingInfo } from "../../api/createShipping";
import { saveAddressInformation } from "../../api/saveAddressInfo";
import {
  getDashboardData,
  getAdminDashboardStats,
  getRecentUsers,
  getRecentSubscriptions,
} from "../../api/adminDashboard";

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { action, ...data } = req.body;

  try {
    let result;

    // Auth actions
    if (action === "register") {
      const { email, password, fullName } = data;
      result = await registerUser(email, password, fullName);
    } else if (action === "login") {
      const { email, password } = data;
      result = await loginUser(email, password);
    }

    // Admin Dashboard actions
    else if (action === "getAdminDashboardStats") {
      result = await getAdminDashboardStats();
      return res.status(200).json(result);
    } else if (action === "getRecentUsers") {
      const { limit } = data;
      result = await getRecentUsers(limit || 10);
      return res.status(200).json(result);
    } else if (action === "getRecentSubscriptions") {
      const { limit } = data;
      result = await getRecentSubscriptions(limit || 10);
      return res.status(200).json(result);
    }

    // Subscription actions
    else if (action === "getUserSubscriptions") {
      const { userId } = data;
      result = await getUserSubscriptions(userId);
    } else if (action === "createSubscription") {
      result = await createSubscription(data);
    }

    // Product actions
    else if (action === "getAllProducts") {
      result = await getAllProducts();
      return res.status(200).json(result);
    } else if (action === "getProductById") {
      const { productId } = data;
      result = await getProductById(productId);
      return res.status(200).json(result);
    }

    // Payment actions
    else if (action === "getUserPayments") {
      const { userId } = data;
      result = await getUserPayments(userId);
    } else if (action === "createPayment") {
      result = await createPayment(data);
    }

    // User actions
    else if (action === "getUserById") {
      const { userId } = data;
      result = await getUserById(userId);
      return res.status(200).json(result);
    } else if (action === "getAllUsers") {
      result = await getAllUsers();
      return res.status(200).json(result);
    } else if (action === "updateUser") {
      const { userId, updates } = data;
      result = await updateUser(userId, updates);
      return res.status(200).json(result);
    } else if (action === "createUserAccount") {
      const { userData } = data;
      result = await createUserAccount(userData);
      return res.status(200).json(result);
    }

    // Marketing actions
    else if (action === "getMarketingCampaigns") {
      result = await getMarketingCampaigns();
      return res.status(200).json(result);
    } else if (action === "createCampaign") {
      result = await createCampaign(data);
      return res.status(200).json(result);
    }

    // Shipping actions
    else if (action === "createShippingInfo") {
      result = await createShippingInfo(data);
    } else if (action === "saveAddressInformation") {
      result = await saveAddressInformation(data);
    }

    // Admin actions
    else if (action === "getDashboardData") {
      result = await getDashboardData();
      return res.status(200).json(result);
    } else {
      return res.status(400).json({ success: false, error: "Invalid action" });
    }

    // Return standard format for most actions
    if (result?.success === false) {
      return res.status(400).json(result);
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error(`Error in consolidated API handler (${action}):`, error);
    return res.status(500).json({
      success: false,
      error: "An unexpected error occurred",
    });
  }
}
