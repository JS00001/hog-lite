import { API, IEvent } from '@/@types';

export type GetQueryResponse = API.Response<{
  cache_key: string;
  columns: string[];
  limit: number;
  offset: number;
  hasMore: boolean;
  results: IEvent[];
}>;
