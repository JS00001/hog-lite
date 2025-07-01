import { View } from 'react-native';
import { useEffect, useState } from 'react';

import Text from '@/ui/Text';
import Switch from '@/ui/Switch';
import Select from '@/ui/Select';
import { TimePeriod } from '@/@types';
import Layout from '@/components/Layout';
import useClientStore from '@/store/client';
import usePosthog from '@/hooks/usePosthog';
import { useGetEvents } from '@/hooks/api/query';
import ActivityList from '@/components/ActivityList';
import timePeriodOptions from '@/constants/time-periods';
import useBottomSheetStore from '@/store/bottom-sheets';
import { QueryType } from '@/components/ActivityList/@types';

enum FetchingState {
  Refreshing,
  EventDefinitionChange,
  TimePeriodChange,
}

export default function Activity() {
  const [fetchState, setFetchState] = useState<FetchingState | null>(null);

  const posthog = usePosthog();
  const query = useGetEvents(QueryType.Exceptions);

  const setClientStore = useClientStore((s) => s.setField);
  const openBottomSheet = useBottomSheetStore((store) => store.open);

  const timePeriod = useClientStore((s) => s.activityTimePeriod);
  const filterTestAccounts = useClientStore((s) => s.filterTestAccounts);
  const hasBeenOnboarded = useClientStore((s) => s.hasSeenExceptionsOnboarding);

  useEffect(() => {
    if (!hasBeenOnboarded) {
      openBottomSheet('EXCEPTION_INSTRUCTION');
      setClientStore('hasSeenExceptionsOnboarding', true);
    }
  }, [hasBeenOnboarded]);

  const events = query.data?.results || [];

  /**
   * When the refresh control (swipe down) is triggered, we want to
   * refetch the data from the server.
   */
  const onRefresh = async () => {
    // Call getState so we arent subscribed to the store, we only want the value
    // on this render cycle.
    const columns = useClientStore.getState().activityColumns;
    const displayMode = useClientStore.getState().activityDisplayMode;

    posthog.capture('exceptions_refreshed', {
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
    posthog.capture('exceptions_fetched_next_page');
  };

  /**
   * When the select dropdown changes, set it and refetch
   * the data from the server.
   */
  const onTimePeriodChange = (value: string) => {
    setFetchState(FetchingState.TimePeriodChange);
    setClientStore('activityTimePeriod', value as TimePeriod);
    posthog.capture('exceptions_time_period_changed');
  };

  /**
   * When the 'filter out test accounts' switch is toggled, set it
   * and refetch the data from the server.
   */
  const onFilterTestAccountsChange = (value: boolean) => {
    setClientStore('filterTestAccounts', value);
    posthog.capture('exceptions_filter_test_accounts_changed', { value });
  };

  const actionsDisabled = query.isLoading || query.isRefetching;

  const isRefreshing = fetchState === FetchingState.Refreshing;

  const timePeriodLoading =
    actionsDisabled && fetchState === FetchingState.TimePeriodChange;

  return (
    <Layout title="Exceptions" className="pb-32">
      <Select
        size="sm"
        placeholder="Select time period"
        options={timePeriodOptions}
        value={timePeriod}
        loading={timePeriodLoading}
        disabled={actionsDisabled}
        onChange={onTimePeriodChange}
      />

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
