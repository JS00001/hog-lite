import { View } from "react-native";
import { forwardRef, useState } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

import { BottomSheetProps } from "./@types";

import useClientStore, {
  ActivityColumn,
  ActivityDisplayMode,
} from "@/store/client";
import Text from "@/ui/Text";
import Switch from "@/ui/Switch";
import Select from "@/ui/Select";
import Button from "@/ui/Button";
import BottomSheet from "@/ui/BottomSheet";
import { ISelectOption } from "@/ui/Select/@types";
import BottomSheetView from "@/ui/BottomSheet/Containers/View";

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
      label: "Full",
      value: "full",
      description:
        "Gives each column more space to breathe, but may require scrolling horizontally",
    },
    {
      label: "Compact",
      value: "compact",
      description:
        "Fit all data in the width of the screen without scrolling horizontally",
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
    setField("activityDisplayMode", state.mode);
    setField("activityColumns", state.columns);
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
        <View className="p-4 rounded-xl bg-primary border border-divider gap-4">
          {/* TODO: Allow draging to reorder these as well, like I want timestamp before url/screen */}
          <ColumnToggle
            title="Event"
            description="The name of the event that occurred"
            value={state.columns.includes("event")}
            onValueChange={() => onToggleColumn("event")}
          />
          <ColumnToggle
            title="Person"
            description="The person who performed the action"
            value={state.columns.includes("person")}
            onValueChange={() => onToggleColumn("person")}
          />
          <ColumnToggle
            title="URL / Screen"
            description="The url/screen where the action occurred"
            value={state.columns.includes("url")}
            onValueChange={() => onToggleColumn("url")}
          />
          <ColumnToggle
            title="Timestamp"
            description="The time when the activity occurred"
            value={state.columns.includes("timestamp")}
            onValueChange={() => onToggleColumn("timestamp")}
          />
        </View>
      </View>

      <Button size="sm" color="accent" onPress={onSave}>
        Save
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
  }
);

export default ConfigureActivitySheet;
