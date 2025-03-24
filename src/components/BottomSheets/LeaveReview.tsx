import { forwardRef, useEffect } from 'react';
import { View, Linking } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

import { BottomSheetProps } from './@types';

import Text from '@/ui/Text';
import Button from '@/ui/Button';
import constants from '@/constants';
import BottomSheet from '@/ui/BottomSheet';
import usePosthog from '@/hooks/usePosthog';
import BottomSheetView from '@/ui/BottomSheet/Containers/View';
import PopupHedgehog from '@/components/Hedgehogs/PopupHedgehog';

type Props = BottomSheetProps;

function Content({ close }: Props) {
  const posthog = usePosthog();

  useEffect(() => {
    posthog.capture('review_prompt_opened');
  }, []);

  const onClose = () => {
    posthog.capture('review_prompt_dismissed');
    close();
  };

  const onTextClick = () => {
    Linking.openURL(constants.githubUrl);
    posthog.capture('review_prompt_open_source');
  };

  const onRate = () => {
    posthog.capture('review_prompt_rate');
    Linking.openURL(constants.reviewUrl);
  };

  return (
    <BottomSheetView className="items-center">
      <PopupHedgehog size={48} />

      <View className="gap-1 items-center">
        <Text className="text-3xl text-ink font-medium">Hi Friend!</Text>
        <Text className="text-lg text-ink text-center">
          I hope you've been enjoying HogLite! This project is free and{' '}
          <Text className="text-red underline" onPress={onTextClick}>
            open-source
          </Text>{' '}
          for the community, and I would really appreciate it if you could take
          a second to leave us a review. It helps us reach more people like you!
        </Text>
      </View>

      <View className="gap-2 items-center flex-row">
        <Button className="flex-1" onPress={onClose}>
          No Thanks
        </Button>
        <Button color="accent" className="flex-1" onPress={onRate}>
          Leave a Review
        </Button>
      </View>
    </BottomSheetView>
  );
}

const LeaveReviewSheet = forwardRef<BottomSheetModal, BottomSheetProps>(
  function LeaveReviewSheet(props, ref) {
    return <BottomSheet ref={ref} children={<Content {...props} />} />;
  },
);

export default LeaveReviewSheet;
