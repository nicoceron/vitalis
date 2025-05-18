"use client";

// Use edge runtime to reduce serverless function count
export const runtime = "edge";

// Use edge runtime to reduce serverless function count
export const runtime = "edge";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function ResearchPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      {/* Rest of the research page content remains the same */}
      <main className="flex-1 bg-white">
        {/* Section: Intro */}
        <section className="container px-4 md:px-6 py-8 md:py-12">
          <h1 className="text-3xl md:text-4xl font-normal tracking-tighter mb-4">
            Vitalis: Science-Backed Nutrition for Healthy Aging
          </h1>
          <div className="max-w-3xl mb-6">
            <p className="text-lg mb-4">
              Our product line – Vitalis Vision, Vitalis Neuro, and Vitalis
              Fortify – is specifically formulated with ingredients chosen for
              their potential benefits in addressing common health
              considerations associated with aging.
            </p>
            <div className="bg-amber-50 border-l-4 border-amber-500 p-3 my-4 text-sm">
              <strong>Disclaimer:</strong> This information summarizes available
              research on the ingredients used in Vitalis products and is for
              informational purposes only. It does not constitute medical
              advice. Individual results may vary. Always consult with your
              healthcare provider before starting any new supplement.
            </div>
          </div>
        </section>

        {/* Section: Needs of Healthy Aging */}
        <section className="bg-gray-50 py-12">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-normal mb-8">
              Understanding the Needs of Healthy Aging
            </h2>
            <p className="text-lg mb-6">
              Aging brings natural physiological changes. Supporting your body
              with targeted nutrition becomes increasingly important. Key areas
              include:
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* Grid items for healthy aging needs */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold mb-2 text-emerald-700">
                  Combating Oxidative Stress & Inflammation
                </h3>
                <p className="text-gray-700">
                  Foundational processes linked to many age-related concerns.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold mb-2 text-emerald-700">
                  Supporting Cardiovascular Health
                </h3>
                <p className="text-gray-700">
                  Maintaining healthy blood pressure, cholesterol, and
                  circulation.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold mb-2 text-emerald-700">
                  Maintaining Cognitive Function
                </h3>
                <p className="text-gray-700">
                  Supporting memory, focus, and overall brain health.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold mb-2 text-emerald-700">
                  Promoting Digestive Wellness
                </h3>
                <p className="text-gray-700">
                  Ensuring regularity and nutrient absorption.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold mb-2 text-emerald-700">
                  Balancing Metabolism
                </h3>
                <p className="text-gray-700">
                  Aiding blood sugar and lipid management.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold mb-2 text-emerald-700">
                  Strengthening Immune Defenses
                </h3>
                <p className="text-gray-700">
                  Supporting a robust immune system.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold mb-2 text-emerald-700">
                  Maintaining Bone Health
                </h3>
                <p className="text-gray-700">
                  Providing minerals crucial for strong bones.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold mb-2 text-emerald-700">
                  Protecting Eye Health
                </h3>
                <p className="text-gray-700">
                  Supplying antioxidants important for vision.
                </p>
              </div>
            </div>
            <p className="text-lg">
              Our Vitalis line is designed with these considerations in mind,
              using synergistic blends of natural ingredients.
            </p>
          </div>
        </section>

        {/* Section: Product Tabs */}
        <section className="container px-4 md:px-6 py-8">
          <Tabs defaultValue="vision" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="vision">Vitalis Vision</TabsTrigger>

              <TabsTrigger value="neuro">Vitalis Neuro</TabsTrigger>

              <TabsTrigger value="fortify">Vitalis Fortify</TabsTrigger>
            </TabsList>

            <TabsContent value="vision" className="mt-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3 lg:w-1/4">
                  <div className="aspect-square relative rounded-lg overflow-hidden bg-emerald-50 mb-4">
                    <Image
                      src="/vision.jpeg"
                      alt="Vitalis Vision product"
                      fill
                      className="object-cover"
                    />
                  </div>

                  <Button className="w-full bg-emerald-700 hover:bg-emerald-800">
                    Shop Vitalis Vision
                  </Button>
                </div>

                <div className="md:w-2/3 lg:w-3/4">
                  <div className="bg-emerald-50 p-4 rounded-lg mb-4">
                    <h2 className="text-2xl font-semibold  mb-1 tracking-tighter">
                      Vitalis Vision: Foundational Support
                    </h2>

                    <p>
                      <strong>Focus:</strong> Providing essential antioxidant
                      protection, supporting eye health, digestion, metabolic
                      balance, and bone strength.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        Key Ingredients:
                      </h3>

                      <ul className="list-disc pl-5 space-y-1">
                        <li>Golden Berry (Uchuva)</li>

                        <li>Carrot</li>

                        <li>Orange</li>

                        <li>Chia Seeds</li>

                        <li>Sesame Seeds</li>

                        <li>Annatto (Achiote)</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        Potential Benefits:
                      </h3>

                      <ul className="list-disc pl-5 space-y-1">
                        <li>Supports Optimal Vision</li>

                        <li>Provides Robust Antioxidant Defense</li>

                        <li>Aids Digestive Regularity</li>

                        <li>Helps Metabolic Balance</li>

                        <li>Contributes to Strong Bones</li>

                        <li>Supports Immune Function</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="neuro" className="mt-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3 lg:w-1/4">
                  <div className="aspect-square relative rounded-lg overflow-hidden bg-emerald-50 mb-4">
                    <Image
                      src="/neuro.jpeg"
                      alt="Vitalis Neuro product"
                      fill
                      className="object-cover"
                    />
                  </div>

                  <Button className="w-full bg-emerald-700 hover:bg-emerald-800">
                    Shop Vitalis Neuro
                  </Button>
                </div>

                <div className="md:w-2/3 lg:w-3/4">
                  <div className="bg-emerald-50 p-4 rounded-lg mb-4">
                    <h2 className="text-2xl font-semibold mb-1 tracking-tighter">
                      Vitalis Neuro: Enhancing Cardiovascular & Cognitive
                      Vitality
                    </h2>

                    <p>
                      <strong>Focus:</strong> Supporting heart function, healthy
                      circulation, and cognitive processes like memory and
                      focus.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        Key Ingredients:
                      </h3>

                      <ul className="list-disc pl-5 space-y-1">
                        <li>Orange</li>

                        <li>Cacao</li>

                        <li>Ginger</li>

                        <li>Chia Seeds</li>

                        <li>Sesame Seeds</li>

                        <li>Rosemary</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        Potential Benefits:
                      </h3>

                      <ul className="list-disc pl-5 space-y-1">
                        <li>Supports Heart & Circulation Health</li>

                        <li>Boosts Brain Health & Cognitive Function</li>

                        <li>Combats Age-Related Inflammation</li>

                        <li>Delivers Powerful Antioxidant Support</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="fortify" className="mt-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3 lg:w-1/4">
                  <div className="aspect-square relative rounded-lg overflow-hidden bg-emerald-50 mb-4">
                    <Image
                      src="/fortify.jpeg"
                      alt="Vitalis Fortify product"
                      fill
                      className="object-cover"
                    />
                  </div>

                  <Button className="w-full bg-emerald-700 hover:bg-emerald-800">
                    Shop Vitalis Fortify
                  </Button>
                </div>

                <div className="md:w-2/3 lg:w-3/4">
                  <div className="bg-emerald-50 p-4 rounded-lg mb-4">
                    <h2 className="text-2xl font-semibold mb-1 tracking-tighter ">
                      Vitalis Fortify: Supporting Metabolic Health & Defenses
                    </h2>

                    <p>
                      <strong>Focus:</strong> Aiding metabolic balance,
                      providing nutrient density, and reinforcing the body's
                      natural defenses.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        Key Ingredients:
                      </h3>

                      <ul className="list-disc pl-5 space-y-1">
                        <li>Golden Berry (Uchuva)</li>

                        <li>Cinnamon</li>

                        <li>Loquat</li>

                        <li>Chia Seeds</li>

                        <li>Moringa</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        Potential Benefits:
                      </h3>

                      <ul className="list-disc pl-5 space-y-1">
                        <li>Promotes Balanced Blood Sugar Levels</li>

                        <li>Provides Essential Vitamins & Minerals</li>

                        <li>Strengthens Natural Immune Defenses</li>

                        <li>Offers Antioxidant & Anti-Inflammatory Action</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* Section: Combined Peer-reviewed research & Studies (REPLACES the original two sections) */}
        <section className="container px-4 md:px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-4">
              <h2 className="text-4xl font-semibold tracking-tighter mb-6">
                Peer-reviewed research & Studies
              </h2>
              <p className="text-lg">
                The following is a compilation of peer-reviewed research and
                studies related to the ingredients found in Vitalis products.
                This information is intended to highlight the scientific
                discourse on the role these ingredients may play in overall
                health.
              </p>
            </div>
            <div className="md:col-span-8 space-y-12">
              {/* --- Start of Combined Research List --- */}
              {/* From "Peer-reviewed research" section */}
              <div className="border-t pt-8">
                <div className="uppercase text-sm font-medium text-gray-500 mb-2">
                  JOURNAL OF NUTRITIONAL BIOCHEMISTRY
                </div>
                <h3 className="text-2xl font-bold mb-3">
                  Golden Berry Extract Shows Promising Effects on Insulin
                  Resistance and Obesity Markers in Preclinical Models
                </h3>
                <p className="mb-4">
                  Recent research demonstrates that Golden Berry (Physalis
                  peruviana) extract contains bioactive compounds that may help
                  regulate glucose metabolism and reduce inflammatory markers
                  associated with metabolic syndrome. This study examined the
                  effects of standardized extract on insulin sensitivity and
                  adipose tissue function.
                </p>
                <Link
                  href="https://pmc.ncbi.nlm.nih.gov/articles/PMC10857591/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-emerald-700 font-medium hover:underline"
                >
                  Read paper <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
              <div className="border-t pt-8">
                <div className="uppercase text-sm font-medium text-gray-500 mb-2">
                  FRONTIERS IN NUTRITION
                </div>
                <h3 className="text-2xl font-bold mb-3">
                  Cocoa Flavanols Improve Cognitive Function and Vascular Health
                  in Older Adults: A Randomized Controlled Trial
                </h3>
                <p className="mb-4">
                  This double-blind, placebo-controlled study investigated the
                  effects of daily cocoa flavanol consumption on cognitive
                  performance and vascular function in adults aged 60-85.
                  Results showed significant improvements in memory tasks and
                  blood pressure regulation after 12 weeks of supplementation
                  compared to placebo.
                </p>
                <Link
                  href="https://pmc.ncbi.nlm.nih.gov/articles/PMC4340060/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-emerald-700 font-medium hover:underline"
                >
                  Read paper <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
              <div className="border-t pt-8">
                <div className="uppercase text-sm font-medium text-gray-500 mb-2">
                  BIOMOLECULES
                </div>
                <h3 className="text-2xl font-bold mb-3">
                  Ginger (Zingiber officinale) Targets Multiple Hallmarks of
                  Aging: Comprehensive Review of Molecular Mechanisms
                </h3>
                <p className="mb-4">
                  This comprehensive review examines the molecular mechanisms by
                  which ginger and its bioactive compounds may influence
                  multiple hallmarks of aging, including oxidative stress,
                  inflammation, cellular senescence, and mitochondrial
                  dysfunction. The paper highlights ginger's potential role in
                  healthy aging strategies.
                </p>
                <Link
                  href="https://pmc.ncbi.nlm.nih.gov/articles/PMC11352747/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-emerald-700 font-medium hover:underline"
                >
                  Read paper <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
              <div className="border-t pt-8">
                <div className="uppercase text-sm font-medium text-gray-500 mb-2">
                  NUTRIENTS
                </div>
                <h3 className="text-2xl font-bold mb-3">
                  Moringa oleifera: A Comprehensive Review of Its Therapeutic
                  Potential in Metabolic and Cardiovascular Health
                </h3>
                <p className="mb-4">
                  This systematic review evaluates the current evidence for
                  Moringa oleifera's effects on metabolic parameters and
                  cardiovascular health markers. The paper analyzes data from
                  both preclinical and clinical studies, highlighting the
                  plant's rich nutritional profile and potential mechanisms of
                  action.
                </p>
                <Link
                  href="https://pmc.ncbi.nlm.nih.gov/articles/PMC11939887/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-emerald-700 font-medium hover:underline"
                >
                  Read paper <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
              {/* From "Research References by Ingredient" section (filtered) */}
              {/* Golden Berry */}
              <div className="border-t pt-8">
                <div className="uppercase text-sm font-medium text-gray-500 mb-2">
                  PMC (NATIONAL LIBRARY OF MEDICINE)
                </div>
                <h3 className="text-2xl font-bold mb-3">
                  Physalis peruviana Extracts, Cell Protection
                </h3>
                <p className="mb-4">
                  Study on the protective effects of Golden Berry extracts
                  against cellular damage and oxidative stress.
                </p>
                <Link
                  href="https://pmc.ncbi.nlm.nih.gov/articles/PMC6108337/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-emerald-700 font-medium hover:underline"
                >
                  View Research <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
              <div className="border-t pt-8">
                <div className="uppercase text-sm font-medium text-gray-500 mb-2">
                  PUBMED
                </div>
                <h3 className="text-2xl font-bold mb-3">
                  Golden Berry Insulin Resistance Rat Study
                </h3>
                <p className="mb-4">
                  Research on the effects of Golden Berry on insulin resistance
                  in a rat model.
                </p>
                <Link
                  href="https://pubmed.ncbi.nlm.nih.gov/38337650/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-emerald-700 font-medium hover:underline"
                >
                  View Research <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
              <div className="border-t pt-8">
                <div className="uppercase text-sm font-medium text-gray-500 mb-2">
                  MDPI
                </div>
                <h3 className="text-2xl font-bold mb-3">
                  Goldenberry Composition & Activities
                </h3>
                <p className="mb-4">
                  Detailed analysis of the phytochemical composition and
                  biological activities of Golden Berries.
                </p>
                <Link
                  href="https://www.mdpi.com/2223-7747/14/3/327"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-emerald-700 font-medium hover:underline"
                >
                  View Research <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
              {/* Moringa */}
              <div className="border-t pt-8">
                <div className="uppercase text-sm font-medium text-gray-500 mb-2">
                  RESEARCHGATE
                </div>
                <h3 className="text-2xl font-bold mb-3">
                  Moringa Effects Clinical Trial
                </h3>
                <p className="mb-4">
                  Clinical trial examining the effects of Moringa oleifera
                  leaves on blood glucose, blood pressure, and lipid profiles in
                  type 2 diabetic subjects.
                </p>
                <Link
                  href="https://www.researchgate.net/publication/371041643_Effects_of_Moringa_oleifera_leaves_on_the_blood_glucose_blood_pressure_and_lipid_profile_of_type_2_diabetic_subjects_A_parallel_group_randomized_clinical_trial_of_efficacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-emerald-700 font-medium hover:underline"
                >
                  View Research <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
              <div className="border-t pt-8">
                <div className="uppercase text-sm font-medium text-gray-500 mb-2">
                  PMC (NATIONAL LIBRARY OF MEDICINE)
                </div>
                <h3 className="text-2xl font-bold mb-3">
                  Moringa Neuroprotective Effect Review
                </h3>
                <p className="mb-4">
                  Review of the neuroprotective effects of Moringa oleifera.
                </p>
                <Link
                  href="https://pmc.ncbi.nlm.nih.gov/articles/PMC11527545/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-emerald-700 font-medium hover:underline"
                >
                  View Research <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
              {/* Cocoa */}
              <div className="border-t pt-8">
                <div className="uppercase text-sm font-medium text-gray-500 mb-2">
                  PMC (NATIONAL LIBRARY OF MEDICINE)
                </div>
                <h3 className="text-2xl font-bold mb-3">
                  Cocoa, Chocolate, Health & Disease Review
                </h3>
                <p className="mb-4">
                  Comprehensive review of the effects of cocoa and chocolate on
                  health and disease.
                </p>
                <Link
                  href="https://pmc.ncbi.nlm.nih.gov/articles/PMC4696435/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-emerald-700 font-medium hover:underline"
                >
                  View Research <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
              <div className="border-t pt-8">
                <div className="uppercase text-sm font-medium text-gray-500 mb-2">
                  PMC (NATIONAL LIBRARY OF MEDICINE)
                </div>
                <h3 className="text-2xl font-bold mb-3">
                  Cocoa Effect on Blood Pressure Review
                </h3>
                <p className="mb-4">
                  Review of the effects of cocoa on blood pressure.
                </p>
                <Link
                  href="https://pmc.ncbi.nlm.nih.gov/articles/PMC6478304/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-emerald-700 font-medium hover:underline"
                >
                  View Research <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
              <div className="border-t pt-8">
                <div className="uppercase text-sm font-medium text-gray-500 mb-2">
                  PMC (NATIONAL LIBRARY OF MEDICINE)
                </div>
                <h3 className="text-2xl font-bold mb-3">
                  Chocolate/Cocoa Biomolecules Brain Cognition Aging
                </h3>
                <p className="mb-4">
                  Research on the effects of chocolate and cocoa biomolecules on
                  brain cognition during aging.
                </p>
                <Link
                  href="https://pmc.ncbi.nlm.nih.gov/articles/PMC9311747/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-emerald-700 font-medium hover:underline"
                >
                  View Research <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
              {/* Ginger */}
              <div className="border-t pt-8">
                <div className="uppercase text-sm font-medium text-gray-500 mb-2">
                  STATPEARLS [NCBI BOOKSHELF]
                </div>
                <h3 className="text-2xl font-bold mb-3">
                  Ginger Root Overview (StatPearls)
                </h3>
                <p className="mb-4">
                  Comprehensive overview of ginger root and its medicinal
                  properties.
                </p>
                <Link
                  href="https://www.ncbi.nlm.nih.gov/books/NBK565886/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-emerald-700 font-medium hover:underline"
                >
                  View Research <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
              <div className="border-t pt-8">
                <div className="uppercase text-sm font-medium text-gray-500 mb-2">
                  PMC (NATIONAL LIBRARY OF MEDICINE)
                </div>
                <h3 className="text-2xl font-bold mb-3">
                  Ginger Effect on Inflammatory Diseases
                </h3>
                <p className="mb-4">
                  Research on the effects of ginger on inflammatory diseases.
                </p>
                <Link
                  href="https://pmc.ncbi.nlm.nih.gov/articles/PMC9654013/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-emerald-700 font-medium hover:underline"
                >
                  View Research <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
              <div className="border-t pt-8">
                <div className="uppercase text-sm font-medium text-gray-500 mb-2">
                  PMC (NATIONAL LIBRARY OF MEDICINE)
                </div>
                <h3 className="text-2xl font-bold mb-3">
                  Ginger Antioxidant/Anti-inflammatory Review
                </h3>
                <p className="mb-4">
                  Review of the antioxidant and anti-inflammatory properties of
                  ginger.
                </p>
                <Link
                  href="https://pmc.ncbi.nlm.nih.gov/articles/PMC11187345/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-emerald-700 font-medium hover:underline"
                >
                  View Research <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
              <div className="border-t pt-8">
                <div className="uppercase text-sm font-medium text-gray-500 mb-2">
                  PMC (NATIONAL LIBRARY OF MEDICINE)
                </div>
                <h3 className="text-2xl font-bold mb-3">
                  Ginger for Healthy Ageing Systematic Review
                </h3>
                <p className="mb-4">
                  Systematic review of ginger's role in healthy aging.
                </p>
                <Link
                  href="https://pmc.ncbi.nlm.nih.gov/articles/PMC9110206/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-emerald-700 font-medium hover:underline"
                >
                  View Research <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
              {/* Rosemary */}
              <div className="border-t pt-8">
                <div className="uppercase text-sm font-medium text-gray-500 mb-2">
                  PMC (NATIONAL LIBRARY OF MEDICINE)
                </div>
                <h3 className="text-2xl font-bold mb-3">
                  Therapeutic Effects of Rosemary Review
                </h3>
                <p className="mb-4">
                  Review of the therapeutic effects of rosemary.
                </p>
                <Link
                  href="https://pmc.ncbi.nlm.nih.gov/articles/PMC7491497/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-emerald-700 font-medium hover:underline"
                >
                  View Research <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
              <div className="border-t pt-8">
                <div className="uppercase text-sm font-medium text-gray-500 mb-2">
                  PMC (NATIONAL LIBRARY OF MEDICINE)
                </div>
                <h3 className="text-2xl font-bold mb-3">
                  Rosemary Cognition Enhancing Effect Meta-Analysis
                </h3>
                <p className="mb-4">
                  Meta-analysis of studies on rosemary's cognition-enhancing
                  effects.
                </p>
                <Link
                  href="https://pmc.ncbi.nlm.nih.gov/articles/PMC8851910/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-emerald-700 font-medium hover:underline"
                >
                  View Research <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
              <div className="border-t pt-8">
                <div className="uppercase text-sm font-medium text-gray-500 mb-2">
                  PUBMED
                </div>
                <h3 className="text-2xl font-bold mb-3">
                  Rosemary Cognitive Function Elderly Study
                </h3>
                <p className="mb-4">
                  Study on the dose-dependent effects of rosemary on cognitive
                  function in elderly individuals.
                </p>
                <Link
                  href="https://pubmed.ncbi.nlm.nih.gov/21877951/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-emerald-700 font-medium hover:underline"
                >
                  View Research <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
              <div className="border-t pt-8">
                <div className="uppercase text-sm font-medium text-gray-500 mb-2">
                  PMC (NATIONAL LIBRARY OF MEDICINE)
                </div>
                <h3 className="text-2xl font-bold mb-3">
                  Rosemary Therapeutic Potential Review
                </h3>
                <p className="mb-4">
                  Review of the therapeutic potential of rosemary.
                </p>
                <Link
                  href="https://pmc.ncbi.nlm.nih.gov/articles/PMC4749867/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-emerald-700 font-medium hover:underline"
                >
                  View Research <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
              {/* Cinnamon */}
              <div className="border-t pt-8">
                <div className="uppercase text-sm font-medium text-gray-500 mb-2">
                  PMC (NATIONAL LIBRARY OF MEDICINE)
                </div>
                <h3 className="text-2xl font-bold mb-3">
                  Cinnamon as Cardiovascular Nutraceutical
                </h3>
                <p className="mb-4">
                  Research on cinnamon as a cardiovascular nutraceutical.
                </p>
                <Link
                  href="https://pmc.ncbi.nlm.nih.gov/articles/PMC11155465/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-emerald-700 font-medium hover:underline"
                >
                  View Research <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
              <div className="border-t pt-8">
                <div className="uppercase text-sm font-medium text-gray-500 mb-2">
                  PMC (NATIONAL LIBRARY OF MEDICINE)
                </div>
                <h3 className="text-2xl font-bold mb-3">
                  Cinnamon Antioxidant/Anti-Inflammatory Effects
                </h3>
                <p className="mb-4">
                  Research on the antioxidant and anti-inflammatory effects of
                  digested cinnamon.
                </p>
                <Link
                  href="https://pmc.ncbi.nlm.nih.gov/articles/PMC9914695/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-emerald-700 font-medium hover:underline"
                >
                  View Research <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
              <div className="border-t pt-8">
                <div className="uppercase text-sm font-medium text-gray-500 mb-2">
                  PMC (NATIONAL LIBRARY OF MEDICINE)
                </div>
                <h3 className="text-2xl font-bold mb-3">
                  Cinnamon Role in Insulin Resistance Prevention
                </h3>
                <p className="mb-4">
                  Research on cinnamon's role in preventing insulin resistance.
                </p>
                <Link
                  href="https://pmc.ncbi.nlm.nih.gov/articles/PMC2901047/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-emerald-700 font-medium hover:underline"
                >
                  View Research <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
              <div className="border-t pt-8">
                <div className="uppercase text-sm font-medium text-gray-500 mb-2">
                  MDPI
                </div>
                <h3 className="text-2xl font-bold mb-3">
                  Cinnamon HbA1c Meta-Analysis
                </h3>
                <p className="mb-4">
                  Meta-analysis of studies on cinnamon's effects on HbA1c
                  levels.
                </p>
                <Link
                  href="https://www.mdpi.com/2673-396X/6/1/3"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-emerald-700 font-medium hover:underline"
                >
                  View Research <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
              {/* Chia */}
              <div className="border-t pt-8">
                <div className="uppercase text-sm font-medium text-gray-500 mb-2">
                  PMC (NATIONAL LIBRARY OF MEDICINE)
                </div>
                <h3 className="text-2xl font-bold mb-3">
                  Defatted Chia Flour Peptides Review
                </h3>
                <p className="mb-4">
                  Review of peptides derived from defatted chia flour.
                </p>
                <Link
                  href="https://pmc.ncbi.nlm.nih.gov/articles/PMC11979946/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-emerald-700 font-medium hover:underline"
                >
                  View Research <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
              <div className="border-t pt-8">
                <div className="uppercase text-sm font-medium text-gray-500 mb-2">
                  PMC (NATIONAL LIBRARY OF MEDICINE)
                </div>
                <h3 className="text-2xl font-bold mb-3">
                  Chia Seeds in Metabolic Disorders Review
                </h3>
                <p className="mb-4">
                  Review of the role of chia seeds in metabolic disorders.
                </p>
                <Link
                  href="https://pmc.ncbi.nlm.nih.gov/articles/PMC9834868/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-emerald-700 font-medium hover:underline"
                >
                  View Research <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
              <div className="border-t pt-8">
                <div className="uppercase text-sm font-medium text-gray-500 mb-2">
                  PMC (NATIONAL LIBRARY OF MEDICINE)
                </div>
                <h3 className="text-2xl font-bold mb-3">
                  Chia Nutritional & Therapeutic Review
                </h3>
                <p className="mb-4">
                  Review of the nutritional and therapeutic properties of chia
                  seeds.
                </p>
                <Link
                  href="https://pmc.ncbi.nlm.nih.gov/articles/PMC4926888/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-emerald-700 font-medium hover:underline"
                >
                  View Research <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
              {/* Other Ingredients */}
              <div className="border-t pt-8">
                <div className="uppercase text-sm font-medium text-gray-500 mb-2">
                  PMC (NATIONAL LIBRARY OF MEDICINE)
                </div>
                <h3 className="text-2xl font-bold mb-3">
                  Tocotrienol (Annatto), Cardiovascular Health, Aging
                </h3>
                <p className="mb-4">
                  Research on tocotrienol from annatto and its effects on
                  cardiovascular health and aging.
                </p>
                <Link
                  href="https://pmc.ncbi.nlm.nih.gov/articles/PMC5775572/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-emerald-700 font-medium hover:underline"
                >
                  View Research <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
              <div className="border-t pt-8">
                <div className="uppercase text-sm font-medium text-gray-500 mb-2">
                  PMC (NATIONAL LIBRARY OF MEDICINE)
                </div>
                <h3 className="text-2xl font-bold mb-3">
                  Citrus Juice Bioactive Components Effects
                </h3>
                <p className="mb-4">
                  Research on the effects of bioactive components in citrus
                  juices.
                </p>
                <Link
                  href="https://pmc.ncbi.nlm.nih.gov/articles/PMC8264544/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-emerald-700 font-medium hover:underline"
                >
                  View Research <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
              <div className="border-t pt-8">
                <div className="uppercase text-sm font-medium text-gray-500 mb-2">
                  PMC (NATIONAL LIBRARY OF MEDICINE)
                </div>
                <h3 className="text-2xl font-bold mb-3">
                  Sesame Seeds Nutrient Review
                </h3>
                <p className="mb-4">
                  Review of the nutritional content of sesame seeds.
                </p>
                <Link
                  href="https://pmc.ncbi.nlm.nih.gov/articles/PMC11049391/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-emerald-700 font-medium hover:underline"
                >
                  View Research <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
              <div className="border-t pt-8">
                <div className="uppercase text-sm font-medium text-gray-500 mb-2">
                  RESEARCHGATE
                </div>
                <h3 className="text-2xl font-bold mb-3">
                  Loquat Biological Activities
                </h3>
                <p className="mb-4">
                  Review of the biological activities of extracts from loquat.
                </p>
                <Link
                  href="https://www.researchgate.net/publication/311482357_Biological_Activities_of_Extracts_from_Loquat_Eriobotrya_japonica_Lindl_A_Review"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-emerald-700 font-medium hover:underline"
                >
                  View Research <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
              <div className="border-t pt-8">
                <div className="uppercase text-sm font-medium text-gray-500 mb-2">
                  PMC (NATIONAL LIBRARY OF MEDICINE)
                </div>
                <h3 className="text-2xl font-bold mb-3">
                  Achiote (Annatto) Source of Pigment & Vitamin E
                </h3>
                <p className="mb-4">
                  Research on achiote (annatto) as a source of pigment and
                  vitamin E.
                </p>
                <Link
                  href="https://pmc.ncbi.nlm.nih.gov/articles/PMC5430180/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-emerald-700 font-medium hover:underline"
                >
                  View Research <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
              {/* --- End of Combined Research List --- */}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
