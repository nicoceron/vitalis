import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Chatbot } from "@/components/chatbot";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen relative transform-none filter-none perspective-none">
      <SiteHeader />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 bg-white">
          <div className="container grid md:grid-cols-2 gap-8 px-4 md:px-6">
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-xl aspect-square">
                <video
                  src="/Video_Ready_Here_s_the_Link.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="object-cover rounded-lg w-full h-full"
                />
              </div>
            </div>
            <div className="flex flex-col justify-center space-y-4">
              <h1 className="text-4xl md:text-8xl lg:text-8xl font-normal tracking-tighter">
                Natural Vitality
                <br />
              </h1>
              <p className="text-lg md:text-xl text-gray-700 font-light  ">
                Vitalis is a daily superfood powder packed with nutrient-rich
                fruits from Colombia and Costa Rica to boost your energy,
                support your immune system, and enhance your overall wellbeing.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button asChild>
                  <Link
                    href="/buy"
                    className="bg-emerald-700 hover:bg-emerald-800 text-white px-8 py-6 text-lg"
                  >
                    Buy Now <span className="ml-2">→</span>
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link
                    href="/research"
                    className="border-emerald-700 text-emerald-700 hover:bg-emerald-50 px-8 py-6 text-lg"
                  >
                    Learn More
                  </Link>
                </Button>
              </div>
              <div className="flex items-center pt-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-emerald-700"
                >
                  <path d="M5 12l5 5l10 -10"></path>
                </svg>
                <span className="ml-2 text-sm">
                  90-day money back guarantee
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-emerald-100 p-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-emerald-700"
                  >
                    <path d="M12 2L2 7l10 5l10-5-10-5z"></path>
                    <path d="M2 17l10 5l10-5"></path>
                    <path d="M2 12l10 5l10-5"></path>
                  </svg>
                </div>
                <div>
                  <h3
                    className="font-extralight"
                    style={{ fontSize: "1.25rem" }}
                  >
                    100% Natural, Organic Ingredients
                  </h3>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-emerald-100 p-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-emerald-700"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 16v-4"></path>
                    <path d="M12 8h.01"></path>
                  </svg>
                </div>
                <div>
                  <h3
                    className="font-extralight"
                    style={{ fontSize: "1.25rem" }}
                  >
                    Supports natural energy & vitality*
                  </h3>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-emerald-100 p-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-emerald-700"
                  >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                  </svg>
                </div>
                <div>
                  <h3
                    className="font-extralight"
                    style={{ fontSize: "1.25rem" }}
                  >
                    Sustainably sourced from tropical farms
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 bg-white">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-normal tracking-tighter md:text-4xl">
                The Vitalis Difference
              </h2>
              <p className="mt-4 text-gray-700 md:text-lg">
                What makes our tropical superfood blend unique
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="w-full aspect-square relative mb-4 overflow-hidden rounded-lg">
                  <Image
                    src="/colfruit_landing.jpeg?height=300&width=300"
                    alt="Colombian fruits"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-normal">Colombian Superfruits</h3>
                <p className="mt-2 text-gray-700">
                  Packed with exotic fruits like lulo, guanabana, and açaí for
                  antioxidant power.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-full aspect-square relative mb-4 overflow-hidden rounded-lg">
                  <Image
                    src="/cosfruit_landing.jpeg?height=300&width=300"
                    alt="Costa Rican fruits"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-normal">Costa Rican Vitality</h3>
                <p className="mt-2 text-gray-700">
                  Featuring nutrient-dense pitahaya, guava, and papaya to
                  support immune health.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-full aspect-square relative mb-4 overflow-hidden rounded-lg">
                  <Image
                    src="/smoothies.jpeg?height=300&width=300"
                    alt="Powder supplement"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-normal">Easy Daily Ritual</h3>
                <p className="mt-2 text-gray-700">
                  Just one scoop in water or your favorite smoothie delivers a
                  full spectrum of nutrients.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 bg-emerald-50">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-normal tracking-tighter md:text-4xl">
                  Transform Your Daily Routine
                </h2>
                <p className="mt-4 text-gray-700 md:text-lg">
                  Vitalis makes it easy to get the nutrients your body craves.
                  Our proprietary blend of tropical superfruits is carefully
                  harvested at peak ripeness and gently processed to preserve
                  all the natural goodness.
                </p>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-start gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-emerald-700 h-5 w-5 shrink-0"
                    >
                      <path d="M5 12l5 5l10 -10"></path>
                    </svg>
                    <span>Supports natural energy levels without caffeine</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-emerald-700 h-5 w-5 shrink-0"
                    >
                      <path d="M5 12l5 5l10 -10"></path>
                    </svg>
                    <span>Enhances digestive health with natural enzymes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-emerald-700 h-5 w-5 shrink-0"
                    >
                      <path d="M5 12l5 5l10 -10"></path>
                    </svg>
                    <span>
                      Provides essential vitamins and minerals from whole food
                      sources
                    </span>
                  </li>
                </ul>
                <div className="mt-8">
                  <Button asChild>
                    <Link
                      href="/buy"
                      className="bg-emerald-700 hover:bg-emerald-800 text-white px-8 py-6 text-lg"
                    >
                      Try Vitalis Today
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square w-full relative rounded-lg overflow-hidden">
                  <video
                    src="/Video_Ready_Asian_Woman.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
      <Chatbot />
    </div>
  );
}
