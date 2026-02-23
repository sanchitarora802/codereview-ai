import axiosInstance, { registerRequestIntercept } from "@/utils/Axios Config";
import { eraseCookie, setCookie } from "@/utils/cookies";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import useLayoutStore from "./layoutStore";

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
        const res = await axiosInstance.post("/auth/checkEmail", {
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
        registerRequestIntercept(token);
        set({
          isLoading: false,
          user: data.user,
          stage: "email",
        });
        if (data?.user) useLayoutStore.getState()?.changeModal("");
      } catch (err) {
        set({
          isLoading: false,
          error: err?.response?.data?.message || "Signup failed",
        });
      }
    },

    getUserProfile: async (token) => {
      const { logout } = get();
      set({
        isLoading: true,
        error: null,
      });

      if (!token) {
        set({
          isLoading: false,
          error: "No token found!!",
        });
        logout();
        return;
      }
      registerRequestIntercept(token);
      try {
        const res = await axiosInstance.get("/auth/userProfile");
        set({ user: res.data.data.user });
        set({
          isLoading: false,
          error: null,
        });
      } catch (err) {
        if (err.response?.status === 401) {
          set({
            isLoading: false,
            error: "401: Session invalid or expired. Logging out.",
          });
          logout();
        }
      }
    },

    login: async (email, password) => {
      set({
        isLoading: true,
        error: null,
      });
      try {
        const params = {
          email: email,
          password: password,
        };
        const res = await axiosInstance.post("/auth/login", params);
        const { token, data } = res.data;
        set({
          isLoading: false,
          user: data.user,
          stage: "email",
        });
        setCookie(process.env.NEXT_PUBLIC_Token, token);
        registerRequestIntercept(token);
        if (data?.user) useLayoutStore.getState()?.changeModal("");
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
  })),
);
