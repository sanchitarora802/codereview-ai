import useDashboardStore from "@/store/dashboardStore";
import FeatureIcon from "@/components/shared/FeatureIcon";

export default function Pagination() {
  const { tablePagination, fetchData } = useDashboardStore();

  if (!tablePagination) return null;

  const { currentPage, totalPages, totalItems, itemsPerPage, hasNextPage, hasPrevPage } = tablePagination;

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);
    if (end - start < maxVisible - 1) start = Math.max(1, end - maxVisible + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex items-center justify-between mt-4 px-2">
      <p className="text-sm text-gray-500">
        Showing {startItem}–{endItem} of {totalItems} results
      </p>

      {totalPages > 1 && (
        <div className="flex items-center gap-1">
          <button
            onClick={() => fetchData(currentPage - 1)}
            disabled={!hasPrevPage}
            className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <FeatureIcon icon="chevronLeft" size={16} />
          </button>

          {getPageNumbers().map((page) => (
            <button
              key={page}
              onClick={() => fetchData(page)}
              className={`w-9 h-9 rounded-lg text-sm font-medium transition ${
                page === currentPage
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => fetchData(currentPage + 1)}
            disabled={!hasNextPage}
            className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <FeatureIcon icon="chevronRight" size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
