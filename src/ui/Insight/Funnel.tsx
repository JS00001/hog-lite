import { View } from "react-native";
import classNames from "classnames";
import Feather from "@expo/vector-icons/Feather";

import { Funnel } from "@/@types";

import Text from "@/ui/Text";
import useColors from "@/lib/theme";
import { formatNumber } from "@/lib/utils";

interface Props {
  data: Funnel;
}

export default function FunnelCard({ data }: Props) {
  const colors = useColors();
  const barClasses = classNames("bg-blue h-4 rounded");

  return (
    <View className="gap-4 pb-4">
      {data.map((step) => {
        // calculate the % of the step compared to the first step
        const percentage = (step.count / data[0].count) * 100;

        return (
          <View key={step.name} className="gap-2">
            <View className="items-center gap-1 flex-row">
              <Text className="text-ink font-medium">{step.custom_name}</Text>
              <Feather name="arrow-right" size={12} color={colors.ink} />
              <Text className="text-gray">
                {formatNumber(step.count)} Users ({percentage.toFixed(0)}%)
              </Text>
            </View>

            <View className={barClasses} style={{ width: `${percentage}%` }} />
          </View>
        );
      })}
    </View>
  );
}
