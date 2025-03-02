import { View, ViewProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Props extends ViewProps {
  directions?: ('top' | 'bottom' | 'left' | 'right')[];
}

/**
 * On new expo architecture (>v52.0.0), react native safe area context
 * will not jump around on app load
 */
// TODO: Clean this up
export default function SafeAreaView({
  style,
  className,
  directions = ['top'],
  ...props
}: Props) {
  const insets = useSafeAreaInsets();

  // Extract padding values from className
  const getPaddingValue = (type: string) => {
    const match = className?.match(new RegExp(`${type}-(\\d+)`));
    return match ? parseInt(match[1]) * 4 : 0;
  };

  const viewStyle = {
    paddingTop: directions.includes('top')
      ? insets.top + getPaddingValue('pt')
      : getPaddingValue('pt'),
    paddingBottom: directions.includes('bottom')
      ? insets.bottom + getPaddingValue('pb')
      : getPaddingValue('pb'),
    paddingLeft: directions.includes('left')
      ? insets.left + getPaddingValue('pl')
      : getPaddingValue('pl'),
    paddingRight: directions.includes('right')
      ? insets.right + getPaddingValue('pr')
      : getPaddingValue('pr'),
  };

  // Handle py shorthand
  if (className?.includes('py-')) {
    const pyValue = getPaddingValue('py');
    viewStyle.paddingTop = directions.includes('top')
      ? insets.top + pyValue
      : pyValue;
    viewStyle.paddingBottom = directions.includes('bottom')
      ? insets.bottom + pyValue
      : pyValue;
  }

  // Handle px shorthand
  if (className?.includes('px-')) {
    const pxValue = getPaddingValue('px');
    viewStyle.paddingLeft = directions.includes('left')
      ? insets.left + pxValue
      : pxValue;
    viewStyle.paddingRight = directions.includes('right')
      ? insets.right + pxValue
      : pxValue;
  }

  // Handle p shorthand
  if (className?.match(/\bp-\d+/)) {
    const pValue = getPaddingValue('p');
    viewStyle.paddingTop = directions.includes('top')
      ? insets.top + pValue
      : pValue;
    viewStyle.paddingBottom = directions.includes('bottom')
      ? insets.bottom + pValue
      : pValue;
    viewStyle.paddingLeft = directions.includes('left')
      ? insets.left + pValue
      : pValue;
    viewStyle.paddingRight = directions.includes('right')
      ? insets.right + pValue
      : pValue;
  }

  return <View style={[style, viewStyle]} className={className} {...props} />;
}
