"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site-header";
import { ArrowRight, Check } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cartContext";
import { useRouter } from "next/navigation";

export default function FortifyProductPage() {
  const [purchaseOption, setPurchaseOption] = useState("one-time");
  const { addToCart } = useCart();
  const router = useRouter();

  const handleAddToCart = () => {
    // Create the item object based on selected purchase option
    const item = {
      id:
        "fortify-" +
        (purchaseOption === "one-time" ? "single" : "subscription"),
      name: "Vitalis Fortify",
      description: "30-day supply",
      price: purchaseOption === "one-time" ? 85 : 72,
      quantity: 1,
      image: "/placeholder.svg?height=80&width=80",
      type:
        purchaseOption === "one-time"
          ? "One-time purchase"
          : "Monthly Subscription",
    };

    // Add to cart and navigate to cart page
    addToCart(item);
    router.push("/cart");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1 bg-[#f8f8f6] flex">
        {/* Left side - Product Image */}
        <div className="hidden md:block w-1/2 relative">
          <div className="absolute inset-0">
            <Image
              src="/fortify.jpeg"
              alt="Vitalis Fortify product"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Right side - Selection Options */}
        <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-center">
          <div className="max-w-md mx-auto">
            <div className="flex items-center text-sm text-emerald-700 mb-4">
              <Link href="/buy" className="hover:underline">
                Buy
              </Link>
              <span className="mx-2">/</span>
              <Link href="/buy/individual" className="hover:underline">
                Individual
              </Link>
              <span className="mx-2">/</span>
              <span>Fortify</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Vitalis <span className="text-emerald-700">Fortify</span>
            </h1>

            <div className="my-6">
              <div className="bg-emerald-500/20 h-2 rounded-full mb-1">
                <div className="bg-emerald-500 h-full rounded-full w-full"></div>
              </div>
              <p className="text-xs text-gray-500">3 of 3</p>
            </div>

            <div className="bg-white p-5 rounded-lg mb-8">
              <h2 className="font-bold text-xl mb-3">Product Description</h2>
              <p className="text-gray-600 mb-4">
                Vitalis Fortify is our specialized formula aiding metabolic
                balance, providing nutrient density, and reinforcing the body's
                natural defenses. Perfect for those seeking to support their
                overall metabolic health.
              </p>

              <h3 className="font-medium text-lg mb-2">Key Benefits:</h3>
              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <span className="mr-2 text-emerald-700">
                    <Check size={14} />
                  </span>
                  Blood sugar balance
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="mr-2 text-emerald-700">
                    <Check size={14} />
                  </span>
                  Immune support
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="mr-2 text-emerald-700">
                    <Check size={14} />
                  </span>
                  Essential vitamins
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="mr-2 text-emerald-700">
                    <Check size={14} />
                  </span>
                  Antioxidant action
                </div>
              </div>

              <h3 className="font-medium text-lg mb-2">Key Ingredients:</h3>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center text-sm text-gray-600">
                  <span className="mr-2 text-emerald-700">•</span>
                  Golden Berry
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="mr-2 text-emerald-700">•</span>
                  Cinnamon
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="mr-2 text-emerald-700">•</span>
                  Loquat
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="mr-2 text-emerald-700">•</span>
                  Chia Seeds
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="mr-2 text-emerald-700">•</span>
                  Moringa
                </div>
              </div>
            </div>

            {/* Purchase Options */}
            <h2 className="font-bold text-xl mb-4">Choose Purchase Option:</h2>
            <div className="space-y-4 mb-8">
              {/* One-time Purchase Option */}
              <div
                className={`border rounded-lg p-5 bg-white cursor-pointer hover:border-emerald-700 transition-colors ${
                  purchaseOption === "one-time"
                    ? "border-emerald-700 ring-1 ring-emerald-700"
                    : ""
                }`}
                onClick={() => setPurchaseOption("one-time")}
              >
                <div className="flex items-start">
                  <div className="mr-3">
                    <div
                      className={`w-5 h-5 rounded-full border-2 ${
                        purchaseOption === "one-time"
                          ? "border-emerald-700"
                          : "border-gray-300"
                      } flex items-center justify-center`}
                    >
                      {purchaseOption === "one-time" && (
                        <div className="w-3 h-3 rounded-full bg-emerald-700"></div>
                      )}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900">
                      One-time Purchase
                    </h3>
                    <p className="text-gray-900 font-medium mt-1">$85 USD</p>
                    <p className="text-gray-600 text-sm mt-1">
                      Try a single pouch with no subscription. Free shipping on
                      orders over $100.
                    </p>
                  </div>
                </div>
              </div>

              {/* Subscription Option */}
              <div
                className={`border rounded-lg p-5 bg-white cursor-pointer hover:border-emerald-700 transition-colors ${
                  purchaseOption === "subscription"
                    ? "border-emerald-700 ring-1 ring-emerald-700"
                    : ""
                }`}
                onClick={() => setPurchaseOption("subscription")}
              >
                <div className="flex items-start">
                  <div className="mr-3">
                    <div
                      className={`w-5 h-5 rounded-full border-2 ${
                        purchaseOption === "subscription"
                          ? "border-emerald-700"
                          : "border-gray-300"
                      } flex items-center justify-center`}
                    >
                      {purchaseOption === "subscription" && (
                        <div className="w-3 h-3 rounded-full bg-emerald-700"></div>
                      )}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="text-lg font-bold text-gray-900">
                        Monthly Subscription
                      </h3>
                      <span className="bg-emerald-100 text-emerald-800 text-xs font-medium px-2 py-1 rounded">
                        SAVE 15%
                      </span>
                    </div>
                    <p className="text-gray-900 font-medium mt-1">
                      $72 USD / month
                    </p>
                    <p className="text-gray-600 text-sm mt-1">
                      Get a fresh pouch delivered monthly and save. Free
                      shipping included.
                    </p>
                    <ul className="mt-3 space-y-1">
                      <li className="flex items-center text-sm text-gray-600">
                        <span className="mr-2 text-emerald-700">
                          <Check size={14} />
                        </span>
                        Cancel anytime
                      </li>
                      <li className="flex items-center text-sm text-gray-600">
                        <span className="mr-2 text-emerald-700">
                          <Check size={14} />
                        </span>
                        Free shipping
                      </li>
                      <li className="flex items-center text-sm text-gray-600">
                        <span className="mr-2 text-emerald-700">
                          <Check size={14} />
                        </span>
                        Exclusive subscriber benefits
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Add to Cart Button */}
            <div className="mt-8">
              <button
                onClick={handleAddToCart}
                className="w-full bg-emerald-800 hover:bg-emerald-900 text-white py-6 px-4 rounded-md flex items-center justify-center"
              >
                Add to Cart{" "}
                <span className="ml-2">
                  <ArrowRight size={20} />
                </span>
              </button>
              <p className="text-center text-xs text-gray-500 mt-4">
                By proceeding, you agree to our Terms of Service and Privacy
                Policy.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
