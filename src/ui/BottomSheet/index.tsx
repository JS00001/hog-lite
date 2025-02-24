import { forwardRef } from "react";
import useColors from "@/lib/theme";
import { Dimensions, StyleSheet } from "react-native";
import { BottomSheetModal, BottomSheetModalProps } from "@gorhom/bottom-sheet";

import BottomSheetBackdrop from "./Backdrop";

interface Props extends BottomSheetModalProps {
  maxHeight?: number;
  preventClose?: boolean;
}

const BottomSheet = forwardRef<BottomSheetModal, Props>(function BottomSheet(
  { preventClose, children, maxHeight = 0.9, ...props },
  ref
) {
  const colors = useColors();
  const windowHeight = Dimensions.get("window").height;
  const maxDynamicContentSize = windowHeight * maxHeight;

  return (
    <BottomSheetModal
      ref={ref}
      enableDynamicSizing
      enablePanDownToClose={!preventClose}
      maxDynamicContentSize={maxDynamicContentSize}
      backgroundStyle={[
        styles.background,
        { backgroundColor: colors.highlight },
      ]}
      handleIndicatorStyle={[
        styles.handleIndicator,
        { backgroundColor: colors.divider },
      ]}
      backdropComponent={(props) => {
        const pressBehavior = preventClose ? "none" : "close";
        return <BottomSheetBackdrop {...props} pressBehavior={pressBehavior} />;
      }}
      {...props}
    >
      {children}
    </BottomSheetModal>
  );
});

const styles = StyleSheet.create({
  background: {
    borderRadius: 24,
  },
  handleIndicator: {
    borderRadius: 999,
    width: 56,
  },
});

export default BottomSheet;
