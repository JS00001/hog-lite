import classNames from 'classnames';
import { ViewProps } from 'react-native';
import { BottomSheetView as RNBottomSheetView } from '@gorhom/bottom-sheet';

export default function BottomSheetView({
  children,
  className,
  ...props
}: ViewProps) {
  const containerClasses = classNames(
    'px-4 py-4 gap-y-4 pb-16 bg-highlight',
    className,
  );

  return (
    <RNBottomSheetView className={containerClasses} {...props}>
      {children}
    </RNBottomSheetView>
  );
}
