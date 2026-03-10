"use client";

import { useState, useEffect, useMemo } from "react";
import DashboardStats from "@/components/dashboard/DashboardStats";
import ReviewsList from "@/components/dashboard/ReviewsList";
import FilterBar from "@/components/dashboard/FilterBar";
import EmptyState from "@/components/dashboard/EmptyState";
import Pagination from "@/components/dashboard/Pagination";
import ScoreChart from "@/components/dashboard/ScoreChart";
import RecentActivity from "@/components/dashboard/RecentActivity";
import Loading from "@/components/shared/Loading";
import Button from "@/components/shared/Button";
import FeatureIcon from "@/components/shared/FeatureIcon";
import CodeReviewModal from "@/components/Modals/CodeReviewModal";
import useDashboardStore from "@/store/dashboardStore";
import { useAuthStore } from "@/store/authStore";

export default function DashboardPage() {
  const { tableData, isLoading, fetchStats, fetchData, setFilteredTableData } = useDashboardStore();
  const { user } = useAuthStore();
  const reviews = useMemo(() => tableData || [], [tableData]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadResult, setUploadResult] = useState(null);
  const [viewMode, setViewMode] = useState("list");
  const [filters, setFilters] = useState({
    search: "",
    language: "all",
    dateRange: "all",
    scoreRange: "all",
    sortBy: "recent",
  });

  useEffect(() => {
    if (user) fetchStats();
  }, [user]);

  useEffect(() => {
    if (user) fetchData();
  }, [user]);

  // Apply filters
  useEffect(() => {
    let filtered = [...reviews];

    if (filters.search) {
      filtered = filtered.filter((review) =>
        review.file.toLowerCase().includes(filters.search.toLowerCase()),
      );
    }

    if (filters.language !== "all") {
      filtered = filtered.filter(
        (review) => review.language === filters.language,
      );
    }

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
            new Date(now - ranges[filters.dateRange]),
        );
      }
    }

    if (filters.scoreRange !== "all") {
      const ranges = {
        excellent: [80, 100],
        good: [60, 79],
        poor: [0, 59],
      };
      if (ranges[filters.scoreRange]) {
        const [min, max] = ranges[filters.scoreRange];
        filtered = filtered.filter(
          (review) => review.score >= min && review.score <= max,
        );
      }
    }

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
          return a.file.localeCompare(b.file);
        default:
          return 0;
      }
    });

    setFilteredReviews(filtered);
    setFilteredTableData(filtered);
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

  const handleCodeAnalysis = (result) => {
    setUploadResult(result);

    fetchStats();

    setTimeout(() => {
      setShowUploadModal(false);
      setUploadResult(null);
    }, 1500);
  };

  if (isLoading) {
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
                onClick={() => {
                  fetchStats();
                  fetchData();
                }}
              >
                <FeatureIcon icon="refresh" size={16} />
                Refresh
              </Button>
              <Button
                variant="primary"
                size="large"
                onClick={() => setShowUploadModal(true)}
              >
                <FeatureIcon icon="plus" size={20} />
                New Review
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <DashboardStats />

        {/* Charts and Activity Row */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <ScoreChart />
          <RecentActivity />
        </div>

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
                <FeatureIcon icon="listView" size={16} />
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`px-3 py-2 text-sm font-medium rounded-r-lg ${
                  viewMode === "grid"
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <FeatureIcon icon="gridView" size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Reviews List or Empty State */}
        {filteredReviews.length > 0 ? (
          viewMode === "list" ? <ReviewsList /> : <ReviewsGrid />
        ) : reviews.length > 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-12 text-center">
            <FeatureIcon
              icon="sad"
              size={64}
              className="mx-auto text-gray-400 mb-4"
            />
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

        <Pagination />
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <CodeReviewModal
          setShowUploadModal={setShowUploadModal}
          uploadResult={uploadResult}
          setUploadResult={setUploadResult}
          handleCodeAnalysis={handleCodeAnalysis}
        />
      )}
    </div>
  );
}

// Grid View Component
function ReviewsGrid() {
  const { filteredTableData, tableData } = useDashboardStore();
  const reviews = filteredTableData ?? tableData ?? [];

  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-600 bg-green-50 border-green-200";
    if (score >= 60) return "text-yellow-600 bg-yellow-50 border-yellow-200";
    return "text-red-600 bg-red-50 border-red-200";
  };

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {reviews.map((review) => (
        <div
          key={review.id}
          className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-lg transition"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 truncate">
                {review.file}
              </h3>
              <p className="text-sm text-gray-500 mt-1">{review.language}</p>
            </div>
            <div
              className={`px-3 py-1 rounded-lg border ${getScoreColor(
                review.score,
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
            <span className="text-xs text-gray-500">{review.timeAgo}</span>
            <a
              href={`/review/${review.id}`}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
            >
              View Details
              <FeatureIcon icon="arrowRight" size={16} />
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
