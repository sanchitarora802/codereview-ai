"use client";

import Footer from "@/components/layout/Footer";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import LoginModal from "@/components/Modals/LoginModal";
import useLayoutStore from "@/store/layoutStore";

export default function RootLayout({ children }) {
  const { showModal, changeModal } = useLayoutStore();

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
            {children}
          </main>
          {showModal === "login" && <LoginModal setShowModal={changeModal} />}
          <Footer />
        </div>
      </body>
    </html>
  );
}
