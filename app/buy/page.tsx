"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site-header";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

export default function BuyPage() {
  const [selectedOption, setSelectedOption] = useState("individual");

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1 bg-[#f8f8f6] flex">
        {/* Left side - Product Image */}
        <div className="hidden md:block w-1/2 relative">
          <div className="absolute inset-0">
            <Image
              src="/buy_1.jpeg?height=800&width=700"
              alt="Vitalis product with measuring spoon"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Right side - Selection Options */}
        <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-center">
          <div className="max-w-md mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Get your <span className="text-emerald-700">Vitalis</span>
            </h1>

            <div className="my-8">
              <p className="text-gray-700 uppercase font-medium text-sm mb-2">
                CHOOSE YOUR OPTION:
              </p>
              <div className="bg-emerald-500/20 h-2 rounded-full mb-1">
                <div className="bg-emerald-500 h-full rounded-full w-1/2"></div>
              </div>
              <p className="text-xs text-gray-500">1 of 3</p>
            </div>

            {/* Options */}
            <div className="space-y-4">
              {/* Individual Option */}
              <div
                className="border rounded-lg p-6 bg-white cursor-pointer hover:border-emerald-700 transition-colors"
                onClick={() => setSelectedOption("individual")}
              >
                <div className="flex items-start">
                  <div className="mr-3">
                    <div
                      className={`w-5 h-5 rounded-full border-2 ${
                        selectedOption === "individual"
                          ? "border-emerald-700"
                          : "border-gray-300"
                      } flex items-center justify-center`}
                    >
                      {selectedOption === "individual" && (
                        <div className="w-3 h-3 rounded-full bg-emerald-700"></div>
                      )}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-gray-900">
                      For Individuals
                    </h2>
                    <p className="flex items-center text-gray-900 font-medium mt-1">
                      Starting at $79 USD{" "}
                      <span className="ml-1">
                        <ArrowRight size={16} />
                      </span>
                    </p>
                    <p className="text-gray-600 text-sm mt-2">
                      One 30-serving pouch for your home. Ease and consistency
                      in your daily routine.
                    </p>
                  </div>
                </div>
              </div>

              {/* Distributor Option */}
              <div
                className="border rounded-lg p-6 bg-white cursor-pointer hover:border-emerald-700 transition-colors"
                onClick={() => setSelectedOption("distributor")}
              >
                <div className="flex items-start">
                  <div className="mr-3">
                    <div
                      className={`w-5 h-5 rounded-full border-2 ${
                        selectedOption === "distributor"
                          ? "border-emerald-700"
                          : "border-gray-300"
                      } flex items-center justify-center`}
                    >
                      {selectedOption === "distributor" && (
                        <div className="w-3 h-3 rounded-full bg-emerald-700"></div>
                      )}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-gray-900">
                      For Distributors
                    </h2>
                    <p className="flex items-center text-gray-900 font-medium mt-1">
                      Starting at $59 USD{" "}
                      <span className="ml-1">
                        <ArrowRight size={16} />
                      </span>
                    </p>
                    <p className="text-gray-600 text-sm mt-2">
                      Bulk packages for wholesale distribution. Special pricing
                      and promotional materials included.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Next Button */}
            <div className="mt-8">
              <Button asChild>
                <Link
                  href={`/buy/${selectedOption}`}
                  className="w-full bg-emerald-800 hover:bg-emerald-900 text-white py-6 flex items-center justify-center"
                >
                  Next{" "}
                  <span className="ml-2">
                    <ArrowRight size={20} />
                  </span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
