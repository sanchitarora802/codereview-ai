"use client";

import { useState } from "react";
import Link from "next/link";
import { NAV_LINKS, APP_CONFIG } from "@/constants";
import FeatureIcon from "@/components/shared/FeatureIcon";
import useLayoutStore from "@/store/layoutStore";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const { changeModal } = useLayoutStore();

  const handleHashClick = (e, href) => {
    if (!href.startsWith("/#")) return;
    e.preventDefault();
    const targetId = href.split("#")[1];
    const el = document.getElementById(targetId);
    if (el) {
      el.classList.remove("animate-fadeIn");
      // Force reflow to restart animation
      void el.offsetWidth;
      el.classList.add("animate-fadeIn");
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setMobileMenuOpen(false);
    } else {
      router.push("/");
      setTimeout(() => {
        let el = document.getElementById(targetId);
        console.log("el", el, targetId);
        el?.classList.remove("animate-fadeIn");
        void el.offsetWidth;
        el.classList.add("animate-fadeIn");
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        setMobileMenuOpen(false);
      }, 800);
    }
  };

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
                onClick={(e) => handleHashClick(e, link.href)}
                className="text-gray-600 hover:text-gray-900 transition"
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={() => changeModal("login")}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
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
                onClick={(e) => handleHashClick(e, link.href)}
                className="block py-2 text-gray-600 hover:text-gray-900"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/dashboard"
              className="mt-4 w-full inline-block text-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Get Started Free
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
