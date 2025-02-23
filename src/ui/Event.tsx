import classNames from "classnames";
import { useMemo, useState } from "react";
import Feather from "@expo/vector-icons/Feather";
import { TouchableOpacity, View } from "react-native";

import Text from "@/ui/Text";
import DetailText from "@/ui/DetailText";
import { EventData, IEvent } from "@/@types";
import { formatDate, timeAgo } from "@/lib/utils";

interface Props {
  event: IEvent;
}

export default function Event({ event }: Props) {
  const [expanded, setExpanded] = useState(false);

  const data = event[EventData.All];
  const eventUrl = event[EventData.URL];
  const eventTimestamp = event[EventData.Timestamp];

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  /**
   * Return the event name to title c ase if it starts with a $ (posthog native event),
   * else return the event name as is.
   */
  const eventName = useMemo(() => {
    if (data.event.startsWith("$")) {
      return data.event.charAt(1).toUpperCase() + data.event.slice(2);
    }

    return data.event;
  }, [data.event]);

  /**
   * Sort all event properties by their key in
   * alphabetical order and return the sorted properties.
   */
  const eventProperties = useMemo(() => {
    const keys = Object.keys(data.properties).sort();
    const properties: Record<string, any> = {};

    keys.forEach((key) => {
      properties[key] = data.properties[key];
    });

    return properties;
  }, [data.properties]);

  const containerClasses = classNames(
    "flex-row justify-between items-center gap-2",
    "p-3 bg-white"
  );

  const toggleClasses = classNames(
    "p-1 bg-accent-light rounded-md",
    "flex-row items-center"
  );

  const iconName = expanded ? "minimize-2" : "maximize-2";

  return (
    <View>
      <View className={containerClasses}>
        <Text className="text-sm flex-1" numberOfLines={1}>
          {eventName}
        </Text>
        <Text className="text-sm flex-[2]" numberOfLines={1}>
          {eventUrl}
        </Text>
        <DetailText details={formatDate(eventTimestamp)} className="flex-1">
          {timeAgo(eventTimestamp)}
        </DetailText>

        <TouchableOpacity className={toggleClasses} onPress={toggleExpanded}>
          <Feather name={iconName} />
        </TouchableOpacity>
      </View>

      {/* Detail View */}
      {expanded && (
        <View className="bg-accent-light p-2">
          {Object.entries(eventProperties).map(([key, value]) => (
            <EventProperty key={key} name={key} value={value} />
          ))}
        </View>
      )}
    </View>
  );
}

function EventProperty({ name, value }: { name: string; value: any }) {
  // Dont render object values
  if (typeof value === "object") {
    return null;
  }

  // Dont render array values
  if (Array.isArray(value)) {
    return null;
  }

  /**
   * Convert any $ prefixed key to title case, then split at underscore and
   * join with a space. Each word should be title case
   */
  const key = (() => {
    if (name.startsWith("$")) {
      name = name.charAt(1).toUpperCase() + name.slice(2);

      name = name
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      return name;
    }

    return name;
  })();

  return (
    <View className="border-b border-divider-light py-2 flex-row justify-between gap-2">
      <Text className="text-sm font-semibold text-ink-light">{key}</Text>
      <Text
        className="text-sm text-ink-light flex-1 text-right"
        numberOfLines={4}
      >
        {value.toString()}
      </Text>
    </View>
  );
}
