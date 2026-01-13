"use client";

import React, { useEffect } from "react";
import Modal from "../shared/Modal";
import Loading from "../shared/Loading";
import FeatureIcon from "../shared/FeatureIcon";
import InputField from "../shared/InputField";
import SignupForm from "../Login/SignupForm";
import LoginForm from "../Login/LoginForm";
import Button from "../shared/Button";
import { useAuthStore } from "@/store/authStore";

const AuthModal = ({ setShowModal }) => {
  let currentForm;

  const {
    stage,
    isLoading,
    error,
    currentEmail,
    setStage,
    setEmail,
    setError,
    checkUser,
  } = useAuthStore();

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    await checkUser(currentEmail);
  };

  if (stage === "email") {
    currentForm = (
      <form className="mt-6 space-y-4" onSubmit={handleEmailSubmit}>
        <InputField
          label="Email address"
          id="email"
          value={currentEmail}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
          placeholder={"Enter your email address"}
          type={"email"}
        />
        <div className="pt-2">
          <Button
            type="submit"
            disabled={isLoading || !currentEmail}
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
                <FeatureIcon icon="chevronRight" size={24} />
              </>
            )}
          </Button>
        </div>
      </form>
    );
  } else if (stage === "password") {
    currentForm = (
      <LoginForm email={currentEmail} onBack={() => setStage("email")} />
    );
  } else if (stage === "signup") {
    currentForm = (
      <SignupForm email={currentEmail} onBack={() => setStage("email")} />
    );
  }

  useEffect(() => {
    setTimeout(() => {
      setError("");
    }, [3000]);
  }, [error]);

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

        {stage !== "email" && (
          <button
            onClick={() => {
              setStage("email");
            }}
            className="absolute top-4 left-4 text-gray-600 hover:text-gray-400 transition duration-150 rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <FeatureIcon icon="chevronLeft" size={24} />
          </button>
        )}

        <button
          onClick={() => {
            setStage("email");
            setShowModal("");
            setEmail("");
          }}
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
