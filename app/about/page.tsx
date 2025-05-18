"use client";

import Image from "next/image";
import { useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import {
  Award,
  Leaf,
  Users,
  Check,
  Microscope,
  Plus,
  Minus,
  ShieldCheck,
  BadgeCheck,
  Wheat,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Use edge runtime to reduce serverless function count
export const runtime = "edge";

// FAQ Accordion Component
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full py-6 text-left"
      >
        <h3 className="text-lg font-medium text-gray-900">{question}</h3>
        <span className="text-gray-500">
          {isOpen ? <Minus size={20} /> : <Plus size={20} />}
        </span>
      </button>
      {isOpen && (
        <div className="pb-6">
          <p className="text-gray-700">{answer}</p>
        </div>
      )}
    </div>
  );
}

function FAQ() {
  const faqs = [
    {
      question: "What makes Vitalis supplements different?",
      answer:
        "Vitalis stands out through our commitment to evidence-based formulations, sustainable sourcing from Colombia and Costa Rica, and transparent manufacturing processes. We focus on bioavailability, optimal dosing, and synergistic ingredient combinations that deliver noticeable results.",
    },
    {
      question: "How are your ingredients sourced?",
      answer:
        "We ethically source our premium ingredients directly from family farms in Colombia and Costa Rica. This farm-to-label approach ensures fair compensation for farmers, sustainable agricultural practices, and the highest quality botanicals with optimal nutrient profiles.",
    },
    {
      question: "Are Vitalis supplements tested for quality and safety?",
      answer:
        "Absolutely. All Vitalis products undergo rigorous testing at multiple stages of production. We use cGMP certified facilities, conduct third-party testing for purity and potency, and verify all raw materials before formulation to ensure you receive only the highest quality supplements.",
    },
    {
      question: "How long will it take to see results?",
      answer:
        "Results vary depending on individual health status and the specific supplement. Generally, some benefits may be noticed within days or weeks, while others develop over consistent use of 2-3 months. For optimal results, we recommend following the suggested dosing protocol and maintaining healthy lifestyle habits.",
    },
    {
      question: "Do your supplements contain allergens?",
      answer:
        "We formulate our supplements to be free from major allergens including gluten, dairy, soy, eggs, and nuts. However, we always recommend reviewing the complete ingredient list if you have specific allergies or sensitivities. All ingredients and potential allergens are clearly listed on our product labels.",
    },
    {
      question: "Can I take multiple Vitalis products together?",
      answer:
        "Our product lines are designed to work both independently and synergistically. Many customers experience enhanced benefits from combining products like Vitalis Neuro+ and Vision+. If you have specific health concerns or are taking medications, we recommend consulting with your healthcare provider.",
    },
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-4xl font-bold text-gray-900 mb-8">FAQs</h2>
      <div className="space-y-0 divide-y divide-gray-200 border-t border-gray-200">
        {faqs.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <SiteHeader />

      {/* Hero Section - Clean Professional Design */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block px-3 py-1 rounded bg-emerald-50 text-emerald-700 text-sm font-medium mb-6">
                About Vitalis
              </span>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6 leading-tight">
                Redefining Health Through{" "}
                <span className="text-emerald-700">Nature's Wisdom</span>
              </h1>
              <p className="text-lg text-gray-700 mb-8">
                At Vitalis, we believe that optimal health is the foundation of
                a fulfilling life. Our journey began with a mission to harness
                the power of nature's most potent botanicals from Colombia and
                Costa Rica, transforming them into evidence-based supplements
                that deliver real results.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/buy">
                  <Button className="bg-emerald-700 hover:bg-emerald-800 text-white">
                    Explore Products
                  </Button>
                </Link>
                <Link href="/research">
                  <Button
                    variant="outline"
                    className="border-emerald-700 text-emerald-700 hover:bg-emerald-50"
                  >
                    View Research
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-md">
                <Image
                  src="/family.jpeg"
                  alt="Vitalis - Empowering health naturally"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="absolute -bottom-4 right-4 bg-white p-4 rounded shadow">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
                    <Check size={16} />
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    100% Natural Ingredients
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section - Horizontal Tabs Layout */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="mb-16">
              <span className="inline-block px-3 py-1 rounded bg-emerald-50 text-emerald-700 text-sm font-medium mb-3">
                What We Stand For
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Our Core Values
              </h2>
              <p className="text-lg text-gray-700 max-w-3xl">
                These principles guide every decision we make, from product
                development to customer service.
              </p>
            </div>

            <div className="flex flex-col md:flex-row gap-12">
              {/* Left side - Key value highlight */}
              <div className="md:w-2/5">
                <div className="bg-emerald-700 text-white p-10 rounded-lg">
                  <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-6 text-white">
                    <Microscope size={32} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">
                    Scientific Integrity
                  </h3>
                  <p className="text-emerald-50 text-lg">
                    We formulate based on peer-reviewed research and clinical
                    evidence, not trends or marketing hype.
                  </p>
                  <div className="mt-8 pt-6 border-t border-white/20">
                    <p className="text-sm text-emerald-100">
                      "Our commitment to scientific integrity means we review
                      hundreds of studies before finalizing each formulation."
                    </p>
                  </div>
                </div>
              </div>

              {/* Right side - Value list */}
              <div className="md:w-3/5 space-y-8">
                <div className="flex items-start border-b border-gray-100 pb-8">
                  <div className="flex-shrink-0 mr-6">
                    <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
                      <Award size={24} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Uncompromising Quality
                    </h3>
                    <p className="text-gray-700">
                      We source the finest ingredients and conduct rigorous
                      testing at every stage of production. Each batch undergoes
                      multiple quality checks to ensure purity, potency, and
                      consistency.
                    </p>
                  </div>
                </div>

                <div className="flex items-start border-b border-gray-100 pb-8">
                  <div className="flex-shrink-0 mr-6">
                    <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                      <Leaf size={24} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Sustainability
                    </h3>
                    <p className="text-gray-700">
                      We're committed to environmentally responsible practices
                      in our sourcing, manufacturing, and packaging. We work
                      closely with farmers to ensure sustainable agricultural
                      methods and minimal ecological impact.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-6">
                    <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                      <Users size={24} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Customer Partnership
                    </h3>
                    <p className="text-gray-700">
                      We view our relationship with customers as a partnership
                      in their health journey, providing education and support.
                      Our team is committed to helping you understand how our
                      supplements work and how to incorporate them into your
                      health regimen.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Section - Table Layout */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12">
              <span className="inline-block px-3 py-1 rounded bg-emerald-50 text-emerald-700 text-sm font-medium mb-3">
                Quality Assurance
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Our Certifications
              </h2>
              <p className="text-lg text-gray-700 max-w-3xl">
                We maintain the highest standards to ensure our products meet
                rigorous quality and ethical criteria.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-100">
                <div className="p-8 flex">
                  <div className="flex-shrink-0 mr-5">
                    <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                      <BadgeCheck size={32} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Certificación Kosher
                    </h3>
                    <p className="text-gray-700">
                      Our products meet the strictest Kosher standards, ensuring
                      they comply with Jewish dietary regulations.
                    </p>
                    <div className="mt-4 inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-medium">
                      Internationally Recognized
                    </div>
                  </div>
                </div>

                <div className="p-8 flex">
                  <div className="flex-shrink-0 mr-5">
                    <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
                      <ShieldCheck size={32} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Certificación HACCP
                    </h3>
                    <p className="text-gray-700">
                      Hazard Analysis Critical Control Point certification
                      ensures our production maintains the highest food safety
                      standards.
                    </p>
                    <div className="mt-4 inline-block px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-medium">
                      Food Safety Standard
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-100 border-t border-gray-100">
                <div className="p-8 flex">
                  <div className="flex-shrink-0 mr-5">
                    <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                      <Leaf size={32} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Producto Vegano
                    </h3>
                    <p className="text-gray-700">
                      All our supplements are 100% plant-based and contain no
                      animal ingredients or byproducts in any form.
                    </p>
                    <div className="mt-4 inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium">
                      Ethical Sourcing
                    </div>
                  </div>
                </div>

                <div className="p-8 flex">
                  <div className="flex-shrink-0 mr-5">
                    <div className="w-16 h-16 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
                      <Wheat size={32} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Libre de Gluten
                    </h3>
                    <p className="text-gray-700">
                      Our products are completely gluten-free, making them safe
                      for those with celiac disease or gluten sensitivity.
                    </p>
                    <div className="mt-4 inline-block px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-medium">
                      Allergy Friendly
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section - Clean Minimal */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <FAQ />
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
