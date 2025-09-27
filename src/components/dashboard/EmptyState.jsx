import Button from "@/components/shared/Button";

export default function EmptyState({ onUploadClick }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-12">
      <div className="text-center max-w-md mx-auto">
        <svg
          className="w-24 h-24 mx-auto text-gray-400 mb-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>

        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          No reviews yet
        </h3>
        <p className="text-gray-600 mb-6">
          Upload your first code file to get AI-powered analysis and improve
          your code quality.
        </p>

        <Button
          variant="primary"
          size="large"
          onClick={onUploadClick}
          className="mx-auto"
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
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          Upload Your First Code
        </Button>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <h4 className="text-sm font-medium text-gray-900 mb-4">
            Supported Languages
          </h4>
          <div className="flex flex-wrap gap-2 justify-center">
            {[
              "JavaScript",
              "Python",
              "Java",
              "TypeScript",
              "Go",
              "Ruby",
              "PHP",
            ].map((lang) => (
              <span
                key={lang}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
              >
                {lang}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-gray-900">⚡</div>
            <div className="text-sm text-gray-600 mt-1">Fast Analysis</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">🔒</div>
            <div className="text-sm text-gray-600 mt-1">Secure</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">📊</div>
            <div className="text-sm text-gray-600 mt-1">Detailed Reports</div>
          </div>
        </div>
      </div>
    </div>
  );
}
