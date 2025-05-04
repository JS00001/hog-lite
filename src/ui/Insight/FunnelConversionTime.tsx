import { useMemo } from 'react';
import classNames from 'classnames';
import { View } from 'react-native';
import { FunnelConversionTime } from '@/@types';

import InsightContainer from './Container';

import Text from '@/ui/Text';
import { secondsToString } from '@/lib/utils';

interface Props {
  data: FunnelConversionTime;
}

export default function FunnelConversionTimeCard({ data }: Props) {
  const average_conversion_time = data?.average_conversion_time || 0;

  /**
   * Bins from posthog are returned as just one number. For the last bin, we need
   * to calculate its 'top edge' by adding the bin increment to the last bin start.
   * We will also use this increment to calculate the width of each bin
   */
  const binIncrement = useMemo(() => {
    if (data.bins.length < 2) return 0;
    const [firstBinStart] = data.bins[0];
    const [nextBinStart] = data.bins[1];
    return Math.abs(firstBinStart - nextBinStart);
  }, [data.bins]);

  /**
   * Total number of data point such that we can calculate the % of
   * each bin
   */
  const totalDataPoints = useMemo(() => {
    return data.bins.reduce((acc, [_, count]) => {
      return acc + count;
    }, 0);
  }, [data.bins]);

  /**
   * Take every bin and calculate its range and % of users who fell
   * into that range. Also include the average conversion time
   */
  const formattedBins = useMemo(() => {
    const averageConversionTime = secondsToString(average_conversion_time);

    const bins = data.bins.map((bin) => {
      const [start, count] = bin;
      const end = start + binIncrement;
      const percentage = (count / totalDataPoints) * 100;

      return {
        key: `${secondsToString(start)} to ${secondsToString(end)}`,
        value: `${count} (${percentage.toFixed(1)}%)`,
      };
    });

    // Return all bins after the total average
    return [{ key: 'Average Time', value: averageConversionTime }, ...bins];
  }, [data.bins]);

  return (
    <InsightContainer type="Conversion Time">
      <View className="mb-3">
        {formattedBins.map((item, index) => {
          const containerClasses = classNames(
            'flex-row py-3 gap-2',
            'border-b border-divider',
            index === 0 && 'border-t',
          );

          return (
            <View className={containerClasses} key={index}>
              <Text className="text-ink font-medium">{item.key}</Text>
              <View className="flex-1 items-end">
                <Text className="text-ink font-medium">{item.value}</Text>
              </View>
            </View>
          );
        })}
      </View>
    </InsightContainer>
  );
}
