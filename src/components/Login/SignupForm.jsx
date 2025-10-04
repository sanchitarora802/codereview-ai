import React, { useState } from "react";
import InputField from "../shared/InputField";
import Loading from "../shared/Loading";
import FeatureIcon from "../shared/FeatureIcon";
import Button from "../shared/Button";

const SignupForm = ({ email, onBack }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    // setIsLoading(true);
  };

  return (
    <div className="">
      <h2 className="text-3xl font-extrabold text-gray-900 text-center">
        Sign up
      </h2>

      <div className="text-sm mb-6 text-center">
        <p className="text-gray-500">
          Signing up as{" "}
          <span className="font-medium text-gray-700">{email}</span>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="rounded-lg bg-red-50 p-3 text-sm font-medium text-red-700 border border-red-200">
            {error}
          </div>
        )}

        <InputField
          id="name"
          label="Full Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={isLoading}
          placeholder="Full Name"
          required
        />
        <InputField
          id="password"
          label="Create Password (min 8 chars)"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
          placeholder="Create Password (min 8 chars)"
          minLength={8}
          required
        />
        <InputField
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          disabled={isLoading}
          placeholder="Confirm Password"
          required
        />

        <Button
          type="submit"
          size="large"
          disabled={
            isLoading ||
            !name ||
            password.length < 8 ||
            password !== confirmPassword
          }
          className="w-full shadow-lg transition transform hover:scale-[1.005]"
        >
          {isLoading ? <Loading size="small" text="" /> : "Sign Up"}
        </Button>
      </form>
    </div>
  );
};

export default SignupForm;
