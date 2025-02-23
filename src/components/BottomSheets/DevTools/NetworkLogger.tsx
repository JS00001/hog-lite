import { forwardRef } from "react";
import { Dimensions } from "react-native";
import NetworkLogger from "react-native-network-logger";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

import { BottomSheetProps } from "../@types";

import BottomSheet from "@/ui/BottomSheet";
import BottomSheetView from "@/ui/BottomSheet/Containers/View";

const HEIGHT = Dimensions.get("window").height;

type Props = BottomSheetProps;

function Content({}: Props) {
  return (
    <BottomSheetView style={{ height: HEIGHT * 0.8 }}>
      <NetworkLogger
        theme={{
          colors: {
            background: "white",
          },
        }}
      />
    </BottomSheetView>
  );
}

const NetworkLoggerSheet = forwardRef<BottomSheetModal, BottomSheetProps>(
  function NetworkLoggerSheet(props, ref) {
    return <BottomSheet ref={ref} children={<Content {...props} />} />;
  }
);

export default NetworkLoggerSheet;
