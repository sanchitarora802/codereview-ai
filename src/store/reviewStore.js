import axiosInstance from "@/utils/Axios Config";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { useAuthStore } from "./authStore";

export const useReviewStore = create(
  devtools((set, get) => ({
    reviewResult: null,
    isLoading: false,
    error: null,

    setError: (error) => set({ error }),

    resetError: () => set({ error: null }),

    resetReview: () => set({ reviewResult: null, error: null }),

    analyzeCode: async (code, tab, language = "javascript") => {
      const { submitReview, homeSubmitReview } = get();
      const { user } = useAuthStore.getState();

      const submitReviewParams = {
        codeSnippet: code,
        language,
        context: "",
        title: tab,
      };
      return user?.email
        ? submitReview(submitReviewParams)
        : homeSubmitReview(submitReviewParams);
    },

    homeSubmitReview: async (submitReviewParams) => {
      set({ isLoading: true, error: null, reviewResult: null });
      try {
        const res = await axiosInstance.post(
          "/home-review/submit",
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
            res.data.data?.linesAnalyzed ||
            submitReviewParams.codeSnippet?.split("\n").length ||
            0,
          complexity: res.data.data?.complexity || "Medium",
          blurText: res.data?.review?.blurText,
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
            res.data.data?.linesAnalyzed ||
            submitReviewParams.codeSnippet?.split("\n").length ||
            0,
          complexity: res.data.data?.complexity || "Medium",
        };

        set({
          isLoading: false,
          reviewResult: enhancedResult,
          error: null,
        });

        return enhancedResult;
      } catch (err) {
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

    fetchSingleReview: async (singleReviewParams) => {
      set({ isLoading: true, error: null, reviewResult: null });
      try {
        const { reviewId } = singleReviewParams;
        const res = await axiosInstance.get(`/review-detail/${reviewId}`);

        if (res.data.error) {
          set({ isLoading: false, error: res.data.error, reviewResult: null });
          return null;
        }

        if (res.data?.review) {
          set({
            isLoading: false,
            error: null,
            reviewResult: {
              ...res.data?.review,
            },
          });
        }
      } catch (err) {
        set({
          isLoading: false,
          error: err?.res?.data?.error || "Please try again.",
          reviewResult: null,
        });
        throw err;
      }
    },
  })),
);
