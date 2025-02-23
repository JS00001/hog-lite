import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleProp,
  View,
  ViewStyle,
} from "react-native";
import classNames from "classnames";
import * as Haptic from "expo-haptics";
import { useCallback, useMemo, useState } from "react";

import { ISelectOption } from "./@types";
import SelectOption from "./SelectOption";

import Text from "@/ui/Text";
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
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  /**
   * When the page loads, calculate where the select dropdown
   * should be positioned
   */
  const onElementLoad = useCallback((node: View | null) => {
    if (!node) return;

    node.measure((x, y, _, height) => {
      const TOP_OFFSET = 4;
      setPosition({ x, y: y + height + TOP_OFFSET });
    });
  }, []);

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
  };

  const overlayClasses = classNames(
    "w-full rounded-xl pb-1 z-50",
    "border border-[#CCCCCC] bg-[#E1DDDD]"
  );

  const icon = open ? "chevron-up" : "chevron-down";

  return (
    <>
      <View ref={onElementLoad} className="gap-1.5">
        {label && <Text className="font-medium text-ink-light">{label}</Text>}

        <Button {...props} icon={icon} onPress={toggleOpen}>
          {selectedLabel}
        </Button>
      </View>

      {open && (
        <Pressable
          className="absolute h-screen w-full z-50"
          onPress={toggleOpen}
        >
          <View style={overlayStyle} className={overlayClasses}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              className=" bg-white rounded-xl overflow-hidden"
              style={{ boxShadow: "0px 1px 0px #CCCCCC" }}
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
      )}
    </>
  );
}
