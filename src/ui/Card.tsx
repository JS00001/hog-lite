import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { Pressable, View } from 'react-native';
import Feather from '@expo/vector-icons/Feather';

import Text from '@/ui/Text';
import useColors from '@/lib/theme';

interface Props {
  disabled?: boolean;
  icon?: keyof typeof Feather.glyphMap;
  title: string;
  description: string;
  onPress?: () => void;
}

const ANIMATION_OFFSET = 3;

export default function Card({
  disabled,
  icon,
  title,
  description,
  onPress,
}: Props) {
  const colors = useColors();
  const offset = useSharedValue(ANIMATION_OFFSET);

  const animatedStyle = useAnimatedStyle(() => ({
    paddingBottom: offset.value,
    marginTop: ANIMATION_OFFSET - offset.value,
  }));

  /**
   * When the button is pressed in and out, animate the button to make it look
   * like it's being pressed "in" and "out".
   */
  const onPressIn = () => {
    offset.value = withSpring(0, { duration: 300 });
  };

  const onPressOut = () => {
    offset.value = withSpring(ANIMATION_OFFSET, { duration: 300 });
  };

  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      className="flex-1"
    >
      <Animated.View
        style={animatedStyle}
        className="border border-divider bg-shadow-primary rounded-xl"
      >
        <View
          className="p-4 rounded-xl bg-primary gap-2"
          style={{
            shadowColor: colors.divider,
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 1,
            shadowRadius: 0,
          }}
        >
          <Feather name={icon} size={20} color={colors.ink} />

          <View>
            <Text className="text-lg font-medium text-ink">{title}</Text>
            <Text className="text-sm text-gray">{description}</Text>
          </View>
        </View>
      </Animated.View>
    </Pressable>
  );
}
