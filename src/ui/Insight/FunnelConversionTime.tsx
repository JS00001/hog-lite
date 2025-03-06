import { useMemo } from 'react';

import { FunnelConversionTime } from '@/@types';

import Text from '@/ui/Text';

interface Props {
  data: FunnelConversionTime;
}

export default function FunnelConversionTimeCard({ data }: Props) {
  const average_conversion_time = data?.average_conversion_time || 0;

  // Convert the seconds of data.average_conversion_time to either seconds, hours, or days
  const averageConversionTime = useMemo(() => {
    const seconds = average_conversion_time;

    if (seconds < 60) {
      return `${seconds}s`;
    } else if (seconds < 3600) {
      return `${Math.floor(seconds / 60)}m`;
    } else {
      return `${Math.floor(seconds / 3600)}h`;
    }
  }, [average_conversion_time]);

  return (
    <Text className="text-5xl font-bold text-ink">{averageConversionTime}</Text>
  );
}
