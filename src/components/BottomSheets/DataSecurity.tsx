import { forwardRef } from 'react';
import { View } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

import { BottomSheetProps } from './@types';

import Text from '@/ui/Text';
import BottomSheet from '@/ui/BottomSheet';
import BottomSheetView from '@/ui/BottomSheet/Containers/View';
import TeacherHedgehogLeft from '@/components/Hedgehogs/TeacherHedgehogLeft';
import { t } from '@/i18n';

type Props = BottomSheetProps;

function Content({}: Props) {
  return (
    <BottomSheetView className="items-center">
      <TeacherHedgehogLeft size={64} />
      <View className="gap-1 items-center">
        <Text className="text-3xl text-ink font-medium">
          {t('dataSecurityTitle')}
        </Text>
        <Text className="text-lg text-ink text-center">
          {t('dataSecurityDescription')}
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
