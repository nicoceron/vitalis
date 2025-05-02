"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site-header";
import { ArrowRight, Check } from "lucide-react";
import { useState } from "react";

export default function DistributorBundlePage() {
  const [packageSize, setPackageSize] = useState("10-pack");

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1 bg-[#f8f8f6] flex">
        {/* Left side - Product Image */}
        <div className="hidden md:block w-1/2 relative">
          <div className="absolute inset-0">
            <Image
              src="/placeholder.svg?height=800&width=700"
              alt="Vitalis Variety Pack bulk packages"
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
              <Link href="/buy/distributor" className="hover:underline">
                Distributor
              </Link>
              <span className="mx-2">/</span>
              <span>Variety Pack</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Vitalis <span className="text-emerald-700">Variety Pack</span>
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
                The Vitalis Variety Pack includes all three Vitalis formulas –
                Vision, Neuro, and Fortify. This balanced assortment allows you
                to introduce your customers to the complete Vitalis product line
                and determine which products resonate best with your market.
              </p>

              <h3 className="font-medium text-lg mb-2">What's Included:</h3>
              <div className="space-y-3 mb-4">
                <div className="flex items-start text-sm text-gray-600">
                  <span className="mr-2 text-emerald-700 mt-0.5">•</span>
                  <div>
                    <span className="font-medium">Vitalis Vision:</span> Eye
                    health, antioxidant protection, and digestive support
                  </div>
                </div>
                <div className="flex items-start text-sm text-gray-600">
                  <span className="mr-2 text-emerald-700 mt-0.5">•</span>
                  <div>
                    <span className="font-medium">Vitalis Neuro:</span> Brain
                    function, cognitive performance, and cardiovascular support
                  </div>
                </div>
                <div className="flex items-start text-sm text-gray-600">
                  <span className="mr-2 text-emerald-700 mt-0.5">•</span>
                  <div>
                    <span className="font-medium">Vitalis Fortify:</span>{" "}
                    Metabolic health, blood sugar balance, and immune system
                    support
                  </div>
                </div>
              </div>

              <h3 className="font-medium text-lg mb-2">
                Distributor Benefits:
              </h3>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center text-sm text-gray-600">
                  <span className="mr-2 text-emerald-700">
                    <Check size={14} />
                  </span>
                  15% bundle discount
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="mr-2 text-emerald-700">
                    <Check size={14} />
                  </span>
                  Test market response
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="mr-2 text-emerald-700">
                    <Check size={14} />
                  </span>
                  Complete product offering
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="mr-2 text-emerald-700">
                    <Check size={14} />
                  </span>
                  Free shipping
                </div>
              </div>
            </div>

            {/* Package Size Options */}
            <h2 className="font-bold text-xl mb-4">Select Package Size:</h2>
            <div className="space-y-4 mb-8">
              {/* Small Variety Pack */}
              <div
                className={`border rounded-lg p-5 bg-white cursor-pointer hover:border-emerald-700 transition-colors ${
                  packageSize === "10-pack"
                    ? "border-emerald-700 ring-1 ring-emerald-700"
                    : ""
                }`}
                onClick={() => setPackageSize("10-pack")}
              >
                <div className="flex items-start">
                  <div className="mr-3">
                    <div
                      className={`w-5 h-5 rounded-full border-2 ${
                        packageSize === "10-pack"
                          ? "border-emerald-700"
                          : "border-gray-300"
                      } flex items-center justify-center`}
                    >
                      {packageSize === "10-pack" && (
                        <div className="w-3 h-3 rounded-full bg-emerald-700"></div>
                      )}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900">
                      Small Variety Pack
                    </h3>
                    <p className="text-gray-900 font-medium mt-1">
                      $158 per set (10 of each product - $4,740 total)
                    </p>
                    <p className="text-gray-600 text-sm mt-1">
                      Includes 10 units each of Vision, Neuro, and Fortify (30
                      total units). Ideal starter package for new distributors.
                    </p>
                  </div>
                </div>
              </div>

              {/* Medium Variety Pack */}
              <div
                className={`border rounded-lg p-5 bg-white cursor-pointer hover:border-emerald-700 transition-colors ${
                  packageSize === "30-pack"
                    ? "border-emerald-700 ring-1 ring-emerald-700"
                    : ""
                }`}
                onClick={() => setPackageSize("30-pack")}
              >
                <div className="flex items-start">
                  <div className="mr-3">
                    <div
                      className={`w-5 h-5 rounded-full border-2 ${
                        packageSize === "30-pack"
                          ? "border-emerald-700"
                          : "border-gray-300"
                      } flex items-center justify-center`}
                    >
                      {packageSize === "30-pack" && (
                        <div className="w-3 h-3 rounded-full bg-emerald-700"></div>
                      )}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="text-lg font-bold text-gray-900">
                        Medium Variety Pack
                      </h3>
                      <span className="bg-emerald-100 text-emerald-800 text-xs font-medium px-2 py-1 rounded">
                        POPULAR
                      </span>
                    </div>
                    <p className="text-gray-900 font-medium mt-1">
                      $155 per set (20 of each product - $9,300 total)
                    </p>
                    <p className="text-gray-600 text-sm mt-1">
                      Includes 20 units each of Vision, Neuro, and Fortify (60
                      total units). Perfect for established distributors with
                      diverse customer base.
                    </p>
                  </div>
                </div>
              </div>

              {/* Large Variety Pack */}
              <div
                className={`border rounded-lg p-5 bg-white cursor-pointer hover:border-emerald-700 transition-colors ${
                  packageSize === "60-pack"
                    ? "border-emerald-700 ring-1 ring-emerald-700"
                    : ""
                }`}
                onClick={() => setPackageSize("60-pack")}
              >
                <div className="flex items-start">
                  <div className="mr-3">
                    <div
                      className={`w-5 h-5 rounded-full border-2 ${
                        packageSize === "60-pack"
                          ? "border-emerald-700"
                          : "border-gray-300"
                      } flex items-center justify-center`}
                    >
                      {packageSize === "60-pack" && (
                        <div className="w-3 h-3 rounded-full bg-emerald-700"></div>
                      )}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="text-lg font-bold text-gray-900">
                        Large Variety Pack
                      </h3>
                      <span className="bg-amber-100 text-amber-800 text-xs font-medium px-2 py-1 rounded">
                        BEST VALUE
                      </span>
                    </div>
                    <p className="text-gray-900 font-medium mt-1">
                      $152 per set (30 of each product - $13,680 total)
                    </p>
                    <p className="text-gray-600 text-sm mt-1">
                      Includes 30 units each of Vision, Neuro, and Fortify (90
                      total units). Best value for high-volume distributors with
                      broad market reach.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Add to Cart Button */}
            <div className="mt-8">
              <Button asChild>
                <Link
                  href="/checkout"
                  className="w-full bg-emerald-800 hover:bg-emerald-900 text-white py-6 flex items-center justify-center"
                >
                  Add to Cart{" "}
                  <span className="ml-2">
                    <ArrowRight size={20} />
                  </span>
                </Link>
              </Button>
              <p className="text-center text-xs text-gray-500 mt-4">
                By proceeding, you agree to our Terms of Service, Privacy
                Policy, and Distributor Agreement.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
