import { IEvent } from '@/@types';

export interface ActivityListProps {
  data: IEvent[];
  error?: Error;
  isLoading: boolean;
  isFetchingNextPage: boolean;
  onEndReached: () => void;
}
