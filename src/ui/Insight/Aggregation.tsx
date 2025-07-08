import { useMemo } from 'react';
import classNames from 'classnames';
import { View } from 'react-native';
import Feather from '@expo/vector-icons/Feather';

import { Aggregation } from '@/@types';
import InsightContainer from './Container';

import Text from '@/ui/Text';
import useColors from '@/lib/theme';
import { formatNumber } from '@/lib/utils';

interface Props {
  data: Aggregation[];
}

export default function AggregationCard({ data }: Props) {
  const isSingleValue = data.length === 1;

  if (isSingleValue) {
    return (
      <InsightContainer type="Total Count">
        <SingleValueCard data={data.at(0)!} />
      </InsightContainer>
    );
  }

  return (
    <InsightContainer type="Insight Breakdown">
      <MultiValueCard data={data} />
    </InsightContainer>
  );
}

function SingleValueCard({ data }: { data: Aggregation }) {
  return (
    <Text className="text-5xl font-bold text-ink" numberOfLines={1}>
      {formatNumber(data.aggregated_value ?? data.count)}
    </Text>
  );
}

function MultiValueCard({ data }: Props) {
  const colors = useColors();

  const aggregatedTotal = useMemo(() => {
    return data.reduce((acc, item) => {
      return acc + (item.aggregated_value ?? item.count);
    }, 0);
  }, [data]);

  return (
    <View className="mb-3">
      {!data.length && (
        <View className="py-1 px-2 bg-blue rounded-lg flex-row gap-1 w-full justify-center items-center -mt-2">
          <Feather name="info" size={12} color={colors.white} />
          <Text className="text-white font-medium text-xs">
            This insight has no data yet.
          </Text>
        </View>
      )}

      {data.map((item, index) => {
        const containerClasses = classNames(
          'flex-row py-3 gap-2',
          'border-b border-divider',
          index === 0 && 'border-t',
        );

        const percentage =
          (item.aggregated_value ?? item.count) / aggregatedTotal;
        const percentageString = `${(percentage * 100).toFixed(0)}%`;

        return (
          <View className={containerClasses} key={index}>
            <Text className="text-ink font-medium">{item.label}</Text>
            <View className="flex-1 items-end">
              <Text className="text-ink font-medium">
                {formatNumber(item.aggregated_value ?? item.count)} (
                {percentageString})
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
}
