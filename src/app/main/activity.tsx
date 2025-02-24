import { useCallback, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";

import Text from "@/ui/Text";
import Event from "@/ui/Event";
import Button from "@/ui/Button";
import Switch from "@/ui/Switch";
import Select from "@/ui/Select";
import useColors from "@/lib/theme";
import Skeleton from "@/ui/Skeleton";
import Layout from "@/components/Layout";
import useClientStore from "@/store/client";

import { EventData, TimePeriod } from "@/@types";
import { useGetEvents } from "@/hooks/api/query";
import { ISelectOption } from "@/ui/Select/@types";
import PanickedHedgehog from "@/assets/PanickedHedgehog";

enum FetchingState {
  Reloading,
  TimePeriodChange,
}

export default function Activity() {
  const [fetchState, setFetchState] = useState<FetchingState | null>(null);

  const query = useGetEvents();
  const colors = useColors();
  const clientStore = useClientStore();

  const timePeriodOptions: ISelectOption[] = [
    { label: "Today", value: "dStart" },
    { label: "Yesterday", value: "-1dStart" },
    { label: "Last 24 hours", value: "-24h" },
    { label: "Last 7 days", value: "-7d" },
    { label: "Last 30 days", value: "-30d" },
    { label: "Last 90 days", value: "-90d" },
    { label: "Last 180 days", value: "-180d" },
    { label: "This month", value: "mStart" },
    { label: "Year to date", value: "yStart" },
    { label: "All time", value: "all" },
  ];

  /**
   * When the refetch button is pressed, we want to refetch the data
   * from the server.
   */
  const onRefetch = () => {
    setFetchState(FetchingState.Reloading);
    query.refetch();
  };

  /**
   * When the end is reached, fetch a new page if
   * it exists and we are not already fetching.
   */
  const onEndReached = () => {
    if (!query.hasNextPage) return;
    if (query.isFetchingNextPage) return;
    query.fetchNextPage();
  };

  /**
   * When the select dropdown changes, set it and refetch
   * the data from the server.
   */
  const onTimePeriodChange = (value: string) => {
    setFetchState(FetchingState.TimePeriodChange);
    clientStore.setField("timePeriod", value as TimePeriod);
  };

  /**
   * Show a loading state if that is the reason for the empty data,
   * otherwise show a message to the user that no results were found.
   */
  const ListEmptyComponent = useCallback(() => {
    if (query.isLoading) {
      return (
        <View className="items-center bg-highlight">
          {new Array(15).fill(0).map((_, index) => (
            <View className="py-1.5 px-2 w-full" key={index}>
              <Skeleton key={index} className="w-full h-8" />
            </View>
          ))}
        </View>
      );
    }

    return (
      <View className="items-center py-32 bg-highlight -mb-px">
        <PanickedHedgehog size={96} />
        <Text className="text-ink text-xl font-medium">No events found</Text>
        <Text className="text-ink">
          Try changing your filters, or reloading the page.
        </Text>
      </View>
    );
  }, [query.isLoading]);

  /**
   * Show a spinner at the end of the list if we are fetching more data.
   */
  const ListFooterComponent = useCallback(() => {
    if (query.isFetchingNextPage) {
      return (
        <ActivityIndicator
          size="small"
          className="w-full bg-highlight p-4"
          color={colors.gray}
        />
      );
    }

    return null;
  }, [query.isFetchingNextPage]);

  const data = query.data?.results || [];

  const actionsDisabled = query.isLoading || query.isRefetching;
  const reloadLoading =
    actionsDisabled && fetchState === FetchingState.Reloading;
  const timePeriodLoading =
    actionsDisabled && fetchState === FetchingState.TimePeriodChange;

  return (
    <Layout title="Activity">
      <View className="flex-row gap-2 justify-between">
        <Select
          size="sm"
          placeholder="Select time period"
          options={timePeriodOptions}
          value={clientStore.timePeriod}
          loading={timePeriodLoading}
          disabled={actionsDisabled}
          onChange={onTimePeriodChange}
        />
        <Button
          size="sm"
          icon="rotate-cw"
          loading={reloadLoading}
          disabled={actionsDisabled}
          onPress={onRefetch}
        >
          Reload
        </Button>
      </View>

      <View className="h-12 px-4 rounded-xl bg-highlight border border-divider items-center justify-between flex-row">
        <Text className="font-medium text-ink">
          Filter out internal and test users
        </Text>
        <Switch
          value={clientStore.filterTestAccounts}
          onValueChange={clientStore.setField.bind(null, "filterTestAccounts")}
        />
      </View>

      <FlatList
        data={data}
        onEndReachedThreshold={0.75}
        showsVerticalScrollIndicator={false}
        contentContainerClassName="bg-divider gap-px"
        className="flex-1 rounded-xl border border-divider bg-highlight"
        ListEmptyComponent={ListEmptyComponent}
        ListFooterComponent={ListFooterComponent}
        onEndReached={onEndReached}
        ListHeaderComponent={() => (
          <View className="p-4 bg-highlight flex-row justify-between items-center">
            <Text className="text-sm font-semibold text-ink flex-1">EVENT</Text>
            <Text className="text-sm font-semibold text-ink flex-[2]">
              URL / SCREEN
            </Text>
            <Text className="text-sm font-semibold text-ink flex-1">TIME</Text>
            <View className="w-6" />
          </View>
        )}
        renderItem={({ item }) => <Event event={item} />}
        // List optimization
        removeClippedSubviews
        initialNumToRender={25}
        maxToRenderPerBatch={25}
        keyExtractor={(item) => item[EventData.All].uuid}
        getItemLayout={(_, index) => ({
          index,
          length: 40,
          offset: 40 * index,
        })}
      />
    </Layout>
  );
}
