import { create } from "zustand";
import { persist } from "zustand/middleware";

import PersistedAsyncStorage from "@/lib/async-store";

/**
 * State that is stored about the auth
 */
interface IAuthState {
  hydrated: boolean;
  apiKey: string | null;
}

/**
 * Auth store functions and metadata
 */
interface IAuthStore extends IAuthState {
  setHydrated: () => void;
  logout: () => void;
  login: (apiKey: string) => void;
}

const useAuthStore = create<IAuthStore>()(
  persist(
    (set, get) => {
      const initialState = {
        apiKey: null,
        hydrated: false,
      };

      const login = (apiKey: string) => {
        set({ apiKey });
      };

      const logout = () => {
        set({ apiKey: null });
      };

      const setHydrated = () => {
        set({ hydrated: true });
      };

      const clear = () => {
        set({ apiKey: null });
      };

      return {
        ...initialState,
        login,
        logout,
        setHydrated,
      };
    },
    {
      name: "auth-storage",
      storage: PersistedAsyncStorage,
      // Only persist the api key
      partialize: (state) => ({
        apiKey: state.apiKey,
      }),
      // When async storage has fetched on app load, set hydrated to true
      onRehydrateStorage: () => {
        return (state, err) => {
          if (err || !state) {
            return state;
          }

          return state.setHydrated();
        };
      },
    }
  )
);

export default useAuthStore;
