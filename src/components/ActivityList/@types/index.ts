import { IEvent } from '@/@types';

export enum QueryType {
  All = 'all',
  Exceptions = 'exceptions',
}
export interface ActivityListProps {
  data: IEvent[];
  error?: Error;
  isLoading: boolean;
  isRefreshing: boolean;
  isFetchingNextPage: boolean;
  onRefresh: () => void;
  onEndReached: () => void;
}
