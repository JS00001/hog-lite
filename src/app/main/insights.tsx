import { View } from "react-native";
import { useMemo, useState } from "react";

import Select from "@/ui/Select";
import Button from "@/ui/Button";
import { TimePeriod } from "@/@types";
import Layout from "@/components/Layout";
import useClientStore from "@/store/client";
import { useGetDashboards } from "@/hooks/api/dashboard";
import timePeriodOptions from "@/constants/time-periods";
import { ISelectOption } from "@/ui/Select/@types";

enum FetchingState {
  Reloading,
  TimePeriodChange,
}

export default function Insights() {
  const [fetchState, setFetchState] = useState<FetchingState | null>(null);

  const query = useGetDashboards();
  const clientStore = useClientStore();

  const dashboards = query.data?.results || [];

  /**
   * All of the dashboards that the user can switch to, within
   * the currently selected project
   */
  const dashboardOptions: ISelectOption[] = useMemo(() => {
    return dashboards.map((dashboard) => ({
      label: dashboard.name,
      description: dashboard.description,
      value: `${dashboard.id}`,
    }));
  }, [dashboards]);

  /**
   * When the select dropdown changes, set it and refetch
   * the data from the server.
   */
  const onTimePeriodChange = (value: string) => {
    setFetchState(FetchingState.TimePeriodChange);
    clientStore.setField("insightsTimePeriod", value as TimePeriod);
  };

  return (
    <Layout title="Insights">
      <Select
        size="sm"
        placeholder="Select dashboard"
        loading={query.isLoading}
        options={dashboardOptions}
        value={clientStore.dashboard}
        onChange={(value) => clientStore.setField("dashboard", value)}
      />
      <View className="flex-row gap-2 justify-between">
        <Select
          size="sm"
          placeholder="Select time period"
          options={timePeriodOptions}
          value={clientStore.insightsTimePeriod}
          onChange={onTimePeriodChange}
        />
        <Button size="sm" icon="rotate-cw">
          Reload
        </Button>
      </View>
    </Layout>
  );
}
