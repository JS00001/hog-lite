import {
  Image,
  Dimensions,
  View,
  ImageSourcePropType,
  TouchableOpacity,
} from "react-native";
import classNames from "classnames";
import Feather from "@expo/vector-icons/Feather";

import Text from "@/ui/Text";

interface Props {
  src: ImageSourcePropType;
  label: string;
  selected: boolean;
  onPress: () => void;
}

const WIDTH = Dimensions.get("window").width;

export default function AppIcon({ src, label, selected, onPress }: Props) {
  const width = (WIDTH - 16) / 4 - 8;

  const imageClasses = classNames(
    "w-20 h-20 rounded-2xl border border-divider"
  );

  return (
    <TouchableOpacity
      style={{ width }}
      className="justify-center items-center gap-2"
      onPress={onPress}
    >
      <Image source={src} className={imageClasses} />

      <Text className="text-center text-ink text-xs">{label}</Text>

      {selected && (
        <View className="p-1 rounded-full absolute -top-1 right-2 bg-green">
          <Feather name="check" size={14} color="white" />
        </View>
      )}
    </TouchableOpacity>
  );
}
