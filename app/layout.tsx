import type React from "react";
import "@/app/globals.css";
import { AuthProvider } from "@/lib/auth-context";
import { CartProviderWrapper } from "@/components/cart-provider-wrapper";

export const metadata = {
  title: "Vitalis | Tropical Superfood Powder",
  description:
    "Vitalis is a daily superfood powder packed with nutrient-rich fruits from Colombia and Costa Rica to boost your energy, support your immune system, and enhance your overall wellbeing.",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <CartProviderWrapper>{children}</CartProviderWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}
