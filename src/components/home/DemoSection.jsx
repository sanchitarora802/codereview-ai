"use client";

import CodeUploader from "@/components/shared/CodeUploader";
import StatusBadge from "@/components/shared/StatusBadge";
import Card from "@/components/shared/Card";
import { ISSUE_TYPES } from "@/constants";
import FeatureIcon from "../shared/FeatureIcon";
import { useReviewStore } from "@/store/reviewStore";
import { useAuthStore } from "@/store/authStore";
import Button from "../shared/Button";
import useLayoutStore from "@/store/layoutStore";

export default function DemoSection() {
  const { reviewResult, error } = useReviewStore();
  const { user } = useAuthStore();
  const { changeModal } = useLayoutStore();

  return (
    <section id="demo-section" className="container mx-auto px-4 py-20">
      {user?.email && (
        <>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Experience the power of AI-driven code analysis
            </h2>
          </div>

          <div className="flex justify-center gap-5">
            <Button
              onClick={() => console.log("hello")}
              variant="primary"
              size="large"
            >
              {"Get Started 🚀"}
            </Button>
            {!user?.paidPlan && (
              <Button
                variant="outline"
                size="large"
                onClick={() => window.location.replace("/pricing")}
              >
                <>
                  <svg
                    width="24px"
                    height="24px"
                    viewBox="0 0 512 512"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#ffffff"
                    stroke="#ffffff"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path
                        fill="#000000"
                        d="M237.4 20.73c-6.1 42.1-26.8 64.2-63.9 64 31.6 4.5 63.8 8 63.9 64.07-.6-46.1 24.5-63.07 64.1-64.07-38-1.5-64.9-16.3-64.1-64zm127.8 11.58c-9.1 14.25-20.8 21.29-38.9 10.28 14.9 11.79 18.6 24.76 10.2 38.97 8.9-11.18 17.5-22.73 39-10.27-17.8-10.06-18.8-23.57-10.3-38.98zM59.68 41.69c-2.7 18.8-12 28.6-28.5 28.5 14.1 2 28.4 3.6 28.5 28.52-.3-20.5 10.9-28.12 28.5-28.52-16.9-.7-28.9-7.3-28.5-28.5zM431 66.28c-2.7 18.8-12 28.6-28.5 28.5 14.1 2 28.4 3.6 28.5 28.52-.3-20.5 10.9-28.12 28.5-28.52-16.9-.7-28.9-7.3-28.5-28.5zM120.3 116.4c-15.8 53.7-47.76 48-79.35 43.4C76.6 170 90.3 197.1 84.28 239.2c12.66-46 42.62-52.6 79.42-43.4-37.6-12.1-56.9-35.4-43.4-79.4zm187 5c-8.8 61.6-39.3 94-93.6 93.7 46.2 6.5 93.6 11.7 93.6 93.7-.8-67.3 35.9-92.2 93.8-93.7-55.5-2.2-94.9-23.9-93.8-93.7zm136.8 38.3c-13.1 21.6-29.5 28.8-49.7 20.1 16.3 9.7 33 19.1 20.1 49.6 10.3-25.2 27.9-28.7 49.7-20-20.3-9.7-31.6-23.9-20.1-49.7zM50.7 243.2c9.16 16.7 7.63 30.1-5.61 40 12.46-6.9 24.85-14.3 39.91 5.6-12.57-16.2-8.2-29 5.61-40-13.92 9.7-27.47 11.6-39.91-5.6zm137.2.3c11.4 26.8-.5 41.3-21.7 50.9 22.7-8.5 40.8-4.5 50.9 21.7-12.7-31.8 4.8-41.2 21.7-50.9-21 8.5-37.8.9-50.9-21.7zm228 12.6c-26.6 64.7-68.7 91.7-127.8 76.4 48.6 19.8 98.8 38.5 76.4 127.9 17.5-73.7 64.4-90.7 127.9-76.5-59.9-17.5-96.9-52-76.5-127.8zM99.94 295.5c15.66 57.8.86 98.1-47.32 118.5 43.46-11.8 87.38-25.2 118.68 47.4-26.4-59.3-3.4-95.4 47.3-118.8-50 19.2-93.1 15-118.66-47.1zm169.36 61c-21.8 20.6-43 23.6-63.2 7.3 15.5 16.3 31.6 32.4 7.2 63.3 19.8-25.6 41.2-24.1 63.3-7.3-20.2-17.4-28.6-37.5-7.3-63.3zM443.2 404c-2.7 18.8-12 28.6-28.5 28.5 14.1 2 28.4 3.6 28.5 28.5-.3-20.5 10.9-28.1 28.5-28.5-16.9-.7-28.9-7.3-28.5-28.5zm-169.7 36c-2.7 18.8-12 28.6-28.5 28.5 14.1 2 28.4 3.6 28.5 28.5-.3-20.5 10.9-28.1 28.5-28.5-16.9-.7-28.9-7.3-28.5-28.5z"
                      ></path>
                    </g>
                  </svg>
                  Get Premium
                </>
              </Button>
            )}
          </div>
        </>
      )}

      {!user?.email && (
        <>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Try It Now</h2>
            <p className="text-xl text-gray-600">
              Experience the power of AI-driven code analysis
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <Card className="overflow-hidden">
              <div className="bg-gray-900 px-6 py-4 border-b border-gray-800 -m-6 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="ml-4 text-sm text-gray-400">
                    Code Analyzer
                  </span>
                </div>
              </div>

              <CodeUploader isDemo={true} />

              {error && (
                <div className="mt-8 p-6 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="text-red-600 font-semibold">⚠️ Error</div>
                    <p className="text-red-700">{error}</p>
                  </div>
                </div>
              )}

              {reviewResult && (
                <div className="relative mt-8">
                  {reviewResult.blurText && (
                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/60 rounded-lg backdrop-blur-sm">
                      <p className="text-gray-800 font-semibold text-lg mb-3">
                        Sign up to see the full analysis
                      </p>
                      <Button
                        variant="primary"
                        onClick={() => {
                          changeModal("login");
                        }}
                      >
                        Get Started Free
                      </Button>
                    </div>
                  )}
                  <div
                    className={`p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg ${reviewResult.blurText ? "blur-sm select-none pointer-events-none" : ""}`}
                  >
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-semibold">
                        Analysis Complete!
                      </h3>
                      <div className="text-center">
                        <div
                          className={`text-4xl font-bold ${
                            reviewResult.score >= 80
                              ? "text-green-600"
                              : reviewResult.score >= 60
                                ? "text-yellow-600"
                                : "text-red-600"
                          }`}
                        >
                          {reviewResult.score}
                        </div>
                        <div className="text-sm text-gray-600">Score</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-4 mb-6">
                      <div className="text-center p-3 bg-white rounded-lg">
                        <div className="text-xl font-bold text-gray-900">
                          {reviewResult.issues?.length || 0}
                        </div>
                        <div className="text-xs text-gray-600">Issues</div>
                      </div>
                      <div className="text-center p-3 bg-white rounded-lg">
                        <div className="text-xl font-bold text-gray-900">
                          {reviewResult.suggestions?.length || 0}
                        </div>
                        <div className="text-xs text-gray-600">Suggestions</div>
                      </div>
                      <div className="text-center p-3 bg-white rounded-lg">
                        <div className="text-xl font-bold text-gray-900">
                          {reviewResult.executionTime}
                        </div>
                        <div className="text-xs text-gray-600">Time</div>
                      </div>
                      <div className="text-center p-3 bg-white rounded-lg">
                        <div className="text-xl font-bold text-gray-900">
                          {reviewResult.linesAnalyzed}
                        </div>
                        <div className="text-xs text-gray-600">Lines</div>
                      </div>
                    </div>

                    {reviewResult.issues && reviewResult.issues.length > 0 && (
                      <div className="mb-6">
                        <h4 className="font-medium mb-3 text-gray-700">
                          Issues Found
                        </h4>
                        <div className="space-y-2">
                          {reviewResult.issues.map((issue, idx) => (
                            <div
                              key={idx}
                              className="flex items-start gap-3 p-3 bg-white rounded-lg"
                            >
                              <StatusBadge status={issue.type} size="small">
                                {ISSUE_TYPES[issue.type]?.label || issue.type}
                              </StatusBadge>
                              <div className="flex-1">
                                <p className="text-sm text-gray-700">
                                  <span className="font-medium">
                                    Line {issue.line}:
                                  </span>
                                  {issue.message}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {reviewResult.suggestions &&
                      reviewResult.suggestions.length > 0 && (
                        <div>
                          <h4 className="font-medium mb-3 text-gray-700">
                            Recommendations
                          </h4>
                          <ul className="space-y-2">
                            {reviewResult.suggestions.map((suggestion, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <FeatureIcon
                                  icon={"greenTick"}
                                  className="w-5 h-5 text-green-500 mt-0.5"
                                />
                                <span className="text-sm text-gray-600">
                                  {suggestion}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                  </div>
                </div>
              )}
            </Card>
          </div>
        </>
      )}
    </section>
  );
}
