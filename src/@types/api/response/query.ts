export interface GetQueryResponse {
  cache_key: string;
  columns: string[];
  limit: number;
  offset: number;
  results: [
    // All data
    {
      created_at: string;
      distinct_id: string;
    },
    // Event Name
    string,
    // Current URL or Screen Name
    string,
    // Timestamp
    string
  ][];
}

type EventData = {
  $autocapture: {};
  $pageview: {};
  $pageleave: {};
};
