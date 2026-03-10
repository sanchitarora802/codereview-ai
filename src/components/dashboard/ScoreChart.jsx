"use client";

import useDashboardStore from "@/store/dashboardStore";

export default function ScoreChart() {
  const { stats } = useDashboardStore();
  const scoreDistribution = stats?.scoreDistribution;

  if (!scoreDistribution) return null;

  const bars = [
    { label: "Excellent (80-100)", key: "excellent", color: "bg-green-500" },
    { label: "Good (60-79)", key: "good", color: "bg-yellow-500" },
    { label: "Poor (0-59)", key: "poor", color: "bg-red-500" },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Score Distribution
      </h3>

      {/* Progress Bars */}
      <div className="space-y-4">
        {bars.map(({ label, key, color }) => (
          <div key={key}>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">{label}</span>
              <span className="font-medium text-gray-900">
                {scoreDistribution[key].count} ({scoreDistribution[key].percentage}%)
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`${color} h-2 rounded-full transition-all duration-500`}
                style={{ width: `${scoreDistribution[key].percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Visual Bar Chart */}
      <div className="mt-6 flex items-end justify-around h-32">
        {bars.map(({ label, key, color }) => (
          <div key={key} className="text-center">
            <div
              className={`w-16 ${color} rounded-t`}
              style={{
                height: `${scoreDistribution[key].percentage}%`,
                minHeight: "4px",
              }}
            />
            <p className="text-xs text-gray-600 mt-2">
              {label.split(" ")[0]}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
