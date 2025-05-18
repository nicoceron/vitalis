"use client";

// Use edge runtime to reduce serverless function count
export const runtime = "edge";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site-header";
import { ArrowRight, Check } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cartContext";
import { useRouter } from "next/navigation";

export default function DistributorFortifyPage() {
  const [packageSize, setPackageSize] = useState("10-pack");
  const { addToCart } = useCart();
  const router = useRouter();

  const handleAddToCart = () => {
    // Get price per unit and total based on selected package size
    let pricePerUnit, total;
    switch (packageSize) {
      case "10-pack":
        pricePerUnit = 66.9;
        total = 669;
        break;
      case "30-pack":
        pricePerUnit = 63.9;
        total = 1917;
        break;
      case "60-pack":
        pricePerUnit = 61.9;
        total = 3714;
        break;
      default:
        pricePerUnit = 66.9;
        total = 669;
    }

    // Create the item object based on selected package size
    const item = {
      id: `fortify-distributor-${packageSize}`,
      name: "Vitalis Fortify (Distributor)",
      description: `${packageSize} package`,
      price: total,
      quantity: 1,
      image: "/placeholder.svg?height=80&width=80",
      type: `Distributor ${packageSize} ($${pricePerUnit.toFixed(2)} per unit)`,
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
              <Link href="/buy/distributor" className="hover:underline">
                Distributor
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
                Vitalis Fortify is specially formulated to support metabolic
                health, blood sugar balance, and immune system function. Ideal
                for clients focused on metabolic wellness and overall health
                resilience.
              </p>

              <h3 className="font-medium text-lg mb-2">Selling Points:</h3>
              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <span className="mr-2 text-emerald-700">
                    <Check size={14} />
                  </span>
                  Blood sugar support
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="mr-2 text-emerald-700">
                    <Check size={14} />
                  </span>
                  Immune system health
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="mr-2 text-emerald-700">
                    <Check size={14} />
                  </span>
                  Metabolic balance
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="mr-2 text-emerald-700">
                    <Check size={14} />
                  </span>
                  Energy regulation
                </div>
              </div>

              <h3 className="font-medium text-lg mb-2">Key Ingredients:</h3>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center text-sm text-gray-600">
                  <span className="mr-2 text-emerald-700">•</span>
                  Cinnamon Extract
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="mr-2 text-emerald-700">•</span>
                  Berberine
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="mr-2 text-emerald-700">•</span>
                  Chromium Picolinate
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="mr-2 text-emerald-700">•</span>
                  Alpha Lipoic Acid
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="mr-2 text-emerald-700">•</span>
                  Elderberry
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="mr-2 text-emerald-700">•</span>
                  Zinc
                </div>
              </div>
            </div>

            {/* Package Size Options */}
            <h2 className="font-bold text-xl mb-4">Select Package Size:</h2>
            <div className="space-y-4 mb-8">
              {/* 10-Pack Option */}
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
                    <h3 className="text-lg font-bold text-gray-900">10-Pack</h3>
                    <p className="text-gray-900 font-medium mt-1">
                      $66.90 per unit ($669 total)
                    </p>
                    <p className="text-gray-600 text-sm mt-1">
                      Starter package for new distributors. Ideal for testing
                      market response.
                    </p>
                  </div>
                </div>
              </div>

              {/* 30-Pack Option */}
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
                        30-Pack
                      </h3>
                      <span className="bg-emerald-100 text-emerald-800 text-xs font-medium px-2 py-1 rounded">
                        POPULAR
                      </span>
                    </div>
                    <p className="text-gray-900 font-medium mt-1">
                      $63.90 per unit ($1,917 total)
                    </p>
                    <p className="text-gray-600 text-sm mt-1">
                      Our most popular distributor package. Balanced inventory
                      for established sellers.
                    </p>
                  </div>
                </div>
              </div>

              {/* 60-Pack Option */}
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
                        60-Pack
                      </h3>
                      <span className="bg-amber-100 text-amber-800 text-xs font-medium px-2 py-1 rounded">
                        BEST VALUE
                      </span>
                    </div>
                    <p className="text-gray-900 font-medium mt-1">
                      $61.90 per unit ($3,714 total)
                    </p>
                    <p className="text-gray-600 text-sm mt-1">
                      Maximum value for high-volume distributors. Our best
                      per-unit pricing.
                    </p>
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
