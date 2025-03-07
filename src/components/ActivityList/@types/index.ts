import { IEvent } from '@/@types';

export interface ActivityListProps {
  data: IEvent[];
  error?: Error;
  isLoading: boolean;
  isRefreshing: boolean;
  isFetchingNextPage: boolean;
  onRefresh: () => void;
  onEndReached: () => void;
}
