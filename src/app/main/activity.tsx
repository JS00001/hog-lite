import { FlatList, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";

import Text from "@/ui/Text";
import Button from "@/ui/Button";
import Switch from "@/ui/Switch";
import Select from "@/ui/Select";
import { timeAgo } from "@/lib/utils";
import Layout from "@/components/Layout";
import useClientStore from "@/store/client";
import { ISelectOption } from "@/ui/Select/@types";
import { useGetEvents } from "@/hooks/api/query";
import Event from "@/ui/Event";

export default function Activity() {
  const query = useGetEvents();
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

  const onRefetch = () => {
    query.refetch();
  };

  if (query.isLoading) return null;

  return (
    <Layout title="Activity">
      <View className="flex-row gap-2 justify-between">
        <Select
          size="sm"
          placeholder="Select time period"
          options={timePeriodOptions}
          value={clientStore.timePeriod}
          disabled={query.isLoading || query.isRefetching}
          onChange={clientStore.setField.bind(null, "timePeriod")}
        />
        <Button
          size="sm"
          icon="rotate-cw"
          disabled={query.isLoading || query.isRefetching}
          onPress={onRefetch}
        >
          Reload
        </Button>
      </View>

      <View className="h-12 px-4 rounded-xl bg-white  border border-divider-light items-center justify-between flex-row">
        <Text className="font-medium">Filter out internal and test users</Text>
        <Switch
          value={clientStore.filterTestAccounts}
          onValueChange={clientStore.setField.bind(null, "filterTestAccounts")}
        />
      </View>

      <FlatList
        className="flex-1 rounded-xl border border-divider-light bg-white"
        showsVerticalScrollIndicator={false}
        contentContainerClassName="bg-divider-light gap-px rounded-xl"
        data={query.data!.results}
        ListHeaderComponent={() => (
          <View className="p-4 bg-white flex-row justify-between items-center">
            <Text className="text-sm font-semibold text-ink-light flex-1">
              EVENT
            </Text>
            <Text className="text-sm font-semibold text-ink-light flex-[2]">
              URL / SCREEN
            </Text>
            <Text className="text-sm font-semibold text-ink-light flex-1">
              TIME
            </Text>
            <View className="w-6" />
          </View>
        )}
        renderItem={({ item }) => <Event event={item} />}
      />
    </Layout>
  );
}
