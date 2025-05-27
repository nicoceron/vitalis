"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
import {
  Package,
  ShoppingBag,
  CalendarIcon,
  ShoppingCart,
  Box,
} from "lucide-react";
import { getAllProducts } from "@/api/routes/commerce";
import type { Product, ProductId } from "@/lib/types";

export default function OrdersPage() {
  const { user, isLoading, subscriptions } = useAuth();
  const router = useRouter();
  const [products, setProducts] = useState<Partial<Record<ProductId, Product>>>(
    {}
  );

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
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getPaymentStatusBadge = (status: string) => {
    if (!status) return null;

    switch (status.toLowerCase()) {
      case "paid":
      case "success":
      case "completed":
        return (
          <Badge className="bg-emerald-100 text-emerald-800">SUCCESS</Badge>
        );
      case "failed":
        return <Badge className="bg-red-100 text-red-800">FAILED</Badge>;
      case "pending":
      default:
        return (
          <Badge className="bg-gray-100 text-gray-800 capitalize">
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
                const product = products[sub.product_type as ProductId];
                const latestPayment = sub.payments?.[0];
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
                            Purchased on {formatDate(sub.start_date)}
                          </CardDescription>
                        </div>
                        <div className="flex items-center gap-4">
                          {latestPayment &&
                            getPaymentStatusBadge(latestPayment.status)}
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
                            <p className="text-sm text-gray-500">
                              {product?.description ?? "Vitalis product"}
                            </p>
                          </div>
                          <div className="text-right">
                            {latestPayment && (
                              <>
                                <div className="font-medium">
                                  ${latestPayment.amount.toFixed(2)}
                                </div>
                                <div className="text-sm text-gray-500 font-medium">
                                  {latestPayment.status.toUpperCase()}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {formatDate(latestPayment.payment_date)}
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
