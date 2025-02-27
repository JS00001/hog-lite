import { create } from "zustand";
import { persist } from "zustand/middleware";

import { TimePeriod } from "@/@types";
import PersistedAsyncStorage from "@/lib/async-store";

export type ActivityColumn = "event" | "url" | "timestamp";

export type ActivityDisplayMode = "compact" | "full";

interface IClientState {
  /** Whether the user is currently in dev mode or not */
  devMode: boolean;
  /** The users current theme */
  theme: "light" | "dark";
  /** The project id that the user is currently viewing */
  project: string | null;
  /** The organization id that the user is currently viewing */
  organization: string | null;
  /** The dashboard that the user is currently viewing */
  dashboard: string | null;
  /** The display mode for the activity table */
  activityDisplayMode: ActivityDisplayMode;
  /** The columns to show in the activity table */
  activityColumns: ActivityColumn[];
  /** The endpoint that the user prefers to use */
  posthogEndpoint: "https://us.posthog.com" | "https://eu.posthog.com" | string;
  /** The activity time period that the user prefers to query */
  activityTimePeriod: TimePeriod;
  /** The insights time period that the user prefers to query */
  insightsTimePeriod: TimePeriod;
  /** Whether the user prefers filtering internal users or not */
  filterTestAccounts: boolean;
}

interface IClientStore extends IClientState {
  clear: () => void;
  setField: <T extends keyof IClientState>(
    field: T,
    value: IClientState[T]
  ) => void;
}

const useClientStore = create<IClientStore>()(
  persist(
    (set) => {
      const initialState: IClientState = {
        devMode: false,
        theme: "light",
        project: null,
        organization: null,
        dashboard: null,
        activityDisplayMode: "full",
        activityColumns: ["event", "url", "timestamp"],
        activityTimePeriod: "-1dStart",
        insightsTimePeriod: "-7d",
        filterTestAccounts: false,
        posthogEndpoint: "https://us.posthog.com",
      };

      const setField = <T extends keyof IClientState>(
        field: T,
        value: IClientState[T]
      ) => {
        set((state) => ({ ...state, [field]: value }));
      };

      const clear = () => {
        set(initialState);
      };

      return {
        ...initialState,
        clear,
        setField,
      };
    },
    {
      name: "client-storage",
      storage: PersistedAsyncStorage,
    }
  )
);

export default useClientStore;
