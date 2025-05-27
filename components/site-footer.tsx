import Link from "next/link";
import { Instagram } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t py-6 md:py-8 bg-white">
      <div className="container flex flex-col gap-4 px-4 md:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-emerald-700">Vitalis</span>
            <span className="text-xs align-top">®</span>
          </div>
          <nav className="flex gap-4 sm:gap-6 items-center">
            <Link
              href="#"
              className="text-xs hover:underline underline-offset-4"
            >
              Terms
            </Link>
            <Link
              href="#"
              className="text-xs hover:underline underline-offset-4"
            >
              Privacy
            </Link>
            <Link
              href="#"
              className="text-xs hover:underline underline-offset-4"
            >
              Contact
            </Link>
            <Link
              href="https://www.instagram.com/vitalispd/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-emerald-700 transition-colors"
              aria-label="Vitalis Instagram"
            >
              <Instagram size={18} />
            </Link>
          </nav>
        </div>
        <div className="text-xs text-gray-500">
          *These statements have not been evaluated by the Food and Drug
          Administration. This product is not intended to diagnose, treat, cure,
          or prevent any disease.
        </div>
        <div className="text-xs text-gray-500">
          © {new Date().getFullYear()} Vitalis. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
