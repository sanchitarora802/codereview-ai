"use client";

import { useState } from "react";
import Link from "next/link";
import { NAV_LINKS, APP_CONFIG } from "@/constants";
import FeatureIcon from "@/components/shared/FeatureIcon";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <FeatureIcon icon="code" size={32} className="text-blue-600" />
            <span className="text-xl font-bold">
              {APP_CONFIG.name.replace("AI", "")}
              <span className="text-blue-600">AI</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-600 hover:text-gray-900 transition"
              >
                {link.label}
              </Link>
            ))}
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
              Get Started Free
            </button>
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <FeatureIcon icon={mobileMenuOpen ? "close" : "menu"} size={24} />
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-2 text-gray-600 hover:text-gray-900"
              >
                {link.label}
              </Link>
            ))}
            <button className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
              Get Started Free
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
