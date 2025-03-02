import { View } from 'react-native';
import { useState } from 'react';

import Text from '@/ui/Text';
import Button from '@/ui/Button';
import Switch from '@/ui/Switch';
import Select from '@/ui/Select';
import { TimePeriod } from '@/@types';
import Layout from '@/components/Layout';
import useClientStore from '@/store/client';
import usePosthog from '@/hooks/usePosthog';
import { useGetEvents } from '@/hooks/api/query';
import ActivityList from '@/components/ActivityList';
import timePeriodOptions from '@/constants/time-periods';

enum FetchingState {
  Reloading,
  TimePeriodChange,
}

export default function Activity() {
  const [fetchState, setFetchState] = useState<FetchingState | null>(null);

  const query = useGetEvents();
  const posthog = usePosthog();

  const setClientStore = useClientStore((s) => s.setField);
  const timePeriod = useClientStore((s) => s.activityTimePeriod);
  const filterTestAccounts = useClientStore((s) => s.filterTestAccounts);

  /**
   * When the refetch button is pressed, we want to refetch the data
   * from the server.
   */
  const onRefetch = () => {
    setFetchState(FetchingState.Reloading);
    query.refetch();
    posthog.capture('activity_reloaded');
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
   * When the 'filter out test accounts' switch is toggled, set it
   * and refetch the data from the server.
   */
  const onFilterTestAccountsChange = (value: boolean) => {
    setClientStore('filterTestAccounts', value);
    posthog.capture('activity_filter_test_accounts_changed', { value });
  };

  const data = query.data?.results || [];

  const actionsDisabled = query.isLoading || query.isRefetching;
  const reloadLoading =
    actionsDisabled && fetchState === FetchingState.Reloading;
  const timePeriodLoading =
    actionsDisabled && fetchState === FetchingState.TimePeriodChange;

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
          value={filterTestAccounts}
          onValueChange={onFilterTestAccountsChange}
        />
      </View>

      <ActivityList
        data={data}
        isLoading={query.isLoading}
        isFetchingNextPage={query.isFetchingNextPage}
        onEndReached={onEndReached}
      />
    </Layout>
  );
}
