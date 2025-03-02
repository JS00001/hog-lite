import { IEvent } from '@/@types';

export interface ActivityListProps {
  data: IEvent[];
  isLoading: boolean;
  isFetchingNextPage: boolean;
  onEndReached: () => void;
}
