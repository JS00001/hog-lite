import {
  GetDashboardResponse,
  GetDashboardsResponse,
  GetOrganizationResponse,
  GetQueryResponse,
  GetUserResponse,
  IEvent,
  IInsight,
  IOrganization,
  IProject,
  TimePeriod,
} from "@/@types";

/**
 * Placeholder Data
 */
const MockOrganization: IOrganization = {
  id: "123",
  name: "Demo",
  slug: "demo",
  logo_media_id: "123",
};

const MockProject: IProject = {
  id: 123,
  organization_id: 123,
  name: "Demo Project",
};

export const MockInsights: Record<
  TimePeriod,
  { id: number; insight: IInsight }[]
> = {
  dStart: [
    {
      id: 1,
      insight: {
        name: "Page Views",
        description: "Total number of page views",
        result: [{ data: [], days: [], count: 15, label: "Page Views" }],
      },
    },
    {
      id: 2,
      insight: {
        name: "Daily Users",
        description: "Total number of daily users",
        result: [{ data: [], days: [], count: 10, label: "Daily Users" }],
      },
    },
    {
      id: 3,
      insight: {
        name: "Daily Sessions",
        description: "Total number of daily sessions",
        result: [{ data: [], days: [], count: 20, label: "Daily Sessions" }],
      },
    },
  ],
  "-1dStart": [
    {
      id: 1,
      insight: {
        name: "Page Views",
        description: "Total number of page views",
        result: [{ data: [], days: [], count: 25, label: "Page Views" }],
      },
    },
    {
      id: 2,
      insight: {
        name: "Daily Users",
        description: "Total number of daily users",
        result: [{ data: [], days: [], count: 20, label: "Daily Users" }],
      },
    },
    {
      id: 3,
      insight: {
        name: "Daily Sessions",
        description: "Total number of daily sessions",
        result: [{ data: [], days: [], count: 30, label: "Daily Sessions" }],
      },
    },
  ],
  "-24h": [
    {
      id: 1,
      insight: {
        name: "Page Views",
        description: "Total number of page views",
        result: [{ data: [], days: [], count: 35, label: "Page Views" }],
      },
    },
    {
      id: 2,
      insight: {
        name: "Daily Users",
        description: "Total number of daily users",
        result: [{ data: [], days: [], count: 30, label: "Daily Users" }],
      },
    },
    {
      id: 3,
      insight: {
        name: "Daily Sessions",
        description: "Total number of daily sessions",
        result: [{ data: [], days: [], count: 40, label: "Daily Sessions" }],
      },
    },
  ],
  "-7d": [
    {
      id: 1,
      insight: {
        name: "Page Views",
        description: "Total number of page views",
        result: [{ data: [], days: [], count: 45, label: "Page Views" }],
      },
    },
    {
      id: 2,
      insight: {
        name: "Daily Users",
        description: "Total number of daily users",
        result: [{ data: [], days: [], count: 40, label: "Daily Users" }],
      },
    },
    {
      id: 3,
      insight: {
        name: "Daily Sessions",
        description: "Total number of daily sessions",
        result: [{ data: [], days: [], count: 50, label: "Daily Sessions" }],
      },
    },
  ],
  "-30d": [
    {
      id: 1,
      insight: {
        name: "Page Views",
        description: "Total number of page views",
        result: [{ data: [], days: [], count: 55, label: "Page Views" }],
      },
    },
    {
      id: 2,
      insight: {
        name: "Daily Users",
        description: "Total number of daily users",
        result: [{ data: [], days: [], count: 50, label: "Daily Users" }],
      },
    },
    {
      id: 3,
      insight: {
        name: "Daily Sessions",
        description: "Total number of daily sessions",
        result: [{ data: [], days: [], count: 60, label: "Daily Sessions" }],
      },
    },
  ],
  "-90d": [
    {
      id: 1,
      insight: {
        name: "Page Views",
        description: "Total number of page views",
        result: [{ data: [], days: [], count: 65, label: "Page Views" }],
      },
    },
    {
      id: 2,
      insight: {
        name: "Daily Users",
        description: "Total number of daily users",
        result: [{ data: [], days: [], count: 60, label: "Daily Users" }],
      },
    },
    {
      id: 3,
      insight: {
        name: "Daily Sessions",
        description: "Total number of daily sessions",
        result: [{ data: [], days: [], count: 60, label: "Daily Sessions" }],
      },
    },
  ],
  "-180d": [
    {
      id: 1,
      insight: {
        name: "Page Views",
        description: "Total number of page views",
        result: [{ data: [], days: [], count: 65, label: "Page Views" }],
      },
    },
    {
      id: 2,
      insight: {
        name: "Daily Users",
        description: "Total number of daily users",
        result: [{ data: [], days: [], count: 60, label: "Daily Users" }],
      },
    },
    {
      id: 3,
      insight: {
        name: "Daily Sessions",
        description: "Total number of daily sessions",
        result: [{ data: [], days: [], count: 70, label: "Daily Sessions" }],
      },
    },
  ],
  mStart: [
    {
      id: 1,
      insight: {
        name: "Page Views",
        description: "Total number of page views",
        result: [{ data: [], days: [], count: 75, label: "Page Views" }],
      },
    },
    {
      id: 2,
      insight: {
        name: "Daily Users",
        description: "Total number of daily users",
        result: [{ data: [], days: [], count: 70, label: "Daily Users" }],
      },
    },
    {
      id: 3,
      insight: {
        name: "Daily Sessions",
        description: "Total number of daily sessions",
        result: [{ data: [], days: [], count: 80, label: "Daily Sessions" }],
      },
    },
  ],
  yStart: [
    {
      id: 1,
      insight: {
        name: "Page Views",
        description: "Total number of page views",
        result: [{ data: [], days: [], count: 85, label: "Page Views" }],
      },
    },
    {
      id: 2,
      insight: {
        name: "Daily Users",
        description: "Total number of daily users",
        result: [{ data: [], days: [], count: 80, label: "Daily Users" }],
      },
    },
    {
      id: 3,
      insight: {
        name: "Daily Sessions",
        description: "Total number of daily sessions",
        result: [{ data: [], days: [], count: 90, label: "Daily Sessions" }],
      },
    },
  ],
  all: [
    {
      id: 1,
      insight: {
        name: "Page Views",
        description: "Total number of page views",
        result: [{ data: [], days: [], count: 95, label: "Page Views" }],
      },
    },
    {
      id: 2,
      insight: {
        name: "Daily Users",
        description: "Total number of daily users",
        result: [{ data: [], days: [], count: 90, label: "Daily Users" }],
      },
    },
    {
      id: 3,
      insight: {
        name: "Daily Sessions",
        description: "Total number of daily sessions",
        result: [{ data: [], days: [], count: 100, label: "Daily Sessions" }],
      },
    },
  ],
};

export const MockActivity: Record<TimePeriod, IEvent[]> = {
  dStart: [
    [
      {
        uuid: "1",
        created_at: "2021-08-01T00:00:00Z",
        distinct_id: "1",
        event: "pageview",
        properties: {
          posthog_property_1: "Hello",
          posthog_property_2: "World",
          region: "US",
          state: "CA",
          zip: "90210",
          another_property: "Another Value",
        },
      },
      "pageview",
      "/",
      "2021-08-01T00:00:00Z",
    ],
    [
      {
        uuid: "2",
        created_at: "2021-08-01T00:00:00Z",
        distinct_id: "2",
        event: "pageview",
        properties: {
          posthog_property_1: "Hello",
          posthog_property_2: "World",
          region: "US",
          state: "CA",
          zip: "90210",
          another_property: "Another Value",
        },
      },
      "pageview",
      "/",
      "2021-08-01T00:00:00Z",
    ],
    [
      {
        uuid: "3",
        created_at: "2021-08-01T00:00:00Z",
        distinct_id: "3",
        event: "pageview",
        properties: {
          posthog_property_1: "Hello",
          posthog_property_2: "World",
          region: "US",
          state: "CA",
          zip: "90210",
          another_property: "Another Value",
        },
      },
      "pageview",
      "/",
      "2021-08-01T00:00:00Z",
    ],
  ],
  "-1dStart": [
    [
      {
        uuid: "1",
        created_at: "2021-08-01T00:00:00Z",
        distinct_id: "1",
        event: "pageview",
        properties: {
          posthog_property_1: "Hello",
          posthog_property_2: "World",
          region: "US",
          state: "CA",
          zip: "90210",
          another_property: "Another Value",
        },
      },
      "pageview",
      "/",
      "2021-08-01T00:00:00Z",
    ],
    [
      {
        uuid: "2",
        created_at: "2021-08-01T00:00:00Z",
        distinct_id: "2",
        event: "pageview",
        properties: {
          posthog_property_1: "Hello",
          posthog_property_2: "World",
          region: "US",
          state: "CA",
          zip: "90210",
          another_property: "Another Value",
        },
      },
      "pageview",
      "/",
      "2021-08-01T00:00:00Z",
    ],
    [
      {
        uuid: "3",
        created_at: "2021-08-01T00:00:00Z",
        distinct_id: "3",
        event: "pageview",
        properties: {
          posthog_property_1: "Hello",
          posthog_property_2: "World",
          region: "US",
          state: "CA",
          zip: "90210",
          another_property: "Another Value",
        },
      },
      "pageview",
      "/",
      "2021-08-01T00:00:00Z",
    ],
    [
      {
        uuid: "4",
        created_at: "2021-08-01T00:00:00Z",
        distinct_id: "4",
        event: "pageleave",
        properties: {
          posthog_property_1: "Hello",
          posthog_property_2: "World",
          region: "US",
          state: "CA",
          zip: "90210",
          another_property: "Another Value",
        },
      },
      "pageleave",
      "/",
      "2021-08-01T00:00:00Z",
    ],
  ],
  "-24h": [
    [
      {
        uuid: "1",
        created_at: "2021-08-01T00:00:00Z",
        distinct_id: "1",
        event: "pageview",
        properties: {
          posthog_property_1: "Hello",
          posthog_property_2: "World",
          region: "US",
          state: "CA",
          zip: "90210",
          another_property: "Another Value",
        },
      },
      "pageview",
      "/",
      "2021-08-01T00:00:00Z",
    ],
    [
      {
        uuid: "2",
        created_at: "2021-08-01T00:00:00Z",
        distinct_id: "2",
        event: "pageview",
        properties: {
          posthog_property_1: "Hello",
          posthog_property_2: "World",
          region: "US",
          state: "CA",
          zip: "90210",
          another_property: "Another Value",
        },
      },
      "pageview",
      "/",
      "2021-08-01T00:00:00Z",
    ],
    [
      {
        uuid: "3",
        created_at: "2021-08-01T00:00:00Z",
        distinct_id: "3",
        event: "pageview",
        properties: {
          posthog_property_1: "Hello",
          posthog_property_2: "World",
          region: "US",
          state: "CA",
          zip: "90210",
          another_property: "Another Value",
        },
      },
      "pageview",
      "/",
      "2021-08-01T00:00:00Z",
    ],
    [
      {
        uuid: "4",
        created_at: "2021-08-01T00:00:00Z",
        distinct_id: "4",
        event: "pageleave",
        properties: {
          posthog_property_1: "Hello",
          posthog_property_2: "World",
          region: "US",
          state: "CA",
          zip: "90210",
          another_property: "Another Value",
        },
      },
      "pageleave",
      "/",
      "2021-08-01T00:00:00Z",
    ],
    [
      {
        uuid: "5",
        created_at: "2021-08-01T00:00:00Z",
        distinct_id: "5",
        event: "pageview",
        properties: {
          posthog_property_1: "Hello",
          posthog_property_2: "World",
          region: "US",
          state: "CA",
          zip: "90210",
          another_property: "Another Value",
        },
      },
      "pageview",
      "/",
      "2021-08-01T00:00:00Z",
    ],
  ],
  "-7d": [
    [
      {
        uuid: "1",
        created_at: "2021-08-01T00:00:00Z",
        distinct_id: "1",
        event: "pageview",
        properties: {
          posthog_property_1: "Hello",
          posthog_property_2: "World",
          region: "US",
          state: "CA",
          zip: "90210",
          another_property: "Another Value",
        },
      },
      "pageview",
      "/",
      "2021-08-01T00:00:00Z",
    ],
    [
      {
        uuid: "2",
        created_at: "2021-08-01T00:00:00Z",
        distinct_id: "2",
        event: "pageview",
        properties: {
          posthog_property_1: "Hello",
          posthog_property_2: "World",
          region: "US",
          state: "CA",
          zip: "90210",
          another_property: "Another Value",
        },
      },
      "pageview",
      "/",
      "2021-08-01T00:00:00Z",
    ],
    [
      {
        uuid: "3",
        created_at: "2021-08-01T00:00:00Z",
        distinct_id: "3",
        event: "pageview",
        properties: {
          posthog_property_1: "Hello",
          posthog_property_2: "World",
          region: "US",
          state: "CA",
          zip: "90210",
          another_property: "Another Value",
        },
      },
      "pageview",
      "/",
      "2021-08-01T00:00:00Z",
    ],
    [
      {
        uuid: "4",
        created_at: "2021-08-01T00:00:00Z",
        distinct_id: "4",
        event: "pageleave",
        properties: {
          posthog_property_1: "Hello",
          posthog_property_2: "World",
          region: "US",
          state: "CA",
          zip: "90210",
          another_property: "Another Value",
        },
      },
      "pageleave",
      "/",
      "2021-08-01T00:00:00Z",
    ],
    [
      {
        uuid: "5",
        created_at: "2021-08-01T00:00:00Z",
        distinct_id: "5",
        event: "pageview",
        properties: {
          posthog_property_1: "Hello",
          posthog_property_2: "World",
          region: "US",
          state: "CA",
          zip: "90210",
          another_property: "Another Value",
        },
      },
      "pageview",
      "/",
      "2021-08-01T00:00:00Z",
    ],
    [
      {
        uuid: "6",
        created_at: "2021-08-01T00:00:00Z",
        distinct_id: "6",
        event: "pageleave",
        properties: {
          posthog_property_1: "Hello",
          posthog_property_2: "World",
          region: "US",
          state: "CA",
          zip: "90210",
          another_property: "Another Value",
        },
      },
      "pageleave",
      "/",
      "2021-08-01T00:00:00Z",
    ],
  ],
  "-30d": [
    [
      {
        uuid: "1",
        created_at: "2021-08-01T00:00:00Z",
        distinct_id: "1",
        event: "pageview",
        properties: {
          posthog_property_1: "Hello",
          posthog_property_2: "World",
          region: "US",
          state: "CA",
          zip: "90210",
          another_property: "Another Value",
        },
      },
      "pageview",
      "/",
      "2021-08-01T00:00:00Z",
    ],
    [
      {
        uuid: "2",
        created_at: "2021-08-01T00:00:00Z",
        distinct_id: "2",
        event: "pageview",
        properties: {
          posthog_property_1: "Hello",
          posthog_property_2: "World",
          region: "US",
          state: "CA",
          zip: "90210",
          another_property: "Another Value",
        },
      },
      "pageview",
      "/",
      "2021-08-01T00:00:00Z",
    ],
    [
      {
        uuid: "3",
        created_at: "2021-08-01T00:00:00Z",
        distinct_id: "3",
        event: "pageview",
        properties: {
          posthog_property_1: "Hello",
          posthog_property_2: "World",
          region: "US",
          state: "CA",
          zip: "90210",
          another_property: "Another Value",
        },
      },
      "pageview",
      "/",
      "2021-08-01T00:00:00Z",
    ],
    [
      {
        uuid: "4",
        created_at: "2021-08-01T00:00:00Z",
        distinct_id: "4",
        event: "pageleave",
        properties: {
          posthog_property_1: "Hello",
          posthog_property_2: "World",
          region: "US",
          state: "CA",
          zip: "90210",
          another_property: "Another Value",
        },
      },
      "pageleave",
      "/",
      "2021-08-01T00:00:00Z",
    ],
    [
      {
        uuid: "5",
        created_at: "2021-08-01T00:00:00Z",
        distinct_id: "5",
        event: "pageview",
        properties: {
          posthog_property_1: "Hello",
          posthog_property_2: "World",
          region: "US",
          state: "CA",
          zip: "90210",
          another_property: "Another Value",
        },
      },
      "pageview",
      "/",
      "2021-08-01T00:00:00Z",
    ],
    [
      {
        uuid: "6",
        created_at: "2021-08-01T00:00:00Z",
        distinct_id: "6",
        event: "pageleave",
        properties: {
          posthog_property_1: "Hello",
          posthog_property_2: "World",
          region: "US",
          state: "CA",
          zip: "90210",
          another_property: "Another Value",
        },
      },
      "pageleave",
      "/",
      "2021-08-01T00:00:00Z",
    ],
    [
      {
        uuid: "7",
        created_at: "2021-08-01T00:00:00Z",
        distinct_id: "7",
        event: "pageview",
        properties: {
          posthog_property_1: "Hello",
          posthog_property_2: "World",
          region: "US",
          state: "CA",
          zip: "90210",
          another_property: "Another Value",
        },
      },
      "pageview",
      "/index",
      "2021-08-01T00:00:00Z",
    ],
  ],
  "-90d": [
    [
      {
        uuid: "1",
        created_at: "2021-08-01T00:00:00Z",
        distinct_id: "1",
        event: "pageview",
        properties: {
          posthog_property_1: "Hello",
          posthog_property_2: "World",
          region: "US",
          state: "CA",
          zip: "90210",
          another_property: "Another Value",
        },
      },
      "pageview",
      "/",
      "2021-08-01T00:00:00Z",
    ],
    [
      {
        uuid: "2",
        created_at: "2021-08-01T00:00:00Z",
        distinct_id: "2",
        event: "pageview",
        properties: {
          posthog_property_1: "Hello",
          posthog_property_2: "World",
          region: "US",
          state: "CA",
          zip: "90210",
          another_property: "Another Value",
        },
      },
      "pageview",
      "/",
      "2021-08-01T00:00:00Z",
    ],
    [
      {
        uuid: "3",
        created_at: "2021-08-01T00:00:00Z",
        distinct_id: "3",
        event: "pageview",
        properties: {
          posthog_property_1: "Hello",
          posthog_property_2: "World",
          region: "US",
          state: "CA",
          zip: "90210",
          another_property: "Another Value",
        },
      },
      "pageview",
      "/",
      "2021-08-01T00:00:00Z",
    ],
    [
      {
        uuid: "4",
        created_at: "2021-08-01T00:00:00Z",
        distinct_id: "4",
        event: "pageleave",
        properties: {
          posthog_property_1: "Hello",
          posthog_property_2: "World",
          region: "US",
          state: "CA",
          zip: "90210",
          another_property: "Another Value",
        },
      },
      "pageleave",
      "/",
      "2021-08-01T00:00:00Z",
    ],
    [
      {
        uuid: "5",
        created_at: "2021-08-01T00:00:00Z",
        distinct_id: "5",
        event: "pageview",
        properties: {
          posthog_property_1: "Hello",
          posthog_property_2: "World",
          region: "US",
          state: "CA",
          zip: "90210",
          another_property: "Another Value",
        },
      },
      "pageview",
      "/",
      "2021-08-01T00:00:00Z",
    ],
    [
      {
        uuid: "6",
        created_at: "2021-08-01T00:00:00Z",
        distinct_id: "6",
        event: "pageleave",
        properties: {
          posthog_property_1: "Hello",
          posthog_property_2: "World",
          region: "US",
          state: "CA",
          zip: "90210",
          another_property: "Another Value",
        },
      },
      "pageleave",
      "/",
      "2021-08-01T00:00:00Z",
    ],
    [
      {
        uuid: "7",
        created_at: "2021-08-01T00:00:00Z",
        distinct_id: "7",
        event: "pageview",
        properties: {
          posthog_property_1: "Hello",
          posthog_property_2: "World",
          region: "US",
          state: "CA",
          zip: "90210",
          another_property: "Another Value",
        },
      },
      "pageview",
      "/index",
      "2021-08-01T00:00:00Z",
    ],
    [
      {
        uuid: "8",
        created_at: "2021-08-01T00:00:00Z",
        distinct_id: "8",
        event: "pageleave",
        properties: {
          posthog_property_1: "Hello",
          posthog_property_2: "World",
          region: "US",
          state: "CA",
          zip: "90210",
          another_property: "Another Value",
        },
      },
      "pageleave",
      "/hello",
      "2021-08-01T00:00:00Z",
    ],
  ],
  "-180d": [
    [
      {
        uuid: "1",
        created_at: "2021-08-01T00:00:00Z",
        distinct_id: "1",
        event: "pageview",
        properties: {
          posthog_property_1: "Hello",
          posthog_property_2: "World",
          region: "US",
          state: "CA",
          zip: "90210",
          another_property: "Another Value",
        },
      },
      "pageview",
      "/",
      "2021-08-01T00:00:00Z",
    ],
    [
      {
        uuid: "2",
        created_at: "2021-08-01T00:00:00Z",
        distinct_id: "2",
        event: "pageview",
        properties: {
          posthog_property_1: "Hello",
          posthog_property_2: "World",
          region: "US",
          state: "CA",
          zip: "90210",
          another_property: "Another Value",
        },
      },
      "pageview",
      "/",
      "2021-08-01T00:00:00Z",
    ],
    [
      {
        uuid: "3",
        created_at: "2021-08-01T00:00:00Z",
        distinct_id: "3",
        event: "pageview",
        properties: {
          posthog_property_1: "Hello",
          posthog_property_2: "World",
          region: "US",
          state: "CA",
          zip: "90210",
          another_property: "Another Value",
        },
      },
      "pageview",
      "/",
      "2021-08-01T00:00:00Z",
    ],
    [
      {
        uuid: "4",
        created_at: "2021-08-01T00:00:00Z",
        distinct_id: "4",
        event: "pageleave",
        properties: {
          posthog_property_1: "Hello",
          posthog_property_2: "World",
          region: "US",
          state: "CA",
          zip: "90210",
          another_property: "Another Value",
        },
      },
      "pageleave",
      "/",
      "2021-08-01T00:00:00Z",
    ],
    [
      {
        uuid: "5",
        created_at: "2021-08-01T00:00:00Z",
        distinct_id: "5",
        event: "pageview",
        properties: {
          posthog_property_1: "Hello",
          posthog_property_2: "World",
          region: "US",
          state: "CA",
          zip: "90210",
          another_property: "Another Value",
        },
      },
      "pageview",
      "/",
      "2021-08-01T00:00:00Z",
    ],
    [
      {
        uuid: "6",
        created_at: "2021-08-01T00:00:00Z",
        distinct_id: "6",
        event: "pageleave",
        properties: {
          posthog_property_1: "Hello",
          posthog_property_2: "World",
          region: "US",
          state: "CA",
          zip: "90210",
          another_property: "Another Value",
        },
      },
      "pageleave",
      "/",
      "2021-08-01T00:00:00Z",
    ],
    [
      {
        uuid: "7",
        created_at: "2021-08-01T00:00:00Z",
        distinct_id: "7",
        event: "pageview",
        properties: {
          posthog_property_1: "Hello",
          posthog_property_2: "World",
          region: "US",
          state: "CA",
          zip: "90210",
          another_property: "Another Value",
        },
      },
      "pageview",
      "/index",
      "2021-08-01T00:00:00Z",
    ],
    [
      {
        uuid: "8",
        created_at: "2021-08-01T00:00:00Z",
        distinct_id: "8",
        event: "pageleave",
        properties: {
          posthog_property_1: "Hello",
          posthog_property_2: "World",
          region: "US",
          state: "CA",
          zip: "90210",
          another_property: "Another Value",
        },
      },
      "pageleave",
      "/hello",
      "2021-08-01T00:00:00Z",
    ],
    [
      {
        uuid: "9",
        created_at: "2021-08-01T00:00:00Z",
        distinct_id: "9",
        event: "pageview",
        properties: {
          posthog_property_1: "Hello",
          posthog_property_2: "World",
          region: "US",
          state: "CA",
          zip: "90210",
          another_property: "Another Value",
        },
      },
      "pageview",
      "/index",
      "2021-08-01T00:00:00Z",
    ],
  ],
  mStart: [
    [
      {
        uuid: "1",
        created_at: "2021-08-01T00:00:00Z",
        distinct_id: "1",
        event: "pageview",
        properties: {
          posthog_property_1: "Hello",
          posthog_property_2: "World",
          region: "US",
          state: "CA",
          zip: "90210",
          another_property: "Another Value",
        },
      },
      "pageview",
      "/",
      "2021-08-01T00:00:00Z",
    ],
    [
      {
        uuid: "2",
        created_at: "2021-08-01T00:00:00Z",
        distinct_id: "2",
        event: "pageview",
        properties: {
          posthog_property_1: "Hello",
          posthog_property_2: "World",
          region: "US",
          state: "CA",
          zip: "90210",
          another_property: "Another Value",
        },
      },
      "pageview",
      "/",
      "2021-08-01T00:00:00Z",
    ],
    [
      {
        uuid: "3",
        created_at: "2021-08-01T00:00:00Z",
        distinct_id: "3",
        event: "pageview",
        properties: {
          posthog_property_1: "Hello",
          posthog_property_2: "World",
          region: "US",
          state: "CA",
          zip: "90210",
          another_property: "Another Value",
        },
      },
      "pageview",
      "/",
      "2021-08-01T00:00:00Z",
    ],
    [
      {
        uuid: "4",
        created_at: "2021-08-01T00:00:00Z",
        distinct_id: "4",
        event: "pageleave",
        properties: {
          posthog_property_1: "Hello",
          posthog_property_2: "World",
          region: "US",
          state: "CA",
          zip: "90210",
          another_property: "Another Value",
        },
      },
      "pageleave",
      "/",
      "2021-08-01T00:00:00Z",
    ],
    [
      {
        uuid: "5",
        created_at: "2021-08-01T00:00:00Z",
        distinct_id: "5",
        event: "pageview",
        properties: {
          posthog_property_1: "Hello",
          posthog_property_2: "World",
          region: "US",
          state: "CA",
          zip: "90210",
          another_property: "Another Value",
        },
      },
      "pageview",
      "/",
      "2021-08-01T00:00:00Z",
    ],
    [
      {
        uuid: "6",
        created_at: "2021-08-01T00:00:00Z",
        distinct_id: "6",
        event: "pageleave",
        properties: {
          posthog_property_1: "Hello",
          posthog_property_2: "World",
          region: "US",
          state: "CA",
          zip: "90210",
          another_property: "Another Value",
        },
      },
      "pageleave",
      "/",
      "2021-08-01T00:00:00Z",
    ],
    [
      {
        uuid: "7",
        created_at: "2021-08-01T00:00:00Z",
        distinct_id: "7",
        event: "pageview",
        properties: {
          posthog_property_1: "Hello",
          posthog_property_2: "World",
          region: "US",
          state: "CA",
          zip: "90210",
          another_property: "Another Value",
        },
      },
      "pageview",
      "/index",
      "2021-08-01T00:00:00Z",
    ],
    [
      {
        uuid: "8",
        created_at: "2021-08-01T00:00:00Z",
        distinct_id: "8",
        event: "pageleave",
        properties: {
          posthog_property_1: "Hello",
          posthog_property_2: "World",
          region: "US",
          state: "CA",
          zip: "90210",
          another_property: "Another Value",
        },
      },
      "pageleave",
      "/hello",
      "2021-08-01T00:00:00Z",
    ],
    [
      {
        uuid: "9",
        created_at: "2021-08-01T00:00:00Z",
        distinct_id: "9",
        event: "pageview",
        properties: {
          posthog_property_1: "Hello",
          posthog_property_2: "World",
          region: "US",
          state: "CA",
          zip: "90210",
          another_property: "Another Value",
        },
      },
      "pageview",
      "/index",
      "2021-08-01T00:00:00Z",
    ],
    [
      {
        uuid: "10",
        created_at: "2021-08-01T00:00:00Z",
        distinct_id: "10",
        event: "pageleave",
        properties: {
          posthog_property_1: "Hello",
          posthog_property_2: "World",
          region: "US",
          state: "CA",
          zip: "90210",
          another_property: "Another Value",
        },
      },
      "pageleave",
      "/hello",
      "2021-08-01T00:00:00Z",
    ],
  ],
  yStart: [
    [
      {
        uuid: "1",
        created_at: "2021-08-01T00:00:00Z",
        distinct_id: "1",
        event: "pageview",
        properties: {
          posthog_property_1: "Hello",
          posthog_property_2: "World",
          region: "US",
          state: "CA",
          zip: "90210",
          another_property: "Another Value",
        },
      },
      "pageview",
      "/",
      "2021-08-01T00:00:00Z",
    ],
    [
      {
        uuid: "2",
        created_at: "2021-08-01T00:00:00Z",
        distinct_id: "2",
        event: "pageview",
        properties: {
          posthog_property_1: "Hello",
          posthog_property_2: "World",
          region: "US",
          state: "CA",
          zip: "90210",
          another_property: "Another Value",
        },
      },
      "pageview",
      "/",
      "2021-08-01T00:00:00Z",
    ],
    [
      {
        uuid: "3",
        created_at: "2021-08-01T00:00:00Z",
        distinct_id: "3",
        event: "pageview",
        properties: {
          posthog_property_1: "Hello",
          posthog_property_2: "World",
          region: "US",
          state: "CA",
          zip: "90210",
          another_property: "Another Value",
        },
      },
      "pageview",
      "/",
      "2021-08-01T00:00:00Z",
    ],
    [
      {
        uuid: "4",
        created_at: "2021-08-01T00:00:00Z",
        distinct_id: "4",
        event: "pageleave",
        properties: {
          posthog_property_1: "Hello",
          posthog_property_2: "World",
          region: "US",
          state: "CA",
          zip: "90210",
          another_property: "Another Value",
        },
      },
      "pageleave",
      "/",
      "2021-08-01T00:00:00Z",
    ],
    [
      {
        uuid: "5",
        created_at: "2021-08-01T00:00:00Z",
        distinct_id: "5",
        event: "pageview",
        properties: {
          posthog_property_1: "Hello",
          posthog_property_2: "World",
          region: "US",
          state: "CA",
          zip: "90210",
          another_property: "Another Value",
        },
      },
      "pageview",
      "/",
      "2021-08-01T00:00:00Z",
    ],
    [
      {
        uuid: "6",
        created_at: "2021-08-01T00:00:00Z",
        distinct_id: "6",
        event: "pageleave",
        properties: {
          posthog_property_1: "Hello",
          posthog_property_2: "World",
          region: "US",
          state: "CA",
          zip: "90210",
          another_property: "Another Value",
        },
      },
      "pageleave",
      "/",
      "2021-08-01T00:00:00Z",
    ],
    [
      {
        uuid: "7",
        created_at: "2021-08-01T00:00:00Z",
        distinct_id: "7",
        event: "pageview",
        properties: {
          posthog_property_1: "Hello",
          posthog_property_2: "World",
          region: "US",
          state: "CA",
          zip: "90210",
          another_property: "Another Value",
        },
      },
      "pageview",
      "/index",
      "2021-08-01T00:00:00Z",
    ],
    [
      {
        uuid: "8",
        created_at: "2021-08-01T00:00:00Z",
        distinct_id: "8",
        event: "pageleave",
        properties: {
          posthog_property_1: "Hello",
          posthog_property_2: "World",
          region: "US",
          state: "CA",
          zip: "90210",
          another_property: "Another Value",
        },
      },
      "pageleave",
      "/hello",
      "2021-08-01T00:00:00Z",
    ],
    [
      {
        uuid: "9",
        created_at: "2021-08-01T00:00:00Z",
        distinct_id: "9",
        event: "pageview",
        properties: {
          posthog_property_1: "Hello",
          posthog_property_2: "World",
          region: "US",
          state: "CA",
          zip: "90210",
          another_property: "Another Value",
        },
      },
      "pageview",
      "/index",
      "2021-08-01T00:00:00Z",
    ],
    [
      {
        uuid: "10",
        created_at: "2021-08-01T00:00:00Z",
        distinct_id: "10",
        event: "pageleave",
        properties: {
          posthog_property_1: "Hello",
          posthog_property_2: "World",
          region: "US",
          state: "CA",
          zip: "90210",
          another_property: "Another Value",
        },
      },
      "pageleave",
      "/hello",
      "2021-08-01T00:00:00Z",
    ],
    [
      {
        uuid: "11",
        created_at: "2021-08-01T00:00:00Z",
        distinct_id: "11",
        event: "pageview",
        properties: {
          posthog_property_1: "Hello",
          posthog_property_2: "World",
          region: "US",
          state: "CA",
          zip: "90210",
          another_property: "Another Value",
        },
      },
      "pageview",
      "/index",
      "2021-08-01T00:00:00Z",
    ],
  ],
  all: [
    [
      {
        uuid: "1",
        created_at: "2021-08-01T00:00:00Z",
        distinct_id: "1",
        event: "pageview",
        properties: {
          posthog_property_1: "Hello",
          posthog_property_2: "World",
          region: "US",
          state: "CA",
          zip: "90210",
          another_property: "Another Value",
        },
      },
      "pageview",
      "/",
      "2021-08-01T00:00:00Z",
    ],
    [
      {
        uuid: "2",
        created_at: "2021-08-01T00:00:00Z",
        distinct_id: "2",
        event: "pageview",
        properties: {
          posthog_property_1: "Hello",
          posthog_property_2: "World",
          region: "US",
          state: "CA",
          zip: "90210",
          another_property: "Another Value",
        },
      },
      "pageview",
      "/",
      "2021-08-01T00:00:00Z",
    ],
    [
      {
        uuid: "3",
        created_at: "2021-08-01T00:00:00Z",
        distinct_id: "3",
        event: "pageview",
        properties: {
          posthog_property_1: "Hello",
          posthog_property_2: "World",
          region: "US",
          state: "CA",
          zip: "90210",
          another_property: "Another Value",
        },
      },
      "pageview",
      "/",
      "2021-08-01T00:00:00Z",
    ],
    [
      {
        uuid: "4",
        created_at: "2021-08-01T00:00:00Z",
        distinct_id: "4",
        event: "pageleave",
        properties: {
          posthog_property_1: "Hello",
          posthog_property_2: "World",
          region: "US",
          state: "CA",
          zip: "90210",
          another_property: "Another Value",
        },
      },
      "pageleave",
      "/",
      "2021-08-01T00:00:00Z",
    ],
    [
      {
        uuid: "5",
        created_at: "2021-08-01T00:00:00Z",
        distinct_id: "5",
        event: "pageview",
        properties: {
          posthog_property_1: "Hello",
          posthog_property_2: "World",
          region: "US",
          state: "CA",
          zip: "90210",
          another_property: "Another Value",
        },
      },
      "pageview",
      "/",
      "2021-08-01T00:00:00Z",
    ],
    [
      {
        uuid: "6",
        created_at: "2021-08-01T00:00:00Z",
        distinct_id: "6",
        event: "pageleave",
        properties: {
          posthog_property_1: "Hello",
          posthog_property_2: "World",
          region: "US",
          state: "CA",
          zip: "90210",
          another_property: "Another Value",
        },
      },
      "pageleave",
      "/",
      "2021-08-01T00:00:00Z",
    ],
    [
      {
        uuid: "7",
        created_at: "2021-08-01T00:00:00Z",
        distinct_id: "7",
        event: "pageview",
        properties: {
          posthog_property_1: "Hello",
          posthog_property_2: "World",
          region: "US",
          state: "CA",
          zip: "90210",
          another_property: "Another Value",
        },
      },
      "pageview",
      "/index",
      "2021-08-01T00:00:00Z",
    ],
    [
      {
        uuid: "8",
        created_at: "2021-08-01T00:00:00Z",
        distinct_id: "8",
        event: "pageleave",
        properties: {
          posthog_property_1: "Hello",
          posthog_property_2: "World",
          region: "US",
          state: "CA",
          zip: "90210",
          another_property: "Another Value",
        },
      },
      "pageleave",
      "/hello",
      "2021-08-01T00:00:00Z",
    ],
    [
      {
        uuid: "9",
        created_at: "2021-08-01T00:00:00Z",
        distinct_id: "9",
        event: "pageview",
        properties: {
          posthog_property_1: "Hello",
          posthog_property_2: "World",
          region: "US",
          state: "CA",
          zip: "90210",
          another_property: "Another Value",
        },
      },
      "pageview",
      "/index",
      "2021-08-01T00:00:00Z",
    ],
    [
      {
        uuid: "10",
        created_at: "2021-08-01T00:00:00Z",
        distinct_id: "10",
        event: "pageleave",
        properties: {
          posthog_property_1: "Hello",
          posthog_property_2: "World",
          region: "US",
          state: "CA",
          zip: "90210",
          another_property: "Another Value",
        },
      },
      "pageleave",
      "/hello",
      "2021-08-01T00:00:00Z",
    ],
    [
      {
        uuid: "11",
        created_at: "2021-08-01T00:00:00Z",
        distinct_id: "11",
        event: "pageview",
        properties: {
          posthog_property_1: "Hello",
          posthog_property_2: "World",
          region: "US",
          state: "CA",
          zip: "90210",
          another_property: "Another Value",
        },
      },
      "pageview",
      "/index",
      "2021-08-01T00:00:00Z",
    ],
    [
      {
        uuid: "12",
        created_at: "2021-08-01T00:00:00Z",
        distinct_id: "12",
        event: "pageleave",
        properties: {
          posthog_property_1: "Hello",
          posthog_property_2: "World",
          region: "US",
          state: "CA",
          zip: "90210",
          another_property: "Another Value",
        },
      },
      "pageleave",
      "/hello",
      "2021-08-01T00:00:00Z",
    ],
  ],
};

/**
 * Mocked responses
 */
export const getMockOrganizationResponse =
  async (): Promise<GetOrganizationResponse> => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    return {
      ...MockOrganization,
      projects: [MockProject],
    };
  };

export const getMockUserResponse = async (): Promise<GetUserResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 300));

  return {
    date_joined: "2021-08-01T00:00:00Z",
    uuid: "123",
    distinct_id: "123",
    first_name: "John",
    last_name: "Doe",
    email: "johndoe@gmail.com",
    organizations: [MockOrganization],

    organization: {
      ...MockOrganization,
      projects: [MockProject],
    },
  };
};

export const getMockDashboardsResponse =
  async (): Promise<GetDashboardsResponse> => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    return {
      count: 1,
      results: [
        {
          id: 123,
          name: "Demo Dashboard",
          description: "This is your demo dashboard",
        },
      ],
    };
  };

export const getMockDashboardResponse = async (
  time: TimePeriod
): Promise<GetDashboardResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 300));

  return {
    name: "Demo Dashboard",
    description: "This is your demo dashboard",
    tiles: MockInsights[time],
  };
};

export const getMockActivityResponse = async (
  time: TimePeriod
): Promise<GetQueryResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 300));

  return {
    cache_key: "123",
    columns: [],
    limit: 10,
    offset: 0,
    hasMore: false,
    results: MockActivity[time],
  };
};
