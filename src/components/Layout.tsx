import { useMemo } from "react";
import classNames from "classnames";
import { KeyboardAvoidingView, ScrollView, View } from "react-native";

import Text from "@/ui/Text";
import SafeAreaView from "@/ui/SafeAreaView";
import HedgehogSVG from "@/assets/HedgehogSVG";

interface Props {
  title: string;
  className?: string;
  scrollable?: boolean;
  hedgehog?: boolean;
  children: React.ReactNode;
}

export default function Layout({
  title,
  scrollable,
  className,
  hedgehog = true,
  children,
}: Props) {
  const contentContainerClasses = classNames(
    "gap-4 flex-1 pb-32 p-4",
    className
  );

  const titleClasses = classNames(
    "text-4xl font-semibold mb-2 text-ink",
    className
  );

  const ContainerComponent = useMemo(() => {
    if (scrollable) {
      return (
        <ScrollView contentContainerClassName={contentContainerClasses}>
          <View className="flex-row items-center gap-2">
            {hedgehog && <HedgehogSVG size={40} />}
            <Text className={titleClasses}>{title}</Text>
          </View>
          {children}
        </ScrollView>
      );
    }

    return (
      <View className={contentContainerClasses} style={{ flex: 1 }}>
        <View className="flex-row items-center gap-2">
          {hedgehog && <HedgehogSVG size={40} />}
          <Text className={titleClasses}>{title}</Text>
        </View>

        {children}
      </View>
    );
  }, [scrollable, contentContainerClasses, children]);

  return (
    // TODO: Fix the non-animation for this
    <KeyboardAvoidingView
      behavior="padding"
      className="flex-1"
      contentContainerClassName="flex-1"
    >
      <SafeAreaView className="flex-1">{ContainerComponent}</SafeAreaView>
    </KeyboardAvoidingView>
  );
}
