import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface UserStoreGetters {
  isLoggedIn: boolean;
  username: string | null;
}

interface UserStoreSetters {
  setLoginState: (isLoggedIn: boolean) => void;
  setUsername: (username: string) => void;
}

type UserStore = UserStoreGetters & UserStoreSetters;

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      username: null,

      setLoginState: (isLoggedIn) => set({ isLoggedIn }),
      setUsername: (username) => set({ username }),
    }),
    {
      name: "user-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        isLoggedIn: state.isLoggedIn,
        username: state.username,
      }),
    },
  ),
);
