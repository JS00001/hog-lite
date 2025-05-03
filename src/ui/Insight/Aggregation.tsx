import classNames from 'classnames';
import { View } from 'react-native';

import { Aggregation } from '@/@types';

import Text from '@/ui/Text';
import { formatNumber } from '@/lib/utils';

interface Props {
  data: Aggregation[];
}

export default function AggregationCard({ data }: Props) {
  if (data.length === 1 && data.at(0)) {
    return <SingleValueCard data={data.at(0)!} />;
  }

  return <MultiValueCard data={data} />;
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
    <View className="bg-primary rounded-lg mb-3 border border-divider">
      {data.map((item, index) => {
        const containerClasses = classNames(
          'flex-row p-3 gap-2',
          index !== data.length - 1 && 'border-b border-divider',
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
