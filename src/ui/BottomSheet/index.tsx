import { forwardRef } from "react";
import colors from "tailwindcss/colors";
import { Dimensions, StyleSheet } from "react-native";
import { BottomSheetModal, BottomSheetModalProps } from "@gorhom/bottom-sheet";

import BottomSheetBackdrop from "./Backdrop";

interface Props extends BottomSheetModalProps {
  maxHeight?: number;
  preventClose?: boolean;
}

const BottomSheet = forwardRef<BottomSheetModal, Props>(function BottomSheet(
  { preventClose, children, maxHeight = 0.9, ...props },
  ref,
) {
  const windowHeight = Dimensions.get("window").height;
  const maxDynamicContentSize = windowHeight * maxHeight;

  return (
    <BottomSheetModal
      ref={ref}
      enableDynamicSizing
      backgroundStyle={styles.background}
      handleIndicatorStyle={styles.handleIndicator}
      enablePanDownToClose={!preventClose}
      maxDynamicContentSize={maxDynamicContentSize}
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
    backgroundColor: colors.gray[300],
    borderRadius: 999,
    width: 56,
  },
});

export default BottomSheet;
