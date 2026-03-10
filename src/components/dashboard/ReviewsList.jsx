import Link from "next/link";
import FeatureIcon from "@/components/shared/FeatureIcon";
import { getScoreColor } from "@/utils/helpers";
import useDashboardStore from "@/store/dashboardStore";

export default function ReviewsList() {
  const { filteredTableData, tableData } = useDashboardStore();
  const reviews = filteredTableData ?? tableData ?? [];

  const getLanguageColor = (language) => {
    const colors = {
      javascript: "bg-yellow-100 text-yellow-800",
      js: "bg-yellow-100 text-yellow-800",
      python: "bg-blue-100 text-blue-800",
      py: "bg-blue-100 text-blue-800",
      java: "bg-orange-100 text-orange-800",
      typescript: "bg-blue-100 text-blue-800",
      ts: "bg-blue-100 text-blue-800",
      go: "bg-cyan-100 text-cyan-800",
      ruby: "bg-red-100 text-red-800",
      php: "bg-purple-100 text-purple-800",
      rust: "bg-orange-100 text-orange-900",
      cpp: "bg-pink-100 text-pink-800",
      c: "bg-gray-100 text-gray-800",
    };
    return colors[language] || "bg-gray-100 text-gray-800";
  };

  const getScoreIcon = (score) => {
    if (score >= 80) {
      return (
        <FeatureIcon icon="checkCircle" size={20} className="text-green-500" />
      );
    } else if (score >= 60) {
      return <FeatureIcon icon="info" size={20} className="text-yellow-500" />;
    } else {
      return <FeatureIcon icon="xCircle" size={20} className="text-red-500" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                File
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Language
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Score
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Issues
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Lines
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {reviews.map((review) => (
              <tr key={review.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <FeatureIcon
                        icon="document"
                        size={32}
                        className="text-gray-400"
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {review.file}
                      </div>
                      <div className="text-sm text-gray-500">
                        {review.improvements} improvements suggested
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getLanguageColor(
                      review.language
                    )}`}
                  >
                    {review.language}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="flex items-center justify-center gap-2">
                    <span className="flex-shrink-0">{getScoreIcon(review.score)}</span>
                    <span
                      className={`text-lg font-bold w-8 text-left tabular-nums ${getScoreColor(
                        review.score
                      )}`}
                    >
                      {review.score}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="flex items-center justify-center">
                    {review.issues > 0 ? (
                      <span className="inline-flex items-center gap-1">
                        <span className="flex-shrink-0">
                          <FeatureIcon
                            icon="warning"
                            size={16}
                            className="text-orange-500"
                          />
                        </span>
                        <span className="text-orange-600 font-medium w-6 text-left tabular-nums">
                          {review.issues}
                        </span>
                      </span>
                    ) : (
                      <span className="text-green-600 font-medium">Clean</span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                  {review.linesOfCode?.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {review.timeAgo}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                  <div className="flex items-center justify-center gap-2">
                    <Link
                      href={`/review/${review.id}`}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      View
                    </Link>
                    <button className="text-gray-400 hover:text-gray-600">
                      <FeatureIcon icon="dots" size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
