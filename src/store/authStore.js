import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,

  accessToken: localStorage.getItem("accessToken"),

  refreshToken: localStorage.getItem("refreshToken"),

  isAuthenticated: !!localStorage.getItem("accessToken"),

  login: (user, accessToken, refreshToken) => {
    localStorage.setItem("user", JSON.stringify(user));

    localStorage.setItem(
      "accessToken",
      accessToken
    );

    localStorage.setItem(
      "refreshToken",
      refreshToken
    );

    set({
      user,
      accessToken,
      refreshToken,
      isAuthenticated: true,
    });
  },

  logout: () => {
    localStorage.removeItem("user");

    localStorage.removeItem(
      "accessToken"
    );

    localStorage.removeItem(
      "refreshToken"
    );

    set({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
    });
  },

  setUser: (user) => {
    localStorage.setItem(
      "user",
      JSON.stringify(user)
    );

    set({ user });
  },
}));

export default useAuthStore;