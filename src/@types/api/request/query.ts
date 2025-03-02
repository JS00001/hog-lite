export type TimePeriod =
  /** Results from today */
  | 'dStart'
  /** Results from yesterday */
  | '-1dStart'
  /** Results from the last 24 hours */
  | '-24h'
  /** Results from the last 7 days */
  | '-7d'
  /** Results from the last 30 days */
  | '-30d'
  /** Results from the last 90 days */
  | '-90d'
  /** Results from the last 180 days */
  | '-180d'
  /** Results from the start of the month */
  | 'mStart'
  /** Results from the start of the year */
  | 'yStart'
  /** Results from all time */
  | 'all';

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
    kind: 'EventsQuery';
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
