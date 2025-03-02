import { forwardRef } from 'react';
import { Text as RNText, TextProps as RNTextProps } from 'react-native';

interface Props extends RNTextProps {}

export default forwardRef<RNText, Props>(function Text({ ...props }, ref) {
  return <RNText ref={ref} {...props} />;
});
