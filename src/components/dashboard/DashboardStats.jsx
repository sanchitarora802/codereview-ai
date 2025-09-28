import FeatureIcon from "@/components/shared/FeatureIcon";

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
              <FeatureIcon icon={stat.icon} size={24} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
