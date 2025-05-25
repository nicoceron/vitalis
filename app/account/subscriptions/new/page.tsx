"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, CreditCard, MapPin, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { products, getSubscriptionPrice } from "@/lib/mock-data";
import type { ProductId } from "@/lib/types";
import { useAuth } from "@/lib/auth-context";

import {
  createAddress,
  AddressInput,
  ShippingInput,
  createShipping,
} from "@/api/routes/shipping";
import {
  createSubscriptionWithAuth,
  SubscriptionInput,
} from "@/api/routes/commerce";
import { createPaymentWithAuth, PaymentInput } from "@/api/routes/commerce";

type Step = "plan" | "payment" | "confirmation";

export default function NewSubscriptionPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  const [step, setStep] = useState<Step>("plan");

  // 1️⃣ Plan selection
  const [frequency, setFrequency] = useState<"monthly" | "annual">("monthly");
  const [productId, setProductId] = useState<ProductId>("complete");

  // 2️⃣ Shipping / Billing form state
  const [addressInfo, setAddressInfo] = useState<AddressInput>({
    first_name: "",
    last_name: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    phone: "",
  });
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");

  // Loading & confirmation
  const [loading, setLoading] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [lastPlanType, setLastPlanType] = useState<"Monthly Subscription" | "Annual Subscription">("Monthly Subscription");

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/sign-in");
    }
  }, [isLoading, user, router]);

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

  // Formatea MMYY
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let d = e.target.value.replace(/\D/g, "");
    if (d.length > 4) d = d.slice(0, 4);
    if (d.length > 2) d = d.slice(0, 2) + "/" + d.slice(2);
    setExpiry(d);
  };

  const handleComplete = async () => {
    setLoading(true);
    try {
      // 1) guarda address
      const addrId = await createAddress(addressInfo);

      // 2) orderNumber
      const num = `VT-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderNumber(num);

      // plan_type
      const planType = frequency === "monthly"
        ? "Monthly Subscription"
        : "Annual Subscription";
      setLastPlanType(planType);

      // 3) crea suscripción
      const subInput: SubscriptionInput = {
        address_id: addrId,
        plan_type: planType,
        product_type: productId,
      };
      const subscriptionId = await createSubscriptionWithAuth(subInput);

      // 4) crea envío
      const shipInput: ShippingInput = {
        subscription_id: subscriptionId,
        address_id: addrId,
        tracking_number: num,
      };
      await createShipping(shipInput);

      // 5) crea pago
      const price = getSubscriptionPrice(productId, frequency);
      const payInput: PaymentInput = {
        subscription_id: subscriptionId,
        amount: price,
        status: "SUCCESS",
        transaction_id: num,
      };
      await createPaymentWithAuth(payInput);

      // 6) siguiente paso
      setStep("confirmation");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const selectedPrice = getSubscriptionPrice(productId, frequency);
  const monthlyEq = frequency === "annual" ? (selectedPrice / 12).toFixed(2) : null;

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1 bg-gray-50 py-12">
        <div className="container px-4 md:px-6 max-w-6xl mx-auto">
          {/* Progress */}
          <div className="mb-8 flex items-center justify-center space-x-4">
            {["plan", "payment", "confirmation"].map((s, i) => (
              <React.Fragment key={s}>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                    step === s || (step === "confirmation" && s !== "plan")
                      ? "bg-emerald-700 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}>
                    {i + 1}
                  </div>
                  <span className="text-sm font-medium capitalize hidden sm:block">{s}</span>
                </div>
                {i < 2 && <div className="flex-1 h-px bg-gray-300 max-w-16" />}
              </React.Fragment>
            ))}
          </div>

          {/* 1) Plan */}
          {step === "plan" && (
            <Card className="max-w-4xl mx-auto">
              <CardHeader>
                <CardTitle className="text-3xl text-center">Choose your plan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="flex justify-center">
                  <Tabs
                    value={frequency}
                    onValueChange={(v) => setFrequency(v as "monthly" | "annual")}
                    className="w-full max-w-md"
                  >
                    <TabsList className="grid grid-cols-2 w-full">
                      <TabsTrigger value="monthly">Monthly</TabsTrigger>
                      <TabsTrigger value="annual">Annual (Save 20%)</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
                
                <div className="grid gap-4">
                  {Object.values(products).map((p) => {
                    const price = getSubscriptionPrice(p.id as ProductId, frequency);
                    const monthly = frequency === "annual" ? (price / 12).toFixed(2) : null;
                    return (
                      <div
                        key={p.id}
                        className={`border-2 rounded-xl p-6 cursor-pointer transition-all duration-200 hover:shadow-md ${
                          productId === p.id
                            ? "border-emerald-700 bg-emerald-50 shadow-sm"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => setProductId(p.id as ProductId)}
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex-1">
                            <div className="flex items-center gap-3">
                              <div className={`w-4 h-4 rounded-full border-2 ${
                                productId === p.id 
                                  ? "border-emerald-700 bg-emerald-700" 
                                  : "border-gray-300"
                              }`}>
                                {productId === p.id && (
                                  <div className="w-full h-full rounded-full bg-white scale-50"></div>
                                )}
                              </div>
                              <h3 className="font-semibold text-lg">{p.name}</h3>
                            </div>
                            <p className="text-gray-600 mt-2 ml-7">{p.description}</p>
                            {monthly && (
                              <p className="text-sm text-emerald-600 mt-1 ml-7 font-medium">
                                ${monthly}/month billed annually
                              </p>
                            )}
                          </div>
                          <div className="text-right ml-6">
                            <div className="text-2xl font-bold text-emerald-700">
                              ${price.toFixed(2)}
                            </div>
                            <div className="text-sm text-gray-500">
                              {frequency === "monthly" ? "/month" : "/year"}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                <div className="flex justify-center pt-6">
                  <Button
                    size="lg"
                    className="bg-emerald-700 hover:bg-emerald-800 px-8"
                    onClick={() => setStep("payment")}
                  >
                    Continue to Payment <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* 2) Payment & Shipping */}
          {step === "payment" && (
            <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Form */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">Billing & Shipping Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    {/* Personal Information */}
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <User className="h-5 w-5 text-emerald-700" />
                        <h3 className="font-semibold text-lg">Personal Information</h3>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="first_name">First Name *</Label>
                          <Input
                            id="first_name"
                            value={addressInfo.first_name}
                            onChange={e =>
                              setAddressInfo({ ...addressInfo, first_name: e.target.value })
                            }
                            className="mt-1"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="last_name">Last Name *</Label>
                          <Input
                            id="last_name"
                            value={addressInfo.last_name}
                            onChange={e =>
                              setAddressInfo({ ...addressInfo, last_name: e.target.value })
                            }
                            className="mt-1"
                            required
                          />
                        </div>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4 mt-4">
                        <div>
                          <Label htmlFor="email">Email Address *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={addressInfo.email}
                            onChange={e =>
                              setAddressInfo({ ...addressInfo, email: e.target.value })
                            }
                            className="mt-1"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={addressInfo.phone}
                            onChange={e =>
                              setAddressInfo({ ...addressInfo, phone: e.target.value })
                            }
                            className="mt-1"
                          />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Shipping Address */}
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <MapPin className="h-5 w-5 text-emerald-700" />
                        <h3 className="font-semibold text-lg">Shipping Address</h3>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="street">Street Address *</Label>
                          <Input
                            id="street"
                            value={addressInfo.street}
                            onChange={e =>
                              setAddressInfo({ ...addressInfo, street: e.target.value })
                            }
                            className="mt-1"
                            required
                          />
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="city">City *</Label>
                            <Input
                              id="city"
                              value={addressInfo.city}
                              onChange={e =>
                                setAddressInfo({ ...addressInfo, city: e.target.value })
                              }
                              className="mt-1"
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="state">State/Province *</Label>
                            <Input
                              id="state"
                              value={addressInfo.state}
                              onChange={e =>
                                setAddressInfo({ ...addressInfo, state: e.target.value })
                              }
                              className="mt-1"
                              required
                            />
                          </div>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="zip">ZIP/Postal Code *</Label>
                            <Input
                              id="zip"
                              value={addressInfo.zip}
                              onChange={e =>
                                setAddressInfo({ ...addressInfo, zip: e.target.value })
                              }
                              className="mt-1"
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="country">Country *</Label>
                            <Input
                              id="country"
                              value={addressInfo.country}
                              onChange={e =>
                                setAddressInfo({ ...addressInfo, country: e.target.value })
                              }
                              className="mt-1"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Payment Method */}
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <CreditCard className="h-5 w-5 text-emerald-700" />
                        <h3 className="font-semibold text-lg">Payment Method</h3>
                      </div>
                      <div className="border rounded-lg p-6 bg-gray-50 space-y-4">
                        <div>
                          <Label htmlFor="cardNumber">Card Number *</Label>
                          <Input
                            id="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            value={cardNumber}
                            onChange={e => setCardNumber(e.target.value)}
                            className="mt-1"
                            required
                          />
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <Label htmlFor="expiry">Expiry Date *</Label>
                            <Input
                              id="expiry"
                              placeholder="MM/YY"
                              value={expiry}
                              onChange={handleExpiryChange}
                              maxLength={5}
                              className="mt-1"
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="cvc">CVC *</Label>
                            <Input
                              id="cvc"
                              placeholder="123"
                              value={cvc}
                              onChange={e => setCvc(e.target.value)}
                              maxLength={4}
                              className="mt-1"
                              required
                            />
                          </div>
                          <div></div>
                        </div>
                        <div>
                          <Label htmlFor="nameOnCard">Name on Card *</Label>
                          <Input
                            id="nameOnCard"
                            placeholder="John Doe"
                            value={nameOnCard}
                            onChange={e => setNameOnCard(e.target.value)}
                            className="mt-1"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-6">
                      <Button 
                        variant="outline" 
                        onClick={() => setStep("plan")}
                        className="sm:w-auto w-full"
                      >
                        Back to Plan Selection
                      </Button>
                      <Button
                        className="bg-emerald-700 hover:bg-emerald-800 sm:w-auto w-full flex-1"
                        onClick={handleComplete}
                        disabled={loading}
                        size="lg"
                      >
                        {loading ? "Processing..." : "Complete Subscription"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Order Summary - Sticky */}
              <div className="lg:col-span-1">
                <Card className="lg:sticky lg:top-8">
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Plan Type</span>
                        <span className="font-medium">
                          {frequency === "monthly" ? "Monthly" : "Annual"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Product</span>
                        <span className="font-medium">{products[productId].name}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Total</span>
                        <div className="text-right">
                          <div className="text-xl font-bold text-emerald-700">
                            ${selectedPrice.toFixed(2)}
                          </div>
                          <div className="text-sm text-gray-500">
                            {frequency === "monthly" ? "/month" : "/year"}
                          </div>
                        </div>
                      </div>
                      {monthlyEq && (
                        <div className="text-sm text-gray-500 text-center bg-emerald-50 p-2 rounded">
                          Equivalent to ${monthlyEq}/month
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* 3) Confirmation */}
          {step === "confirmation" && (
            <Card className="max-w-lg mx-auto">
              <CardContent className="text-center py-12">
                <div className="mb-6">
                  <div className="mx-auto w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                    <Check className="h-8 w-8 text-emerald-700" />
                  </div>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Thank you for your subscription!
                </h2>
                <p className="text-gray-600 mb-2">
                  Your order has been successfully placed.
                </p>
                <p className="font-medium text-lg mb-8">
                  Order Number: <span className="text-emerald-700">{orderNumber}</span>
                </p>
                <div className="space-y-3">
                  <Button
                    className="w-full bg-emerald-700 hover:bg-emerald-800"
                    size="lg"
                    onClick={() =>
                      router.push(
                        lastPlanType === "Monthly Subscription" 
                        || lastPlanType === "Annual Subscription"
                          ? "/account/subscriptions"
                          : "/account/payments"
                      )
                    }
                  >
                    {lastPlanType === "Monthly Subscription" || lastPlanType === "Annual Subscription"
                      ? "View My Subscriptions"
                      : "View My Payments"}
                  </Button>
                  <Button asChild variant="outline" className="w-full" size="lg">
                    <Link href="/">Return to Home</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}