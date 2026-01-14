"use client";

import Button from "@/components/shared/Button";
import FeatureIcon from "@/components/shared/FeatureIcon";
import { APP_CONFIG } from "@/constants";
import { useAuthStore } from "@/store/authStore";
import useLayoutStore from "@/store/layoutStore";

export default function HeroSection() {
  const { changeModal } = useLayoutStore();
  const { user } = useAuthStore();

  return (
    <>
      <section className="container px-[20px] pt-[30px]">
        {user && (
          <span className="text-5xl font-bold text-gray-800">
            Welcome {user?.name} 👋
          </span>
        )}
      </section>
      <section className="container mx-auto px-4 pt-20 pb-16">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
            </span>
            AI-Powered Code Analysis
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
            Ship Better Code,
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
              10x Faster
            </span>
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            {APP_CONFIG.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => changeModal("login")}
              variant="primary"
              size="large"
            >
              Start Free Trial
            </Button>
            <Button
              variant="outline"
              size="large"
              onClick={() =>
                document
                  .getElementById("demo-section")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              View Demo
            </Button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 mt-12 text-sm text-gray-600">
            <TrustBadge text="No credit card required" />
            <TrustBadge text="14-day free trial" />
            <TrustBadge text="Cancel anytime" />
          </div>
        </div>
      </section>
    </>
  );
}

function TrustBadge({ text }) {
  return (
    <div className="flex items-center gap-2">
      <FeatureIcon icon="checkCircle" size={20} className="text-green-500" />
      {text}
    </div>
  );
}
