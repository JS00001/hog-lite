import { useMemo } from "react";
import classNames from "classnames";
import { TouchableOpacity, View } from "react-native";

import FunnelConversionTimeCard from "./FunnelConversionTime";
import AggregationCard from "./Aggregation";
import FunnelCard from "./Funnel";

import {
  Aggregation,
  Funnel,
  FunnelConversionTime,
  IInsight,
  ResultType,
  Retention,
} from "@/@types";
import Text from "@/ui/Text";

interface Props {
  insight: IInsight;
}

export default function Insight({ insight }: Props) {
  const result = useMemo(() => {
    // If the result is an object, it must be a FunnelConversionTime
    if (!Array.isArray(insight.result)) {
      return {
        type: ResultType.FunnelConversionTime,
        data: insight.result as FunnelConversionTime,
      } as const;
    }

    // If all items in the array have the keys of an aggregation, it must be an aggregation
    const isAggregation = (insight.result as any[]).every((item) => {
      const keys = ["data", "days", "count", "label"];

      return keys.every((key) => key in item);
    });

    if (isAggregation) {
      return {
        type: ResultType.Aggregation,
        data: insight.result as Aggregation,
      } as const;
    }

    // If the keys required for a funnel are in the array
    const isFunnel = (insight.result as any[]).every((item) => {
      const keys = ["action_id", "count", "custom_name", "name", "order"];

      return keys.every((key) => key in item);
    });

    if (isFunnel) {
      return {
        type: ResultType.Funnel,
        data: insight.result as Funnel,
      } as const;
    }

    // If the keys required for a retention are in the array
    const isRetention = (insight.result as any[]).every((item) => {
      const keys = ["date", "label", "values"];

      return keys.every((key) => key in item);
    });

    if (isRetention) {
      return {
        type: ResultType.Retention,
        data: insight.result as Retention,
      } as const;
    }

    return { type: ResultType.Unknown } as const;
  }, [insight.result]);

  const containerClasses = classNames(
    "bg-highlight p-6",
    "border border-divider rounded-xl"
  );

  const hiddenTiles = [ResultType.Retention, ResultType.Unknown];

  if (hiddenTiles.includes(result.type)) {
    return null;
  }

  return (
    <TouchableOpacity className={containerClasses} disabled>
      {result.type === ResultType.FunnelConversionTime && (
        <FunnelConversionTimeCard data={result.data} />
      )}

      {result.type === ResultType.Aggregation && (
        <AggregationCard data={result.data} />
      )}

      {result.type === ResultType.Funnel && <FunnelCard data={result.data} />}

      <View>
        <Text className="text-ink font-medium text-lg" numberOfLines={1}>
          {insight.name}
        </Text>

        {insight.description && (
          <Text className="text-gray leading-relaxed" numberOfLines={2}>
            {insight.description}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}
