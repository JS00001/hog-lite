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
  clear: () => void;
  setHydrated: () => void;
  setApiKey: (apiKey: string) => void;
}

const useAuthStore = create<IAuthStore>()(
  persist(
    (set, get) => {
      const initialState = {
        apiKey: null,
        hydrated: false,
      };

      const setApiKey = (apiKey: string) => {
        set({ apiKey });
      };

      const setHydrated = () => {
        set({ hydrated: true });
      };

      const clear = () => {
        set({ apiKey: null });
      };

      return {
        ...initialState,
        setApiKey,
        setHydrated,
        clear,
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
