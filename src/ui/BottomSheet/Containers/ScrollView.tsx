import classNames from "classnames";
import { ScrollViewProps } from "react-native";
import { BottomSheetScrollView as RNBottomSheetScrollView } from "@gorhom/bottom-sheet";

export default function BottomSheetScrollView({
  children,
  className,
  contentContainerClassName,
  ...props
}: ScrollViewProps) {
  const containerClasses = classNames("px-6 py-4", className);
  const contentContainerClasses = classNames(
    "gap-y-2 pb-16",
    contentContainerClassName,
  );

  return (
    <RNBottomSheetScrollView
      keyboardShouldPersistTaps="handled"
      className={containerClasses}
      contentContainerClassName={contentContainerClasses}
      {...props}
    >
      {children}
    </RNBottomSheetScrollView>
  );
}
