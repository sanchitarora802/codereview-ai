import axiosInstance from "@/utils/Axios Config";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useReviewStore = create(
  devtools((set, get) => ({
    reviewResult: null,
    isLoading: false,
    error: null,

    setError: (error) => set({ error }),

    resetError: () => set({ error: null }),

    resetReview: () => set({ reviewResult: null, error: null }),

    analyzeCode: async (code, tab) => {
      const { submitReview } = get();
      const submitReviewParams = {
        codeSnippet: code,
        language: "js",
        context: "",
        title: tab,
      };
      return submitReview(submitReviewParams);
    },

    submitReview: async (submitReviewParams) => {
      set({ isLoading: true, error: null, reviewResult: null });
      try {
        const res = await axiosInstance.post(
          "/review/submit",
          submitReviewParams,
        );

        if (res.data.error) {
          set({ isLoading: false, error: res.data.error, reviewResult: null });
          return null;
        }

        // Add execution time and lines analyzed if not provided by API
        const enhancedResult = {
          ...res.data.data,
          executionTime: res.data.data?.executionTime || "2.3s",
          linesAnalyzed:
            res.data.data?.linesAnalyzed || submitReviewParams.codeSnippet?.split("\n").length || 0,
          complexity: res.data.data?.complexity || "Medium",
        };

        set({
          isLoading: false,
          reviewResult: enhancedResult,
          error: null,
        });

        return enhancedResult;
      } catch (err) {
        console.error("Review submission failed:", err);
        set({
          isLoading: false,
          error:
            err?.response?.data?.error ||
            err?.response?.data?.message ||
            "Analysis failed. Please try again.",
          reviewResult: null,
        });
        throw err;
      }
    },
  })),
);
