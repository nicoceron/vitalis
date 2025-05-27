"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CalendarIcon, Package, User, Instagram } from "lucide-react";

export default function AccountPage() {
  const { user, isLoading, subscriptions } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/sign-in");
    }
  }, [user, isLoading, router]);

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

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1 bg-gray-50 py-12">
        <div className="container px-4 md:px-6">
          <h1 className="text-3xl font-bold mb-8">My Account</h1>

          <Tabs defaultValue="profile" className="w-full">
            <div className="mb-8">
              <TabsList className="grid w-full max-w-md grid-cols-2">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="profile" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
                      <User className="h-8 w-8 text-emerald-700" />
                    </div>
                    <div>
                      <CardTitle>Profile Information</CardTitle>
                      <CardDescription>
                        Manage your personal details
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="font-medium">{user.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{user.email}</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="bg-emerald-700 hover:bg-emerald-800">
                    Edit Profile
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Account Security</CardTitle>
                  <CardDescription>
                    Manage your password and security settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Password</p>
                    <p className="font-medium">••••••••</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline">Change Password</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="subscriptions" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                        <CalendarIcon className="h-6 w-6 text-emerald-700" />
                      </div>
                      <div>
                        <CardTitle>Active Subscriptions</CardTitle>
                        <CardDescription>
                          Manage your subscription plans
                        </CardDescription>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      className="text-emerald-700"
                      onClick={() => router.push("/account/subscriptions")}
                    >
                      View All Subscriptions
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {subscriptions.length > 0 ? (
                    <div className="space-y-4">
                      {subscriptions.map((subscription) => (
                        <div
                          key={subscription.id}
                          className="flex justify-between items-center border-b pb-4"
                        >
                          <div>
                            <p className="font-medium">
                              {subscription.product_type
                                ? subscription.product_type
                                    .charAt(0)
                                    .toUpperCase() +
                                  subscription.product_type.slice(1)
                                : "Unknown Product"}
                            </p>
                            <p className="text-sm text-gray-500 capitalize">
                              {subscription.plan_type} Plan
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">
                              $
                              {subscription.payments?.[0]?.amount?.toFixed(2) ??
                                "N/A"}
                            </p>
                            <p className="text-sm text-gray-500">
                              Next billing:{" "}
                              {formatDate(subscription.next_payment_due_date)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-gray-500 mb-4">
                        You don't have any active subscriptions.
                      </p>
                      <Button
                        className="bg-emerald-700 hover:bg-emerald-800"
                        onClick={() =>
                          router.push("/account/subscriptions/new")
                        }
                      >
                        Browse Subscription Plans
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
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
            <nav className="flex gap-4 sm:gap-6 items-center">
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
              <Link
                href="https://www.instagram.com/vitalispd/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-emerald-700 transition-colors"
                aria-label="Vitalis Instagram"
              >
                <Instagram size={18} />
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
