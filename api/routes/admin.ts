import { supabase } from "../apiClient";
import type { Campaign } from "@/lib/types";
import { getRecentUsers, getUserAccountById } from "./auth";
import { getRecentSubscriptions } from "./commerce";

export type CampaignCreateInput = Omit<Campaign, "id">;
export type CampaignUpdateInput = Partial<Omit<Campaign, "id">>;

// Campaign management functions
export async function createCampaign(
  campaign: CampaignCreateInput
): Promise<Campaign | null> {
  const { data, error } = await supabase
    .from("campaign")
    .insert([campaign])
    .select()
    .single();

  if (error) {
    console.error("Error creating campaign:", error.message);
    return null;
  }

  return data as Campaign;
}

export async function getAllCampaigns(): Promise<Campaign[]> {
  const { data, error } = await supabase
    .from("campaign")
    .select("*")
    .order("start_date", { ascending: false });

  if (error) {
    console.error("Error fetching campaigns:", error.message);
    return [];
  }

  return data as Campaign[];
}

export async function getCampaignById(id: number): Promise<Campaign | null> {
  const { data, error } = await supabase
    .from("campaign")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(`Error fetching campaign with id ${id}:`, error.message);
    return null;
  }

  return data as Campaign;
}

export async function updateCampaign(
  id: number,
  updates: CampaignUpdateInput
): Promise<Campaign | null> {
  const { data, error } = await supabase
    .from("campaign")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(`Error updating campaign with id ${id}:`, error.message);
    return null;
  }

  return data as Campaign;
}

export async function deleteCampaign(id: number): Promise<boolean> {
  const { error } = await supabase.from("campaign").delete().eq("id", id);

  if (error) {
    console.error(`Error deleting campaign with id ${id}:`, error.message);
    return false;
  }

  return true;
}

// Admin dashboard functions
export async function getAdminDashboardStats() {
  const now = new Date();
  const startOfThisMonth = new Date(
    now.getFullYear(),
    now.getMonth(),
    1
  ).toISOString();
  const startOfLastMonth = new Date(
    now.getFullYear(),
    now.getMonth() - 1,
    1
  ).toISOString();

  try {
    const [
      { data: usersThisMonth },
      { data: usersLastMonth },
      { data: paymentsThisMonth },
      { data: paymentsLastMonth },
      { data: allPayments },
      { count: totalUsers },
      { count: adminUsers },
      { count: activeSubscriptions },
      allCampaigns,
    ] = await Promise.all([
      supabase
        .from("user_account")
        .select("id, created_at")
        .gte("created_at", startOfThisMonth),
      supabase
        .from("user_account")
        .select("id, created_at")
        .gte("created_at", startOfLastMonth)
        .lt("created_at", startOfThisMonth),
      supabase
        .from("payment")
        .select("amount, payment_date")
        .gte("payment_date", startOfThisMonth),
      supabase
        .from("payment")
        .select("amount, payment_date")
        .gte("payment_date", startOfLastMonth)
        .lt("payment_date", startOfThisMonth),
      supabase.from("payment").select("amount"),
      supabase.from("user_account").select("*", { count: "exact", head: true }),
      supabase
        .from("user_account")
        .select("*", { count: "exact", head: true })
        .eq("is_admin", true),
      supabase
        .from("subscription")
        .select("*", { count: "exact", head: true })
        .eq("status", "active"),
      getAllCampaigns(),
    ]);

    const totalRevenue = (allPayments ?? []).reduce(
      (acc: number, p: { amount: number }) => acc + Number(p.amount),
      0
    );
    const totalSales = allPayments?.length ?? 0;
    const averageOrderValue = totalRevenue / (totalSales || 1);

    const revenueThisMonth = (paymentsThisMonth ?? []).reduce(
      (acc: number, p: { amount: number }) => acc + Number(p.amount),
      0
    );
    const revenueLastMonth = (paymentsLastMonth ?? []).reduce(
      (acc: number, p: { amount: number }) => acc + Number(p.amount),
      0
    );

    const avgOrderThisMonth = paymentsThisMonth?.length
      ? revenueThisMonth / paymentsThisMonth.length
      : 0;

    const avgOrderLastMonth = paymentsLastMonth?.length
      ? revenueLastMonth / paymentsLastMonth.length
      : 0;

    return {
      totalUsers,
      standardUsers: (totalUsers || 0) - (adminUsers || 0),
      adminUsers,
      totalSales,
      revenue: totalRevenue,
      activeSubscriptions,
      averageOrderValue,
      revenueGrowth: calcGrowth(revenueLastMonth, revenueThisMonth),
      userGrowthRate: calcGrowth(
        usersLastMonth?.length ?? 0,
        usersThisMonth?.length ?? 0
      ),
      salesGrowth: calcGrowth(
        paymentsLastMonth?.length ?? 0,
        paymentsThisMonth?.length ?? 0
      ),
      averageOrderGrowth: calcGrowth(avgOrderLastMonth, avgOrderThisMonth),
      campaigns: allCampaigns,
    };
  } catch (err) {
    console.error("Dashboard stats error:", err);
    return null;
  }
}

// Helper
function calcGrowth(prev: number, current: number): number {
  if (prev === 0 && current === 0) return 0;
  if (prev === 0) return 100;
  return ((current - prev) / prev) * 100;
}
