"use client";

import Link from "next/link";
import { UserMenu } from "@/components/user-menu";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/cartContext";
import { useAuth } from "@/lib/auth-context";

export function SiteHeader() {
  const { itemCount } = useCart();
  const { user } = useAuth();

  return (
    <header className="border-b bg-white">
      <div className="container flex h-20 items-center justify-between px-4 md:px-6">
        <div className="flex-shrink-0 mr-8">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-3xl font-bold text-emerald-700">Vitalis</span>
            <span className="text-xs align-top">®</span>
          </Link>
        </div>

        <div className="flex items-center justify-end flex-1">
          <nav className="hidden md:flex gap-8 items-center mr-8">
            <Link
              href="/ingredients"
              className="text-lg font-light hover:underline hover:decoration-emerald-700 underline-offset-4 tracking-normal"
            >
              Ingredients
            </Link>
            <Link
              href="/research"
              className="text-lg font-light hover:underline hover:decoration-emerald-700 underline-offset-4 tracking-normal"
            >
              Research
            </Link>
            <Link
              href="/recipes"
              className="text-lg font-light hover:underline hover:decoration-emerald-700 underline-offset-4 tracking-normal"
            >
              Recipes
            </Link>
            <Link
              href="/about"
              className="text-lg font-light hover:underline hover:decoration-emerald-700 underline-offset-4 tracking-normal"
            >
              About
            </Link>
            {user?.isAdmin && (
              <Link
                href="/admin"
                className="text-lg font-light text-emerald-700 hover:underline hover:decoration-emerald-700 underline-offset-4"
              >
                Admin
              </Link>
            )}
          </nav>

          <div className="flex items-center gap-6">
            <Link href="/cart" className="relative">
              <div className="h-7 w-7">
                <ShoppingCart size={28} />
              </div>
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-emerald-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
            <UserMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
