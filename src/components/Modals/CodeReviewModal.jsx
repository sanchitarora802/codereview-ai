import React from "react";
import Modal from "../shared/Modal";
import CodeUploader from "../shared/CodeUploader";

const CodeReviewModal = ({
  setShowUploadModal,
  uploadResult,
  setUploadResult,
  handleCodeAnalysis,
}) => {
  return (
    <>
      <Modal
        title="New Code Review"
        size="medium"
        onClose={() => {
          setShowUploadModal(false);
          setUploadResult(null);
        }}
      >
        {uploadResult && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-2 text-green-800">
              <FeatureIcon icon="checkCircle" size={20} />
              <span className="font-medium">
                Analysis complete! Review added to dashboard.
              </span>
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
