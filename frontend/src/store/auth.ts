/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import axios from "axios";
import Cookies from "js-cookie";

interface AuthState {
  user: { id: string, email: string; role: string } | null;
  isAuthenticated: boolean;
  error: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  registerUser: (email: string, password: string, role: ROLE) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  loading: true,

  login: async (email, password) => {
    try {
        const res = await axios.post("/api/auth/login", { email, password }, {withCredentials: true});
        set({ user: res.data.rest, isAuthenticated: true, loading: false });
    } catch (err: any) {
        console.log(err);
        set({ error: err.response?.data.message || "Login failed. Please try again.", loading: false });
     }
  },

  registerUser: async (email, password, role) => {
    try {
        await axios.post("/api/auth/register", { email, password, role }, {withCredentials: true});
    } catch (err: any) {
        console.log(err);
        set({ error: err.response?.data.message || "Registration failed. Please try again.", loading: false });
    }
  },

  logout: () => {
    axios.post("/api/auth/logout", {});
    Cookies.remove("auth_token");
    set({ user: null, isAuthenticated: false, loading: false });
  },

  checkAuth: async () => {
    try {
      const res = await axios.get("/api/auth/me", {withCredentials: true});
      set({ user: res.data.user, isAuthenticated: true, loading: false });
    } catch {
      set({ user: null, isAuthenticated: false, loading: false });
    }
  },
  clearError: () => set({ error: null }),
}));
