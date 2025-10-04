"use client";

import React, { useState } from "react";
import Modal from "../shared/Modal";
import Loading from "../shared/Loading";
import FeatureIcon from "../shared/FeatureIcon";
import InputField from "../shared/InputField";
import SignupForm from "../Login/SignupForm";
import LoginForm from "../Login/LoginForm";

const AuthModal = ({ setShowModal }) => {
  // NOTE: useRouter is replaced by window.location for broad compatibility
  const [stage, setStage] = useState("password");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  let currentForm;

  const AuthIcon = ({ icon, size = 24, className = "" }) => {
    // --- Tailwind/Lucide Icons Replacement ---
    const iconMap = {
      next: (
        <svg
          className={className}
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      ),
      back: (
        <svg
          className={className}
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
      ),
      close: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      ),
    };
    return iconMap[icon] || null;
  };

  if (stage === "email") {
    currentForm = (
      <form className="mt-6 space-y-4" onSubmit={handleEmailSubmit}>
        <InputField
          label="Email address"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
          placeholder="Enter your email address"
        />
        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading || !email}
            className={`group relative flex w-full justify-center rounded-lg border border-transparent py-3 px-4 text-sm font-medium text-white shadow-md transition duration-150 ease-in-out transform hover:scale-[1.005] ${
              isLoading
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            }`}
          >
            {isLoading ? (
              <Loading size="small" text="" />
            ) : (
              <>
                Continue
                <AuthIcon type="next" size={20} className="ml-2 -mr-1" />
              </>
            )}
          </button>
        </div>
      </form>
    );
  } else if (stage === "password") {
    currentForm = <LoginForm email={email} onBack={() => setStage("email")} />;
  } else if (stage === "signup") {
    currentForm = <SignupForm email={email} onBack={() => setStage("email")} />;
  }

  return (
    <Modal
      title=""
      size="small"
      onClose={() => {
        setShowModal("");
      }}
    >
      <div className="w-full max-w-md p-8 bg-white">
        {stage === "email" && (
          <>
            <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-2">
              Get Started
            </h2>
            <p className="text-center text-sm text-gray-500 mb-8">
              Enter your email to get started.
            </p>
          </>
        )}

        <button
          onClick={() => setShowModal("")}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition duration-150 rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <FeatureIcon icon="close" size={24} />
        </button>

        {error && (
          <div className="rounded-lg bg-red-50 p-3 text-sm font-medium text-red-700 border border-red-200">
            {error}
          </div>
        )}

        {currentForm}

        {stage === "email" && (
          <div className="text-center text-sm text-gray-500 pt-2">
            Start instantly. No credit card required.
          </div>
        )}

        <div className="mt-6 text-center text-sm">
          Need help?
          <a
            href="#"
            className="ml-1 font-medium text-indigo-600 hover:text-indigo-500"
          >
            Contact support
          </a>
        </div>
      </div>
    </Modal>
  );
};

export default AuthModal;
