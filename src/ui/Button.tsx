import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {
  ActivityIndicator,
  Pressable,
  TouchableOpacityProps,
  View,
} from 'react-native';
import classNames from 'classnames';
import Feather from '@expo/vector-icons/Feather';

import Text from '@/ui/Text';
import useColors from '@/lib/theme';

export interface ButtonProps extends TouchableOpacityProps {
  loading?: boolean;
  icon?: keyof typeof Feather.glyphMap;
  size?: keyof typeof SizeClasses;
  color?: 'primary' | 'accent' | 'danger';
}

const BUTTON_ANIMATION_OFFSET = 3;

const SizeClasses = {
  sm: {
    container: 'min-w-20 h-10 px-4',
    text: 'text-base',
    icon: 16,
  },
  lg: {
    container: 'min-w-32 h-14 px-6',
    text: 'text-lg',
    icon: 20,
  },
};

export default function Button({
  children,
  loading = false,
  disabled = false,
  size = 'lg',
  color = 'primary',
  icon,
  ...props
}: ButtonProps) {
  const colors = useColors();

  const ColorClasses = {
    primary: {
      container: colors.primary,
      shadow: colors.shadowPrimary,
      border: colors.divider,
      text: colors.ink,
    },
    accent: {
      container: colors.yellow,
      border: colors.shadowAccent,
      shadow: colors.yellow,
      text: '#000',
    },
    danger: {
      container: colors.primary,
      border: colors.borderDanger,
      shadow: colors.shadowDanger,
      text: colors.red,
    },
  };

  disabled = disabled || loading;

  const offset = useSharedValue(BUTTON_ANIMATION_OFFSET);
  const animatedStyle = useAnimatedStyle(() => ({
    paddingBottom: offset.value,
    marginTop: BUTTON_ANIMATION_OFFSET - offset.value,
  }));

  const shadowClasses = classNames(
    'border rounded-xl',
    disabled && 'opacity-50',
  );

  const shadowStyles = {
    borderColor: ColorClasses[color].border,
    backgroundColor: ColorClasses[color].shadow,
  };

  const containerClasses = classNames(
    'items-center rounded-xl flex-row gap-2',
    SizeClasses[size].container,
    icon ? 'justify-between' : 'justify-center',
  );

  const containerStyles = {
    backgroundColor: ColorClasses[color].container,
    shadowColor: ColorClasses[color].border,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 0,
  };

  const textClasses = classNames(
    'font-semibold shrink',
    SizeClasses[size].text,
    loading && 'opacity-10',
  );

  const textStyles = {
    color: ColorClasses[color].text,
  };

  const iconClasses = classNames(loading && 'opacity-10');

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
          <Text style={textStyles} className={textClasses} numberOfLines={1}>
            {children}
          </Text>

          {icon && (
            <Feather
              name={icon}
              size={SizeClasses[size].icon}
              color={ColorClasses[color].text}
              className={iconClasses}
            />
          )}
        </View>

        {loading && (
          <ActivityIndicator
            size="small"
            className="absolute top-0 left-0 right-0 bottom-0"
            color={ColorClasses[color].text}
          />
        )}
      </Animated.View>
    </Pressable>
  );
}
