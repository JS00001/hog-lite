import { BottomSheetModal } from "@gorhom/bottom-sheet";

import { IndividualSheetName } from "./@types";

import NetworkLoggerSheet from "./DevTools/NetworkLogger";

import useBottomSheetStore from "@/store/bottom-sheets";

/**
 * The list of bottom sheets we want to support
 */
const BottomSheets: Record<IndividualSheetName, React.FC<any>> = {
  NETWORK_LOGGER: NetworkLoggerSheet,
};

/**
 * Component to render all bottom sheets and handle their visibility
 */
const BottomSheetComponent = () => {
  // These MUST use selectors to avoid infinite re-rendering due to the 'register'
  // method updating the state, therefore re-rendering this, which re-registers the
  // bottom sheet, and so on.
  const close = useBottomSheetStore((state) => state.close);
  const register = useBottomSheetStore((state) => state.register);
  const snapToIndex = useBottomSheetStore((state) => state.snapToIndex);
  const snapToPosition = useBottomSheetStore((state) => state.snapToPosition);

  return Object.keys(BottomSheets).map((key) => {
    const name = key as IndividualSheetName;
    const SheetComponent = BottomSheets[name];

    if (!SheetComponent) return null;

    const props = {
      close: () => close(name),
      ref: (ref: BottomSheetModal) => register(name, ref),
      snapToIndex: (index: number) => snapToIndex(name, index),
      snapToPosition: (position: string) => snapToPosition(name, position),
    };

    return <SheetComponent key={name} {...props} />;
  });
};

export default BottomSheetComponent;
