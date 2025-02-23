import { Text as RNText, TextProps as RNTextProps } from "react-native";

interface Props extends RNTextProps {}

export default function Text({ ...props }: Props) {
  return <RNText {...props} />;
}
