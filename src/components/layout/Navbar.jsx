"use client";

import { useState } from "react";
import Link from "next/link";
import { NAV_LINKS, APP_CONFIG } from "@/constants";
import FeatureIcon from "@/components/shared/FeatureIcon";
import useLayoutStore from "@/store/layoutStore";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { routeNames } from "@/utils/routes";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const { changeModal } = useLayoutStore();
  const { user, logout } = useAuthStore();

  const handleHashClick = (e, href) => {
    if (!href.startsWith("/#")) return;
    e.preventDefault();
    const targetId = href.split("#")[1];
    const el = document.getElementById(targetId);
    if (el) {
      el.classList.remove("animate-fadeIn");
      void el.offsetWidth;
      el.classList.add("animate-fadeIn");
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setMobileMenuOpen(false);
    } else {
      router.push("/");
      setTimeout(() => {
        let el = document.getElementById(targetId);
        el?.classList.remove("animate-fadeIn");
        void el.offsetWidth;
        el.classList.add("animate-fadeIn");
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        setMobileMenuOpen(false);
      }, 800);
    }
  };

  const getUserDetails = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleMenuToggle = () => {
      setIsMenuOpen(!isMenuOpen);
    };

    if (user?.email) {
      return (
        <div
          onClick={handleMenuToggle}
          className="relative cursor-pointer flex flex-row justify-center items-end gap-2 py-1 px-2 rounded-lg"
        >
          <FeatureIcon icon={"userprofile"} size={20} />
          {!isMenuOpen ? (
            <FeatureIcon icon={"chevronDown"} size={18} />
          ) : (
            <FeatureIcon icon={"chevronUp"} size={18} />
          )}

          {isMenuOpen && (
            <ul className="absolute top-[45px] right-[-3px] w-40 overflow-hidden border border-2 rounded-lg">
              <li className="flex justify-center items-center text-gray-800 hover:bg-gray-100 transition py-[10px] px-[10px]">
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    router.push(routeNames.dashboard);
                  }}
                >
                  Dashboard
                </a>
              </li>
              <li className="flex justify-center items-center text-red-800 hover:hover:bg-gray-100 transition py-[10px] px-[10px]">
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    logout();
                  }}
                >
                  Logout
                </a>
              </li>
            </ul>
          )}
        </div>
      );
    } else {
      return (
        <button
          onClick={() => changeModal("login")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Get Started Free
        </button>
      );
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
            {getUserDetails()}
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
            {getUserDetails()}
          </div>
        )}
      </div>
    </nav>
  );
}
