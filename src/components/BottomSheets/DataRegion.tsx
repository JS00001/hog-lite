import { forwardRef } from 'react';
import { View } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

import { BottomSheetProps } from './@types';

import Text from '@/ui/Text';
import useColors from '@/lib/theme';
import BottomSheet from '@/ui/BottomSheet';
import DataRegions from '@/constants/data-regions';
import BottomSheetView from '@/ui/BottomSheet/Containers/View';
import TeacherHedgehogRight from '@/assets/TeacherHedgehogRight';

type Props = BottomSheetProps;

function Content({}: Props) {
  const colors = useColors();

  return (
    <BottomSheetView className="items-center">
      <TeacherHedgehogRight size={64} />
      <View className="gap-1 items-center">
        <Text className="text-3xl text-ink font-medium">
          What's a data region?
        </Text>
        <Text className="text-lg text-ink text-center">
          The data region is the area where your PostHog data is stored. See the
          below chart to understand which data region is best for you.
        </Text>
      </View>

      <View className="w-full border-b border-divider my-2" />

      <View className="gap-8 w-full">
        {DataRegions.map((region) => (
          <View key={region.title} className="gap-4">
            <Text className="text-2xl text-ink font-medium">
              {region.title}
            </Text>

            {region.benefits.map((benefit) => (
              <View key={benefit} className="flex-row items-center gap-4">
                <Feather name="check-circle" color={colors.green} size={18} />
                <Text className="text-ink flex-1">{benefit}</Text>
              </View>
            ))}
          </View>
        ))}
      </View>
    </BottomSheetView>
  );
}

const DataRegionSheet = forwardRef<BottomSheetModal, BottomSheetProps>(
  function DataRegionSheet(props, ref) {
    return <BottomSheet ref={ref} children={<Content {...props} />} />;
  },
);

export default DataRegionSheet;
