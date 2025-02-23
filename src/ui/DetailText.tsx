import classNames from "classnames";
import Tooltip from "rn-tooltip";
import { View } from "react-native";

import Text from "@/ui/Text";
import { colors } from "@/lib/tailwind";

interface Props {
  details: string;
  children: string;
  className?: string;
}

export default function DetailText({ details, children, className }: Props) {
  const textClasses = classNames(
    "text-sm text-gray-500 underline decoration-dotted",
    "decoration-gray-300",
    className
  );

  return (
    <View className="flex-1">
      <Tooltip
        actionType="press"
        withOverlay={false}
        backgroundColor={colors.accent.light}
        pointerColor={colors.accent.light}
        containerStyle={{ borderRadius: 8, width: "auto" }}
        popover={<Text className="text-sm text-ink-light">{details}</Text>}
      >
        <Text className={textClasses}>{children}</Text>
      </Tooltip>
    </View>
  );
}
