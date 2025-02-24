import { useMemo } from "react";
import classNames from "classnames";
import { TouchableOpacity, View } from "react-native";

import Text from "@/ui/Text";
import { IInsight } from "@/@types";
import { formatNumber } from "@/lib/utils";

interface Props {
  insight: IInsight;
}

export default function Insight({ insight }: Props) {
  // TODO: different format for things like conversions, buckets, other insights.
  // NOT all are arrays
  const totalValue = useMemo(() => {
    return insight.result.reduce((acc, curr) => {
      return acc + curr.aggregated_value;
    }, 0);
  }, [insight.result]);

  const containerClasses = classNames(
    "bg-highlight p-6",
    "border border-divider rounded-xl"
  );

  return (
    <TouchableOpacity className={containerClasses}>
      <Text className="text-5xl font-bold text-ink">
        {formatNumber(totalValue)}
      </Text>
      <View>
        <Text className="text-ink font-medium text-lg">{insight.name}</Text>

        {insight.description && (
          <Text className="text-gray leading-relaxed">
            {insight.description}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}
