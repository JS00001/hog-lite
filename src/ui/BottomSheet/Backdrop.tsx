import { BottomSheetBackdrop as RNBottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { BottomSheetDefaultBackdropProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";

export default function BottomSheetBackdrop(
  props: BottomSheetDefaultBackdropProps,
) {
  return (
    <RNBottomSheetBackdrop
      opacity={0.5}
      appearsOnIndex={0}
      disappearsOnIndex={-1}
      enableTouchThrough={true}
      {...props}
    />
  );
}
