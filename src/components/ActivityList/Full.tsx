import { FlatList, RefreshControl, ScrollView } from 'react-native';

import { ActivityListProps } from './@types';

import ListItem from './ListItem';
import ListEmptyComponent from './ListEmptyComponent';
import ListFooterComponent from './ListFooterComponent';
import ListHeaderComponent from './ListHeaderComponent';

import useColors from '@/lib/theme';

export default function FullActivityList({
  data,
  error,
  isLoading,
  isRefreshing,
  isFetchingNextPage,
  onRefresh,
  onEndReached,
}: ActivityListProps) {
  const colors = useColors();

  // prettier-ignore
  return (
    <ScrollView
      horizontal
      className="flex-1"
      contentContainerClassName="min-w-full"
      showsHorizontalScrollIndicator={false}
    >
      <FlatList
        data={data}
        onEndReachedThreshold={0.75}
        showsVerticalScrollIndicator={false}
        contentContainerClassName="bg-divider gap-px"
        className="rounded-xl border border-divider bg-highlight"
        ListHeaderComponent={<ListHeaderComponent />}
        ListEmptyComponent={<ListEmptyComponent error={error} isLoading={isLoading} />}
        ListFooterComponent={<ListFooterComponent isLoading={isFetchingNextPage} />}
        renderItem={({ item }) => <ListItem event={item} />}
        onEndReached={onEndReached}
        refreshControl={<RefreshControl
          tintColor={colors.gray}
          refreshing={isRefreshing}
          onRefresh={onRefresh}
        />}
        // List optimization
        removeClippedSubviews
        initialNumToRender={25}
        maxToRenderPerBatch={25}
        getItemLayout={(_, index) => ({
          index,
          length: 40,
          offset: 40 * index,
        })}
      />
    </ScrollView>
  );
}
