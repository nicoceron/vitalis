import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function RecipesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1 bg-white">
        {/* Hero Section */}
        <section className="bg-emerald-50 py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-gray-900 mb-6">
              Vitalis <span className="text-emerald-700">Recipes</span>
            </h1>
            <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto">
              Discover delicious and nutritious ways to incorporate Vitalis
              supplements into your daily routine. Each recipe is crafted to
              maximize both flavor and functional benefits.
            </p>
          </div>
        </section>

        {/* Recipes Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            {/* Recipe 1: Matcha Vision Latte */}
            <div className="mb-24">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-8">
                <div className="order-2 lg:order-1">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-1 bg-emerald-700 mr-4"></div>
                    <span className="text-emerald-700 uppercase font-medium tracking-wider text-sm">
                      Vision Support
                    </span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-6">
                    Matcha Vision Latte with Vitalis Vision+
                  </h2>
                  <div className="bg-emerald-50 p-6 rounded-lg mb-8">
                    <h3 className="font-medium text-lg mb-2 text-emerald-800">
                      Health Benefits
                    </h3>
                    <p className="text-gray-700">
                      As aging often brings vision challenges like macular
                      degeneration or cataracts, incorporating nutrients that
                      protect ocular health becomes essential. Vitalis Vision+
                      is rich in ingredients like carrot, uchuva, and chia
                      seeds—natural sources of beta-carotene, antioxidants, and
                      omega-3s. This comforting matcha latte supports eye
                      function while offering anti-inflammatory and
                      immune-boosting benefits. Combined with green tea's
                      natural L-theanine and catechins, this beverage helps
                      maintain calm focus and may aid in reducing eye strain,
                      making it especially suitable for older adults who read,
                      watch screens, or experience low-light environments.
                    </p>
                  </div>
                </div>
                <div className="order-1 lg:order-2 relative">
                  <div className="aspect-square w-full overflow-hidden rounded-2xl shadow-lg">
                    <Image
                      src="/recipes/matcha_latte.jpeg"
                      alt="Matcha Vision Latte"
                      width={600}
                      height={600}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <span className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 mr-3">
                      1
                    </span>
                    Ingredients
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-emerald-700 mr-2">•</span>
                      <span>1 scoop Vitalis Vision+</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-emerald-700 mr-2">•</span>
                      <span>1 tsp high-quality matcha powder</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-emerald-700 mr-2">•</span>
                      <span>200 ml unsweetened soy milk or oat milk</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-emerald-700 mr-2">•</span>
                      <span>100 ml hot water (not boiling)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-emerald-700 mr-2">•</span>
                      <span>Optional: ½ tsp honey or stevia for sweetness</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <span className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 mr-3">
                      2
                    </span>
                    Preparation
                  </h3>
                  <ol className="space-y-4">
                    <li className="flex">
                      <span className="font-bold text-emerald-700 mr-2">
                        1.
                      </span>
                      <p>
                        In a small bowl, sift the matcha powder and mix it with
                        hot water (around 80°C) using a bamboo whisk or spoon to
                        make a smooth paste.
                      </p>
                    </li>
                    <li className="flex">
                      <span className="font-bold text-emerald-700 mr-2">
                        2.
                      </span>
                      <p>
                        Warm the plant milk in a saucepan over low heat without
                        boiling.
                      </p>
                    </li>
                    <li className="flex">
                      <span className="font-bold text-emerald-700 mr-2">
                        3.
                      </span>
                      <p>
                        In a separate cup, dissolve the scoop of Vitalis Vision+
                        in a few tablespoons of the warm milk until fully
                        blended.
                      </p>
                    </li>
                    <li className="flex">
                      <span className="font-bold text-emerald-700 mr-2">
                        4.
                      </span>
                      <p>
                        Combine all parts in a mug: first the matcha paste, then
                        the milk with the Vision+ blend, and finally stir
                        gently.
                      </p>
                    </li>
                    <li className="flex">
                      <span className="font-bold text-emerald-700 mr-2">
                        5.
                      </span>
                      <p>
                        Sweeten to taste, and serve warm. This drink is ideal as
                        a morning or mid-afternoon tonic.
                      </p>
                    </li>
                  </ol>
                </div>
              </div>
            </div>

            {/* Recipe 2: Sweet Potato GlucoBalance Soup */}
            <div className="mb-24">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-8">
                <div className="order-2 lg:order-2">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-1 bg-amber-600 mr-4"></div>
                    <span className="text-amber-600 uppercase font-medium tracking-wider text-sm">
                      Blood Sugar Support
                    </span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-6">
                    Sweet Potato GlucoBalance Soup
                  </h2>
                  <div className="bg-amber-50 p-6 rounded-lg mb-8">
                    <h3 className="font-medium text-lg mb-2 text-amber-800">
                      Health Benefits
                    </h3>
                    <p className="text-gray-700">
                      Maintaining stable blood sugar levels becomes increasingly
                      important in older adults, particularly in populations
                      with a high prevalence of metabolic syndrome. Vitalis
                      GlucoBalance+ contains ingredients like cinnamon, moringa,
                      and loquat, known to support insulin sensitivity and
                      glucose metabolism. This comforting sweet potato soup is
                      inspired by traditional Japanese imo jiru (sweet potato
                      broth) but enhanced with functional nutrients to help
                      reduce blood sugar spikes. Its smooth texture and
                      naturally sweet flavor make it both therapeutic and
                      enjoyable for the elderly, including those with reduced
                      appetite or chewing difficulties.
                    </p>
                  </div>
                </div>
                <div className="order-1 lg:order-1 relative">
                  <div className="aspect-square w-full overflow-hidden rounded-2xl shadow-lg">
                    <Image
                      src="/recipes/sweet_potato_soup.jpeg"
                      alt="Sweet Potato GlucoBalance Soup"
                      width={600}
                      height={600}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <span className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 mr-3">
                      1
                    </span>
                    Ingredients
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-amber-700 mr-2">•</span>
                      <span>1 scoop Vitalis GlucoBalance+</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-700 mr-2">•</span>
                      <span>
                        ½ small Japanese sweet potato (e.g., satsumaimo), peeled
                        and cubed
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-700 mr-2">•</span>
                      <span>1 cup water</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-700 mr-2">•</span>
                      <span>1 cup unsweetened soy milk or almond milk</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-700 mr-2">•</span>
                      <span>½ tsp cinnamon</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-700 mr-2">•</span>
                      <span>Pinch of salt</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-700 mr-2">•</span>
                      <span>
                        Optional: sesame seeds or finely chopped walnuts for
                        garnish
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <span className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 mr-3">
                      2
                    </span>
                    Preparation
                  </h3>
                  <ol className="space-y-4">
                    <li className="flex">
                      <span className="font-bold text-amber-700 mr-2">1.</span>
                      <p>
                        Boil the cubed sweet potato in water until tender (about
                        10–15 minutes), then drain.
                      </p>
                    </li>
                    <li className="flex">
                      <span className="font-bold text-amber-700 mr-2">2.</span>
                      <p>
                        In a blender, combine the cooked sweet potato with soy
                        milk, cinnamon, and a scoop of Vitalis GlucoBalance+.
                        Blend until smooth.
                      </p>
                    </li>
                    <li className="flex">
                      <span className="font-bold text-amber-700 mr-2">3.</span>
                      <p>
                        Pour the mixture into a small pot and heat gently while
                        stirring, being careful not to boil.
                      </p>
                    </li>
                    <li className="flex">
                      <span className="font-bold text-amber-700 mr-2">4.</span>
                      <p>
                        Add a pinch of salt to balance the sweetness, and stir
                        until the texture is creamy and evenly warm.
                      </p>
                    </li>
                    <li className="flex">
                      <span className="font-bold text-amber-700 mr-2">5.</span>
                      <p>
                        Serve in a small bowl with optional garnish like ground
                        sesame seeds. Enjoy as an evening treat or midday
                        nourishment.
                      </p>
                    </li>
                  </ol>
                </div>
              </div>
            </div>

            {/* Recipe 3: Creamy Rice with Vitalis GlucoBalance+ */}
            <div className="mb-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-8">
                <div className="order-2 lg:order-1">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-1 bg-indigo-600 mr-4"></div>
                    <span className="text-indigo-600 uppercase font-medium tracking-wider text-sm">
                      Functional Rice
                    </span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-6">
                    Creamy Rice with Vitalis GlucoBalance+
                  </h2>
                  <div className="bg-indigo-50 p-6 rounded-lg mb-8">
                    <h3 className="font-medium text-lg mb-2 text-indigo-800">
                      Nutritional Benefits
                    </h3>
                    <p className="text-gray-700">
                      Vitalis GlucoBalance+ contains functional ingredients such
                      as moringa, cinnamon, and star fruit, which have shown
                      beneficial properties for blood sugar control. This makes
                      it an ideal supplement for older adults living with
                      prediabetes, type 2 diabetes, or simply seeking to
                      stabilize their blood sugar levels. Incorporating it into
                      a simple dish like creamy Japanese rice, a common
                      breakfast for many older adults in Japan, ensures gradual
                      carbohydrate absorption and provides anti-inflammatory and
                      antioxidant nutrients. This smooth recipe does not
                      interfere with the traditional texture of gohan, allowing
                      it to be part of an everyday diet without altering
                      cultural flavors.
                    </p>
                  </div>
                </div>
                <div className="order-1 lg:order-2 relative">
                  <div className="aspect-square w-full overflow-hidden rounded-2xl shadow-lg">
                    <Image
                      src="/recipes/creamy_rice.jpeg"
                      alt="Creamy Rice with Vitalis GlucoBalance+"
                      width={600}
                      height={600}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <span className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 mr-3">
                      1
                    </span>
                    Ingredients
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-indigo-700 mr-2">•</span>
                      <span>1 scoop of Vitalis GlucoBalance+</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-indigo-700 mr-2">•</span>
                      <span>½ cup cooked Japanese rice</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-indigo-700 mr-2">•</span>
                      <span>½ cup warm vegetable broth (no added salt)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-indigo-700 mr-2">•</span>
                      <span>1 teaspoon grated fresh ginger</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-indigo-700 mr-2">•</span>
                      <span>1 pinch low-sodium sea salt (optional)</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <span className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 mr-3">
                      2
                    </span>
                    Preparation
                  </h3>
                  <ol className="space-y-4">
                    <li className="flex">
                      <span className="font-bold text-indigo-700 mr-2">1.</span>
                      <p>Cook the rice as usual and keep warm.</p>
                    </li>
                    <li className="flex">
                      <span className="font-bold text-indigo-700 mr-2">2.</span>
                      <p>
                        In a small saucepan, heat the vegetable broth and
                        dissolve the scoop of Vitalis GlucoBalance+ in it,
                        stirring with a wooden spoon.
                      </p>
                    </li>
                    <li className="flex">
                      <span className="font-bold text-indigo-700 mr-2">3.</span>
                      <p>
                        Add the grated ginger and mix well to flavor the broth.
                      </p>
                    </li>
                    <li className="flex">
                      <span className="font-bold text-indigo-700 mr-2">4.</span>
                      <p>
                        Add the hot rice to the prepared broth and stir over low
                        heat until it reaches a creamy texture.
                      </p>
                    </li>
                    <li className="flex">
                      <span className="font-bold text-indigo-700 mr-2">5.</span>
                      <p>
                        Serve in a bowl, garnishing with chopped scallions or
                        finely chopped nori seaweed, if desired.
                      </p>
                    </li>
                  </ol>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="mt-16 p-8 bg-emerald-50 rounded-xl text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Ready to Try These Recipes?
              </h3>
              <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
                Get your Vitalis supplements today and start enhancing your
                daily nutrition with these delicious recipes.
              </p>
              <Link
                href="/buy/individual/bundle"
                className="inline-flex items-center justify-center px-8 py-3 bg-emerald-700 text-white font-medium rounded-md hover:bg-emerald-800 transition-colors"
              >
                Shop Vitalis Products
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
