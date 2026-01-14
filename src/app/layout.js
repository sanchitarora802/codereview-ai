"use client";

import Footer from "@/components/layout/Footer";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import AuthModal from "@/components/Modals/AuthModal";
import useLayoutStore from "@/store/layoutStore";
import { useEffect } from "react";
import { getCookie } from "@/utils/cookies";
import { useAuthStore } from "@/store/authStore";

export default function RootLayout({ children }) {
  const { showModal, changeModal } = useLayoutStore();
  const { getUserProfile } = useAuthStore();

  const componentToRender = () => {
    return children;
  };

  const fetchProfile = async () => {
    const token = getCookie(process.env.NEXT_PUBLIC_Token);
    getUserProfile(token);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <html lang="en">
      <head>
        <meta
          name="description"
          content="Get instant AI-powered feedback on your code. Find bugs, security issues, and performance problems."
        />
        <title>CodeReviewAI - AI-Powered Code Analysis</title>
      </head>
      <body>
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
          <Navbar />
          <main
            className="transition-opacity duration-300 ease-in-out opacity-100 animate-fadeIn"
            id="route-container"
          >
            {componentToRender()}
          </main>
          {showModal === "login" && <AuthModal setShowModal={changeModal} />}
          <Footer />
        </div>
      </body>
    </html>
  );
}
