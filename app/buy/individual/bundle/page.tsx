"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site-header";
import { ArrowRight, Check } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function BundleProductPage() {
  const [purchaseOption, setPurchaseOption] = useState("one-time");

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1 bg-[#f8f8f6] flex">
        {/* Left side - Product Image */}
        <div className="hidden md:block w-1/2 relative">
          <div className="absolute inset-0">
            <Image
              src="/placeholder.svg?height=800&width=700"
              alt="Vitalis Complete Bundle"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Right side - Purchase Options */}
        <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-center">
          <div className="max-w-md mx-auto">
            <div className="flex items-center text-sm text-emerald-700 mb-4">
              <Link
                href="/buy/individual"
                className="hover:underline flex items-center"
              >
                <span className="mr-1 transform rotate-180">
                  <ArrowRight size={16} />
                </span>
                <span>Back</span>
              </Link>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Get your <span className="text-emerald-700">Vitalis</span>
            </h1>

            <div className="my-8">
              <p className="text-gray-700 uppercase font-medium text-sm mb-2">
                CHOOSE YOUR OPTION:
              </p>
              <div className="bg-emerald-500/20 h-2 rounded-full mb-1">
                <div className="bg-emerald-500 h-full rounded-full w-full"></div>
              </div>
              <p className="text-xs text-gray-500">3 of 3</p>
            </div>

            <div className="bg-white p-5 rounded-lg mb-6">
              <div className="flex justify-between items-center mb-3">
                <h2 className="font-bold text-lg">Vitalis Complete Bundle</h2>
                <span className="bg-amber-100 text-amber-800 text-xs font-medium px-2 py-1 rounded">
                  SAVE 20% ($54)
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                All three formulas: Vision, Neuro, and Fortify in one convenient
                package with comprehensive wellness benefits.
              </p>

              <div className="mt-2 grid grid-cols-2 gap-2">
                <div className="flex items-center text-sm text-gray-600">
                  <span className="mr-2 text-emerald-700">
                    <Check size={14} />
                  </span>
                  Complete wellness
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="mr-2 text-emerald-700">
                    <Check size={14} />
                  </span>
                  Free shipping
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="mr-2 text-emerald-700">
                    <Check size={14} />
                  </span>
                  90-day guarantee
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="mr-2 text-emerald-700">
                    <Check size={14} />
                  </span>
                  Synergistic benefits
                </div>
              </div>
            </div>

            {/* Purchase Options - stacked vertically */}
            <div className="space-y-4">
              <div className="bg-emerald-700 text-white py-2 px-3 rounded-t-lg text-center font-medium text-sm">
                Most Popular
              </div>
              {/* One-time Purchase Option */}
              <div
                className={`border rounded-lg p-4 bg-white cursor-pointer hover:border-emerald-700 transition-colors ${
                  purchaseOption === "one-time"
                    ? "border-emerald-700 ring-1 ring-emerald-700"
                    : ""
                }`}
                onClick={() => setPurchaseOption("one-time")}
              >
                <div className="flex items-center">
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
                    <div className="flex justify-between items-center">
                      <h3 className="font-bold text-gray-900">
                        One-time Purchase
                      </h3>
                      <div>
                        <span className="font-bold">$199 USD</span>
                        <span className="text-gray-500 line-through text-sm ml-1">
                          $253
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      Try all formulas once. Free shipping included.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-amber-700 text-white py-2 px-3 rounded-t-lg text-center font-medium text-sm mt-6">
                Best Value
              </div>
              {/* Subscription Option */}
              <div
                className={`border rounded-lg p-4 bg-white cursor-pointer hover:border-emerald-700 transition-colors ${
                  purchaseOption === "subscription"
                    ? "border-emerald-700 ring-1 ring-emerald-700"
                    : ""
                }`}
                onClick={() => setPurchaseOption("subscription")}
              >
                <div className="flex items-center">
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
                    <div className="flex justify-between items-center">
                      <h3 className="font-bold text-gray-900">
                        Monthly Subscription
                      </h3>
                      <div>
                        <span className="font-bold">$169 USD</span>
                        <span className="text-gray-500 line-through text-sm ml-1">
                          $253
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      Monthly delivery, cancel anytime. Free shipping.
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-center text-xs text-gray-500 mt-2">
                * Value of one-time purchase
              </p>

              {/* Add to Cart Button */}
              <div className="mt-8">
                <Button asChild>
                  <Link
                    href="/checkout"
                    className="w-full bg-emerald-800 hover:bg-emerald-900 text-white py-6 flex items-center justify-center"
                  >
                    Add to Cart
                    <span className="ml-2">
                      <ArrowRight size={20} />
                    </span>
                  </Link>
                </Button>
                <p className="text-center text-xs text-gray-500 mt-4">
                  By proceeding, you agree to our Terms of Service and Privacy
                  Policy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
