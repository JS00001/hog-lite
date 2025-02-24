import {
  Dimensions,
  LayoutChangeEvent,
  Modal,
  Pressable,
  ScrollView,
  StyleProp,
  View,
  ViewStyle,
} from "react-native";
import classNames from "classnames";
import * as Haptic from "expo-haptics";
import { useCallback, useMemo, useRef, useState } from "react";

import { ISelectOption } from "./@types";
import SelectOption from "./SelectOption";

import Text from "@/ui/Text";
import useColors from "@/lib/theme";
import Button, { ButtonProps } from "@/ui/Button";

const HEIGHT = Dimensions.get("window").height;

// TODO: Cleanup this JSX
interface Props extends Omit<ButtonProps, "children"> {
  label?: string;
  value: string | null;
  placeholder: string;
  options: ISelectOption[];
  onChange: (value: string) => void;
}

export default function Select({
  label,
  value,
  options,
  placeholder,
  onChange,
  ...props
}: Props) {
  const selectRef = useRef<View>(null);
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0, width: 0 });

  const colors = useColors();

  /**
   * When the element shifts or loads, calculate where the select dropdown
   * should be positioned
   */
  const onElementLoad = useCallback(() => {
    if (!selectRef.current) return;

    selectRef.current.measure((_, __, width, height, px, py) => {
      const TOP_OFFSET = 4;
      setPosition({
        x: px,
        y: py + height + TOP_OFFSET,
        width,
      });
    });
  }, []);

  /**
   * The currently selected label based on the value for
   * the select dropdown
   */
  const selectedLabel = useMemo(() => {
    const option = options.find((option) => option.value === value);
    return option ? option.label : placeholder;
  }, [value, options, placeholder]);

  const toggleOpen = () => {
    setOpen((prev) => {
      if (!prev) Haptic.selectionAsync();
      return !prev;
    });
  };

  const onValueChange = (value: string) => {
    onChange(value);
    setOpen(false);
  };

  const overlayStyle: StyleProp<ViewStyle> = {
    position: "absolute",
    top: position.y,
    left: position.x,
    maxHeight: HEIGHT / 2,
    width: position.width,
  };

  const overlayClasses = classNames(
    "w-full rounded-xl pb-1 z-50",
    "border border-divider bg-shadow-primary"
  );

  const icon = open ? "chevron-up" : "chevron-down";

  return (
    <>
      <View ref={selectRef} onLayout={onElementLoad} className="gap-1.5">
        {label && (
          <Text className="font-medium text-[--color-ink]">{label}</Text>
        )}

        <Button {...props} icon={icon} onPress={toggleOpen}>
          {selectedLabel}
        </Button>
      </View>

      <Modal transparent animationType="none" visible={open}>
        <Pressable className="flex-1" onPress={toggleOpen}>
          <View style={overlayStyle} className={overlayClasses}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              className="bg-highlight rounded-xl overflow-hidden"
              style={{ boxShadow: `0px 1px 0px ${colors.divider}` }}
            >
              {options.map((option, i) => (
                <SelectOption
                  key={i}
                  selected={value}
                  onChange={onValueChange}
                  {...option}
                />
              ))}
            </ScrollView>
          </View>
        </Pressable>
      </Modal>
    </>
  );
}
