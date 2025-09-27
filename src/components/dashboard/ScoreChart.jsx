"use client";

export default function ScoreChart({ reviews }) {
  // Calculate score distribution
  const scoreDistribution = {
    excellent: reviews.filter((r) => r.score >= 80).length,
    good: reviews.filter((r) => r.score >= 60 && r.score < 80).length,
    poor: reviews.filter((r) => r.score < 60).length,
  };

  const total = reviews.length || 1;
  const percentages = {
    excellent: Math.round((scoreDistribution.excellent / total) * 100),
    good: Math.round((scoreDistribution.good / total) * 100),
    poor: Math.round((scoreDistribution.poor / total) * 100),
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Score Distribution
      </h3>

      {/* Progress Bars */}
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">Excellent (80-100)</span>
            <span className="font-medium text-gray-900">
              {scoreDistribution.excellent} ({percentages.excellent}%)
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${percentages.excellent}%` }}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">Good (60-79)</span>
            <span className="font-medium text-gray-900">
              {scoreDistribution.good} ({percentages.good}%)
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-yellow-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${percentages.good}%` }}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">Poor (0-59)</span>
            <span className="font-medium text-gray-900">
              {scoreDistribution.poor} ({percentages.poor}%)
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-red-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${percentages.poor}%` }}
            />
          </div>
        </div>
      </div>

      {/* Visual Bar Chart */}
      <div className="mt-6 flex items-end justify-around h-32">
        <div className="text-center">
          <div
            className="w-16 bg-green-500 rounded-t"
            style={{
              height: `${(scoreDistribution.excellent / total) * 100}%`,
              minHeight: "4px",
            }}
          />
          <p className="text-xs text-gray-600 mt-2">Excellent</p>
        </div>
        <div className="text-center">
          <div
            className="w-16 bg-yellow-500 rounded-t"
            style={{
              height: `${(scoreDistribution.good / total) * 100}%`,
              minHeight: "4px",
            }}
          />
          <p className="text-xs text-gray-600 mt-2">Good</p>
        </div>
        <div className="text-center">
          <div
            className="w-16 bg-red-500 rounded-t"
            style={{
              height: `${(scoreDistribution.poor / total) * 100}%`,
              minHeight: "4px",
            }}
          />
          <p className="text-xs text-gray-600 mt-2">Poor</p>
        </div>
      </div>
    </div>
  );
}
