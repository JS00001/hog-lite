import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  View,
} from "react-native";
import classNames from "classnames";

import Text from "@/ui/Text";

interface Props extends RNTextInputProps {
  label: string;
  disabled?: boolean;
  error?: string;
}

export default function TextInput({
  label,
  className,
  error,
  disabled,
  ...props
}: Props) {
  const inputClasses = classNames(
    "p-3 border border-divider-light rounded-lg",
    className
  );

  return (
    <View className="gap-1.5">
      <Text className="font-medium text-ink-light">{label}</Text>
      <RNTextInput {...props} editable={!disabled} className={inputClasses} />
      {error && <Text className="text-red-light text-sm">{error}</Text>}
    </View>
  );
}
