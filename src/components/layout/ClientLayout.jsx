"use client";

import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AuthModal from "@/components/Modals/AuthModal";
import useLayoutStore from "@/store/layoutStore";
import { getCookie } from "@/utils/cookies";
import { useAuthStore } from "@/store/authStore";

export default function ClientLayout({ children }) {
  const { showModal, changeModal } = useLayoutStore();
  const { getUserProfile } = useAuthStore();

  useEffect(() => {
    const token = getCookie(process.env.NEXT_PUBLIC_Token);
    getUserProfile(token);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Navbar />
      <main
        className="transition-opacity duration-300 ease-in-out opacity-100 animate-fadeIn"
        id="route-container"
      >
        {children}
      </main>
      {showModal === "login" && <AuthModal setShowModal={changeModal} />}
      <Footer />
    </div>
  );
}
