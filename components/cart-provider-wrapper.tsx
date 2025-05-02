"use client";

import { ReactNode } from "react";
import { CartProvider } from "@/lib/cartContext";

export function CartProviderWrapper({ children }: { children: ReactNode }) {
  return <CartProvider>{children}</CartProvider>;
}
