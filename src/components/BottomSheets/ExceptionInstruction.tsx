import { View } from 'react-native';
import { forwardRef, useEffect } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

import { BottomSheetProps } from './@types';

import Text from '@/ui/Text';
import Button from '@/ui/Button';
import BottomSheet from '@/ui/BottomSheet';
import usePosthog from '@/hooks/usePosthog';
import BottomSheetView from '@/ui/BottomSheet/Containers/View';
import PopupHedgehog from '@/components/Hedgehogs/PopupHedgehog';
import { t } from '@/i18n';

type Props = BottomSheetProps;

function Content({ close }: Props) {
  const posthog = usePosthog();

  useEffect(() => {
    posthog.capture('exception_instructions_viewed');
  }, []);

  const onClose = () => {
    posthog.capture('exception_instructions_dismissed');
    close();
  };

  return (
    <BottomSheetView className="items-center">
      <PopupHedgehog size={48} />

      <View className="gap-1 items-center">
        <Text className="text-3xl text-ink font-medium">
          {t('exceptionsScreenTitle')}
        </Text>
        <Text className="text-lg text-ink text-center">
          {t('exceptionsScreenIntro')}
        </Text>
      </View>

      <View className="w-full gap-2">
        <View className="w-full gap-3 p-4 bg-primary border border-divider rounded-xl">
          <Text className="text-lg text-ink">{t('exceptionsTrackingTip')}</Text>
        </View>
        <View className="w-full gap-3 p-4 bg-primary border border-divider rounded-xl">
          <Text className="text-lg text-ink">{t('activityGearTip')}</Text>
        </View>
        <View className="w-full gap-3 p-4 bg-primary border border-divider rounded-xl">
          <Text className="text-lg text-ink">{t('exceptionRowTip')}</Text>
        </View>
      </View>

      <View className="gap-2 items-center flex-row">
        <Button className="flex-1" size="sm" color="accent" onPress={onClose}>
          {t('closeInstructions')}
        </Button>
      </View>
    </BottomSheetView>
  );
}

const ExceptionInstructionSheet = forwardRef<
  BottomSheetModal,
  BottomSheetProps
>(function ExceptionInstructionSheet(props, ref) {
  return <BottomSheet ref={ref} children={<Content {...props} />} />;
});

export default ExceptionInstructionSheet;
