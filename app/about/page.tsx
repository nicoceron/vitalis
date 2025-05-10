import Image from "next/image";
import { SiteHeader } from "@/components/site-header";
import {
  Award,
  Leaf,
  Users,
  Check,
  LineChart,
  Microscope,
  ShieldCheck,
  TestTube,
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />

      {/* Hero Section */}
      <section className="bg-emerald-50 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-center md:space-x-12">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4">
                Our Mission for{" "}
                <span className="text-emerald-700">Better Health</span>
              </h1>
              <p className="text-lg text-gray-700 mb-6">
                At Vitalis, we believe that optimal health is the foundation of
                a fulfilling life. Our journey began with a simple question: how
                can we create supplements that truly deliver on their promise?
              </p>
              <div className="flex flex-col space-y-3">
                <div className="flex items-start">
                  <div className="mt-1 mr-3 text-emerald-600">
                    <Check size={20} />
                  </div>
                  <p className="text-gray-700">
                    <strong>Science-backed formulations</strong> developed by
                    nutrition experts
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="mt-1 mr-3 text-emerald-600">
                    <Check size={20} />
                  </div>
                  <p className="text-gray-700">
                    <strong>Premium-sourced ingredients</strong> with rigorous
                    quality testing
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="mt-1 mr-3 text-emerald-600">
                    <Check size={20} />
                  </div>
                  <p className="text-gray-700">
                    <strong>Transparent practices</strong> with no hidden
                    fillers or additives
                  </p>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 relative">
              <div className="aspect-video relative rounded-lg overflow-hidden">
                <Image
                  src="/family.jpeg"
                  alt="Vitalis laboratory researchers"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-gray-700">
              These principles guide every decision we make, from product
              development to customer service.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mb-6 text-emerald-700">
                <Microscope size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Scientific Integrity
              </h3>
              <p className="text-gray-700">
                We formulate based on peer-reviewed research and clinical
                evidence, not trends or marketing hype.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mb-6 text-emerald-700">
                <Award size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Uncompromising Quality
              </h3>
              <p className="text-gray-700">
                We source the finest ingredients and conduct rigorous testing at
                every stage of production.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mb-6 text-emerald-700">
                <Leaf size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Sustainability
              </h3>
              <p className="text-gray-700">
                We're committed to environmentally responsible practices in our
                sourcing, manufacturing, and packaging.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mb-6 text-emerald-700">
                <Users size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Customer Partnership
              </h3>
              <p className="text-gray-700">
                We view our relationship with customers as a partnership in
                their health journey, providing education and support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quality Standards Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Quality Standards
            </h2>
            <p className="text-lg text-gray-700">
              We maintain the highest standards of quality and safety throughout
              our manufacturing process.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-emerald-50 p-8 rounded-lg">
              <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mb-6 text-emerald-700">
                <TestTube size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Research & Development
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="mt-1 mr-3 text-emerald-600">
                    <Check size={16} />
                  </div>
                  <p className="text-gray-700">Scientific literature review</p>
                </li>
                <li className="flex items-start">
                  <div className="mt-1 mr-3 text-emerald-600">
                    <Check size={16} />
                  </div>
                  <p className="text-gray-700">Dosage optimization</p>
                </li>
                <li className="flex items-start">
                  <div className="mt-1 mr-3 text-emerald-600">
                    <Check size={16} />
                  </div>
                  <p className="text-gray-700">Bioavailability testing</p>
                </li>
                <li className="flex items-start">
                  <div className="mt-1 mr-3 text-emerald-600">
                    <Check size={16} />
                  </div>
                  <p className="text-gray-700">Synergistic formulation</p>
                </li>
              </ul>
            </div>

            <div className="bg-emerald-50 p-8 rounded-lg">
              <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mb-6 text-emerald-700">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Quality Assurance
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="mt-1 mr-3 text-emerald-600">
                    <Check size={16} />
                  </div>
                  <p className="text-gray-700">cGMP certified facilities</p>
                </li>
                <li className="flex items-start">
                  <div className="mt-1 mr-3 text-emerald-600">
                    <Check size={16} />
                  </div>
                  <p className="text-gray-700">Third-party testing</p>
                </li>
                <li className="flex items-start">
                  <div className="mt-1 mr-3 text-emerald-600">
                    <Check size={16} />
                  </div>
                  <p className="text-gray-700">Raw material verification</p>
                </li>
                <li className="flex items-start">
                  <div className="mt-1 mr-3 text-emerald-600">
                    <Check size={16} />
                  </div>
                  <p className="text-gray-700">Purity and potency testing</p>
                </li>
              </ul>
            </div>

            <div className="bg-emerald-50 p-8 rounded-lg">
              <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mb-6 text-emerald-700">
                <LineChart size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Continuous Improvement
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="mt-1 mr-3 text-emerald-600">
                    <Check size={16} />
                  </div>
                  <p className="text-gray-700">Ongoing research reviews</p>
                </li>
                <li className="flex items-start">
                  <div className="mt-1 mr-3 text-emerald-600">
                    <Check size={16} />
                  </div>
                  <p className="text-gray-700">Customer feedback integration</p>
                </li>
                <li className="flex items-start">
                  <div className="mt-1 mr-3 text-emerald-600">
                    <Check size={16} />
                  </div>
                  <p className="text-gray-700">Formula refinement</p>
                </li>
                <li className="flex items-start">
                  <div className="mt-1 mr-3 text-emerald-600">
                    <Check size={16} />
                  </div>
                  <p className="text-gray-700">
                    Emerging ingredient evaluation
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-emerald-700 text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Start Your Vitalis Journey Today
          </h2>
          <p className="text-lg mb-8 max-w-3xl mx-auto">
            Experience the difference that scientifically-formulated,
            premium-quality supplements can make in your health and wellness
            journey.
          </p>
          <a
            href="/buy/individual/bundle"
            className="inline-flex items-center justify-center px-8 py-3 bg-white text-emerald-700 font-medium rounded-md hover:bg-gray-100 transition-colors"
          >
            Shop Our Products
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-6 md:py-8 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-emerald-700">
                Vitalis
              </span>
              <span className="text-xs align-top">®</span>
            </div>
            <div className="text-xs text-gray-500">
              © {new Date().getFullYear()} Vitalis. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
