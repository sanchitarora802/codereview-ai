import React from "react";
import Modal from "../shared/Modal";
import CodeUploader from "../shared/CodeUploader";
import FeatureIcon from "../shared/FeatureIcon";
import { useReviewStore } from "@/store/reviewStore";

const CodeReviewModal = ({
  setShowUploadModal,
  uploadResult,
  setUploadResult,
  handleCodeAnalysis,
}) => {
  const { isLoading, error, resetReview } = useReviewStore();

  return (
    <>
      <Modal
        title="New Code Review"
        size="medium"
        preventClose={isLoading}
        onClose={() => {
          setShowUploadModal(false);
          setUploadResult(null);
          resetReview();
        }}
      >
        {uploadResult && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-2 text-green-800">
              <FeatureIcon icon="checkCircle" size={20} />
              <span className="font-medium">
                Analysis completed! Opening the review.
              </span>
            </div>
          </div>
        )}

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center gap-2 text-red-800">
              <FeatureIcon icon="close" size={20} />
              <span className="font-medium">{error}</span>
            </div>
          </div>
        )}

        <div className="mb-4">
          <p className="text-gray-600 mb-4">
            Upload or paste your code to get instant AI-powered analysis.
          </p>
          <CodeUploader onAnalysis={handleCodeAnalysis} isDemo={false} />
        </div>
      </Modal>
    </>
  );
};

export default CodeReviewModal;
