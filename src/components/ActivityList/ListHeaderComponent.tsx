import classNames from 'classnames';
import Feather from '@expo/vector-icons/Feather';
import { TouchableOpacity, View } from 'react-native';

import Text from '@/ui/Text';
import useColors from '@/lib/theme';
import useClientStore from '@/store/client';
import useBottomSheetStore from '@/store/bottom-sheets';

export default function ListHeaderComponent() {
  const colors = useColors();
  const openBottomSheet = useBottomSheetStore((s) => s.open);

  const columns = useClientStore((store) => store.activityColumns);
  const isCompact = useClientStore((store) => {
    return store.activityDisplayMode === 'compact';
  });

  const containerClasses = classNames(
    'px-3 py-4 bg-highlight ',
    'flex-row justify-between items-center gap-4',
  );

  const toggleClasses = classNames(
    'p-1 bg-accent rounded-md',
    'flex-row items-center',
  );

  const eventRowClasses = classNames(
    'text-sm font-semibold text-ink',
    isCompact ? 'flex-1' : 'w-60',
  );

  const personRowClasses = classNames(
    'text-sm font-semibold text-ink',
    isCompact ? 'flex-1' : 'w-80',
  );

  const urlRowClasses = classNames(
    'text-sm font-semibold text-ink',
    isCompact ? 'flex-[1.5]' : 'w-64',
  );

  const timeRowClasses = classNames('text-sm font-semibold text-ink', 'w-20');

  const onPress = () => {
    openBottomSheet('CONFIGURE_ACTIVITY');
  };

  return (
    <View className={containerClasses}>
      <TouchableOpacity className={toggleClasses} onPress={onPress}>
        <Feather name="settings" color={colors.ink} />
      </TouchableOpacity>

      {columns.includes('event') && (
        <Text className={eventRowClasses}>EVENT</Text>
      )}

      {columns.includes('person') && (
        <Text className={personRowClasses}>PERSON</Text>
      )}

      {columns.includes('url') && <Text className={urlRowClasses}>URL</Text>}

      {columns.includes('timestamp') && (
        <Text className={timeRowClasses}>TIME</Text>
      )}
    </View>
  );
}
