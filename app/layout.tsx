import type React from "react";
import "@/app/globals.css";
import "@/styles/chatbot-fix.css";
import { AuthProvider } from "@/lib/auth-context";
import { CartProviderWrapper } from "@/components/cart-provider-wrapper";
import { Toaster } from "@/components/ui/sonner";

export const metadata = {
  title: "Vitalis | Tropical Superfood Powder",
  description:
    "Vitalis is a daily superfood powder packed with nutrient-rich fruits from Colombia and Costa Rica to boost your energy, support your immune system, and enhance your overall wellbeing.",
  generator: "v0.dev",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="relative">
        <AuthProvider>
          <CartProviderWrapper>{children}</CartProviderWrapper>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
