import axiosInstance from "@/utils/Axios Config";
import { eraseCookie, setCookie } from "@/utils/cookies";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useAuthStore = create(
  devtools((set, get) => ({
    user: null,
    isLoading: false,
    stage: "email",
    currentEmail: "",
    error: null,

    setStage: (stage) => set({ stage }),

    setEmail: (email) => set({ currentEmail: email }),

    setError: (error) => set({ error: error }),

    resetError: () => set({ error: null }),

    checkUser: async (email) => {
      set({ isLoading: true, error: null });
      try {
        const res = axiosInstance.post("/auth/checkEmail", {
          email,
        });
        set({
          isLoading: false,
          stage: res.data?.exists ? "password" : "signup",
          currentEmail: email,
        });
      } catch (err) {
        console.log("error", err);
        set({
          isLoading: false,
          error: err?.response?.data?.message,
        });
      }
    },

    signUp: async (name, password) => {
      const { currentEmail } = get();
      set({
        isLoading: true,
        error: null,
      });
      try {
        const params = {
          name: name,
          email: currentEmail,
          password: password,
        };
        const res = await axiosInstance.post("/auth/signup", params);
        const { token, data } = res.data;
        setCookie(process.env.NEXT_PUBLIC_Token, token);
        set({
          isLoading: false,
          user: data.user,
          stage: "success",
        });
      } catch (err) {
        set({
          isLoading: false,
          error: err?.response?.data?.message || "Signup failed",
        });
      }
    },

    logout: () => {
      eraseCookie(process.env.NEXT_PUBLIC_Token);
      set({ user: null, stage: "email", currentEmail: "", error: null });
    },
  }))
);
