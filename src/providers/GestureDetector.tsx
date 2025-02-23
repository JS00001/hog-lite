import {
  Gesture,
  GestureDetector,
  GestureTouchEvent,
} from "react-native-gesture-handler";
import { View } from "react-native";
import { PropsWithChildren } from "react";

import useBottomSheetStore from "@/store/bottom-sheets";

export default function GestureDetectorProvider({
  children,
}: PropsWithChildren) {
  const bottomSheetStore = useBottomSheetStore();

  /**
   * When pressing the screen with three fingers at once, open
   * the network logger 'dev tools' bottom sheet
   * TODO: In settings add a 'dev mode enabled' for prod
   */
  const onTripleFingerTap = (event: GestureTouchEvent) => {
    if (event.numberOfTouches === 3) {
      if (__DEV__) {
        bottomSheetStore.open("NETWORK_LOGGER");
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
