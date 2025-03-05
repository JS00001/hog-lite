import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { EventData, TimePeriod } from '@/@types';
import PersistedAsyncStorage from '@/lib/async-store';

export type ActivityColumnName = 'event' | 'url' | 'person' | 'timestamp';

export type ActivityColumn = {
  key: ActivityColumnName;
  dataIndex: EventData;
  title: string;
  description: string;
  visible: boolean;
};

export type ActivityDisplayMode = 'compact' | 'full';

export type AppIcon =
  | 'default'
  | 'angry'
  | 'nerd'
  | 'happy-blue'
  | 'happy-orange'
  | 'space';

interface IClientState {
  /** The users selected app icon */
  appIcon: AppIcon;
  /** Whether the user is currently in dev mode or not */
  devMode: boolean;
  /** The users current theme */
  theme: 'light' | 'dark';
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
  posthogEndpoint: 'https://us.posthog.com' | 'https://eu.posthog.com' | string;
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
    value: IClientState[T],
  ) => void;
}

const useClientStore = create<IClientStore>()(
  persist(
    (set) => {
      const initialState: IClientState = {
        devMode: false,
        theme: 'light',
        project: null,
        organization: null,
        dashboard: null,
        appIcon: 'default',
        activityDisplayMode: 'full',
        activityTimePeriod: '-1dStart',
        insightsTimePeriod: '-7d',
        filterTestAccounts: false,
        posthogEndpoint: 'https://us.posthog.com',
        activityColumns: [
          {
            dataIndex: EventData.Name,
            key: 'event',
            title: 'Event',
            description: 'The name of the event that occurred',
            visible: true,
          },
          {
            dataIndex: EventData.URL,
            key: 'url',
            visible: true,
            title: 'URL / Screen',
            description: 'The url/screen where the action occurred',
          },
          {
            dataIndex: EventData.Person,
            key: 'person',
            visible: false,
            title: 'Person',
            description: 'The person who performed the action',
          },
          {
            dataIndex: EventData.Timestamp,
            key: 'timestamp',
            visible: true,
            title: 'Timestamp',
            description: 'The time when the activity occurred',
          },
        ],
      };

      const setField = <T extends keyof IClientState>(
        field: T,
        value: IClientState[T],
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
      version: 3,
      name: 'client-storage',
      storage: PersistedAsyncStorage,
      migrate: (s) => {
        const state = s as IClientState;

        if (state) {
          return {
            ...state,
            activityColumns: [
              {
                key: 'event',
                title: 'Event',
                description: 'The name of the event that occurred',
                visible: true,
              },
              {
                key: 'url',
                visible: true,
                title: 'URL / Screen',
                description: 'The url/screen where the action occurred',
              },
              {
                key: 'person',
                visible: false,
                title: 'Person',
                description: 'The person who performed the action',
              },
              {
                key: 'timestamp',
                visible: true,
                title: 'Timestamp',
                description: 'The time when the activity occurred',
              },
            ],
          };
        }

        return state;
      },
    },
  ),
);

export default useClientStore;
