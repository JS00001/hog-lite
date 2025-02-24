import classNames from "classnames";
import { Switch as RNSwitch, SwitchProps as RNSwitchProps } from "react-native";

import useColors from "@/lib/theme";

interface Props extends RNSwitchProps {}

export default function Switch({ className, ...props }: Props) {
  const colors = useColors();
  const switchClasses = classNames("scale-75", className);

  return (
    <RNSwitch
      trackColor={{ true: colors.red }}
      className={switchClasses}
      {...props}
    />
  );
}
