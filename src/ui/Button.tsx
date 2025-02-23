import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import {
  ActivityIndicator,
  Pressable,
  TouchableOpacityProps,
  View,
} from "react-native";
import classNames from "classnames";

import Text from "@/ui/Text";

interface Props extends TouchableOpacityProps {
  loading?: boolean;
  size?: keyof typeof SizeClasses;
  color?: keyof typeof ColorClasses;
}

const BUTTON_ANIMATION_OFFSET = 3;

const SizeClasses = {
  sm: {
    container: "min-w-20 h-10 px-4",
    text: "text-base",
  },
  lg: {
    container: "min-w-32 h-14 px-6",
    text: "text-lg",
  },
};

const ColorClasses = {
  primary: {
    container: "#EEEFE9",
    shadow: "#E1DDDD",
    border: "#CCCCCC",
    text: "#151515",
  },
  secondary: {
    container: "#FFFFFF",
    shadow: "#DC9300",
    border: "#B17816",
    text: "#151515",
  },
  accent: {
    container: "#DC9300",
    border: "#B17816",
    shadow: "#DC9300",
    text: "#000000",
  },
  danger: {
    container: "#EEEFE9",
    border: "#E96B30",
    shadow: "#F4A178",
    text: "#F54E00",
  },
};

export default function Button({
  children,
  loading = false,
  disabled = false,
  size = "lg",
  color = "primary",
  ...props
}: Props) {
  disabled = disabled || loading;

  const offset = useSharedValue(BUTTON_ANIMATION_OFFSET);
  const animatedStyle = useAnimatedStyle(() => ({
    paddingBottom: offset.value,
    marginTop: BUTTON_ANIMATION_OFFSET - offset.value,
  }));

  const shadowClasses = classNames(
    "border rounded-xl",
    disabled && "opacity-65"
  );

  const shadowStyles = {
    borderColor: ColorClasses[color].border,
    backgroundColor: ColorClasses[color].shadow,
  };

  const containerClasses = classNames(
    "items-center justify-center rounded-xl",
    SizeClasses[size].container
  );

  const containerStyles = {
    backgroundColor: ColorClasses[color].container,
    boxShadow: `0px 1px 0px ${ColorClasses[color].border}`,
  };

  const textClasses = classNames(
    "font-semibold",
    SizeClasses[size].text,
    loading && "opacity-0"
  );

  const textStyles = {
    color: ColorClasses[color].text,
  };

  /**
   * When the button is pressed in and out, animate the button to make it look
   * like it's being pressed "in" and "out".
   */
  const onPressIn = () => {
    offset.value = withSpring(0, { duration: 300 });
  };

  const onPressOut = () => {
    offset.value = withSpring(BUTTON_ANIMATION_OFFSET, { duration: 300 });
  };

  return (
    <Pressable
      disabled={disabled}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      {...props}
    >
      <Animated.View
        style={[animatedStyle, shadowStyles]}
        className={shadowClasses}
      >
        <View style={containerStyles} className={containerClasses}>
          <Text style={textStyles} className={textClasses}>
            {children}
          </Text>
        </View>

        {loading && (
          <ActivityIndicator
            size="small"
            className="absolute inset-0"
            color={ColorClasses[color].text}
          />
        )}
      </Animated.View>
    </Pressable>
  );
}
