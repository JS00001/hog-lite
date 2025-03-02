import {
  Dimensions,
  Modal,
  Pressable,
  Text as RNText,
  TextProps as RNTextProps,
  TextLayoutEventData,
  View,
  ViewStyle,
} from 'react-native';

import Text from '@/ui/Text';
import classNames from 'classnames';
import { useCallback, useRef, useState } from 'react';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

interface Props extends RNTextProps {
  children: React.ReactNode;
  className?: string;
}

export default function TruncatedText({
  children,
  numberOfLines,
  className,
  ...props
}: Props) {
  const textRef = useRef<RNText>(null);

  const [open, setOpen] = useState(false);
  const [textTruncated, setTextTruncated] = useState(false);
  const [tooltipStyle, setTooltipStyle] = useState<ViewStyle>({});

  /**
   * When the text element is loaded, calculate the tooltip position
   * based on the text element's position.
   */
  const onElementLoad = useCallback(() => {
    if (!textRef.current) return;

    const OFFSET = 4;

    textRef.current.measure((_, __, width, height, px, py) => {
      let yStyles = {};
      let xStyles = {};

      if (px > WIDTH / 2) {
        xStyles = { right: WIDTH - px - width };
      } else {
        xStyles = { left: px };
      }

      if (py > HEIGHT / 2) {
        yStyles = { bottom: HEIGHT - py + OFFSET };
      } else {
        yStyles = { top: py + height + OFFSET };
      }

      setTooltipStyle({
        ...xStyles,
        ...yStyles,
        maxWidth: WIDTH / 1.5,
      });
    });
  }, []);

  /**
   * When the text layout is calculated, check if the last line is full.
   * If it is, the text is truncated, so we want to be able to click it for
   * more information.
   */
  const handleTextLayout = (event: { nativeEvent: TextLayoutEventData }) => {
    if (!numberOfLines) return;

    const { lines } = event.nativeEvent;

    if (lines.length === numberOfLines) {
      const lastLine = lines[numberOfLines - 1];

      textRef.current?.measure((_, __, width) => {
        const isLastLineFull = lastLine.width >= width * 0.95;
        setTextTruncated(isLastLineFull);
      });
    }
  };

  const toggleOpen = () => {
    setOpen((prev) => !prev);
  };

  const tooltipClasses = classNames(
    'absolute p-2 bg-highlight rounded-xl',
    'border border-divider shadow shadow-primary',
  );

  // We need a key to force layout calculation when we re-open the tooltip
  const textKey = open ? 'open' : 'closed';

  return (
    <>
      <Text
        key={textKey}
        {...props}
        ref={textRef}
        disabled={!textTruncated}
        numberOfLines={numberOfLines}
        onLayout={onElementLoad}
        onTextLayout={handleTextLayout}
        className={className}
        onPress={toggleOpen}
      >
        {children}
      </Text>

      <Modal visible={open} animationType="none" transparent>
        <Pressable className="flex-1" onPress={toggleOpen}>
          <View className={tooltipClasses} style={tooltipStyle}>
            <Text className="text-ink text-sm">{children}</Text>
          </View>
        </Pressable>
      </Modal>
    </>
  );
}
