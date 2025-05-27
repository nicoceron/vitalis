"use client";

// Use edge runtime to reduce serverless function count
export const runtime = "edge";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site-header";
import { ArrowRight, Minus, Plus, Trash } from "lucide-react";
import { useCart } from "@/lib/cartContext";

export default function CartPage() {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    itemCount,
  } = useCart();

  // Calculate shipping
  const shipping = subtotal >= 100 ? 0 : 5.95;
  const total = subtotal + shipping;

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1 bg-[#f8f8f6] p-6 md:p-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart</h1>

          {cartItems.length === 0 ? (
            <div className="bg-white rounded-lg p-12 text-center border">
              <h2 className="text-xl font-medium text-gray-900 mb-4">
                Your cart is empty
              </h2>
              <p className="text-gray-500 mb-8">
                Looks like you haven't added any products to your cart yet.
              </p>
              <Button asChild>
                <Link
                  href="/buy"
                  className="bg-emerald-700 hover:bg-emerald-800 text-white py-2 px-6"
                >
                  Browse Products
                </Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="md:col-span-2">
                <div className="bg-white rounded-lg overflow-hidden border mb-4">
                  <div className="divide-y">
                    {cartItems.map((item) => (
                      <div key={item.id} className="p-6 flex items-start">
                        <div className="w-20 h-20 relative flex-shrink-0">
                          <Image
                            src={
                              item.name.includes("Bundle") ||
                              item.name.includes("Variety Pack")
                                ? "/pack.jpeg"
                                : item.image
                            }
                            alt={item.name}
                            fill
                            className="object-cover rounded"
                          />
                        </div>
                        <div className="ml-4 flex-1">
                          <h3 className="font-medium text-gray-900">
                            {item.name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {item.description}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            {item.type}
                          </p>

                          <div className="flex justify-between items-center mt-4">
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                                className="p-1 rounded-full border hover:bg-gray-100"
                              >
                                <Minus size={16} />
                              </button>
                              <span className="w-8 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                                className="p-1 rounded-full border hover:bg-gray-100"
                              >
                                <Plus size={16} />
                              </button>
                            </div>
                            <div className="flex items-center">
                              <p className="font-medium mr-4">
                                ${(item.price * item.quantity).toFixed(2)}
                              </p>
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="p-1 text-gray-400 hover:text-red-500"
                              >
                                <Trash size={18} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <button
                    onClick={clearCart}
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    Clear cart
                  </button>
                  <Link
                    href="/buy"
                    className="text-sm text-emerald-700 hover:text-emerald-800 font-medium"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>

              {/* Order Summary */}
              <div className="md:col-span-1">
                <div className="bg-white rounded-lg p-6 border sticky top-8">
                  <h2 className="text-lg font-bold text-gray-900 mb-4">
                    Order Summary
                  </h2>
                  <div className="space-y-3 text-sm border-b pb-4 mb-4">
                    <div className="flex justify-between">
                      <span>Subtotal ({itemCount} items)</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>
                        {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                      </span>
                    </div>
                    {shipping > 0 && (
                      <p className="text-xs text-emerald-700">
                        Free shipping on orders over $100
                      </p>
                    )}
                  </div>
                  <div className="flex justify-between font-bold text-base mb-6">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <Button asChild>
                    <Link
                      href="/checkout"
                      className="w-full bg-emerald-800 hover:bg-emerald-900 text-white py-6 flex items-center justify-center"
                    >
                      Proceed to Checkout{" "}
                      <span className="ml-2">
                        <ArrowRight size={20} />
                      </span>
                    </Link>
                  </Button>
                  <div className="mt-4 text-xs text-gray-500 text-center">
                    Secure checkout powered by Stripe
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
