import { useMemo } from 'react';

import { Aggregation } from '@/@types';

import Text from '@/ui/Text';
import { formatNumber } from '@/lib/utils';

interface Props {
  data: Aggregation[];
}

export default function AggregationCard({ data }: Props) {
  const aggregatedValue = useMemo(() => {
    return data.reduce((acc, item) => {
      return acc + (item.aggregated_value ?? item.count);
    }, 0);
  }, [data]);

  return (
    <Text className="text-5xl font-bold text-ink" numberOfLines={1}>
      {formatNumber(aggregatedValue)}
    </Text>
  );
}
