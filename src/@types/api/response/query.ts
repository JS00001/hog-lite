import { IEvent } from "@/@types";

export interface GetQueryResponse {
  cache_key: string;
  columns: string[];
  limit: number;
  offset: number;
  hasMore: boolean;
  results: IEvent[];
}
