"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
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
import { Package, ShoppingBag, Truck } from "lucide-react";

export default function PaymentsPage() {
  const { user, isLoading, subscriptions } = useAuth();
  const router = useRouter();

  if (isLoading || !user) {
    return (
      <div className="flex flex-col min-h-screen">
        <SiteHeader />
        <main className="flex-1 flex items-center justify-center">
          <p>Loading...</p>
        </main>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-emerald-100 text-emerald-800">Paid</Badge>;
      case "failed":
        return <Badge className="bg-red-100 text-red-800">Failed</Badge>;
      case "pending":
      default:
        return (
          <Badge className="bg-gray-100 text-gray-800 capitalize">
            {status}
          </Badge>
        );
    }
  };

  const getProductImagePath = (productType: string | undefined) => {
    console.log("Product type:", productType);
    if (!productType) return "/placeholder.jpg";

    // Extract base product name from various formats
    let baseProduct = productType;

    // Handle format like "vision-single" or "vision-subscription"
    if (productType.includes("-")) {
      baseProduct = productType.split("-")[0];
    }

    console.log("Base product:", baseProduct);

    // Check if the base product is one of our standard products
    if (["vision", "neuro", "fortify"].includes(baseProduct)) {
      return `/${baseProduct}.png`;
    }

    // For the bundle or complete product
    if (baseProduct === "complete" || baseProduct === "bundle") {
      return "/placeholder.jpg";
    }

    // Default fallback
    return "/placeholder.jpg";
  };

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1 bg-gray-50 py-12">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold">My Purchase</h1>
              <p className="text-gray-600 mt-1">
                View and track your Vitalis purchases and subscriptions
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
              {subscriptions.map((sub) => (
                <Card key={sub.id} className="overflow-hidden">
                  <CardHeader className="bg-gray-50 border-b">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <CardTitle className="text-lg">
                          {sub.plan_type === "Monthly Subscription" ||
                          sub.plan_type === "Annual Subscription"
                            ? `Subscription #${sub.id}`
                            : `One-time purchase #${sub.id}`}
                        </CardTitle>
                        <CardDescription>
                          {sub.plan_type === "Monthly Subscription" ||
                          sub.plan_type === "Annual Subscription"
                            ? `Started on ${formatDate(sub.start_date)}`
                            : `Purchased on ${formatDate(sub.start_date)}`}
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-4">
                        {getPaymentStatusBadge(
                          sub.payments?.[0]?.status ?? "pending"
                        )}

                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y">
                      <div className="flex items-center gap-4 p-4">
                        <div className="w-16 h-16 relative shrink-0 rounded overflow-hidden">
                          <Image
                            src={getProductImagePath(sub.product_type)}
                            alt={`${sub.product_type} product image`}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{sub.plan_type}</h4>
                          <p className="text-sm text-gray-500">
                            Next Payment:{" "}
                            {formatDate(sub.next_payment_due_date)}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            Type: {sub.product_type}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">
                            ${sub.payments?.[0]?.amount ?? "N/A"}
                          </div>
                          <div className="text-sm text-gray-500">
                            {sub.payments?.[0]?.status ?? "Pending"}
                          </div>
                          <div className="text-sm text-gray-500">
                            {formatDate(sub.payments?.[0]?.payment_date ?? "")}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between bg-gray-50 border-t p-4">
                    <div className="flex items-center gap-2">
                      {sub.payments?.[0]?.status === "paid" ? (
                        <Package className="h-5 w-5 text-emerald-700" />
                      ) : sub.payments?.[0]?.status === "pending" ? (
                        <ShoppingBag className="h-5 w-5 text-blue-700" />
                      ) : (
                        <Package className="h-5 w-5 text-red-700" />
                      )}
                      <span className="text-sm capitalize">
                        {sub.payments?.[0]?.status ?? "Pending"}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500">Status</div>
                      <div className="font-bold text-lg">{sub.status}</div>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <div className="mx-auto w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                <ShoppingBag className="h-8 w-8 text-emerald-700" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                No Subscriptions Yet
              </h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                You haven't placed any subscriptions yet. Start shopping to see
                your order history here.
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

      <footer className="border-t py-6 md:py-8 bg-white">
        <div className="container flex flex-col gap-4 px-4 md:px-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-emerald-700">
                Vitalis
              </span>
              <span className="text-xs align-top">®</span>
            </div>
            <nav className="flex gap-4 sm:gap-6">
              <Link
                href="#"
                className="text-xs hover:underline underline-offset-4"
              >
                Terms
              </Link>
              <Link
                href="#"
                className="text-xs hover:underline underline-offset-4"
              >
                Privacy
              </Link>
              <Link
                href="#"
                className="text-xs hover:underline underline-offset-4"
              >
                Contact
              </Link>
            </nav>
          </div>
          <div className="text-xs text-gray-500">
            © {new Date().getFullYear()} Vitalis. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
