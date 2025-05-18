"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { useState } from "react";

// Use edge runtime to reduce serverless function count
export const runtime = "edge";

export default function IngredientsPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1 bg-white">
        <section className="container px-4 md:px-6 py-12 pt-24 pb-0">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-tighter mb-12 md:mb-16 max-w-4xl">
            Tropical superfruits selected for maximum nutrition
          </h1>

          <div className="max-w-3xl mb-12">
            <p className="text-lg md:text-xl font-light">
              We don't think you should settle for ordinary supplements when it
              comes to your daily nutrition. Vitalis ingredients are{" "}
              <span className="underline decoration-emerald-500 decoration-2">
                sourced from quality partners
              </span>{" "}
              in Colombia and Costa Rica for bioavailability, potency, and
              nutrient density to deliver the Tropical Superfood Nutrition your
              body deserves.*
            </p>
          </div>

          <Link href="/research">
            <Button className="bg-emerald-700 hover:bg-emerald-800 mb-8">
              See Supplement Facts <span className="ml-2">→</span>
            </Button>
          </Link>

          <div className="flex flex-wrap gap-2 mb-12">
            <button
              className={`px-4 py-2 rounded-md hover:bg-gray-300 transition-colors ${
                activeFilter === "all" ? "bg-gray-200" : "bg-white border"
              }`}
              onClick={() => setActiveFilter("all")}
            >
              View All
            </button>
            <button
              className={`px-4 py-2 rounded-md hover:bg-gray-300 transition-colors ${
                activeFilter === "colombian" ? "bg-gray-200" : "bg-white border"
              }`}
              onClick={() => setActiveFilter("colombian")}
            >
              Colombian Fruits
            </button>
            <button
              className={`px-4 py-2 rounded-md hover:bg-gray-300 transition-colors ${
                activeFilter === "costaRican"
                  ? "bg-gray-200"
                  : "bg-white border"
              }`}
              onClick={() => setActiveFilter("costaRican")}
            >
              Costa Rican Fruits
            </button>
          </div>
        </section>

        <section className="bg-gray-50 py-8">
          <div className="container px-4 md:px-6">
            {(activeFilter === "all" || activeFilter === "colombian") && (
              <>
                <h2 className="text-3xl font-bold mb-8">Colombian Fruits</h2>
                <div className="grid md:grid-cols-2 gap-8 mb-16">
                  <div className="bg-white p-6 rounded-lg shadow-sm flex gap-6">
                    <div className="w-24 h-24 relative shrink-0">
                      <Image
                        src="/goldenberry.jpeg?height=100&width=100"
                        alt="Golden Berry"
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">
                        Golden Berry
                      </h3>
                      <p className="text-gray-700">
                        These small, golden fruits are exceptionally high in
                        antioxidants, vitamins A and C, and support eye health
                        and immune function.
                      </p>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-sm flex gap-6">
                    <div className="w-24 h-24 relative shrink-0">
                      <Image
                        src="/orange.jpeg?height=100&width=100"
                        alt="Orange"
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Orange</h3>
                      <p className="text-gray-700">
                        Rich in vitamin C and antioxidants, orange supports
                        immune function and skin health. Our oranges are sourced
                        from the fertile regions of Colombia.
                      </p>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-sm flex gap-6">
                    <div className="w-24 h-24 relative shrink-0">
                      <Image
                        src="/loquat.jpeg?height=100&width=100"
                        alt="Loquat"
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Loquat</h3>
                      <p className="text-gray-700">
                        This sweet fruit is high in vitamin A, potassium, and
                        manganese. Our loquat is harvested from sustainable
                        farms in the Colombian highlands.
                      </p>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-sm flex gap-6">
                    <div className="w-24 h-24 relative shrink-0">
                      <Image
                        src="/annatto.jpeg?height=100&width=100"
                        alt="Annatto"
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Annatto</h3>
                      <p className="text-gray-700">
                        A natural source of carotenoids and tocotrienols,
                        annatto supports eye health and provides powerful
                        antioxidant protection.
                      </p>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-sm flex gap-6">
                    <div className="w-24 h-24 relative shrink-0">
                      <Image
                        src="/chia.jpeg?height=100&width=100"
                        alt="Chia Seeds"
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Chia Seeds</h3>
                      <p className="text-gray-700">
                        Rich in omega-3 fatty acids, fiber, and protein, chia
                        seeds support heart health, digestion, and provide
                        sustained energy throughout the day.
                      </p>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-sm flex gap-6">
                    <div className="w-24 h-24 relative shrink-0">
                      <Image
                        src="/sesame.jpeg?height=100&width=100"
                        alt="Sesame Seeds"
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">
                        Sesame Seeds
                      </h3>
                      <p className="text-gray-700">
                        High in healthy fats, protein, and antioxidants, sesame
                        seeds support heart health, reduce inflammation, and
                        provide a rich source of minerals including calcium and
                        zinc.
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}

            {(activeFilter === "all" || activeFilter === "costaRican") && (
              <>
                <h2 className="text-3xl font-bold mb-8">Costa Rican Fruits</h2>
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div className="bg-white p-6 rounded-lg shadow-sm flex gap-6">
                    <div className="w-24 h-24 relative shrink-0">
                      <Image
                        src="/starfruit.jpeg?height=100&width=100"
                        alt="Star Fruit"
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Star Fruit</h3>
                      <p className="text-gray-700">
                        Rich in vitamin C, antioxidants, and fiber, star fruit
                        supports digestive health and immune function. Our star
                        fruit is grown in the tropical regions of Costa Rica.
                      </p>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-sm flex gap-6">
                    <div className="w-24 h-24 relative shrink-0">
                      <Image
                        src="/cocoa.jpeg?height=100&width=100"
                        alt="Cocoa"
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Cocoa</h3>
                      <p className="text-gray-700">
                        High in flavanols and antioxidants, cacao supports
                        cardiovascular health, brain function, and mood. Our
                        cacao is sustainably grown in Costa Rica's rich volcanic
                        soils.
                      </p>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-sm flex gap-6">
                    <div className="w-24 h-24 relative shrink-0">
                      <Image
                        src="/ginger.jpeg?height=100&width=100"
                        alt="Ginger"
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Ginger</h3>
                      <p className="text-gray-700">
                        With potent anti-inflammatory and digestive properties,
                        ginger supports overall wellness and helps reduce
                        oxidative stress.
                      </p>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-sm flex gap-6">
                    <div className="w-24 h-24 relative shrink-0">
                      <Image
                        src="/moringa.jpeg?height=100&width=100"
                        alt="Moringa"
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Moringa</h3>
                      <p className="text-gray-700">
                        Often called the "miracle tree," moringa is packed with
                        vitamins, minerals, and amino acids that support energy,
                        vitality, and metabolic health.
                      </p>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-sm flex gap-6">
                    <div className="w-24 h-24 relative shrink-0">
                      <Image
                        src="/cinnamon.jpeg?height=100&width=100"
                        alt="Cinnamon"
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Cinnamon</h3>
                      <p className="text-gray-700">
                        Supports blood sugar balance and provides
                        anti-inflammatory benefits. Our cinnamon is sourced from
                        sustainable farms in Costa Rica.
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </section>

        <section className="py-16 md:py-24 bg-white">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div className="pr-0 lg:pr-6">
                <div className="text-sm uppercase font-medium text-emerald-700 mb-2">
                  QUALITY SOURCING
                </div>
                <h2 className="text-4xl md:text-5xl font-normal tracking-tighter mb-8">
                  Farm to Label
                </h2>
                <div className="space-y-6">
                  <p className="text-lg font-light">
                    Our farmers in Colombia and Costa Rica are paid premium
                    rates, often 30-40% above market prices, ensuring they can
                    invest in sustainable practices and provide for their
                    communities.
                  </p>
                  <p className="text-lg font-light">
                    We visit our partner farms regularly to establish direct
                    relationships, understand their needs, and ensure ethical
                    working conditions. This farm-to-label transparency allows
                    us to create products with integrity from the soil to your
                    daily nutrition.
                  </p>

                  <div className="flex flex-col space-y-3 mt-6">
                    <div className="bg-emerald-50/70 p-3 pl-5 rounded-lg">
                      <h3 className="font-medium text-emerald-800">
                        Sustainable Farming
                      </h3>
                      <p className="text-sm text-gray-700">
                        All our partner farms use organic practices that protect
                        local ecosystems.
                      </p>
                    </div>

                    <div className="bg-emerald-50/70 p-3 pl-5 rounded-lg">
                      <h3 className="font-medium text-emerald-800">
                        Fair Compensation
                      </h3>
                      <p className="text-sm text-gray-700">
                        We pay premium rates to ensure farmers receive fair
                        compensation.
                      </p>
                    </div>

                    <div className="bg-emerald-50/70 p-3 pl-5 rounded-lg">
                      <h3 className="font-medium text-emerald-800">
                        Community Investment
                      </h3>
                      <p className="text-sm text-gray-700">
                        A portion of profits is reinvested in farming
                        communities.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col space-y-4">
                <div className="aspect-video w-full relative rounded-lg overflow-hidden">
                  <Image
                    src="/farm_1.jpeg"
                    alt="Orange orchards in Colombia"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="aspect-square relative rounded-lg overflow-hidden">
                    <Image
                      src="/farm_3.jpg"
                      alt="Farmers harvesting golden berries"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="aspect-square relative rounded-lg overflow-hidden">
                    <Image
                      src="/farm_2.jpeg"
                      alt="Cacao farm in Costa Rica"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
