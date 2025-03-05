import { View } from 'react-native';
import * as Haptic from 'expo-haptics';
import { forwardRef, useState } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import DraggableFlatlist from 'react-native-draggable-flatlist';

import { BottomSheetProps } from '../@types';
import ColumnControl from './ColumnControl';

import useClientStore, {
  ActivityColumnName,
  ActivityDisplayMode,
} from '@/store/client';
import Text from '@/ui/Text';
import Select from '@/ui/Select';
import Button from '@/ui/Button';
import BottomSheet from '@/ui/BottomSheet';
import { ISelectOption } from '@/ui/Select/@types';
import BottomSheetView from '@/ui/BottomSheet/Containers/View';

type Props = BottomSheetProps;

function Content({ close }: Props) {
  const setField = useClientStore((store) => store.setField);
  const columns = useClientStore((store) => store.activityColumns);
  const mode = useClientStore((store) => store.activityDisplayMode);

  const [state, setState] = useState({
    mode,
    columns,
  });

  const displayOptions: ISelectOption[] = [
    {
      label: 'Full',
      value: 'full',
      description:
        'Gives each column more space to breathe, but may require scrolling horizontally',
    },
    {
      label: 'Compact',
      value: 'compact',
      description:
        'Fit all data in the width of the screen without scrolling horizontally',
    },
  ];

  /**
   * When a column is toggled, update the state to
   * reflect the change
   */
  const onToggleColumn = (column: ActivityColumnName) => {
    const columns = state.columns.map((c) => {
      if (c.key === column) {
        return { ...c, visible: !c.visible };
      }

      return c;
    });

    setState({ ...state, columns });
  };

  const onSave = () => {
    setField('activityDisplayMode', state.mode);
    setField('activityColumns', state.columns);
    close();
  };

  return (
    <BottomSheetView>
      <Text className="text-3xl font-medium text-ink ">
        Configure Activity Table
      </Text>

      <Select
        size="sm"
        label="Display Mode"
        options={displayOptions}
        placeholder="Select display mode"
        value={state.mode}
        onChange={(value) => {
          setState({ ...state, mode: value as ActivityDisplayMode });
        }}
      />

      <View className="gap-2">
        <Text className=" font-medium text-ink">Visible Columns</Text>

        <DraggableFlatlist
          data={state.columns}
          scrollEnabled={false}
          contentContainerClassName="gap-4"
          className="py-4 pr-4 pl-2 rounded-xl bg-primary border border-divider"
          renderItem={(props) => {
            return (
              <ColumnControl
                {...props}
                onValueChange={() => onToggleColumn(props.item.key)}
              />
            );
          }}
          onDragEnd={({ data }) => {
            setState({
              ...state,
              columns: data,
            });

            Haptic.impactAsync(Haptic.ImpactFeedbackStyle.Medium);
          }}
          keyExtractor={(item) => item.key}
        />
      </View>

      <Button size="sm" color="accent" onPress={onSave}>
        Save
      </Button>
    </BottomSheetView>
  );
}

const ConfigureActivitySheet = forwardRef<BottomSheetModal, BottomSheetProps>(
  function ConfigureActivitySheet(props, ref) {
    return <BottomSheet ref={ref} children={<Content {...props} />} />;
  },
);

export default ConfigureActivitySheet;
