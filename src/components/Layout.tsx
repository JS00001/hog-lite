import {
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { useMemo } from "react";
import classNames from "classnames";
import { router } from "expo-router";
import Feather from "@expo/vector-icons/Feather";

import Text from "@/ui/Text";
import useColors from "@/lib/theme";
import SafeAreaView from "@/ui/SafeAreaView";
import HappyHedgehog from "@/assets/HappyHedgehog";

interface Props {
  title: string;
  className?: string;
  scrollable?: boolean;
  hedgehog?: boolean;
  hasBackButton?: boolean;
  children: React.ReactNode;
}

export default function Layout({
  title,
  scrollable,
  className,
  hasBackButton = false,
  hedgehog = false,
  children,
}: Props) {
  const colors = useColors();

  const contentContainerClasses = classNames("gap-4 p-4", className);

  const titleClasses = classNames("text-4xl font-semibold mb-2 text-ink");

  const backClasses = classNames("pb-4 self-start pr-8");

  const ContainerComponent = useMemo(() => {
    if (scrollable) {
      return (
        <ScrollView contentContainerClassName={contentContainerClasses}>
          <View className="flex-col">
            {hasBackButton && (
              <TouchableOpacity className={backClasses} onPress={router.back}>
                <Feather name="arrow-left" size={24} color={colors.ink} />
              </TouchableOpacity>
            )}

            <View className="flex-row items-center gap-2">
              {hedgehog && (
                <HappyHedgehog size={40} style={{ marginBottom: 10 }} />
              )}

              <Text className={titleClasses}>{title}</Text>
            </View>
          </View>
          {children}
        </ScrollView>
      );
    }

    return (
      <View className={contentContainerClasses} style={{ flex: 1 }}>
        <View className="flex-col">
          {hasBackButton && (
            <TouchableOpacity className={backClasses} onPress={router.back}>
              <Feather name="arrow-left" size={24} color={colors.ink} />
            </TouchableOpacity>
          )}

          <View className="flex-row items-center gap-2">
            {hedgehog && (
              <HappyHedgehog size={40} style={{ marginBottom: 10 }} />
            )}
            <Text className={titleClasses}>{title}</Text>
          </View>
        </View>

        {children}
      </View>
    );
  }, [scrollable, contentContainerClasses, children]);

  return (
    <KeyboardAvoidingView
      behavior="padding"
      className="flex-1"
      contentContainerClassName="flex-1"
    >
      <SafeAreaView className="flex-1">{ContainerComponent}</SafeAreaView>
    </KeyboardAvoidingView>
  );
}
