import { forwardRef } from 'react';
import { View, Share } from 'react-native';
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

function Content({}: Props) {
  const posthog = usePosthog();

  const onShare = () => {
    posthog.capture('shared_with_friend');

    Share.share({
      message:
        'Hey! I found this cool app called HogLite that helps me view my PostHog analytics on the go. You should check it out too!',
      url: constants.appStoreUrl,
    });
  };

  return (
    <BottomSheetView className="items-center">
      <PopupHedgehog size={48} />

      <View className="gap-1 items-center">
        <Text className="text-3xl text-ink font-medium">Hi Friend!</Text>
        <Text className="text-lg text-ink text-center">
          Enoying the app? Know a friend who uses PostHog? Share HogLite with
          them and help us grow!
        </Text>
      </View>

      <Button color="accent" className="w-full" onPress={onShare}>
        Share Now!
      </Button>
    </BottomSheetView>
  );
}

const ShareWithFriendsSheet = forwardRef<BottomSheetModal, BottomSheetProps>(
  function ShareWithFriendsSheet(props, ref) {
    return <BottomSheet ref={ref} children={<Content {...props} />} />;
  },
);

export default ShareWithFriendsSheet;
