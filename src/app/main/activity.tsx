import { FlatList, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";

import Text from "@/ui/Text";
import Button from "@/ui/Button";
import Switch from "@/ui/Switch";
import Select from "@/ui/Select";
import Layout from "@/components/Layout";
import useClientStore from "@/store/client";
import { ISelectOption } from "@/ui/Select/@types";
import { useGetEvents } from "@/hooks/api/query";

export default function Activity() {
  // const query = useGetEvents();
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

  return (
    <Layout title="Activity">
      <View className="flex-row gap-2 justify-between">
        <Select
          size="sm"
          placeholder="Select time period"
          options={timePeriodOptions}
          value={clientStore.timePeriod}
          onChange={clientStore.setField.bind(null, "timePeriod")}
        />
        <Button size="sm" icon="rotate-cw">
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
        data={new Array(20).fill(0)}
        ListHeaderComponent={() => (
          <View className="p-4 bg-white flex-row justify-between items-center">
            <Text className="text-sm font-semibold text-ink-light">EVENT</Text>
            <Text className="text-sm font-semibold text-ink-light">
              URL / SCREEN
            </Text>
            <Text className="text-sm font-semibold text-ink-light">TIME</Text>
          </View>
        )}
        renderItem={({ item }) => (
          <View className="p-4 bg-white flex-row justify-between items-center">
            <Text>Pageleave</Text>
            <Text>/tools/matrix-solver</Text>
            <Text>17 hours ago</Text>
            <Feather name="maximize-2" />
          </View>
        )}
      />
    </Layout>
  );
}
