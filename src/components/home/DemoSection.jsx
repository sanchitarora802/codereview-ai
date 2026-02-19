"use client";

import CodeUploader from "@/components/shared/CodeUploader";
import StatusBadge from "@/components/shared/StatusBadge";
import Card from "@/components/shared/Card";
import { ISSUE_TYPES } from "@/constants";
import FeatureIcon from "../shared/FeatureIcon";
import { useReviewStore } from "@/store/reviewStore";

export default function DemoSection() {
  const { reviewResult, error, isLoading } = useReviewStore();

  return (
    <section id="demo-section" className="container mx-auto px-4 py-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Try It Now</h2>
        <p className="text-xl text-gray-600">
          Experience the power of AI-driven code analysis
        </p>
      </div>

      <div className="max-w-5xl mx-auto">
        <Card className="overflow-hidden">
          {/* Terminal-like header */}
          <div className="bg-gray-900 px-6 py-4 border-b border-gray-800 -m-6 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="ml-4 text-sm text-gray-400">Code Analyzer</span>
            </div>
          </div>

          <CodeUploader isDemo={true} />

          {/* Error Display */}
          {error && (
            <div className="mt-8 p-6 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="text-red-600 font-semibold">⚠️ Error</div>
                <p className="text-red-700">{error}</p>
              </div>
            </div>
          )}

          {reviewResult && (
            <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
              {/* Score Display */}
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold">Analysis Complete!</h3>
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

              {/* Quick Stats */}
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

              {/* Issues */}
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
                            </span>{" "}
                            {issue.message}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Suggestions */}
              {reviewResult.suggestions && reviewResult.suggestions.length > 0 && (
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
          )}
        </Card>
      </div>
    </section>
  );
}
