import { create } from "zustand";
import { persist } from "zustand/middleware";

import { IUser } from "@/@types";
import PersistedAsyncStorage from "@/lib/async-store";

/**
 * State that is stored about the auth
 */
interface IAuthState {
  demoing: boolean;
  hydrated: boolean;
  apiKey: string | null;
  user: IUser | null;
}

/**
 * Auth store functions and metadata
 */
interface IAuthStore extends IAuthState {
  setDemoing: (demoing: boolean) => void;
  setHydrated: () => void;
  setUser: (user: IUser) => void;
  logout: () => void;
  login: (apiKey: string) => void;
}

const useAuthStore = create<IAuthStore>()(
  persist(
    (set, get) => {
      const initialState = {
        apiKey: null,
        user: null,
        hydrated: false,
        demoing: false,
      };

      const login = (apiKey: string) => {
        set({ apiKey });
      };

      const logout = () => {
        if (get().demoing) {
          set({ demoing: false });
        }

        set({ apiKey: null });
      };

      const setHydrated = () => {
        set({ hydrated: true });
      };

      const setUser = (user: IUser) => {
        set({ user });
      };

      const setDemoing = (demoing: boolean) => {
        set({ demoing });
      };

      return {
        ...initialState,
        login,
        logout,
        setHydrated,
        setUser,
        setDemoing,
      };
    },
    {
      name: "auth-storage",
      storage: PersistedAsyncStorage,
      // Only persist the api key
      partialize: (state) => ({
        apiKey: state.apiKey,
        demoing: state.demoing,
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
