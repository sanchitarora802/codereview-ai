"use client";

import "../../app/globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function ClientLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Navbar />
      <main
        className="transition-opacity duration-300 ease-in-out opacity-100"
        id="route-container"
      >
        {children}
      </main>
      <Footer />
    </div>
  );
}
