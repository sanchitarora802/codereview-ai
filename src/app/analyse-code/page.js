"use client";

import Card from "@/components/shared/Card";
import Button from "@/components/shared/Button";
import StatusBadge from "@/components/shared/StatusBadge";
import FeatureIcon from "@/components/shared/FeatureIcon";
import CodeUploader from "@/components/shared/CodeUploader";
import { ISSUE_TYPES, ANALYSE_HOW_IT_WORKS, ANALYSE_WHAT_WE_CHECK } from "@/constants";
import { getScoreColor } from "@/utils/helpers";
import { useReviewStore } from "@/store/reviewStore";
import { useEffect } from "react";

export default function AnalysePage() {
  const { reviewResult, error, resetReview } = useReviewStore();

  useEffect(() => {
    resetReview();
  }, []);

  const { issues, suggestions, complexity } = reviewResult?.analysis ?? {};

  return (
    <div className="bg-gray-50">
      {/* Header — commented out
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="secondary"
                size="small"
                onClick={() => router.push("/dashboard")}
              >
                <FeatureIcon icon="chevronLeft" size={14} />
                Back
              </Button>
              <div className="h-4 w-px bg-gray-200" />
              <span className="font-semibold text-gray-800">Analyse Code</span>
            </div>
            {reviewResult && (
              <Button variant="outline" size="small" onClick={resetReview}>
                New Analysis
              </Button>
            )}
          </div>
        </div>
      </div>
      */}

      {!reviewResult && (
        <>
          {/* Hero */}
          <div className="bg-white border-b border-gray-100">
            <div className="container mx-auto px-4 py-12 max-w-5xl text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 text-sm font-medium rounded-full mb-4">
                <FeatureIcon icon="lightning" size={14} className="text-blue-500" />
                AI-Powered Code Review
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Analyse Your Code
              </h1>
              <p className="text-lg text-gray-500 max-w-xl mx-auto">
                Paste a snippet or upload a file and get a detailed quality report — bugs, security issues, and recommendations in seconds.
              </p>
            </div>
          </div>

          {/* How it works */}
          <div className="container mx-auto px-4 py-10 max-w-5xl">
            <div className="grid sm:grid-cols-3 gap-4 mb-10">
              {ANALYSE_HOW_IT_WORKS.map((item) => (
                <div key={item.step} className="bg-white rounded-xl border border-gray-100 p-5 flex gap-4">
                  <div className={`w-10 h-10 rounded-lg ${item.bg} flex items-center justify-center shrink-0`}>
                    <FeatureIcon icon={item.icon} size={18} className={item.color} />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-gray-400 mb-0.5">Step {item.step}</div>
                    <div className="font-semibold text-gray-800 text-sm mb-1">{item.title}</div>
                    <div className="text-xs text-gray-500 leading-relaxed">{item.description}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Editor + What we check */}
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Editor */}
              <div className="lg:col-span-2">
                <Card border={false} className="border border-gray-100 overflow-hidden">
                  <div className="bg-gray-900 px-6 py-4 border-b border-gray-800 -m-6 mb-6">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                      <span className="ml-4 text-sm text-gray-400">Code Analyzer</span>
                    </div>
                  </div>
                  <CodeUploader />
                </Card>
              </div>

              {/* What we check */}
              <div className="flex flex-col gap-4">
                <Card border={false} className="border border-gray-100" title="What we check">
                  <div className="space-y-3">
                    {ANALYSE_WHAT_WE_CHECK.map((item) => (
                      <div key={item.label} className="flex items-center gap-3">
                        <FeatureIcon icon={item.icon} size={16} className={item.color} />
                        <span className="text-sm text-gray-600">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card border={false} className="border border-gray-100 bg-gradient-to-br from-blue-50 to-purple-50">
                  <div className="text-sm text-gray-600 space-y-2">
                    <p className="font-semibold text-gray-800">Tips for best results</p>
                    <ul className="space-y-1.5 text-xs text-gray-500">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-400 mt-0.5">•</span>
                        Select the correct language before analysing.
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-400 mt-0.5">•</span>
                        Include the full function or class for better context.
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-400 mt-0.5">•</span>
                        Avoid redacting variable names — they help the AI understand logic.
                      </li>
                    </ul>
                  </div>
                </Card>
              </div>
            </div>

            {error && (
              <div className="mt-6 p-6 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="text-red-600 font-semibold">⚠️ Error</div>
                  <p className="text-red-700">{error}</p>
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {/* Results */}
      {reviewResult && (
        <div className="container mx-auto px-4 py-8 max-w-5xl space-y-6">
          {/* Results header */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Analysis Complete</h2>
              <p className="text-sm text-gray-500 mt-0.5">Here's what we found in your code</p>
            </div>
            <Button variant="outline" size="small" onClick={resetReview}>
              New Analysis
            </Button>
          </div>

          {/* Overview */}
          <Card border={false} className="border border-gray-100 p-0 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-5 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">Analysis Overview</h3>
                <p className="text-sm text-gray-500">
                  {issues?.length} issue{issues?.length !== 1 ? "s" : ""} ·{" "}
                  {suggestions?.length} suggestion{suggestions?.length !== 1 ? "s" : ""} ·{" "}
                  {reviewResult.linesAnalyzed} lines analyzed
                </p>
              </div>
              <div className="text-center">
                <div className={`text-5xl font-bold ${getScoreColor(reviewResult.score)}`}>
                  {reviewResult.score}
                </div>
                <div className="text-xs text-gray-500 mt-1">out of 100</div>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-gray-100">
              {[
                { label: "Issues", value: issues?.length ?? 0, icon: "alert", color: "text-orange-500" },
                { label: "Suggestions", value: suggestions?.length ?? 0, icon: "info", color: "text-blue-500" },
                { label: "Lines", value: reviewResult.linesAnalyzed ?? 0, icon: "code", color: "text-purple-500" },
                { label: "Complexity", value: complexity ?? "—", icon: "chart", color: "text-green-500" },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center gap-3 px-6 py-4">
                  <FeatureIcon icon={stat.icon} size={18} className={stat.color} />
                  <div>
                    <div className="text-base font-bold text-gray-900">{stat.value}</div>
                    <div className="text-xs text-gray-500">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Issues & Suggestions */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card
              border={false}
              className="border border-gray-100"
              title="Issues Found"
              subtitle={`${issues?.length ?? 0} total`}
            >
              {issues?.length > 0 ? (
                <div className="space-y-3">
                  {issues.map((issue, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <StatusBadge status={issue.type} size="small">
                        {ISSUE_TYPES[issue.type]?.label || issue.type}
                      </StatusBadge>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-700 leading-snug">
                          {issue.description || issue.message}
                        </p>
                        <span className="text-xs text-gray-400 mt-1 block">Line {issue.line}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-400">No issues found.</p>
              )}
            </Card>

            <Card
              border={false}
              className="border border-gray-100"
              title="Recommendations"
              subtitle={`${suggestions?.length ?? 0} total`}
            >
              {suggestions?.length > 0 ? (
                <ul className="space-y-3">
                  {suggestions.map((s, idx) => (
                    <li key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <FeatureIcon icon="checkCircle" size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{s.description || s}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-400">No recommendations.</p>
              )}
            </Card>
          </div>

          {/* Full AI Review */}
          {reviewResult.analysis?.review && (
            <Card border={false} className="border border-gray-100" title="AI Review" subtitle="Detailed analysis from the model">
              <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-wrap leading-relaxed">
                {reviewResult.analysis.review}
              </div>
            </Card>
          )}

          {/* Code Snippet */}
          {reviewResult.codeSnippet && (
            <Card border={false} className="border border-gray-100" title="Code Snapshot">
              <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed -mx-1">
                <code>{reviewResult.codeSnippet}</code>
              </pre>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
