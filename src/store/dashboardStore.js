import axiosInstance from "@/utils/Axios Config";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

const useDashboardStore = create(
  devtools((set) => ({
    stats: null,
    recentActivity: null,
    tableData: null,
    filteredTableData: null,
    tablePagination: null,
    isLoading: false,
    error: null,

    fetchStats: async () => {
      set({ isLoading: true, error: null });
      try {
        const res = await axiosInstance.get("/stats");
        set({
          isLoading: false,
          stats: res.data,
          recentActivity: res.data?.recentActivity,
        });
      } catch (err) {
        set({
          isLoading: false,
          error: err?.response?.data?.message || "Failed to fetch stats",
        });
      }
    },

    fetchData: async (page = 1) => {
      set({ isLoading: true, error: null });
      try {
        const res = await axiosInstance.get("/data", { params: { page } });
        set({
          isLoading: false,
          tableData: res.data?.tableData,
          filteredTableData: null,
          tablePagination: res.data?.pagination,
        });
      } catch (err) {
        set({
          isLoading: false,
          error: err?.response?.data?.message || "Failed to fetch data",
        });
      }
    },

    setFilteredTableData: (data) => set({ filteredTableData: data }),

    resetError: () => set({ error: null }),
  })),
);

export default useDashboardStore;
