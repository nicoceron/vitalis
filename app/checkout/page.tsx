"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SiteHeader } from "@/components/site-header";
import { useCart } from "@/lib/cartContext";
import { createAddress, AddressInput } from "@/api/saveAddressInfo";
import { createSubscription } from "@/api/createSubscription";
import { createShipping } from "@/api/createShipping";
import { createPayment } from "@/api/createPayment";

type Step = "shipping" | "payment" | "confirmation";

export default function CheckoutPage() {
  const [step, setStep] = useState<Step>("shipping");
  const [shippingMethod, setShippingMethod] = useState<"standard" | "express">("standard");
  const [paymentMethod, setPaymentMethod] = useState<"credit-card" | "paypal" | "apple-pay">("credit-card");
  const [loading, setLoading] = useState(false);

  // Address info state
  const [addressInfo, setAddressInfo] = useState<AddressInput>({
    first_name: "",
    last_name:  "",
    email:      "",
    street:     "",
    city:       "",
    state:      "",
    zip:        "",
    country:    "",
    phone:      "",
  });

  // Credit-card fields
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");
  const [orderNumber, setOrderNumber] = useState<string>("");

  const { cartItems, subtotal, itemCount, clearCart } = useCart();
  const shippingCost = shippingMethod === "express" ? 12.95 : 0;
  const tax = Math.round((subtotal + shippingCost) * 0.08 * 100) / 100;
  const total = subtotal + shippingCost + tax;
  let lastPlanType: string | null = null;

const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {

  let digits = e.target.value.replace(/\D/g, "");

  if (digits.length > 4) digits = digits.slice(0, 4);

  if (digits.length > 2) {
    digits = digits.slice(0, 2) + "/" + digits.slice(2);
  }

  setExpiry(digits);
};

const handleCompletePurchase = async () => {
  setLoading(true);
  try {
    // 1) Guardar la dirección
    const addressId = await createAddress(addressInfo);

    // 2) Generar y guardar un orderNumber único
    const num = `VT-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderNumber(num);

    const productTypeMap = {
      "Vitalis Vision":          "vision",
      "Vitalis Neuro":           "neuro",
      "Vitalis Fortify":         "fortify",
      "Vitalis Complete Bundle": "complete",
    };

    // 3) Por cada ítem: crear suscripción, envío y pago
    for (const item of cartItems) {
      // 3a) Crear suscripción
      const subscriptionId = await createSubscription({
        address_id:   addressId,
        plan_type:    item.type,
        product_type: productTypeMap[item.name as keyof typeof productTypeMap],
      });

      // 3b) Agendar envío
      await createShipping({
        subscription_id: subscriptionId,
        address_id:      addressId,
        tracking_number: num,
      });

      // 3c) Registrar el pago
      await createPayment({
        subscription_id: subscriptionId,
        amount:          item.price * item.quantity,
        status:          "SUCCESS",
        transaction_id:  num,               
      });
    }

    // 4) Limpiar carrito y pasar a confirmación
    lastPlanType = cartItems[0].type;
    console.log("Last plan type:", lastPlanType);
    clearCart();

    setStep("confirmation");
  } catch (err) {
    console.error("Error completing purchase:", err);
  } finally {
    setLoading(false);
  }
};


  const renderOrderSummary = () => (
    <div className="bg-white rounded-lg p-6 border">
      <h3 className="font-medium mb-4">Order Summary</h3>
      <div className="space-y-4 mb-4">
        {cartItems.map((item) => (
          <div key={item.id} className="flex items-start">
            <Image
              src={item.image}
              alt={item.name}
              width={48}
              height={48}
              className="rounded"
            />
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium">{item.name}</p>
              <p className="text-xs text-gray-500">
                {(item as any).purchaseType === "subscription"
                  ? "Monthly Subscription"
                  : "One-time Purchase"}
              </p>
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
          <span>{shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`}</span>
        </div>
        <div className="flex justify-between">
          <span>Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold pt-2 border-t">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );

  const renderShippingStep = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Shipping Information</h2>
      <div className="bg-white rounded-lg p-6 border">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First Name */}
          <div>
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              value={addressInfo.first_name}
              onChange={(e) =>
                setAddressInfo({ ...addressInfo, first_name: e.target.value })
              }
              placeholder="First name"
              className="mt-1"
            />
          </div>
          {/* Last Name */}
          <div>
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              value={addressInfo.last_name}
              onChange={(e) =>
                setAddressInfo({ ...addressInfo, last_name: e.target.value })
              }
              placeholder="Last name"
              className="mt-1"
            />
          </div>
          {/* Email */}
          <div className="md:col-span-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={addressInfo.email}
              onChange={(e) =>
                setAddressInfo({ ...addressInfo, email: e.target.value })
              }
              placeholder="Email address"
              className="mt-1"
            />
          </div>
          {/* Street */}
          <div className="md:col-span-2">
            <Label htmlFor="street">Street Address</Label>
            <Input
              id="street"
              value={addressInfo.street}
              onChange={(e) =>
                setAddressInfo({ ...addressInfo, street: e.target.value })
              }
              placeholder="Street address"
              className="mt-1"
            />
          </div>
          {/* City */}
          <div>
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              value={addressInfo.city}
              onChange={(e) =>
                setAddressInfo({ ...addressInfo, city: e.target.value })
              }
              placeholder="City"
              className="mt-1"
            />
          </div>
          {/* State */}
          <div>
            <Label htmlFor="state">State</Label>
            <Input
              id="state"
              value={addressInfo.state}
              onChange={(e) =>
                setAddressInfo({ ...addressInfo, state: e.target.value })
              }
              placeholder="State"
              className="mt-1"
            />
          </div>
          {/* ZIP Code */}
          <div>
            <Label htmlFor="zip">ZIP Code</Label>
            <Input
              id="zip"
              value={addressInfo.zip}
              onChange={(e) =>
                setAddressInfo({ ...addressInfo, zip: e.target.value })
              }
              placeholder="ZIP code"
              className="mt-1"
            />
          </div>
          {/* Country */}
          <div>
            <Label htmlFor="country">Country</Label>
            <Input
              id="country"
              value={addressInfo.country}
              onChange={(e) =>
                setAddressInfo({ ...addressInfo, country: e.target.value })
              }
              className="mt-1"
            />
          </div>
          {/* Phone */}
          <div className="md:col-span-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              value={addressInfo.phone}
              onChange={(e) =>
                setAddressInfo({ ...addressInfo, phone: e.target.value })
              }
              placeholder="Phone number"
              className="mt-1"
            />
          </div>
        </div>

        <div className="mt-8">
          <h3 className="font-medium mb-3">Shipping Method</h3>
          <RadioGroup
            value={shippingMethod}
            onValueChange={(v) => setShippingMethod(v as "standard" | "express")}
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
          className="w-2/3 bg-emerald-800 text-white"
        >
          Continue to Payment <ArrowRight className="inline ml-2" />
        </Button>
      </div>
    </div>
  );

  const renderPaymentStep = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Payment Method</h2>
      <div className="bg-white rounded-lg p-6 border">
        <RadioGroup
          value={paymentMethod}
          onValueChange={(v) =>
            setPaymentMethod(v as "credit-card" | "paypal" | "apple-pay")
          }
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
            {/* Card Number */}
            <div>
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                className="mt-1"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
              />
            </div>
            {/* Expiry & CVC */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiry">Expiration Date</Label>
                <Input
                  id="expiry"
                  placeholder="MM/YY"
                  className="mt-1"
                  value={expiry}
                  onChange={handleExpiryChange}
                  maxLength={5}
                />
              </div>
              <div>
                <Label htmlFor="cvc">CVC</Label>
                <Input
                  id="cvc"
                  placeholder="123"
                  className="mt-1"
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value)}
                />
              </div>
            </div>
            {/* Name on Card */}
            <div>
              <Label htmlFor="nameOnCard">Name on Card</Label>
              <Input
                id="nameOnCard"
                placeholder="Name on card"
                className="mt-1"
                value={nameOnCard}
                onChange={(e) => setNameOnCard(e.target.value)}
              />
            </div>
          </div>
        )}
      </div>

      {renderOrderSummary()}

      <div className="mt-8 flex space-x-4">
        <Button variant="outline" className="w-1/3" onClick={() => setStep("shipping")}>
          Back
        </Button>
        <Button
          onClick={handleCompletePurchase}
          disabled={loading}
          className="w-2/3 bg-emerald-800 text-white"
        >
          {loading ? "Processing…" : "Complete Purchase"} <ArrowRight className="inline ml-2" />
        </Button>
      </div>
    </div>
  );

  const renderConfirmationStep = () => (
    <div className="bg-white rounded-lg p-8 border text-center">
      <Check className="mx-auto mb-4 text-emerald-700 w-8 h-8" />
      <h2 className="text-2xl font-bold mb-2">Order Confirmed!</h2>
      <p className="text-gray-600 mb-6">
        Thank you! A confirmation email has been sent.
      </p>
      <div className="bg-emerald-50 rounded-lg p-4 mb-8 max-w-md mx-auto">
        <p className="text-emerald-800 font-medium">
          Order #{orderNumber}
        </p>
      </div>
      <div className="space-y-4">
          <Button asChild className="w-full bg-emerald-800 text-white">
            <Link
              href={
                lastPlanType === "Monthly Subscription"
                  ? "/account/subscriptions"
                  : "/account/payments"
              }
            >
              {lastPlanType === "Monthly Subscription"
                ? "View My Subscriptions"
                : "View My Payments"}
            </Link>
          </Button>
        <Button asChild variant="outline" className="w-full">
          <Link href="/">Return to Home</Link>
        </Button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1 bg-[#f8f8f6] p-6 md:p-12">
        <div className="max-w-4xl mx-auto">
          {/* Progress Indicator */}
          <div className="mb-8 flex items-center justify-center space-x-1">
            {["shipping", "payment", "confirmation"].map((lbl, i) => (
              <React.Fragment key={lbl}>
                <div className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step === lbl ? "bg-emerald-700 text-white" : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {i + 1}
                  </div>
                  <span className="ml-2 text-sm font-medium">
                    {lbl.charAt(0).toUpperCase() + lbl.slice(1)}
                  </span>
                </div>
                {i < 2 && (
                  <div className="w-12 h-1 bg-gray-200">
                    <div
                      className={`h-full bg-emerald-700 ${
                        i < ["shipping","payment","confirmation"].indexOf(step)
                          ? "w-full"
                          : "w-0"
                      }`}
                    />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              {step === "shipping"
                ? renderShippingStep()
                : step === "payment"
                ? renderPaymentStep()
                : renderConfirmationStep()}
            </div>
            <div className="md:col-span-1">{renderOrderSummary()}</div>
          </div>
        </div>
      </main>
    </div>
  );
}
