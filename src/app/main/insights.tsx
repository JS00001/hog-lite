import { useCallback, useEffect, useMemo, useState } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';

import Text from '@/ui/Text';
import Select from '@/ui/Select';
import Button from '@/ui/Button';
import Insight from '@/ui/Insight';
import useColors from '@/lib/theme';
import Skeleton from '@/ui/Skeleton';
import { TimePeriod } from '@/@types';
import Layout from '@/components/Layout';
import useClientStore from '@/store/client';
import usePosthog from '@/hooks/usePosthog';
import { ISelectOption } from '@/ui/Select/@types';
import ErrorMessage from '@/components/ErrorMessage';
import useBottomSheetStore from '@/store/bottom-sheets';
import timePeriodOptions from '@/constants/time-periods';
import PanickedHedgehog from '@/components/Hedgehogs/PanickedHedgehog';
import { useGetDashboard, useGetDashboards } from '@/hooks/api/dashboard';

enum FetchingState {
  Reloading,
  Refreshing,
  TimePeriodChange,
}

export default function Insights() {
  const [fetchState, setFetchState] = useState<FetchingState | null>(null);

  const colors = useColors();
  const posthog = usePosthog();
  const dashboardQuery = useGetDashboard();
  const dashboardsQuery = useGetDashboards();

  const openBottomSheet = useBottomSheetStore((s) => s.open);
  const setClientStore = useClientStore((s) => s.setField);
  const dashboard = useClientStore((s) => s.dashboard);
  const timePeriod = useClientStore((s) => s.insightsTimePeriod);
  const hasBeenOnboarded = useClientStore((s) => s.hasSeenInsightsOnboarding);

  useEffect(() => {
    if (!hasBeenOnboarded) {
      openBottomSheet('INSIGHTS_INSTRUCTION');
      setClientStore('hasSeenInsightsOnboarding', true);
    }
  }, [hasBeenOnboarded]);

  const actionsDisabled =
    dashboardQuery.isLoading ||
    dashboardQuery.isRefetching ||
    dashboardsQuery.isLoading ||
    dashboardQuery.isRefetching;

  const actionsError = dashboardQuery.error || dashboardsQuery.error;

  const tiles = dashboardQuery.data?.tiles || [];
  const dashboards = dashboardsQuery.data?.results || [];

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
   * When the select dropdown for dashboards
   * changes, set it
   */
  const onDashboardChange = (value: string) => {
    setClientStore('dashboard', value);
    posthog.capture('insights_dashboard_changed');
  };

  /**
   * When the select dropdown changes, set it and refetch
   * the data from the server.
   */
  const onTimePeriodChange = (value: string) => {
    setFetchState(FetchingState.TimePeriodChange);
    setClientStore('insightsTimePeriod', value as TimePeriod);
    posthog.capture('insights_time_period_changed', { timePeriod: value });
  };

  /**
   * When the refetch button is pressed, we want to refetch the data
   * from the server.
   */
  const onRefetch = () => {
    setFetchState(FetchingState.Reloading);
    dashboardQuery.refetch();
    posthog.capture('insights_reloaded');
  };

  /**
   * When pulling down to refresh, we want to refetch the data
   */
  const onRefresh = () => {
    setFetchState(FetchingState.Refreshing);
    dashboardQuery.refetch();
    posthog.capture('insights_refreshed');
  };

  /**
   * Show a loading state if that is the reason for the empty data,
   * otherwise show a message to the user that no results were found.
   */
  const ListEmptyComponent = useCallback(() => {
    if (actionsDisabled) {
      return new Array(15).fill(0).map((_, index) => (
        <View
          key={index}
          className="p-6 bg-highlight rounded-xl border border-divider w-full gap-2"
        >
          <Skeleton className="w-32 h-16" />
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-full h-8" />
        </View>
      ));
    }

    if (actionsError) {
      return (
        <View className="items-center py-32 bg-highlight -mb-px border border-divider rounded-xl">
          <ErrorMessage
            error={actionsError}
            description="Could not fetch activity"
          />
        </View>
      );
    }

    return (
      <View className="items-center py-32 bg-highlight -mb-px border border-divider rounded-xl">
        <PanickedHedgehog size={96} />
        <Text className="text-ink text-xl font-medium">No insights found</Text>
        <Text className="text-ink">
          Try changing your filters, or reloading the page.
        </Text>
      </View>
    );
  }, [actionsDisabled]);

  const isReloading = actionsDisabled && fetchState === FetchingState.Reloading;
  const isRefreshing =
    actionsDisabled && fetchState === FetchingState.Refreshing;
  const timePeriodLoading =
    actionsDisabled && fetchState === FetchingState.TimePeriodChange;

  return (
    <Layout title="Insights" className="pb-20">
      <Select
        size="sm"
        placeholder="Select dashboard"
        options={dashboardOptions}
        disabled={actionsDisabled}
        value={dashboard}
        loading={dashboardsQuery.isLoading || dashboardsQuery.isRefetching}
        onChange={onDashboardChange}
      />
      <View className="flex-row gap-2 justify-between">
        <Select
          size="sm"
          placeholder="Select time period"
          options={timePeriodOptions}
          value={timePeriod}
          disabled={actionsDisabled}
          loading={timePeriodLoading}
          onChange={onTimePeriodChange}
        />
        <Button
          size="sm"
          icon="rotate-cw"
          loading={isReloading}
          disabled={actionsDisabled}
          onPress={onRefetch}
        >
          Reload
        </Button>
      </View>

      <FlatList
        data={tiles}
        showsVerticalScrollIndicator={false}
        contentContainerClassName="gap-1 pb-12"
        ListEmptyComponent={ListEmptyComponent}
        renderItem={({ item }) => <Insight insight={item.insight} />}
        refreshControl={
          <RefreshControl
            tintColor={colors.gray}
            refreshing={isRefreshing}
            onRefresh={onRefresh}
          />
        }
        // List optimization
        removeClippedSubviews
        initialNumToRender={25}
        maxToRenderPerBatch={25}
        keyExtractor={(item) => item.id.toString()}
        getItemLayout={(_, index) => ({
          index,
          length: 40,
          offset: 40 * index,
        })}
      />
    </Layout>
  );
}
