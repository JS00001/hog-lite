// Use the following to index the IEvent array
export enum EventData {
  All,
  Name,
  Person,
  URL,
  Timestamp,
}

export type IEvent = [
  // All data
  {
    uuid: string;
    created_at: string;
    distinct_id: string;
    event: string;
    properties: Record<string, any>;
    elements?: {
      text: string | null;
      tag_name: string;
    }[];
  },
  // Event Name
  string,
  // Person properties
  {
    uuid?: string;
    created_at?: string;
    distinct_id: string;
    properties?: Record<string, any>;
  },
  // Current URL or Screen Name
  string,
  // Timestamp
  string,
];
