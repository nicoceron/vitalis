"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { products, getSubscriptionPrice } from "@/lib/mock-data"
import type { ProductId } from "@/lib/types"
import { Check, CreditCard } from "lucide-react"

export default function NewSubscriptionPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [selectedFrequency, setSelectedFrequency] = useState<"monthly" | "annual">("monthly")
  const [selectedProduct, setSelectedProduct] = useState<ProductId>("complete")
  const [step, setStep] = useState(1)

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/sign-in")
    }
  }, [user, isLoading, router])

  if (isLoading || !user) {
    return (
      <div className="flex flex-col min-h-screen">
        <SiteHeader />
        <main className="flex-1 flex items-center justify-center">
          <p>Loading...</p>
        </main>
      </div>
    )
  }

  const handleContinue = () => {
    if (step === 1) {
      setStep(2)
    } else {
      // In a real app, this would submit the subscription
      router.push("/account/subscriptions")
    }
  }

  const selectedProductPrice = getSubscriptionPrice(selectedProduct, selectedFrequency)
  const monthlyEquivalent = selectedFrequency === "annual" ? (selectedProductPrice / 12).toFixed(2) : null

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1 bg-gray-50 py-12">
        <div className="container px-4 md:px-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">New Subscription</h1>
            <p className="text-gray-600 mt-1">Choose your subscription plan</p>
          </div>

          <div className="flex items-center mb-8">
            <div className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= 1 ? "bg-emerald-700 text-white" : "bg-gray-200"
                }`}
              >
                {step > 1 ? <Check className="h-5 w-5" /> : "1"}
              </div>
              <div className="ml-2 font-medium">Choose Plan</div>
            </div>
            <div className="h-px bg-gray-300 flex-1 mx-4"></div>
            <div className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= 2 ? "bg-emerald-700 text-white" : "bg-gray-200"
                }`}
              >
                2
              </div>
              <div className="ml-2 font-medium">Payment</div>
            </div>
            <div className="h-px bg-gray-300 flex-1 mx-4"></div>
            <div className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= 3 ? "bg-emerald-700 text-white" : "bg-gray-200"
                }`}
              >
                3
              </div>
              <div className="ml-2 font-medium">Confirmation</div>
            </div>
          </div>

          {step === 1 && (
            <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-6">Select Your Subscription</h2>

              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-3">1. Choose your frequency</h3>
                <Tabs
                  value={selectedFrequency}
                  onValueChange={(v) => setSelectedFrequency(v as "monthly" | "annual")}
                  className="w-full"
                >
                  <TabsList className="grid w-full max-w-md grid-cols-2">
                    <TabsTrigger value="monthly">Monthly</TabsTrigger>
                    <TabsTrigger value="annual">Annual (Save 20%)</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">2. Choose your product</h3>
                <RadioGroup
                  value={selectedProduct}
                  onValueChange={(v) => setSelectedProduct(v as ProductId)}
                  className="space-y-4"
                >
                  {Object.values(products).map((product) => {
                    const price = getSubscriptionPrice(product.id as ProductId, selectedFrequency)
                    const monthlyPrice = selectedFrequency === "annual" ? (price / 12).toFixed(2) : price.toFixed(2)

                    return (
                      <div
                        key={product.id}
                        className={`border rounded-lg p-4 transition-colors ${
                          selectedProduct === product.id
                            ? "border-emerald-700 bg-emerald-50"
                            : "border-gray-200 hover:border-emerald-300"
                        }`}
                      >
                        <RadioGroupItem value={product.id} id={product.id} className="sr-only" />
                        <Label htmlFor={product.id} className="flex items-start cursor-pointer">
                          <div className="w-16 h-16 relative shrink-0 rounded overflow-hidden mr-4">
                            <Image
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <div className="font-medium">{product.name}</div>
                              <div className="font-bold text-emerald-700">
                                ${price.toFixed(2)}
                                {selectedFrequency === "annual" ? "/year" : "/month"}
                              </div>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{product.description}</p>
                            {selectedFrequency === "annual" && (
                              <p className="text-sm text-gray-500 mt-1">${monthlyPrice}/month billed annually</p>
                            )}
                          </div>
                        </Label>
                      </div>
                    )
                  })}
                </RadioGroup>
              </div>

              <div className="mt-8 flex justify-end">
                <Button className="bg-emerald-700 hover:bg-emerald-800" onClick={handleContinue}>
                  Continue to Payment
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-6">Payment Details</h2>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Billing Information</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <input
                          id="firstName"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                          defaultValue={user.name.split(" ")[0]}
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <input
                          id="lastName"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                          defaultValue={user.name.split(" ")[1] || ""}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <input
                        id="email"
                        type="email"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                        defaultValue={user.email}
                      />
                    </div>
                    <div>
                      <Label htmlFor="address">Address</Label>
                      <input
                        id="address"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="city">City</Label>
                        <input
                          id="city"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                        />
                      </div>
                      <div>
                        <Label htmlFor="postalCode">Postal Code</Label>
                        <input
                          id="postalCode"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="country">Country</Label>
                      <select
                        id="country"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                      >
                        <option>United States</option>
                        <option>Canada</option>
                        <option>Mexico</option>
                      </select>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold mt-8 mb-4">Payment Method</h3>
                  <div className="border rounded-lg p-4 mb-4">
                    <div className="flex items-center">
                      <CreditCard className="h-5 w-5 text-gray-500 mr-2" />
                      <span className="font-medium">Credit Card</span>
                    </div>
                    <div className="mt-4 space-y-4">
                      <div>
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <input
                          id="cardNumber"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                          placeholder="1234 5678 9012 3456"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiryDate">Expiry Date</Label>
                          <input
                            id="expiryDate"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                            placeholder="MM/YY"
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV</Label>
                          <input
                            id="cvv"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                            placeholder="123"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle>Subscription Details</CardTitle>
                      <CardDescription>
                        {selectedFrequency === "annual" ? "Annual" : "Monthly"} subscription
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-3">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 relative shrink-0 rounded overflow-hidden">
                          <Image
                            src={products[selectedProduct].image || "/placeholder.svg"}
                            alt={products[selectedProduct].name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-medium">{products[selectedProduct].name}</div>
                          <div className="text-sm text-gray-500">{products[selectedProduct].description}</div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Subscription Plan</span>
                          <span>
                            {selectedFrequency === "annual" ? "Annual" : "Monthly"}
                            {selectedFrequency === "annual" && " (20% off)"}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Base Price</span>
                          <span>
                            ${products[selectedProduct].price.toFixed(2)}
                            {selectedFrequency === "monthly" ? "/month" : " × 12 months"}
                          </span>
                        </div>
                        {selectedFrequency === "annual" && (
                          <div className="flex justify-between text-sm text-emerald-700">
                            <span>Annual Discount</span>
                            <span>-${(products[selectedProduct].price * 0.2 * 12).toFixed(2)}</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="border-t pt-3">
                      <div className="w-full">
                        <div className="flex justify-between font-bold">
                          <span>Total</span>
                          <span className="text-emerald-700">
                            ${selectedProductPrice.toFixed(2)}
                            {selectedFrequency === "annual" ? "/year" : "/month"}
                          </span>
                        </div>
                        {monthlyEquivalent && (
                          <div className="text-sm text-gray-500 text-right mt-1">
                            ${monthlyEquivalent}/month billed annually
                          </div>
                        )}
                      </div>
                    </CardFooter>
                  </Card>

                  <div className="mt-6 text-sm text-gray-500">
                    <p>
                      By subscribing, you agree to our{" "}
                      <Link href="#" className="text-emerald-700 hover:underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="#" className="text-emerald-700 hover:underline">
                        Privacy Policy
                      </Link>
                      .
                    </p>
                    <p className="mt-2">You can cancel your subscription at any time from your account settings.</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-between">
                <Button variant="outline" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button className="bg-emerald-700 hover:bg-emerald-800" onClick={handleContinue}>
                  Complete Subscription
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="border-t py-6 md:py-8 bg-white">
        <div className="container flex flex-col gap-4 px-4 md:px-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-emerald-700">Vitalis</span>
              <span className="text-xs align-top">®</span>
            </div>
            <nav className="flex gap-4 sm:gap-6">
              <Link href="#" className="text-xs hover:underline underline-offset-4">
                Terms
              </Link>
              <Link href="#" className="text-xs hover:underline underline-offset-4">
                Privacy
              </Link>
              <Link href="#" className="text-xs hover:underline underline-offset-4">
                Contact
              </Link>
            </nav>
          </div>
          <div className="text-xs text-gray-500">© {new Date().getFullYear()} Vitalis. All rights reserved.</div>
        </div>
      </footer>
    </div>
  )
}
