import classNames from "classnames";
import Feather from "@expo/vector-icons/Feather";
import { TouchableHighlight, View } from "react-native";

import { ISelectOption } from "./@types";

import Text from "@/ui/Text";
import useColors from "@/lib/theme";

interface Props extends ISelectOption {
  selected: string | null;
  onChange: (value: string) => void;
}

export default function SelectOption({
  selected,
  label,
  value,
  onChange,
}: Props) {
  const colors = useColors();

  const isSelected = value === selected;
  const containerClasses = classNames(isSelected && "bg-accent");

  return (
    <TouchableHighlight
      className={containerClasses}
      underlayColor={colors.shadowPrimary}
      onPress={() => onChange(value)}
    >
      <View className="p-4 flex-row items-center gap-2">
        <Text className="text-ink font-medium flex-1">{label}</Text>

        {isSelected && <Feather name="check" color={colors.ink} size={16} />}
      </View>
    </TouchableHighlight>
  );
}
