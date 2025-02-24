import { forwardRef } from "react";
import { View } from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

import { BottomSheetProps } from "../@types";

import Text from "@/ui/Text";
import BottomSheet from "@/ui/BottomSheet";
import HedgehogSVG from "@/assets/HedgehogSVG";
import BottomSheetView from "@/ui/BottomSheet/Containers/View";

type Props = BottomSheetProps;

function Content({}: Props) {
  return (
    <BottomSheetView className="items-center">
      <HedgehogSVG size={64} />
      <View className="gap-1 items-center">
        <Text className="text-3xl text-ink">Create an API Key</Text>
        <Text className="text-lg text-ink text-center">
          la la la this will be multistep
        </Text>
      </View>
    </BottomSheetView>
  );
}

const CreateApiKeySheet = forwardRef<BottomSheetModal, BottomSheetProps>(
  function CreateApiKeySheet(props, ref) {
    return <BottomSheet ref={ref} children={<Content {...props} />} />;
  }
);

export default CreateApiKeySheet;
