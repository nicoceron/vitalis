"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site-header";
import { ArrowRight, Check } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCart } from "@/lib/cartContext";

export default function CheckoutPage() {
  const [step, setStep] = useState("shipping"); // shipping, payment, confirmation
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [shippingMethod, setShippingMethod] = useState("standard");
  const { cartItems, subtotal, itemCount } = useCart();

  // Calculate order summary
  const shipping = shippingMethod === "express" ? 12.95 : 0;
  const tax = Math.round(subtotal * 0.08 * 100) / 100; // 8% tax
  const total = subtotal + shipping + tax;

  // Render shipping step
  const renderShippingStep = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Shipping Information</h2>

      <div className="bg-white rounded-lg p-6 border">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="firstName">First Name</Label>
            <Input id="firstName" placeholder="First name" className="mt-1" />
          </div>
          <div>
            <Label htmlFor="lastName">Last Name</Label>
            <Input id="lastName" placeholder="Last name" className="mt-1" />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="Email address"
              className="mt-1"
            />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="address">Street Address</Label>
            <Input id="address" placeholder="Street address" className="mt-1" />
          </div>
          <div>
            <Label htmlFor="city">City</Label>
            <Input id="city" placeholder="City" className="mt-1" />
          </div>
          <div>
            <Label htmlFor="state">State</Label>
            <Input id="state" placeholder="State" className="mt-1" />
          </div>
          <div>
            <Label htmlFor="zip">ZIP Code</Label>
            <Input id="zip" placeholder="ZIP code" className="mt-1" />
          </div>
          <div>
            <Label htmlFor="country">Country</Label>
            <Input
              id="country"
              placeholder="Country"
              defaultValue="United States"
              className="mt-1"
            />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" placeholder="Phone number" className="mt-1" />
          </div>
        </div>

        <div className="mt-8">
          <h3 className="font-medium mb-3">Shipping Method</h3>
          <RadioGroup
            value={shippingMethod}
            onValueChange={setShippingMethod}
            className="space-y-3"
          >
            <div className="flex items-center justify-between border rounded-lg p-4">
              <div className="flex items-center">
                <RadioGroupItem value="standard" id="standard" />
                <Label htmlFor="standard" className="ml-2 cursor-pointer">
                  <div className="font-medium">Standard Shipping (Free)</div>
                  <div className="text-sm text-gray-500">
                    Delivery in 5-7 business days
                  </div>
                </Label>
              </div>
              <div className="font-medium">$0.00</div>
            </div>
            <div className="flex items-center justify-between border rounded-lg p-4">
              <div className="flex items-center">
                <RadioGroupItem value="express" id="express" />
                <Label htmlFor="express" className="ml-2 cursor-pointer">
                  <div className="font-medium">Express Shipping</div>
                  <div className="text-sm text-gray-500">
                    Delivery in 1-3 business days
                  </div>
                </Label>
              </div>
              <div className="font-medium">$12.95</div>
            </div>
          </RadioGroup>
        </div>
      </div>

      {renderOrderSummary()}

      <div className="mt-8 flex space-x-4">
        <Button variant="outline" className="w-1/3">
          <Link href="/cart">Back to Cart</Link>
        </Button>
        <Button
          onClick={() => setStep("payment")}
          className="w-2/3 bg-emerald-800 hover:bg-emerald-900 text-white py-6 flex items-center justify-center"
        >
          Continue to Payment{" "}
          <span className="ml-2">
            <ArrowRight size={20} />
          </span>
        </Button>
      </div>
    </div>
  );

  // Render payment step
  const renderPaymentStep = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Payment Method</h2>

      <div className="bg-white rounded-lg p-6 border">
        <RadioGroup
          value={paymentMethod}
          onValueChange={setPaymentMethod}
          className="space-y-3"
        >
          <div className="flex items-center border rounded-lg p-4">
            <RadioGroupItem value="credit-card" id="credit-card" />
            <Label htmlFor="credit-card" className="ml-2 cursor-pointer">
              <div className="font-medium">Credit / Debit Card</div>
            </Label>
          </div>
          <div className="flex items-center border rounded-lg p-4">
            <RadioGroupItem value="paypal" id="paypal" />
            <Label htmlFor="paypal" className="ml-2 cursor-pointer">
              <div className="font-medium">PayPal</div>
            </Label>
          </div>
          <div className="flex items-center border rounded-lg p-4">
            <RadioGroupItem value="apple-pay" id="apple-pay" />
            <Label htmlFor="apple-pay" className="ml-2 cursor-pointer">
              <div className="font-medium">Apple Pay</div>
            </Label>
          </div>
        </RadioGroup>

        {paymentMethod === "credit-card" && (
          <div className="mt-6 space-y-4">
            <div>
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                className="mt-1"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiry">Expiration Date</Label>
                <Input id="expiry" placeholder="MM/YY" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="cvc">CVC</Label>
                <Input id="cvc" placeholder="123" className="mt-1" />
              </div>
            </div>
            <div>
              <Label htmlFor="nameOnCard">Name on Card</Label>
              <Input
                id="nameOnCard"
                placeholder="Name on card"
                className="mt-1"
              />
            </div>
          </div>
        )}
      </div>

      {renderOrderSummary()}

      <div className="mt-8 flex space-x-4">
        <Button
          onClick={() => setStep("shipping")}
          variant="outline"
          className="w-1/3"
        >
          Back
        </Button>
        <Button
          onClick={() => setStep("confirmation")}
          className="w-2/3 bg-emerald-800 hover:bg-emerald-900 text-white py-6 flex items-center justify-center"
        >
          Complete Purchase{" "}
          <span className="ml-2">
            <ArrowRight size={20} />
          </span>
        </Button>
      </div>
    </div>
  );

  // Render confirmation step
  const renderConfirmationStep = () => (
    <div className="bg-white rounded-lg p-8 border text-center">
      <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <Check className="w-8 h-8 text-emerald-700" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Order Confirmed!
      </h2>
      <p className="text-gray-600 mb-6">
        Thank you for your purchase. We've sent a confirmation to your email.
      </p>
      <div className="bg-emerald-50 rounded-lg p-4 mb-8 max-w-md mx-auto">
        <p className="text-emerald-800 font-medium">
          Order #VT-{Math.floor(100000 + Math.random() * 900000)}
        </p>
      </div>
      <div className="space-y-4">
        <Button asChild className="w-full bg-emerald-800 hover:bg-emerald-900">
          <Link href="/account/orders">View My Orders</Link>
        </Button>
        <Button asChild variant="outline" className="w-full">
          <Link href="/">Return to Home</Link>
        </Button>
      </div>
    </div>
  );

  // Render order summary
  const renderOrderSummary = () => (
    <div
      className={`bg-white rounded-lg p-6 border ${
        step === "shipping" ? "sticky top-8" : ""
      }`}
    >
      <h3 className="font-medium mb-4">Order Summary</h3>
      <div className="space-y-4 mb-4">
        {cartItems.map((item) => (
          <div key={item.id} className="flex items-start">
            <div className="w-12 h-12 relative flex-shrink-0">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover rounded"
              />
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-900">{item.name}</p>
              <p className="text-xs text-gray-500">{item.type}</p>
              <div className="flex justify-between text-sm mt-1">
                <span>Qty: {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="border-t pt-4 space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Subtotal ({itemCount} items)</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
        </div>
        <div className="flex justify-between">
          <span>Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold text-base pt-2 border-t mt-2">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );

  // Render current step
  const renderCurrentStep = () => {
    switch (step) {
      case "shipping":
        return renderShippingStep();
      case "payment":
        return renderPaymentStep();
      case "confirmation":
        return renderConfirmationStep();
      default:
        return renderShippingStep();
    }
  };

  // If cart is empty, redirect to cart page
  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col min-h-screen">
        <SiteHeader />
        <main className="flex-1 bg-[#f8f8f6] p-6 md:p-12">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg p-12 text-center border">
              <h2 className="text-xl font-medium text-gray-900 mb-4">
                Your cart is empty
              </h2>
              <p className="text-gray-500 mb-8">
                Please add some products to your cart before checking out.
              </p>
              <Button asChild>
                <Link
                  href="/buy"
                  className="bg-emerald-700 hover:bg-emerald-800 text-white py-2 px-6"
                >
                  Browse Products
                </Link>
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1 bg-[#f8f8f6] p-6 md:p-12">
        <div className="max-w-4xl mx-auto">
          {/* Checkout steps progress */}
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-1 mb-4">
              <div className="flex items-center">
                <div
                  className={`rounded-full w-8 h-8 flex items-center justify-center ${
                    step === "shipping" ||
                    step === "payment" ||
                    step === "confirmation"
                      ? "bg-emerald-700 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  1
                </div>
                <span className="ml-2 text-sm font-medium">Shipping</span>
              </div>
              <div className="w-12 h-1 bg-gray-200">
                <div
                  className={`h-full bg-emerald-700 ${
                    step === "payment" || step === "confirmation"
                      ? "w-full"
                      : "w-0"
                  }`}
                ></div>
              </div>
              <div className="flex items-center">
                <div
                  className={`rounded-full w-8 h-8 flex items-center justify-center ${
                    step === "payment" || step === "confirmation"
                      ? "bg-emerald-700 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  2
                </div>
                <span className="ml-2 text-sm font-medium">Payment</span>
              </div>
              <div className="w-12 h-1 bg-gray-200">
                <div
                  className={`h-full bg-emerald-700 ${
                    step === "confirmation" ? "w-full" : "w-0"
                  }`}
                ></div>
              </div>
              <div className="flex items-center">
                <div
                  className={`rounded-full w-8 h-8 flex items-center justify-center ${
                    step === "confirmation"
                      ? "bg-emerald-700 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  3
                </div>
                <span className="ml-2 text-sm font-medium">Confirmation</span>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">{renderCurrentStep()}</div>
            <div className="md:col-span-1">
              {step !== "confirmation" && renderOrderSummary()}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
