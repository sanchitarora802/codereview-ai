import FeatureIcon from "@/components/shared/FeatureIcon";
import useDashboardStore from "@/store/dashboardStore";

export default function RecentActivity() {
  const { recentActivity } = useDashboardStore();

  // Get the 5 most recent reviews
  const recentReviews = recentActivity?.slice(0, 5);

  const getActivityIcon = (score) => {
    if (score >= 80) {
      return (
        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
          <FeatureIcon icon="check" size={16} className="text-green-600" />
        </div>
      );
    } else if (score >= 60) {
      return (
        <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
          <FeatureIcon icon="alert" size={16} className="text-yellow-600" />
        </div>
      );
    } else {
      return (
        <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
          <FeatureIcon icon="close" size={16} className="text-red-600" />
        </div>
      );
    }
  };

  if (recentReviews?.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Recent Activity
        </h3>
        <p className="text-gray-500 text-center py-8">No recent activity</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Recent Activity
      </h3>

      <div className="space-y-4">
        {recentReviews?.map((review) => (
          <div key={review.id} className="flex items-start gap-3">
            {getActivityIcon(review.score)}

            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900">
                <span className="font-medium">{review.file}</span> analyzed
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-gray-500">
                  Score: {review.score}/100
                </span>
                <span className="text-xs text-gray-400">•</span>
                <span className="text-xs text-gray-500">
                  {review.issues} issues
                </span>
                <span className="text-xs text-gray-400">•</span>
                <span className="text-xs text-gray-500">{review.timeAgo}</span>
              </div>
            </div>

            <a
              href={`/review/${review.id}`}
              className="text-blue-600 hover:text-blue-700 text-sm"
            >
              View
            </a>
          </div>
        ))}
      </div>
      {/* 
      {recentReviews?.length > 5 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <a
            href="#"
            className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            View all activity
            <FeatureIcon icon="arrowRight" size={14} />
          </a>
        </div>
      )} */}
    </div>
  );
}
