export default function DashboardStats({ stats }) {
  const statCards = [
    {
      label: "Total Reviews",
      value: stats.totalReviews,
      icon: "document",
      change: `${stats.recentReviews} this week`,
      color: "blue",
    },
    {
      label: "Average Score",
      value: stats.avgScore,
      suffix: "/100",
      icon: "chart",
      color:
        stats.avgScore >= 80
          ? "green"
          : stats.avgScore >= 60
          ? "yellow"
          : "red",
    },
    {
      label: "Issues Found",
      value: stats.totalIssues,
      icon: "alert",
      change: `${stats.improvements} improvements`,
      color: "orange",
    },
    {
      label: "Lines Analyzed",
      value: stats.totalLines.toLocaleString(),
      icon: "code",
      color: "purple",
    },
  ];

  const getIconSvg = (icon) => {
    const icons = {
      document: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
      chart: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
      alert: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      ),
      code: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
          />
        </svg>
      ),
    };
    return icons[icon] || icons.document;
  };

  const getColorClasses = (color) => {
    const colors = {
      blue: "bg-blue-100 text-blue-600",
      green: "bg-green-100 text-green-600",
      yellow: "bg-yellow-100 text-yellow-600",
      red: "bg-red-100 text-red-600",
      orange: "bg-orange-100 text-orange-600",
      purple: "bg-purple-100 text-purple-600",
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statCards.map((stat, idx) => (
        <div
          key={idx}
          className="bg-white rounded-lg shadow-sm border border-gray-100 p-6"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-gray-900">
                  {stat.value}
                </span>
                {stat.suffix && (
                  <span className="text-lg text-gray-600">{stat.suffix}</span>
                )}
              </div>
              {stat.change && (
                <p className="text-xs text-gray-500 mt-2">{stat.change}</p>
              )}
            </div>
            <div className={`p-3 rounded-lg ${getColorClasses(stat.color)}`}>
              {getIconSvg(stat.icon)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
