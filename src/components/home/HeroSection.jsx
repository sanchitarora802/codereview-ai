"use client";
import Link from "next/link";
import Button from "@/components/shared/Button";
import { APP_CONFIG } from "@/constants";

export default function HeroSection() {
  return (
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
          <Link href="/dashboard">
            <Button variant="primary" size="large">
              Start Free Trial
            </Button>
          </Link>
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
          <TrustBadge icon="check" text="No credit card required" />
          <TrustBadge icon="check" text="14-day free trial" />
          <TrustBadge icon="check" text="Cancel anytime" />
        </div>
      </div>
    </section>
  );
}

function TrustBadge({ icon, text }) {
  return (
    <div className="flex items-center gap-2">
      {/* <svg
        className="w-5 h-5 text-green-500"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
        />
      </svg> */}
      {text}
    </div>
  );
}
