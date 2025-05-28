// app/account/payments/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
import { Package, ShoppingBag, Box, ShoppingCart } from "lucide-react";
import { supabase } from "@/api/apiClient";
import { formatDisplayDate } from "@/lib/date-utils";

type Payment = {
  id: number;
  amount: number;
  status: string;
  payment_date: string;
};

type Subscription = {
  id: number;
  start_date: string;
  next_payment_due_date: string;
  status: string;
  plan_type: string;
  product_type: string;
  payment: Payment[];
};

export default function PaymentsPage() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);

  // Get user
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user }, error }) => {
      if (error || !user) {
        router.push("/sign-in");
      } else {
        setUserId(user.id);
      }
    });
  }, [router]);

  // Load subscriptions + payments
  useEffect(() => {
    if (!userId) return;
    setLoading(true);

    supabase
      .from("subscription")
      .select(
        `
        id,
        start_date,
        next_payment_due_date,
        status,
        plan_type,
        product_type,
        payment (
          id,
          amount,
          status,
          payment_date
        )
      `
      )
      .neq("plan_type", "Monthly Subscription")
      .neq("plan_type", "Annual Subscription")
      .eq("user_id", userId)
      .order("start_date", { ascending: false })
      .then(({ data, error }) => {
        if (error) {
          console.error("Error fetching subscriptions:", error);
          setSubscriptions([]);
        } else {
          setSubscriptions(data as Subscription[]);
        }
        setLoading(false);
      });
  }, [userId]);

  const getPaymentStatusBadge = (status: string) => {
    if (!status) return null;

    switch (status.toUpperCase()) {
      case "PAID":
      case "SUCCESS":
      case "COMPLETED":
        return (
          <Badge className="bg-emerald-100 text-emerald-800">SUCCESS</Badge>
        );
      case "FAILED":
        return <Badge className="bg-red-100 text-red-800">FAILED</Badge>;
      default:
        return (
          <Badge className="bg-gray-100 text-gray-800">
            {status.toUpperCase()}
          </Badge>
        );
    }
  };

  // Get appropriate icon based on product type
  const getProductIcon = (productType: string | undefined) => {
    if (!productType) return <Box className="h-full w-full text-emerald-600" />;

    if (productType.includes("vision")) {
      return <Box className="h-full w-full text-blue-600" />;
    }

    if (productType.includes("neuro")) {
      return <Box className="h-full w-full text-purple-600" />;
    }

    if (productType.includes("fortify")) {
      return <Box className="h-full w-full text-orange-600" />;
    }

    if (productType.includes("distributor")) {
      return <ShoppingCart className="h-full w-full text-emerald-600" />;
    }

    return <Box className="h-full w-full text-emerald-600" />;
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <SiteHeader />
        <main className="flex-1 flex items-center justify-center">
          <p>Loading your purchases…</p>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1 bg-gray-50 py-12">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold">My Purchase</h1>
              <p className="text-gray-600 mt-1">
                View and track your Vitalis One-time purchase payments
              </p>
            </div>
            <Button
              className="bg-emerald-700 hover:bg-emerald-800"
              onClick={() => router.push("/")}
            >
              Continue Shopping
            </Button>
          </div>

          {subscriptions.length > 0 ? (
            <div className="space-y-8">
              {subscriptions.map((sub) => {
                const isDistributor = sub.product_type?.includes("distributor");
                return (
                  <Card key={sub.id} className="overflow-hidden">
                    <CardHeader className="bg-gray-50 border-b">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                          <CardTitle className="text-lg">
                            {isDistributor
                              ? `Distributor 30-pack ($66.90 per unit)`
                              : `One-time purchase #${sub.id}`}
                          </CardTitle>
                          <CardDescription>
                            Purchased on {formatDisplayDate(sub.start_date)}
                          </CardDescription>
                        </div>
                        <div className="flex items-center gap-4">
                          {sub.payment?.[0] &&
                            getPaymentStatusBadge(sub.payment[0].status)}
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="divide-y">
                        <div className="flex items-center gap-4 p-4">
                          <div className="w-16 h-16 relative shrink-0 rounded overflow-hidden border border-gray-200 flex items-center justify-center bg-gray-50">
                            {getProductIcon(sub.product_type)}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">
                              {isDistributor
                                ? "Distributor 30-pack ($66.90 per unit)"
                                : "One-time purchase"}
                            </h4>
                          </div>
                          <div className="text-right">
                            {sub.payment?.[0] && (
                              <>
                                <div className="font-medium">
                                  ${sub.payment[0].amount.toFixed(2)}
                                </div>
                                <div className="text-sm text-gray-500 font-medium">
                                  {sub.payment[0].status.toUpperCase()}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {formatDisplayDate(
                                    sub.payment[0].payment_date
                                  )}
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between bg-gray-50 border-t p-4">
                      <div className="flex items-center gap-2">
                        <Package className="h-5 w-5 text-emerald-700" />
                        <span className="text-sm uppercase font-medium">
                          {sub.status}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-500">Status</div>
                        <div className="font-bold text-lg uppercase">
                          {sub.status}
                        </div>
                      </div>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <div className="mx-auto w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                <ShoppingBag className="h-8 w-8 text-emerald-700" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No Purchases Yet</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                You haven't made any purchases yet. Start shopping to see your
                purchase history here.
              </p>
              <Button
                className="bg-emerald-700 hover:bg-emerald-800"
                onClick={() => router.push("/")}
              >
                Shop Now
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
