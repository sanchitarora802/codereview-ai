"use client";

import { useState } from "react";
import Link from "next/link";
import Button from "@/components/shared/Button";
import Card from "@/components/shared/Card";
import FeatureIcon from "@/components/shared/FeatureIcon";
import { PRICING_PLANS, PRICING_FEATURES, FAQ_DATA } from "@/constants";

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState("monthly");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Simple,{" "}
              <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                Transparent Pricing
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Choose the perfect plan for your development team. Start free and
              scale as you grow.
            </p>

            {/* Billing Toggle */}
            <div className="flex flex-col items-center gap-3 mb-8">
              <p className="text-sm text-gray-500">
                Pay annually and save{" "}
                <span className="text-green-600 font-semibold">20%</span>
              </p>
              <div className="inline-flex rounded-xl bg-gray-100 p-1">
                <button
                  onClick={() => setBillingCycle("yearly")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    billingCycle === "yearly"
                      ? "bg-white text-gray-900 shadow"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Annually
                  <span
                    className={`text-xs font-medium rounded-full px-2 py-0.5 ${
                      billingCycle === "yearly"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    Save 20%
                  </span>
                </button>
                <button
                  onClick={() => setBillingCycle("monthly")}
                  className={`ml-1 px-4 py-2 rounded-lg transition-all ${
                    billingCycle === "monthly"
                      ? "bg-white text-gray-900 shadow"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Monthly
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {PRICING_PLANS.map((plan, index) => (
              <PricingCard
                key={plan.id}
                plan={plan}
                billingCycle={billingCycle}
                isPopular={plan.popular}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Comparison */}
      {/* <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Compare Features
            </h2>
            <p className="text-lg text-gray-600">
              See what's included in each plan
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">
                      Features
                    </th>
                    {PRICING_PLANS.map((plan) => (
                      <th
                        key={plan.id}
                        className="text-center py-4 px-6 font-semibold text-gray-900"
                      >
                        {plan.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {PRICING_FEATURES.map((feature, index) => (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="py-4 px-6 text-gray-700">
                        <div className="flex items-center gap-2">
                          <FeatureIcon
                            icon={feature.icon}
                            size={20}
                            className="text-blue-600"
                          />
                          {feature.name}
                        </div>
                      </td>
                      {PRICING_PLANS.map((plan) => (
                        <td key={plan.id} className="text-center py-4 px-6">
                          {plan.features.includes(feature.id) ? (
                            <FeatureIcon
                              icon="checkCircle"
                              size={20}
                              className="text-green-500 mx-auto"
                            />
                          ) : (
                            <span className="text-gray-400">—</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section> */}

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Everything you need to know about our pricing
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              {FAQ_DATA.map((faq, index) => (
                <Card key={index} className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-violet-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to improve your code quality?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of developers who trust CodeReviewAI to catch bugs
            and improve their code.
          </p>
          <div className="flex justify-center">
            <Link href="/dashboard">
              <Button variant="secondary" size="large">
                Start Free Trial
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function PricingCard({ plan, billingCycle, isPopular, index }) {
  const price =
    billingCycle === "yearly" ? plan.yearlyPrice : plan.monthlyPrice;
  const originalPrice =
    billingCycle === "yearly" ? plan.monthlyPrice * 12 : null;

  return (
    <Card
      className={`relative p-8 ${
        // isPopular
        //   ? "ring-2 ring-blue-500 shadow-xl scale-105"
        //   : "hover:shadow-lg transition-shadow duration-200"
        "hover:shadow-lg transition-shadow duration-200"
      }`}
    >
      {/* {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
            Most Popular
          </span>
        </div>
      )} */}

      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
        <p className="text-gray-600 mb-6">{plan.description}</p>

        <div className="mb-6">
          <div className="flex items-baseline justify-center">
            <span className="text-5xl font-bold text-gray-900">${price}</span>
            <span className="text-gray-600 ml-1">
              /{billingCycle === "yearly" ? "year" : "month"}
            </span>
          </div>
        </div>

        {/* original price for yearly billing - styled inline with theme */}
        {originalPrice && billingCycle === "yearly" && (
          <div className="flex items-center justify-center gap-2 mt-3">
            <span className="text-base text-gray-500 line-through">
              ${originalPrice}
            </span>
            <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
              Save {Math.round(((originalPrice - price) / originalPrice) * 100)}
              %
            </span>
          </div>
        )}

        <Link href="/dashboard">
          <Button
            variant={isPopular ? "primary" : "outline"}
            size="large"
            className="w-full"
          >
            {plan.cta}
          </Button>
        </Link>
      </div>

      <div className="space-y-4">
        <h4 className="font-semibold text-gray-900 mb-3">What's included:</h4>
        <ul className="space-y-3">
          {plan.features.map((featureId) => {
            const feature = PRICING_FEATURES.find((f) => f.id === featureId);
            return feature ? (
              <li key={featureId} className="flex items-center gap-3">
                <FeatureIcon
                  icon="checkCircle"
                  size={16}
                  className="text-green-500 flex-shrink-0"
                />
                <span className="text-gray-700">{feature.name}</span>
              </li>
            ) : null;
          })}
        </ul>
      </div>
    </Card>
  );
}
