// Use the following to index the IEvent array
export enum EventData {
  All,
  Name,
  URL,
  Timestamp,
}

// type EventData = {
//   $autocapture: {};
//   $pageview: {};
//   $pageleave: {};
//   $screen: {};
//   $identify: {};
// };

export type IEvent = [
  // All data
  {
    created_at: string;
    distinct_id: string;
    event: string;
    properties: Record<string, any>;
  },
  // Event Name
  string,
  // Current URL or Screen Name
  string,
  // Timestamp
  string
];
