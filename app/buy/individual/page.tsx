"use client";

// Use edge runtime to reduce serverless function count
export const runtime = "edge";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site-header";
import { ArrowRight, Check } from "lucide-react";
import { useState } from "react";

export default function IndividualBuyPage() {
  const [selectedProduct, setSelectedProduct] = useState("vision");

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1 bg-[#f8f8f6] flex">
        {/* Left side - Product Image */}
        <div className="hidden md:block w-1/2 relative">
          <div className="absolute inset-0">
            <Image
              src="/shop2.jpeg"
              alt="Vitalis individual package"
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
              <Link href="/buy" className="hover:underline flex items-center">
                <span className="mr-1 transform rotate-180">
                  <ArrowRight size={16} />
                </span>
                <span>Back</span>
              </Link>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Choose Your <span className="text-emerald-700">Product</span>
            </h1>

            <div className="my-8">
              <p className="text-gray-700 uppercase font-medium text-sm mb-2">
                SELECT A FORMULA:
              </p>
              <div className="bg-emerald-500/20 h-2 rounded-full mb-1">
                <div className="bg-emerald-500 h-full rounded-full w-3/4"></div>
              </div>
              <p className="text-xs text-gray-500">2 of 3</p>
            </div>

            {/* Options - Single column */}
            <div className="space-y-4">
              {/* Vision Product */}
              <div
                className={`border rounded-lg p-4 bg-white cursor-pointer hover:border-emerald-700 transition-colors ${
                  selectedProduct === "vision"
                    ? "border-emerald-700 ring-1 ring-emerald-700"
                    : ""
                }`}
                onClick={() => setSelectedProduct("vision")}
              >
                <div className="flex items-start">
                  <div className="mr-3 mt-0.5">
                    <div
                      className={`w-5 h-5 rounded-full border-2 ${
                        selectedProduct === "vision"
                          ? "border-emerald-700"
                          : "border-gray-300"
                      } flex items-center justify-center`}
                    >
                      {selectedProduct === "vision" && (
                        <div className="w-3 h-3 rounded-full bg-emerald-700"></div>
                      )}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <h2 className="text-lg font-bold text-gray-900">
                        Vitalis Vision
                      </h2>
                      <span className="bg-emerald-100 text-emerald-800 text-xs font-medium px-2 py-1 rounded">
                        POPULAR
                      </span>
                    </div>
                    <p className="text-gray-900 font-medium mt-1">$79 USD</p>
                    <p className="text-gray-600 text-sm mt-1">
                      Foundational support for eye health and digestion.
                    </p>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <span className="mr-2 text-emerald-700">
                          <Check size={14} />
                        </span>
                        Supports vision
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <span className="mr-2 text-emerald-700">
                          <Check size={14} />
                        </span>
                        Antioxidant defense
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Neuro Product */}
              <div
                className={`border rounded-lg p-4 bg-white cursor-pointer hover:border-emerald-700 transition-colors ${
                  selectedProduct === "neuro"
                    ? "border-emerald-700 ring-1 ring-emerald-700"
                    : ""
                }`}
                onClick={() => setSelectedProduct("neuro")}
              >
                <div className="flex items-start">
                  <div className="mr-3 mt-0.5">
                    <div
                      className={`w-5 h-5 rounded-full border-2 ${
                        selectedProduct === "neuro"
                          ? "border-emerald-700"
                          : "border-gray-300"
                      } flex items-center justify-center`}
                    >
                      {selectedProduct === "neuro" && (
                        <div className="w-3 h-3 rounded-full bg-emerald-700"></div>
                      )}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-lg font-bold text-gray-900">
                      Vitalis Neuro
                    </h2>
                    <p className="text-gray-900 font-medium mt-1">$89 USD</p>
                    <p className="text-gray-600 text-sm mt-1">
                      Enhanced formula for heart and cognitive support.
                    </p>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <span className="mr-2 text-emerald-700">
                          <Check size={14} />
                        </span>
                        Heart health
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <span className="mr-2 text-emerald-700">
                          <Check size={14} />
                        </span>
                        Brain function
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Fortify Product */}
              <div
                className={`border rounded-lg p-4 bg-white cursor-pointer hover:border-emerald-700 transition-colors ${
                  selectedProduct === "fortify"
                    ? "border-emerald-700 ring-1 ring-emerald-700"
                    : ""
                }`}
                onClick={() => setSelectedProduct("fortify")}
              >
                <div className="flex items-start">
                  <div className="mr-3 mt-0.5">
                    <div
                      className={`w-5 h-5 rounded-full border-2 ${
                        selectedProduct === "fortify"
                          ? "border-emerald-700"
                          : "border-gray-300"
                      } flex items-center justify-center`}
                    >
                      {selectedProduct === "fortify" && (
                        <div className="w-3 h-3 rounded-full bg-emerald-700"></div>
                      )}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-lg font-bold text-gray-900">
                      Vitalis Fortify
                    </h2>
                    <p className="text-gray-900 font-medium mt-1">$85 USD</p>
                    <p className="text-gray-600 text-sm mt-1">
                      Metabolic balance and immune system support.
                    </p>
                    <div className="mt-2 grid grid-cols-2 gap-2">
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
                    </div>
                  </div>
                </div>
              </div>

              {/* Bundle Option - All 3 Products */}
              <div
                className={`border rounded-lg p-4 bg-white cursor-pointer hover:border-emerald-700 transition-colors ${
                  selectedProduct === "bundle"
                    ? "border-emerald-700 ring-1 ring-emerald-700"
                    : ""
                }`}
                onClick={() => setSelectedProduct("bundle")}
              >
                <div className="flex items-start">
                  <div className="mr-3 mt-0.5">
                    <div
                      className={`w-5 h-5 rounded-full border-2 ${
                        selectedProduct === "bundle"
                          ? "border-emerald-700"
                          : "border-gray-300"
                      } flex items-center justify-center`}
                    >
                      {selectedProduct === "bundle" && (
                        <div className="w-3 h-3 rounded-full bg-emerald-700"></div>
                      )}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <h2 className="text-lg font-bold text-gray-900">
                        Vitalis Complete Bundle
                      </h2>
                      <span className="bg-amber-100 text-amber-800 text-xs font-medium px-2 py-1 rounded">
                        SAVE 20%
                      </span>
                    </div>
                    <p className="text-gray-900 font-medium mt-1">$199 USD</p>
                    <p className="text-gray-600 text-sm mt-1">
                      Get all three formulas for complete wellness.
                    </p>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <span className="mr-2 text-emerald-700">
                          <Check size={14} />
                        </span>
                        Complete coverage
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <span className="mr-2 text-emerald-700">
                          <Check size={14} />
                        </span>
                        Save $54
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Next Button */}
            <div className="mt-8">
              <Button asChild>
                <Link
                  href={`/buy/individual/${selectedProduct}`}
                  className="w-full bg-emerald-800 hover:bg-emerald-900 text-white py-6 flex items-center justify-center"
                >
                  Continue{" "}
                  <span className="ml-2">
                    <ArrowRight size={20} />
                  </span>
                </Link>
              </Button>
              <p className="text-center text-xs text-gray-500 mt-4">
                You'll be able to choose one-time purchase or subscription on
                the next page.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
