import { View } from 'react-native';
import { forwardRef, useState } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

import { BottomSheetProps } from './@types';

import useClientStore, {
  ActivityColumn,
  ActivityDisplayMode,
} from '@/store/client';
import Text from '@/ui/Text';
import Switch from '@/ui/Switch';
import Select from '@/ui/Select';
import Button from '@/ui/Button';
import BottomSheet from '@/ui/BottomSheet';
import usePosthog from '@/hooks/usePosthog';
import { ISelectOption } from '@/ui/Select/@types';
import BottomSheetView from '@/ui/BottomSheet/Containers/View';
import { t } from '@/i18n';

type Props = BottomSheetProps;

function Content({ close }: Props) {
  const posthog = usePosthog();
  const setField = useClientStore((store) => store.setField);
  const columns = useClientStore((store) => store.activityColumns);
  const mode = useClientStore((store) => store.activityDisplayMode);

  const [state, setState] = useState({
    mode,
    columns,
  });

  const displayOptions: ISelectOption[] = [
    {
      label: t('full'),
      value: 'full',
      description: t('fullDescription'),
    },
    {
      label: t('compact'),
      value: 'compact',
      description: t('compactDescription'),
    },
  ];

  /**
   * When a column is toggled, update the state to
   * reflect the change
   */
  const onToggleColumn = (column: ActivityColumn) => {
    const newColumns = state.columns.includes(column)
      ? state.columns.filter((c) => c !== column)
      : [...state.columns, column];

    setState({ ...state, columns: newColumns });
  };

  const onSave = () => {
    setField('activityDisplayMode', state.mode);
    setField('activityColumns', state.columns);
    close();
  };

  return (
    <BottomSheetView>
      <Text className="text-3xl font-medium text-ink ">
        {t('configureEventsTable')}
      </Text>

      <Select
        size="sm"
        label={t('displayMode')}
        options={displayOptions}
        placeholder={t('selectDisplayMode')}
        value={state.mode}
        onChange={(value) => {
          posthog.capture('configure_activity_display_mode', { mode: value });
          setState({ ...state, mode: value as ActivityDisplayMode });
        }}
      />

      <View className="gap-2">
        <Text className=" font-medium text-ink">{t('visibleColumns')}</Text>
        <View className="p-4 rounded-xl bg-primary border border-divider gap-4">
          {/* TODO: Allow draging to reorder these as well, like I want timestamp before url/screen */}
          <ColumnToggle
            title={t('event')}
            description={t('eventDescription')}
            value={state.columns.includes('event')}
            onValueChange={() => onToggleColumn('event')}
          />
          <ColumnToggle
            title={t('person')}
            description={t('personDescription')}
            value={state.columns.includes('person')}
            onValueChange={() => onToggleColumn('person')}
          />
          <ColumnToggle
            title={t('urlScreen')}
            description={t('urlScreenDescription')}
            value={state.columns.includes('url')}
            onValueChange={() => onToggleColumn('url')}
          />
          <ColumnToggle
            title={t('timestamp')}
            description={t('timestampDescription')}
            value={state.columns.includes('timestamp')}
            onValueChange={() => onToggleColumn('timestamp')}
          />
        </View>
      </View>

      <Button size="sm" color="accent" onPress={onSave}>
        {t('save')}
      </Button>
    </BottomSheetView>
  );
}

interface ColumnToggleProps {
  title: string;
  description: string;
  value: boolean;
  onValueChange: () => void;
}

function ColumnToggle({
  title,
  description,
  value,
  onValueChange,
}: ColumnToggleProps) {
  return (
    <View className="flex-row items-center justify-between gap-2">
      <View>
        <Text className="font-medium text-ink">{title}</Text>
        <Text className="font-medium text-gray text-sm">{description}</Text>
      </View>
      <Switch value={value} onValueChange={onValueChange} />
    </View>
  );
}

const ConfigureActivitySheet = forwardRef<BottomSheetModal, BottomSheetProps>(
  function ConfigureActivitySheet(props, ref) {
    return <BottomSheet ref={ref} children={<Content {...props} />} />;
  },
);

export default ConfigureActivitySheet;
