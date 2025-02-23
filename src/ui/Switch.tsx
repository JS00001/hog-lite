import classNames from "classnames";
import { Switch as RNSwitch, SwitchProps as RNSwitchProps } from "react-native";

import { colors } from "@/lib/tailwind";

interface Props extends RNSwitchProps {}

export default function Switch({ className, ...props }: Props) {
  const switchClasses = classNames("scale-75", className);

  return (
    <RNSwitch
      trackColor={{ true: colors.red.light }}
      className={switchClasses}
      {...props}
    />
  );
}
