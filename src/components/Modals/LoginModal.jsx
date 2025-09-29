"use client";

import React, { useState } from "react";
import Modal from "../shared/Modal";
import Loading from "../shared/Loading";
import FeatureIcon from "../shared/FeatureIcon";

const LoginModal = ({ setShowModal }) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!email.trim() || !email.includes("@")) {
      setMessage({
        type: "error",
        text: "Please enter a valid email address.",
      });
      return;
    }

    setIsLoading(true);

    // --- Placeholder for API Call ---
    // This is where you will integrate your backend (Ruby on Rails) API call.
    // The API will check if this email exists to determine whether to show
    // a password field (Login) or a name field (Signup).
    console.log(`Checking email: ${email}`);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    // --- End Placeholder ---

    setIsLoading(false);
    setMessage({
      type: "success",
      text: `Email confirmed! Ready for password or magic link flow.`,
    });
  };

  return (
    <Modal
      title=""
      size="small"
      onClose={() => {
        setShowModal("");
      }}
    >
      <div className="w-full max-w-md p-8 bg-white">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-2">
          Get Started
        </h2>
        <p className="text-center text-sm text-gray-500 mb-8">
          Enter your email to get started.
        </p>

        <button
          onClick={() => setShowModal("")}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition duration-150 rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <FeatureIcon icon="close" size={24} />
        </button>

        {/* Message Area (Success/Error) */}
        {message && (
          <div
            className={`rounded-lg p-3 mb-4 text-sm font-medium border ${
              message.type === "error"
                ? "bg-red-50 text-red-600 border-red-200"
                : "bg-green-50 text-green-600 border-green-200"
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <div className="relative">
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setMessage(null); // Clear message on input
                }}
                disabled={isLoading}
                placeholder="Your email address"
                className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 pr-12 transition duration-150 sm:text-sm"
              />
              {/* Next Button / Icon */}
              <button
                type="submit"
                disabled={isLoading}
                className={`absolute right-1 top-1 h-8 w-8 flex items-center justify-center rounded-lg text-white transition duration-300
                ${
                  isLoading
                    ? "bg-indigo-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform hover:scale-105"
                }`}
                aria-label="Next Step"
              >
                {isLoading ? (
                  //   <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <Loading size="small" text="" />
                ) : (
                  <FeatureIcon icon="arrowRight" size={24} />
                )}
              </button>
            </div>
          </div>
        </form>

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

export default LoginModal;
