import Button from "@/components/shared/Button";
import FeatureIcon from "@/components/shared/FeatureIcon";

export default function EmptyState({ onUploadClick }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-12">
      <div className="text-center max-w-md mx-auto">
        <FeatureIcon
          icon="document"
          size={96}
          className="mx-auto text-gray-400 mb-6"
        />

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
          <FeatureIcon icon="upload" size={20} />
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
