import { useMemo } from "react";
import classNames from "classnames";
import { ScrollView, View } from "react-native";

import Text from "@/ui/Text";
import SafeAreaView from "@/ui/SafeAreaView";

interface Props {
  title: string;
  className?: string;
  scrollable?: boolean;
  children: React.ReactNode;
}

export default function Layout({
  title,
  scrollable,
  className,
  children,
}: Props) {
  const contentContainerClasses = classNames(
    "gap-4 flex-1 pb-32 p-4",
    className
  );

  const titleClasses = classNames("text-4xl font-semibold mb-2", className);

  const ContainerComponent = useMemo(() => {
    if (scrollable) {
      return (
        <ScrollView contentContainerClassName={contentContainerClasses}>
          <Text className={titleClasses}>{title}</Text>
          {children}
        </ScrollView>
      );
    }

    return (
      <View className={contentContainerClasses} style={{ flex: 1 }}>
        <Text className={titleClasses}>{title}</Text>
        {children}
      </View>
    );
  }, [scrollable, contentContainerClasses, children]);

  return <SafeAreaView className="flex-1">{ContainerComponent}</SafeAreaView>;
}
