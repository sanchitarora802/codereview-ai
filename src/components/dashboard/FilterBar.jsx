"use client";

import { useState } from "react";
import FeatureIcon from "@/components/shared/FeatureIcon";

export default function FilterBar({ filters, onFilterChange, resultCount }) {
  const [showFilters, setShowFilters] = useState(true);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 mb-6">
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
            >
              <FeatureIcon icon="filter" size={20} />
              <span className="font-medium">Filters</span>
              <FeatureIcon
                icon={showFilters ? "chevronDown" : "chevronRight"}
                size={16}
              />
            </button>
            <span className="text-sm text-gray-600">
              {resultCount} {resultCount === 1 ? "result" : "results"} found
            </span>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search by filename..."
              value={filters.search}
              onChange={(e) => onFilterChange("search", e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
            />
            <div className="absolute left-3 top-2.5">
              <FeatureIcon icon="search" size={20} className="text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {showFilters && (
        <div className="p-4 grid grid-cols-2 md:grid-cols-5 gap-4">
          {/* Language Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Language
            </label>
            <select
              value={filters.language}
              onChange={(e) => onFilterChange("language", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Languages</option>
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="typescript">TypeScript</option>
              <option value="go">Go</option>
              <option value="ruby">Ruby</option>
            </select>
          </div>

          {/* Date Range Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date Range
            </label>
            <select
              value={filters.dateRange}
              onChange={(e) => onFilterChange("dateRange", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
          </div>

          {/* Score Range Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Score Range
            </label>
            <select
              value={filters.scoreRange}
              onChange={(e) => onFilterChange("scoreRange", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Scores</option>
              <option value="excellent">Excellent (80-100)</option>
              <option value="good">Good (60-79)</option>
              <option value="poor">Poor (0-59)</option>
            </select>
          </div>

          {/* Sort By */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sort By
            </label>
            <select
              value={filters.sortBy}
              onChange={(e) => onFilterChange("sortBy", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="recent">Most Recent</option>
              <option value="oldest">Oldest First</option>
              <option value="score-high">Highest Score</option>
              <option value="score-low">Lowest Score</option>
              <option value="name">File Name</option>
            </select>
          </div>

          {/* Clear Filters Button */}
          <div className="flex items-end">
            <button
              onClick={() =>
                onFilterChange("all", {
                  search: "",
                  language: "all",
                  dateRange: "all",
                  scoreRange: "all",
                  sortBy: "recent",
                })
              }
              className="w-full px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
            >
              Clear All
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
