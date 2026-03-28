"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import {
  SUPPORTED_FILE_TYPES,
  DEMO_CODE_SAMPLES,
  LANGUAGE_OPTIONS,
} from "@/constants";
import { useReviewStore } from "@/store/reviewStore";
import FeatureIcon from "./FeatureIcon";
import Button from "./Button";
import Loading from "./Loading";
import CustomSelect from "./CustomSelect";

export default function CodeUploader({ isDemo = false, onAnalysis }) {
  const [code, setCode] = useState("");
  const [fileName, setFileName] = useState("");
  const [activeTab, setActiveTab] = useState("copy-paste");
  const [language, setLanguage] = useState("");
  const [customLanguage, setCustomLanguage] = useState("");

  const { analyzeCode, isLoading } = useReviewStore();

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const content = await file.text();
      setCode(content);
      setFileName(file.name);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: SUPPORTED_FILE_TYPES,
    maxFiles: 1,
  });

  const loadSampleCode = (language) => {
    setCode(DEMO_CODE_SAMPLES[language]);
    setFileName(
      `sample.${
        language === "javascript" ? "js" : language === "python" ? "py" : "java"
      }`,
    );
  };

  return (
    <div className="w-full">
      {/* Language Selector */}
      {activeTab === "copy-paste" && (
        <>
          <div className="flex items-center gap-2 mb-4">
            <div className="relative">
              <CustomSelect
                value={language}
                onChange={setLanguage}
                options={LANGUAGE_OPTIONS}
                placeholder="Select Language **"
                className="w-44 shrink-0"
              />
            </div>
            {language === "other" && (
              <input
                type="text"
                value={customLanguage}
                onChange={(e) => setCustomLanguage(e.target.value)}
                placeholder="Enter language name..."
                className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}
          </div>
        </>
      )}

      {/* Tab Switcher */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setActiveTab("copy-paste")}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            activeTab === "copy-paste"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Paste Code
        </button>
        <button
          onClick={() => setActiveTab("upload")}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            activeTab === "upload"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Upload File
        </button>
        {isDemo && (
          <button
            onClick={() => setActiveTab("samples")}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              activeTab === "samples"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Use Sample
          </button>
        )}
      </div>

      {/* Tab Content */}
      {activeTab === "copy-paste" && (
        <div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="// Paste your code here..."
            className="w-full h-64 p-4 font-mono text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
          />
        </div>
      )}

      {activeTab === "upload" && (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-all
            ${
              isDragActive
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300 hover:border-gray-400 bg-gray-50"
            }`}
        >
          <input {...getInputProps()} />

          <FeatureIcon
            icon="upload"
            size={48}
            className="mx-auto mb-4 text-gray-400"
          />

          {isDragActive ? (
            <p className="text-blue-600">Drop the file here...</p>
          ) : (
            <>
              <p className="text-gray-600 mb-2">
                Drag & drop your code file here
              </p>
              <p className="text-sm text-gray-500">or click to browse</p>
              <p className="text-xs text-gray-400 mt-2">
                Supports:{" "}
                {Object.values(SUPPORTED_FILE_TYPES).flat().join(", ")}
              </p>
            </>
          )}
        </div>
      )}

      {activeTab === "samples" && isDemo && (
        <div className="grid grid-cols-3 gap-4">
          {Object.keys(DEMO_CODE_SAMPLES).map((lang) => (
            <button
              key={lang}
              onClick={() => loadSampleCode(lang)}
              className="p-4 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition"
            >
              <FeatureIcon
                icon="code"
                size={32}
                className="mx-auto mb-2 text-gray-600"
              />
              <p className="capitalize font-medium">{lang}</p>
            </button>
          ))}
        </div>
      )}

      {/* File Info */}
      {fileName && (
        <div className="mt-4 mb-4 p-2 bg-gray-100 rounded flex items-center gap-2">
          <FeatureIcon icon="file" size={16} className="text-gray-600" />
          <span className="text-sm text-gray-700">{fileName}</span>
        </div>
      )}

      {/* Code Preview for Samples */}
      {code && activeTab === "samples" && (
        <pre className="mt-4 p-4 bg-gray-900 text-gray-100 rounded-lg overflow-x-auto text-sm">
          <code>{code}</code>
        </pre>
      )}

      {/* Analyze Button */}
      <Button
        onClick={async () => {
          if (!code.trim()) return;
          const result = await analyzeCode(
            code,
            fileName || activeTab,
            language === "other" ? `other-${customLanguage}` : language,
          );
          if (result) onAnalysis?.(result);
        }}
        disabled={!code.trim() || isLoading}
        variant="primary"
        size="large"
        className="w-full mt-4"
      >
        {isLoading ? (
          <>
            <Loading size="small" text="" />
            Analyzing...
          </>
        ) : (
          "Analyze Code"
        )}
      </Button>
      <div className="mt-3 text-sm text-gray-400">
        ** Selecting language can improve the results
      </div>
    </div>
  );
}
