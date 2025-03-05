import * as Haptic from 'expo-haptics';
import { TouchableOpacity, View } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { RenderItemParams } from 'react-native-draggable-flatlist';

import Text from '@/ui/Text';
import Switch from '@/ui/Switch';
import useColors from '@/lib/theme';
import { ActivityColumn } from '@/store/client';

interface ColumnToggleProps extends RenderItemParams<ActivityColumn> {
  onValueChange: () => void;
}

export default function ColumnControl({
  item,
  onValueChange,
  ...props
}: ColumnToggleProps) {
  const colors = useColors();

  const { title, description, visible } = item;

  const onPressIn = () => {
    if ('drag' in props) {
      Haptic.impactAsync(Haptic.ImpactFeedbackStyle.Medium);
      props.drag();
    }
  };

  return (
    <View className="flex-row items-center justify-between gap-2">
      <View className="flex-row items-center gap-2">
        <TouchableOpacity onPressIn={onPressIn}>
          <MaterialIcons name="drag-indicator" size={16} color={colors.gray} />
        </TouchableOpacity>

        <View>
          <Text className="font-medium text-ink">{title}</Text>
          <Text className="font-medium text-gray text-sm">{description}</Text>
        </View>
      </View>

      <Switch value={visible} onValueChange={onValueChange} />
    </View>
  );
}
