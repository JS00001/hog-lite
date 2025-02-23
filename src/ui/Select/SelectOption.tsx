import classNames from "classnames";
import Feather from "@expo/vector-icons/Feather";
import { TouchableHighlight, View } from "react-native";

import { ISelectOption } from "./@types";

import Text from "@/ui/Text";

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
  const isSelected = value === selected;
  const containerClasses = classNames(isSelected && "bg-[#DBDED4]");

  return (
    <TouchableHighlight
      className={containerClasses}
      underlayColor="#eaede4"
      onPress={() => onChange(value)}
    >
      <View className="p-4 flex-row items-center gap-2">
        <Text className="text-ink-light font-medium flex-1">{label}</Text>

        {isSelected && <Feather name="check" size={16} />}
      </View>
    </TouchableHighlight>
  );
}
