import { useMemo } from "react";
import { View } from "react-native";

import Text from "@/ui/Text";
import Skeleton from "@/ui/Skeleton";
import PanickedHedgehog from "@/assets/PanickedHedgehog";

interface Props {
  isLoading: boolean;
}

export default function ListEmptyComponent({ isLoading }: Props) {
  const array = useMemo(() => new Array(15).fill(0), []);

  if (isLoading) {
    return (
      <View className="items-center bg-highlight">
        {array.map((_, index) => (
          <View className="py-1.5 px-2 w-full" key={index}>
            <Skeleton key={index} className="w-full h-8" />
          </View>
        ))}
      </View>
    );
  }

  return (
    <View className="items-center py-32 bg-highlight -mb-px">
      <PanickedHedgehog size={96} />
      <Text className="text-ink text-xl font-medium">No events found</Text>
      <Text className="text-ink">
        Try changing your filters, or reloading the page.
      </Text>
    </View>
  );
}
