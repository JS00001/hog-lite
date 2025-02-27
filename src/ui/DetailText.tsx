import {
  Dimensions,
  Modal,
  Pressable,
  Text as RNText,
  TextProps as RNTextProps,
  View,
  ViewStyle,
} from "react-native";

import Text from "@/ui/Text";
import classNames from "classnames";
import { useCallback, useRef, useState } from "react";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

interface Props extends RNTextProps {
  children: React.ReactNode;
  detail: string;
  className?: string;
}

export default function DetailText({
  children,
  detail,
  className,
  ...props
}: Props) {
  const textRef = useRef<RNText>(null);

  const [open, setOpen] = useState(false);
  const [tooltipStyle, setTooltipStyle] = useState<ViewStyle>({});

  const onElementLoad = useCallback(() => {
    if (!textRef.current) return;

    const OFFSET = 4;

    textRef.current.measure((_, __, width, height, px, py) => {
      let yStyles = {};
      let xStyles = {};

      if (px > WIDTH / 2) {
        xStyles = { right: WIDTH - px - width };
      } else {
        xStyles = { left: px };
      }

      if (py > HEIGHT / 2) {
        yStyles = { bottom: HEIGHT - py + OFFSET };
      } else {
        yStyles = { top: py + height + OFFSET };
      }

      setTooltipStyle({
        ...xStyles,
        ...yStyles,
        maxWidth: WIDTH / 1.5,
      });
    });
  }, []);

  const toggleOpen = () => {
    setOpen((prev) => !prev);
  };

  const tooltipClasses = classNames(
    "absolute p-2 bg-highlight rounded-xl",
    "border border-divider shadow shadow-primary"
  );

  // We need a key to force layout calculation when we re-open the tooltip
  const textKey = open ? "open" : "closed";

  return (
    <>
      <Text
        key={textKey}
        {...props}
        ref={textRef}
        onLayout={onElementLoad}
        className={className}
        onPress={toggleOpen}
      >
        {children}
      </Text>

      <Modal visible={open} animationType="none" transparent>
        <Pressable className="flex-1" onPress={toggleOpen}>
          <View className={tooltipClasses} style={tooltipStyle}>
            <Text className="text-ink text-sm">{detail}</Text>
          </View>
        </Pressable>
      </Modal>
    </>
  );
}
