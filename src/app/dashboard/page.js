"use client";

import { useState, useEffect } from "react";
import DashboardStats from "@/components/dashboard/DashboardStats";
import ReviewsList from "@/components/dashboard/ReviewsList";
import FilterBar from "@/components/dashboard/FilterBar";
import EmptyState from "@/components/dashboard/EmptyState";
import ScoreChart from "@/components/dashboard/ScoreChart";
import RecentActivity from "@/components/dashboard/RecentActivity";
import Loading from "@/components/shared/Loading";
import Button from "@/components/shared/Button";
import Modal from "@/components/shared/Modal";
import CodeUploader from "@/components/shared/CodeUploader";

// Mock data for development - replace with API calls
const MOCK_REVIEWS = [
  {
    _id: "1",
    filename: "AuthComponent.jsx",
    language: "javascript",
    score: 85,
    issues: 3,
    linesOfCode: 245,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    status: "completed",
    improvements: 5,
  },
  {
    _id: "2",
    filename: "user_service.py",
    language: "python",
    score: 72,
    issues: 8,
    linesOfCode: 189,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    status: "completed",
    improvements: 12,
  },
  {
    _id: "3",
    filename: "PaymentController.java",
    language: "java",
    score: 91,
    issues: 2,
    linesOfCode: 456,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    status: "completed",
    improvements: 3,
  },
  {
    _id: "4",
    filename: "api_routes.js",
    language: "javascript",
    score: 68,
    issues: 12,
    linesOfCode: 334,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    status: "completed",
    improvements: 15,
  },
  {
    _id: "5",
    filename: "database.py",
    language: "python",
    score: 88,
    issues: 4,
    linesOfCode: 567,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    status: "completed",
    improvements: 6,
  },
  {
    _id: "6",
    filename: "utils.ts",
    language: "typescript",
    score: 79,
    issues: 6,
    linesOfCode: 223,
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
    status: "completed",
    improvements: 8,
  },
  {
    _id: "7",
    filename: "main.go",
    language: "go",
    score: 94,
    issues: 1,
    linesOfCode: 890,
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 14 days ago
    status: "completed",
    improvements: 2,
  },
];

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [viewMode, setViewMode] = useState("list"); // 'list' or 'grid'
  const [filters, setFilters] = useState({
    search: "",
    language: "all",
    dateRange: "all",
    scoreRange: "all",
    sortBy: "recent",
  });

  // Simulate API call
  useEffect(() => {
    setTimeout(() => {
      setReviews(MOCK_REVIEWS);
      setFilteredReviews(MOCK_REVIEWS);
      setLoading(false);
    }, 1000);
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = [...reviews];

    // Search filter
    if (filters.search) {
      filtered = filtered.filter((review) =>
        review.filename.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Language filter
    if (filters.language !== "all") {
      filtered = filtered.filter(
        (review) => review.language === filters.language
      );
    }

    // Date range filter
    if (filters.dateRange !== "all") {
      const now = new Date();
      const ranges = {
        today: 24 * 60 * 60 * 1000,
        week: 7 * 24 * 60 * 60 * 1000,
        month: 30 * 24 * 60 * 60 * 1000,
      };
      if (ranges[filters.dateRange]) {
        filtered = filtered.filter(
          (review) =>
            new Date(review.createdAt) >
            new Date(now - ranges[filters.dateRange])
        );
      }
    }

    // Score range filter
    if (filters.scoreRange !== "all") {
      const ranges = {
        excellent: [80, 100],
        good: [60, 79],
        poor: [0, 59],
      };
      if (ranges[filters.scoreRange]) {
        const [min, max] = ranges[filters.scoreRange];
        filtered = filtered.filter(
          (review) => review.score >= min && review.score <= max
        );
      }
    }

    // Sort
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case "recent":
          return new Date(b.createdAt) - new Date(a.createdAt);
        case "oldest":
          return new Date(a.createdAt) - new Date(b.createdAt);
        case "score-high":
          return b.score - a.score;
        case "score-low":
          return a.score - b.score;
        case "name":
          return a.filename.localeCompare(b.filename);
        default:
          return 0;
      }
    });

    setFilteredReviews(filtered);
  }, [filters, reviews]);

  const handleFilterChange = (filterType, value) => {
    if (filterType === "all") {
      setFilters(value);
    } else {
      setFilters((prev) => ({
        ...prev,
        [filterType]: value,
      }));
    }
  };

  const handleNewReview = (analysisResult) => {
    // Process the result from CodeUploader
    const newReview = {
      _id: Date.now().toString(),
      filename: "NewFile.js", // In production, get from actual upload
      language: "javascript",
      score: analysisResult.score,
      issues: analysisResult.issues?.length || 0,
      linesOfCode: 150,
      improvements: analysisResult.suggestions?.length || 0,
      createdAt: new Date(),
      status: "completed",
    };
    setReviews((prev) => [newReview, ...prev]);
    setShowUploadModal(false);
  };

  // Calculate stats
  const stats = {
    totalReviews: reviews.length,
    avgScore: reviews.length
      ? Math.round(
          reviews.reduce((acc, r) => acc + r.score, 0) / reviews.length
        )
      : 0,
    totalIssues: reviews.reduce((acc, r) => acc + r.issues, 0),
    totalLines: reviews.reduce((acc, r) => acc + r.linesOfCode, 0),
    recentReviews: reviews.filter(
      (r) =>
        new Date(r.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    ).length,
    improvements: reviews.reduce((acc, r) => acc + (r.improvements || 0), 0),
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading size="large" text="Loading dashboard..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 mt-1">
                Monitor your code quality and review history
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="secondary"
                onClick={() => window.location.reload()}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Refresh
              </Button>
              <Button
                variant="primary"
                size="large"
                onClick={() => setShowUploadModal(true)}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                New Review
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <DashboardStats stats={stats} />

        {/* Charts and Activity Row */}
        {reviews.length > 0 && (
          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            <ScoreChart reviews={reviews} />
            <RecentActivity reviews={reviews} />
          </div>
        )}

        {/* Filter Bar */}
        <FilterBar
          filters={filters}
          onFilterChange={handleFilterChange}
          resultCount={filteredReviews.length}
        />

        {/* View Mode Toggle */}
        {filteredReviews.length > 0 && (
          <div className="flex justify-end mb-4">
            <div className="inline-flex rounded-lg border border-gray-200 bg-white">
              <button
                onClick={() => setViewMode("list")}
                className={`px-3 py-2 text-sm font-medium rounded-l-lg ${
                  viewMode === "list"
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 10h16M4 14h16M4 18h16"
                  />
                </svg>
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`px-3 py-2 text-sm font-medium rounded-r-lg ${
                  viewMode === "grid"
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Reviews List or Empty State */}
        {filteredReviews.length > 0 ? (
          viewMode === "list" ? (
            <ReviewsList reviews={filteredReviews} />
          ) : (
            <ReviewsGrid reviews={filteredReviews} />
          )
        ) : reviews.length > 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-12 text-center">
            <svg
              className="w-16 h-16 mx-auto text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No results found
            </h3>
            <p className="text-gray-600">
              Try adjusting your filters to find what you're looking for.
            </p>
            <Button
              variant="secondary"
              className="mt-4"
              onClick={() =>
                setFilters({
                  search: "",
                  language: "all",
                  dateRange: "all",
                  scoreRange: "all",
                  sortBy: "recent",
                })
              }
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <EmptyState onUploadClick={() => setShowUploadModal(true)} />
        )}
      </div>

      {/* Use reusable Modal with CodeUploader */}
      {showUploadModal && (
        <Modal
          title="New Code Review"
          onClose={() => setShowUploadModal(false)}
        >
          <CodeUploader onAnalysis={handleNewReview} isDemo={false} />
        </Modal>
      )}
    </div>
  );
}

// Grid View Component
function ReviewsGrid({ reviews }) {
  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-600 bg-green-50 border-green-200";
    if (score >= 60) return "text-yellow-600 bg-yellow-50 border-yellow-200";
    return "text-red-600 bg-red-50 border-red-200";
  };

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {reviews.map((review) => (
        <div
          key={review._id}
          className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-lg transition"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 truncate">
                {review.filename}
              </h3>
              <p className="text-sm text-gray-500 mt-1">{review.language}</p>
            </div>
            <div
              className={`px-3 py-1 rounded-lg border ${getScoreColor(
                review.score
              )}`}
            >
              <span className="font-bold text-lg">{review.score}</span>
            </div>
          </div>

          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Issues Found</span>
              <span className="font-medium">{review.issues}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Lines of Code</span>
              <span className="font-medium">{review.linesOfCode}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Improvements</span>
              <span className="font-medium">{review.improvements}</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <span className="text-xs text-gray-500">
              {new Date(review.createdAt).toLocaleDateString()}
            </span>
            <a
              href={`/review/${review._id}`}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              View Details →
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
