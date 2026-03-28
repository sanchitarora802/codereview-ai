"use client";

import { useParams, useRouter } from "next/navigation";
import Card from "@/components/shared/Card";
import Button from "@/components/shared/Button";
import StatusBadge from "@/components/shared/StatusBadge";
import FeatureIcon from "@/components/shared/FeatureIcon";
import { ISSUE_TYPES } from "@/constants";
import { getScoreColor } from "@/utils/helpers";
import { useEffect } from "react";
import { useReviewStore } from "@/store/reviewStore";
import { useAuthStore } from "@/store/authStore";

export default function ReviewPage() {
  const { id } = useParams();
  const router = useRouter();
  const { isLoading, fetchSingleReview, reviewResult, error } =
    useReviewStore();
  const { user } = useAuthStore();

  useEffect(() => {
    if (id && user?.email) {
      fetchSingleReview({
        reviewId: id,
      });
    }
  }, [user]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Loading review...</p>
      </div>
    );
  }

  if (!reviewResult) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Review not found.</p>
          <p className="text-gray-500 mb-4">{error}</p>
          <Button variant="secondary" onClick={() => router.push("/dashboard")}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const {
    title,
    language,
    linesAnalyzed,
    createdAt,
    codeSnippet,
    analysis,
    score,
  } = reviewResult;

  const { issues, suggestions, complexity } = analysis ?? {};

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
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
              <FeatureIcon
                icon="document"
                size={18}
                className="text-gray-400"
              />
              <span className="font-semibold text-gray-800">{title}</span>
              <StatusBadge status="neutral" size="small">
                .{language} file
              </StatusBadge>
            </div>
            <span className="text-sm text-gray-400">
              {createdAt ? new Date(createdAt).toLocaleDateString() : ""}
            </span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-5xl space-y-6">
        {/* Overview */}
        <Card
          border={false}
          className="border border-gray-100 p-0 overflow-hidden"
        >
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-5 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-1">
                Analysis Overview
              </h2>
              <p className="text-sm text-gray-500">
                {issues?.length} issue{issues?.length !== 1 ? "s" : ""} ·{" "}
                {suggestions?.length} suggestion
                {suggestions?.length !== 1 ? "s" : ""} · {linesAnalyzed} lines
                analyzed
              </p>
            </div>
            <div className="text-center">
              <div
                className={`text-5xl font-bold ${getScoreColor(analysis?.score)}`}
              >
                {score}
              </div>
              <div className="text-xs text-gray-500 mt-1">out of 100</div>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-gray-100">
            {[
              {
                label: "Issues",
                value: issues?.length ?? 0,
                icon: "alert",
                color: "text-orange-500",
              },
              {
                label: "Suggestions",
                value: suggestions?.length ?? 0,
                icon: "info",
                color: "text-blue-500",
              },
              {
                label: "Lines",
                value: linesAnalyzed ?? 0,
                icon: "code",
                color: "text-purple-500",
              },
              {
                label: "Complexity",
                value: complexity ?? "—",
                icon: "chart",
                color: "text-green-500",
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex items-center gap-3 px-6 py-4"
              >
                <FeatureIcon
                  icon={stat.icon}
                  size={18}
                  className={stat.color}
                />
                <div>
                  <div className="text-base font-bold text-gray-900">
                    {stat.value}
                  </div>
                  <div className="text-xs text-gray-500">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Issues & Suggestions */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Issues */}
          <Card
            border={false}
            className="border border-gray-100"
            title="Issues Found"
            subtitle={`${issues?.length ?? 0} total`}
          >
            {issues?.length > 0 ? (
              <div className="space-y-3">
                {issues.map((issue, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <StatusBadge status={issue.type} size="small">
                      {ISSUE_TYPES[issue.type]?.label || issue.type}
                    </StatusBadge>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-700 leading-snug">
                        {issue.description}
                      </p>
                      <span className="text-xs text-gray-400 mt-1 block">
                        Line {issue.line}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400">No issues found.</p>
            )}
          </Card>

          {/* Suggestions */}
          <Card
            border={false}
            className="border border-gray-100"
            title="Recommendations"
            subtitle={`${suggestions?.length ?? 0} total`}
          >
            {suggestions?.length > 0 ? (
              <ul className="space-y-3">
                {suggestions.map((s, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <FeatureIcon
                      icon="greenTick"
                      size={16}
                      className="text-green-500 mt-0.5 flex-shrink-0"
                    />
                    <span className="text-sm text-gray-700">
                      {s.description}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-400">No recommendations.</p>
            )}
          </Card>
        </div>

        {/* Code Snippet */}
        {codeSnippet && (
          <Card
            border={false}
            className="border border-gray-100"
            title="Code Snapshot"
          >
            <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed -mx-1">
              <code>{codeSnippet}</code>
            </pre>
          </Card>
        )}
      </div>
    </div>
  );
}
