import { View } from 'react-native';
import { useEffect, useMemo, useState } from 'react';

import Text from '@/ui/Text';
import Switch from '@/ui/Switch';
import Select from '@/ui/Select';
import { TimePeriod } from '@/@types';
import Layout from '@/components/Layout';
import useClientStore from '@/store/client';
import usePosthog from '@/hooks/usePosthog';
import { useGetEvents } from '@/hooks/api/query';
import { ISelectOption } from '@/ui/Select/@types';
import ActivityList from '@/components/ActivityList';
import timePeriodOptions from '@/constants/time-periods';
import { useGetEventDefinitions } from '@/hooks/api/event_definitions';
import useBottomSheetStore from '@/store/bottom-sheets';
import { useGetLiveStats } from '@/hooks/api/stats';

enum FetchingState {
  Refreshing,
  EventDefinitionChange,
  TimePeriodChange,
}

export default function Activity() {
  const [fetchState, setFetchState] = useState<FetchingState | null>(null);

  const posthog = usePosthog();
  const query = useGetEvents();
  // const liveStatsQuery = useGetLiveStats();
  const eventDefinitionsQuery = useGetEventDefinitions();

  const setClientStore = useClientStore((s) => s.setField);
  const openBottomSheet = useBottomSheetStore((store) => store.open);

  const timePeriod = useClientStore((s) => s.activityTimePeriod);
  const eventDefinition = useClientStore((s) => s.activityEventDefinition);
  const filterTestAccounts = useClientStore((s) => s.filterTestAccounts);
  const hasBeenOnboarded = useClientStore((s) => s.hasSeenActivityOnboarding);

  useEffect(() => {
    if (!hasBeenOnboarded) {
      openBottomSheet('ACTIVITY_INSTRUCTION');
      setClientStore('hasSeenActivityOnboarding', true);
    }
  }, [hasBeenOnboarded]);

  const events = query.data?.results || [];
  const projectEventDefinitions =
    eventDefinitionsQuery.data?.results.sort((a, b) => {
      return a.name.localeCompare(b.name);
    }) || [];

  /**
   * All of the event definitions that can be filtered by.
   * Add a custom option called 'All Events' to the beginning.
   */
  const eventDefinitionFilterOptions: ISelectOption[] = useMemo(() => {
    const eventOptions = projectEventDefinitions.map((e) => ({
      label: e.name,
      value: e.name,
    }));

    return [{ label: 'All Events', value: 'all' }, ...eventOptions];
  }, [projectEventDefinitions]);

  /**
   * When the refresh control (swipe down) is triggered, we want to
   * refetch the data from the server.
   */
  const onRefresh = async () => {
    // Call getState so we arent subscribed to the store, we only want the value
    // on this render cycle.
    const columns = useClientStore.getState().activityColumns;
    const displayMode = useClientStore.getState().activityDisplayMode;

    posthog.capture('activity_refreshed', {
      columns,
      displayMode,
    });

    setFetchState(FetchingState.Refreshing);
    await query.refetch();
    setFetchState(null);
  };

  /**
   * When the end is reached, fetch a new page if
   * it exists and we are not already fetching.
   */
  const onEndReached = () => {
    if (!query.hasNextPage) return;
    if (query.isFetchingNextPage) return;
    query.fetchNextPage();
    posthog.capture('activity_fetched_next_page');
  };

  /**
   * When the select dropdown changes, set it and refetch
   * the data from the server.
   */
  const onTimePeriodChange = (value: string) => {
    setFetchState(FetchingState.TimePeriodChange);
    setClientStore('activityTimePeriod', value as TimePeriod);
    posthog.capture('activity_time_period_changed');
  };

  /**
   * When the event definition select dropdown changes, set it
   * and refetch the data from the server.
   */
  const onEventDefinitionChange = (value: string) => {
    setFetchState(FetchingState.EventDefinitionChange);
    setClientStore('activityEventDefinition', value);
    posthog.capture('event_definition_changed');
  };

  /**
   * When the 'filter out test accounts' switch is toggled, set it
   * and refetch the data from the server.
   */
  const onFilterTestAccountsChange = (value: boolean) => {
    setClientStore('filterTestAccounts', value);
    posthog.capture('activity_filter_test_accounts_changed', { value });
  };

  const actionsDisabled = query.isLoading || query.isRefetching;

  const isRefreshing = fetchState === FetchingState.Refreshing;

  const timePeriodLoading =
    actionsDisabled && fetchState === FetchingState.TimePeriodChange;

  const eventDefinitionsLoading =
    (actionsDisabled && fetchState === FetchingState.EventDefinitionChange) ||
    eventDefinitionsQuery.isLoading;

  return (
    <Layout title="Activity" className="pb-32">
      <View className="flex-row gap-2 justify-between">
        <Select
          size="sm"
          placeholder="Select time period"
          options={timePeriodOptions}
          value={timePeriod}
          loading={timePeriodLoading}
          disabled={actionsDisabled}
          onChange={onTimePeriodChange}
        />
        <Select
          size="sm"
          className="shrink"
          placeholder="Select event"
          options={eventDefinitionFilterOptions}
          value={eventDefinition}
          loading={eventDefinitionsLoading}
          disabled={actionsDisabled}
          onChange={onEventDefinitionChange}
        />
      </View>

      <View className="h-12 px-4 rounded-xl bg-highlight border border-divider items-center justify-between flex-row">
        <Text className="font-medium text-ink">
          Filter out internal and test users
        </Text>
        <Switch
          value={filterTestAccounts}
          onValueChange={onFilterTestAccountsChange}
        />
      </View>

      <ActivityList
        data={events}
        isLoading={query.isLoading}
        isFetchingNextPage={query.isFetchingNextPage}
        isRefreshing={isRefreshing}
        onRefresh={onRefresh}
        onEndReached={onEndReached}
      />
    </Layout>
  );
}
