import {
  Gesture,
  GestureDetector,
  GestureTouchEvent,
} from 'react-native-gesture-handler';
import { View } from 'react-native';
import { PropsWithChildren } from 'react';

import constants from '@/constants';
import useClientStore from '@/store/client';
import useBottomSheetStore from '@/store/bottom-sheets';

export default function GestureDetectorProvider({
  children,
}: PropsWithChildren) {
  const devModeEnabled = useClientStore((s) => s.devMode);
  const openBottomSheet = useBottomSheetStore((s) => s.open);

  /**
   * When pressing the screen with three fingers at once, open
   * the network logger 'dev tools' bottom sheet
   */
  const onTripleFingerTap = (event: GestureTouchEvent) => {
    if (event.numberOfTouches === 3) {
      if (constants.environment === 'development' || devModeEnabled) {
        openBottomSheet('DEV_TOOLS');
      }
    }
  };

  const threeFingerGesture = Gesture.Tap()
    .numberOfTaps(1)
    .maxDistance(20)
    .onTouchesDown(onTripleFingerTap)
    .runOnJS(true);

  return (
    <GestureDetector gesture={threeFingerGesture}>
      <View style={{ flex: 1 }}>{children}</View>
    </GestureDetector>
  );
}
