import classNames from "classnames";
import { View } from "react-native";

interface Props {
  className?: string;
}

export default function Skeleton({ className }: Props) {
  const containerClasses = classNames(
    "bg-gray-200 rounded-xl animate-pulse",
    className
  );

  return <View className={containerClasses} />;
}
