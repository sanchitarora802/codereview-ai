"use client";

import "../../app/globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LoginModal from "../Modals/loginModal";
import React, { useState } from "react";

export default function ClientLayout({ children }) {
  const [showModal, setShowModal] = useState("");

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { showModal, setShowModal });
    }
    return child;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Navbar setShowModal={setShowModal} />
      <main
        className="transition-opacity duration-300 ease-in-out opacity-100"
        id="route-container"
      >
        {childrenWithProps}
      </main>
      {showModal === "login" && <LoginModal setShowModal={setShowModal} />}
      <Footer />
    </div>
  );
}
