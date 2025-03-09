import {
  Dimensions,
  FlatList,
  Modal,
  Pressable,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';
import classNames from 'classnames';
import * as Haptic from 'expo-haptics';
import { useCallback, useMemo, useRef, useState } from 'react';

import { ISelectOption } from './@types';
import SelectOption from './SelectOption';

import Text from '@/ui/Text';
import useColors from '@/lib/theme';
import Button, { ButtonProps } from '@/ui/Button';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

// TODO: Cleanup this JSX
interface Props extends Omit<ButtonProps, 'children'> {
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
  className,
  onChange,
  ...props
}: Props) {
  const selectRef = useRef<View>(null);
  const [open, setOpen] = useState(false);
  const [positionStyle, setPositionStyle] = useState({});

  const colors = useColors();

  /**
   * When the element shifts or loads, calculate where the select dropdown
   * should be positioned
   */
  const onElementLoad = useCallback(() => {
    if (!selectRef.current) return;

    selectRef.current.measure((_, __, width, height, px, py) => {
      const TOP_OFFSET = 4;

      // If the element is on the right side of the screen, we should position
      // the dropdown to the left
      if (px + width > WIDTH / 2) {
        setPositionStyle({
          width,
          top: py + height + TOP_OFFSET,
          right: WIDTH - px - width,
        });
        return;
      }

      setPositionStyle({
        width,
        top: py + height + TOP_OFFSET,
        left: px,
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
    position: 'absolute',
    maxHeight: HEIGHT / 2,
    minWidth: WIDTH / 1.5,
    ...positionStyle,
  };

  const overlayClasses = classNames(
    'w-full rounded-xl pb-1 z-50',
    'border border-divider bg-shadow-primary',
  );

  const icon = open ? 'chevron-up' : 'chevron-down';

  return (
    <>
      <View
        ref={selectRef}
        onLayout={onElementLoad}
        className={classNames('gap-1.5', className)}
      >
        {label && <Text className="font-medium text-ink">{label}</Text>}

        <Button {...props} icon={icon} onPress={toggleOpen}>
          {selectedLabel}
        </Button>
      </View>

      <Modal transparent animationType="none" visible={open}>
        <Pressable className="flex-1" onPress={toggleOpen}>
          <FlatList
            data={options}
            style={overlayStyle}
            className={overlayClasses}
            contentContainerStyle={{
              shadowColor: colors.divider,
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 1,
              shadowRadius: 0,
            }}
            contentContainerClassName="bg-highlight rounded-xl overflow-hidden"
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <SelectOption
                selected={value}
                onChange={onValueChange}
                {...item}
              />
            )}
            // List optimization
            keyExtractor={(item) => item.value}
            initialNumToRender={25}
            maxToRenderPerBatch={25}
            getItemLayout={(_, index) => ({
              index,
              length: 40,
              offset: 40 * index,
            })}
          />
        </Pressable>
      </Modal>
    </>
  );
}
