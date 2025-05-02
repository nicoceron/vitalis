"use client";

import Link from "next/link";
import { UserMenu } from "@/components/user-menu";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/cartContext";

export function SiteHeader() {
  const { itemCount } = useCart();

  return (
    <header className="border-b bg-white">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-emerald-700">Vitalis</span>
          <span className="text-xs align-top">®</span>
        </Link>
        <nav className="hidden md:flex gap-6 items-center">
          <Link
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            About Vitalis
          </Link>
          <Link
            href="/ingredients"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Ingredients
          </Link>
          <Link
            href="/research"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Research
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/cart" className="relative">
            <div className="h-6 w-6">
              <ShoppingCart size={24} />
            </div>
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-emerald-700 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
