import React, { useState } from "react";
import InputField from "../shared/InputField";
import Loading from "../shared/Loading";
import Button from "../shared/Button";
import FeatureIcon from "../shared/FeatureIcon";

const LoginForm = ({ email, onBack }) => {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    // setIsLoading(true);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-extrabold text-gray-900 text-center">
        Welcome Back!
      </h2>

      <div className="flex items-center justify-center text-sm">
        <p className="text-gray-500">
          Logging in as:{" "}
          <span className="font-medium text-gray-700">{email}</span>
        </p>
        {/* <Button
          variant="tertiary"
          size="small"
          onClick={onBack}
          className="!py-0 !px-0" // Override padding for link-like appearance
        >
          <FeatureIcon icon="back" size={12} className="mr-1" />
          Change Email
        </Button> */}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="rounded-lg bg-red-50 p-3 text-sm font-medium text-red-700 border border-red-200">
            {error}
          </div>
        )}

        <InputField
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
          placeholder="Enter your password"
          required
        />

        <Button
          type="submit"
          size="large"
          disabled={isLoading || password.length < 6}
          className="w-full shadow-lg transition transform hover:scale-[1.005]"
        >
          {isLoading ? <Loading size="small" text="" /> : "Log In"}
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
