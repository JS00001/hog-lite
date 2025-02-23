import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  View,
} from "react-native";

import Text from "@/ui/Text";
import classNames from "classnames";

interface Props extends RNTextInputProps {
  label: string;
  error?: string;
}

export default function TextInput({
  label,
  className,
  error,
  ...props
}: Props) {
  const inputClasses = classNames(
    "p-3 border border-divider-light rounded-lg",
    className
  );

  return (
    <View className="gap-1">
      <Text className="font-medium text-ink-light">{label}</Text>
      <RNTextInput {...props} className={inputClasses} />
      {error && <Text className="text-red-light text-sm">{error}</Text>}
    </View>
  );
}
