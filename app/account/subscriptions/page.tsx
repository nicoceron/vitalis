"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  CalendarIcon,
  CheckCircle2,
  PauseCircle,
  RefreshCw,
} from "lucide-react";
import {
  getAllProducts,
  cancelSubscriptionViaAPI,
} from "@/api/routes/commerce";
import { supabase } from "@/api/apiClient";
import type { Product, ProductId } from "@/lib/types";
import { formatDisplayDate } from "@/lib/date-utils";
import { TimezoneDisplay } from "@/components/timezone-display";
import { toast } from "sonner";

type Subscription = {
  id: number;
  status: string;
  plan_type: "Monthly Subscription" | "Annual Subscription";
  product_type: ProductId;
  next_payment_due_date: string;
  created_at: string;
};

export default function SubscriptionsPage() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [products, setProducts] = useState<Partial<Record<ProductId, Product>>>(
    {}
  );
  const [selectedFrequency, setSelectedFrequency] = useState<
    "Monthly Subscription" | "Annual Subscription"
  >("Monthly Subscription");
  const [loading, setLoading] = useState(true);
  const [cancelingId, setCancelingId] = useState<number | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user }, error }) => {
      if (error || !user) {
        router.push("/sign-in");
      } else {
        setUserId(user.id);
      }
    });
  }, [router]);

  useEffect(() => {
    if (!userId) return;
    setLoading(true);

    supabase
      .from("subscription")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (error) {
          console.error("Error fetching subscriptions:", error);
          setSubscriptions([]);
        } else {
          setSubscriptions(data || []);
        }
        setLoading(false);
      });
  }, [userId]);

  useEffect(() => {
    async function fetchProducts() {
      const data = await getAllProducts();
      const productMap = data.reduce(
        (acc: Partial<Record<ProductId, Product>>, product: Product) => {
          acc[product.id] = product;
          return acc;
        },
        {}
      );
      setProducts(productMap);
    }

    fetchProducts();
  }, []);

  const monthlySubscriptions = subscriptions.filter(
    (s) =>
      s.plan_type === "Monthly Subscription" ||
      s.plan_type === "Annual Subscription"
  );

  function getSubscriptionPrice(
    product: Product,
    plan: "Monthly Subscription" | "Annual Subscription"
  ) {
    return plan === "Annual Subscription"
      ? product.price * 12 * 0.8
      : product.price;
  }

  const getStatusIcon = (status: string) => {
    const statusLower = status.toLowerCase();
    switch (statusLower) {
      case "active":
        return <CheckCircle2 className="h-5 w-5 text-emerald-500" />;
      case "paused":
        return <PauseCircle className="h-5 w-5 text-amber-500" />;
      case "canceled":
        return <RefreshCw className="h-5 w-5 text-gray-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    const statusLower = status.toLowerCase();
    switch (statusLower) {
      case "active":
        return "bg-emerald-100 text-emerald-800";
      case "paused":
        return "bg-amber-100 text-amber-800";
      case "canceled":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleCancelSubscription = async (subscriptionId: number) => {
    setCancelingId(subscriptionId);
    try {
      const result = await cancelSubscriptionViaAPI(subscriptionId);

      if (result.success) {
        // Update the local state to reflect the cancellation
        setSubscriptions((prev) =>
          prev.map((sub) =>
            sub.id === subscriptionId ? { ...sub, status: "CANCELED" } : sub
          )
        );

        // Show success message
        toast.success("Subscription canceled successfully! 🎉", {
          description:
            "You'll continue to have access until your next billing date.",
          duration: 5000,
        });
      } else {
        console.error("Failed to cancel subscription:", result.error);

        // Provide specific error messages
        if (result.error?.includes("not found")) {
          toast.error("Subscription not found", {
            description:
              "This subscription may have already been canceled or doesn't exist.",
          });
        } else if (
          result.error?.includes("Authentication") ||
          result.error?.includes("Invalid authentication")
        ) {
          toast.error("Authentication required", {
            description: "Please sign in again and try again.",
          });
        } else {
          toast.error("Failed to cancel subscription", {
            description:
              result.error || "An unexpected error occurred. Please try again.",
          });
        }
      }
    } catch (error) {
      console.error("Error canceling subscription:", error);
      toast.error("Something went wrong", {
        description: "Please check your connection and try again.",
      });
    } finally {
      setCancelingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <SiteHeader />
        <main className="flex-1 flex items-center justify-center">
          <p>Loading subscriptions...</p>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1 bg-gray-50 py-12">
        <div className="container px-4 md:px-6">
          <div className="flex justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold">My Subscriptions</h1>
              <TimezoneDisplay className="mt-2" />
            </div>
            <Button
              className="bg-emerald-700 hover:bg-emerald-800"
              onClick={() => router.push("/account/subscriptions/new")}
            >
              Add New Subscription
            </Button>
          </div>

          {monthlySubscriptions.length === 0 ? (
            <div className="bg-white p-6 rounded shadow text-center">
              <CalendarIcon className="mx-auto text-emerald-700 h-10 w-10" />
              <h3 className="text-lg mt-4">No Monthly Subscriptions</h3>
              <p className="text-gray-500 mt-2">
                You haven't added any subscriptions yet.
              </p>
              <Button
                className="mt-4 bg-emerald-700 hover:bg-emerald-800"
                onClick={() => router.push("/account/subscriptions/new")}
              >
                Browse Plans
              </Button>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {monthlySubscriptions.map((subscription) => {
                const product = products[subscription.product_type];
                return (
                  <Card key={subscription.id}>
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>
                            {product?.name ?? "Unknown Product"}
                          </CardTitle>
                          <CardDescription>
                            {product?.description ?? ""}
                          </CardDescription>
                        </div>
                        <Badge
                          className={getStatusColor(subscription.status)}
                          variant="secondary"
                        >
                          <span className="flex items-center gap-1">
                            {getStatusIcon(subscription.status)}
                            {subscription.status.charAt(0).toUpperCase() +
                              subscription.status.slice(1)}
                          </span>
                        </Badge>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-gray-500">Next billing date</div>
                          <div className="font-medium flex items-center gap-1 mt-1">
                            <CalendarIcon className="h-4 w-4 text-emerald-700" />
                            {formatDisplayDate(
                              subscription.next_payment_due_date
                            )}
                          </div>
                        </div>
                        <div>
                          <div className="text-gray-500">Price</div>
                          <div className="font-medium mt-1">
                            $
                            {product
                              ? getSubscriptionPrice(
                                  product,
                                  subscription.plan_type
                                ).toFixed(2)
                              : "—"}
                            /month
                          </div>
                        </div>
                      </div>
                    </CardContent>

                    <CardFooter className="flex justify-between pt-3">
                      {subscription.status.toLowerCase() === "canceled" ? (
                        <Button variant="outline" disabled>
                          Canceled
                        </Button>
                      ) : (
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="outline"
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              disabled={cancelingId === subscription.id}
                            >
                              {cancelingId === subscription.id
                                ? "Canceling..."
                                : "Cancel"}
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Cancel Subscription
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to cancel your{" "}
                                {product?.name} subscription? This action cannot
                                be undone. You will continue to have access
                                until your next billing date.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>
                                Keep Subscription
                              </AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() =>
                                  handleCancelSubscription(subscription.id)
                                }
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Yes, Cancel Subscription
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      )}
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
