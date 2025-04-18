import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"

export default function IngredientsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1 bg-white">
        <section className="container px-4 md:px-6 py-12 md:py-24">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-12 md:mb-16 max-w-4xl">
            Tropical superfruits selected for maximum nutrition
          </h1>

          <div className="flex flex-wrap gap-2 mb-12">
            <button className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors">View All</button>
            <button className="px-4 py-2 bg-white border rounded-md hover:bg-gray-100 transition-colors">
              Colombian Fruits
            </button>
            <button className="px-4 py-2 bg-white border rounded-md hover:bg-gray-100 transition-colors">
              Costa Rican Fruits
            </button>
          </div>

          <div className="max-w-3xl mb-12">
            <p className="text-lg md:text-xl">
              We don't think you should settle for ordinary supplements when it comes to your daily nutrition. Vitalis
              ingredients are{" "}
              <span className="underline decoration-emerald-500 decoration-2">sourced from quality partners</span> in
              Colombia and Costa Rica for bioavailability, potency, and nutrient density to deliver the Tropical
              Superfood Nutrition your body deserves.*
            </p>
          </div>

          <Button className="bg-emerald-700 hover:bg-emerald-800 mb-16">
            See Supplement Facts <span className="ml-2">→</span>
          </Button>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            <div className="aspect-square relative rounded-md overflow-hidden bg-emerald-50">
              <Image src="/placeholder.svg?height=300&width=300" alt="Açaí berries" fill className="object-cover" />
            </div>
            <div className="aspect-square relative rounded-md overflow-hidden bg-emerald-50">
              <Image src="/placeholder.svg?height=300&width=300" alt="Guanabana fruit" fill className="object-cover" />
            </div>
            <div className="aspect-square relative rounded-md overflow-hidden bg-emerald-50">
              <Image
                src="/placeholder.svg?height=300&width=300"
                alt="Pitahaya (Dragon fruit)"
                fill
                className="object-cover"
              />
            </div>
            <div className="aspect-square relative rounded-md overflow-hidden bg-emerald-50">
              <Image src="/placeholder.svg?height=300&width=300" alt="Lulo fruit" fill className="object-cover" />
            </div>
            <div className="aspect-square relative rounded-md overflow-hidden bg-emerald-50">
              <Image src="/placeholder.svg?height=300&width=300" alt="Guava" fill className="object-cover" />
            </div>
            <div className="aspect-square relative rounded-md overflow-hidden bg-emerald-50">
              <Image src="/placeholder.svg?height=300&width=300" alt="Papaya" fill className="object-cover" />
            </div>
          </div>
        </section>

        <section className="bg-gray-50 py-16">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold mb-8">Colombian Fruits</h2>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <div className="bg-white p-6 rounded-lg shadow-sm flex gap-6">
                <div className="w-24 h-24 relative shrink-0">
                  <Image
                    src="/placeholder.svg?height=100&width=100"
                    alt="Açaí berries"
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Açaí Berries</h3>
                  <p className="text-gray-700">
                    Rich in antioxidants and heart-healthy fats, açaí berries support immune function and cellular
                    health. Our açaí is sustainably harvested from the Amazon region of Colombia.
                  </p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm flex gap-6">
                <div className="w-24 h-24 relative shrink-0">
                  <Image
                    src="/placeholder.svg?height=100&width=100"
                    alt="Guanabana"
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Guanabana (Soursop)</h3>
                  <p className="text-gray-700">
                    Known for its unique flavor and nutrient profile, guanabana contains vitamin C, B vitamins, and
                    compounds that support overall wellness and vitality.
                  </p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm flex gap-6">
                <div className="w-24 h-24 relative shrink-0">
                  <Image
                    src="/placeholder.svg?height=100&width=100"
                    alt="Lulo"
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Lulo (Naranjilla)</h3>
                  <p className="text-gray-700">
                    This citrus-like fruit is packed with vitamin C and antioxidants. Our lulo is sourced from
                    high-altitude farms in the Colombian Andes for maximum nutrient density.
                  </p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm flex gap-6">
                <div className="w-24 h-24 relative shrink-0">
                  <Image
                    src="/placeholder.svg?height=100&width=100"
                    alt="Goldenberry"
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Goldenberry (Uchuva)</h3>
                  <p className="text-gray-700">
                    These small, golden fruits are exceptionally high in antioxidants, vitamins A and C, and support eye
                    health and immune function.
                  </p>
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-bold mb-8">Costa Rican Fruits</h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm flex gap-6">
                <div className="w-24 h-24 relative shrink-0">
                  <Image
                    src="/placeholder.svg?height=100&width=100"
                    alt="Pitahaya"
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Pitahaya (Dragon Fruit)</h3>
                  <p className="text-gray-700">
                    This vibrant superfruit contains prebiotic fiber, magnesium, and iron. Our pitahaya is grown in the
                    fertile volcanic soils of Costa Rica for optimal nutrient content.
                  </p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm flex gap-6">
                <div className="w-24 h-24 relative shrink-0">
                  <Image
                    src="/placeholder.svg?height=100&width=100"
                    alt="Guava"
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Guava</h3>
                  <p className="text-gray-700">
                    With more vitamin C than oranges, guava also provides dietary fiber, potassium, and lycopene to
                    support heart health and digestion.
                  </p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm flex gap-6">
                <div className="w-24 h-24 relative shrink-0">
                  <Image
                    src="/placeholder.svg?height=100&width=100"
                    alt="Papaya"
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Papaya</h3>
                  <p className="text-gray-700">
                    Rich in papain enzyme, papaya aids digestion and provides vitamins A, C, and E for skin health and
                    immune support.
                  </p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm flex gap-6">
                <div className="w-24 h-24 relative shrink-0">
                  <Image
                    src="/placeholder.svg?height=100&width=100"
                    alt="Pineapple"
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Pineapple</h3>
                  <p className="text-gray-700">
                    Contains bromelain enzyme that supports protein digestion and reduces inflammation. Our pineapples
                    are grown in the perfect climate of Costa Rica's central valley.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="container px-4 md:px-6 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Our Sourcing Promise</h2>
            <p className="text-lg mb-8">
              We partner directly with small-scale farmers in Colombia and Costa Rica to ensure sustainable growing
              practices, fair compensation, and the highest quality fruits harvested at peak ripeness.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              <div className="bg-emerald-50 p-6 rounded-lg">
                <h3 className="font-semibold mb-2">Sustainable Farming</h3>
                <p>
                  All our partner farms use organic practices and sustainable farming methods that protect local
                  ecosystems.
                </p>
              </div>

              <div className="bg-emerald-50 p-6 rounded-lg">
                <h3 className="font-semibold mb-2">Gentle Processing</h3>
                <p>
                  Our fruits are carefully dried at low temperatures to preserve nutrients, enzymes, and natural
                  flavors.
                </p>
              </div>

              <div className="bg-emerald-50 p-6 rounded-lg">
                <h3 className="font-semibold mb-2">Third-Party Testing</h3>
                <p>Every batch is tested for purity, potency, and safety by independent laboratories.</p>
              </div>
            </div>
          </div>
        </section>
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
          <div className="text-xs text-gray-500">
            *These statements have not been evaluated by the Food and Drug Administration. This product is not intended
            to diagnose, treat, cure, or prevent any disease.
          </div>
          <div className="text-xs text-gray-500">© {new Date().getFullYear()} Vitalis. All rights reserved.</div>
        </div>
      </footer>
    </div>
  )
}
