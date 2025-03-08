import { forwardRef } from 'react';
import { View } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

import { BottomSheetProps } from './@types';

import Text from '@/ui/Text';
import BottomSheet from '@/ui/BottomSheet';
import BottomSheetView from '@/ui/BottomSheet/Containers/View';
import TeacherHedgehogLeft from '@/components/Hedgehogs/TeacherHedgehogLeft';

type Props = BottomSheetProps;

function Content({}: Props) {
  return (
    <BottomSheetView className="items-center">
      <View className="gap-1 items-center">
        <Text className="text-3xl text-ink font-medium">Hi Friend! 🦔👋</Text>
        <Text className="text-lg text-ink text-center">
          We don't store any data about you. In-fact, this app doesn't even have
          a backend! Your API key is stored locally on your device, and this app
          only communicates directly with the PostHog API.
        </Text>
      </View>
    </BottomSheetView>
  );
}

const DataSecuritySheet = forwardRef<BottomSheetModal, BottomSheetProps>(
  function DataSecuritySheet(props, ref) {
    return <BottomSheet ref={ref} children={<Content {...props} />} />;
  },
);

export default DataSecuritySheet;
