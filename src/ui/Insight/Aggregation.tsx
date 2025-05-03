import classNames from 'classnames';
import { View } from 'react-native';

import { Aggregation } from '@/@types';
import InsightContainer from './Container';

import Text from '@/ui/Text';
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
  return (
    <View className="mb-3">
      {data.map((item, index) => {
        const containerClasses = classNames(
          'flex-row py-3 gap-2',
          'border-b border-divider',
          index === 0 && 'border-t',
        );

        return (
          <View className={containerClasses} key={index}>
            <Text className="text-ink font-medium">{item.label}</Text>
            <View className="flex-1 items-end">
              <Text className="text-ink font-medium">
                {formatNumber(item.aggregated_value ?? item.count)}
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
}
