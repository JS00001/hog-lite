export type TimePeriod =
  /** Results from today */
  | "dStart"
  /** Results from yesterday */
  | "-1dStart"
  /** Results from the last 24 hours */
  | "-24h"
  /** Results from the last 7 days */
  | "-7d"
  /** Results from the last 30 days */
  | "-30d"
  /** Results from the last 90 days */
  | "-90d"
  /** Results from the last 180 days */
  | "-180d"
  /** Results from the start of the month */
  | "mStart"
  /** Results from the start of the year */
  | "yStart"
  /** Results from all time */
  | "all";

export type RequestRefresh =
  /**
   * Calculate synchronously (returning only when the query is done),
   * UNLESS there are very fresh results in the cache
   */
  | "blocking"
  /**
   * Kick off background calculation (returning immediately with a query status)
   * UNLESS there are very fresh results in the cache
   */
  | "async"
  /**
   * Kick off background calculation, UNLESS there are somewhat fresh results
   * in the cache
   */
  | "lazy_async"
  /**
   * Calculate synchronously, even if fresh results are already cached, essentially
   * a "force refresh"
   */
  | "force_blocking"
  /**
   * Kick off background calculation, even if fresh results are already cached, essentially
   * an async force refresh
   */
  | "force_async"
  /**
   * Return cached data or a cache miss; always completes immediately as it never calculates
   * Background calculation can be tracked using the query_status response field.
   */
  | "force_cache";

export interface GetQueryRequest {
  /** The project id to query */
  project_id?: string;
  /** A client-generated query id to fetch results later on */
  client_query_id: string;
  /** The query to run */
  query: {
    /** The amount to limit to */
    limit?: number;
    /** The amount to offset by */
    offset?: number;
    /** The type of query */
    kind: "EventsQuery";
    /** Limit to results within a specific time range */
    after: TimePeriod;
    /** Whether to filter out test users or not */
    filterTestAccounts: boolean;
    /**
     * What to order by
     * EX: timestamp DESC, timestamp ASC, etc.
     */
    orderBy: string[];
    /**
     * What to select from the db
     * EX: *, event, person, etc.
     */
    select: string[];
  };
}
