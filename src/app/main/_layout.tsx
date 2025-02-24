import { Redirect, Tabs } from "expo-router";
import Feather from "@expo/vector-icons/Feather";

import useColors from "@/lib/theme";
import useAuthStore from "@/store/auth";

interface Props {}

export default function Layout({}: Props) {
  const colors = useColors();
  const apiKey = useAuthStore((state) => state.apiKey);

  if (!apiKey) return <Redirect href="/onboarding" />;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.blue,
        tabBarItemStyle: {
          marginTop: 12,
        },
        tabBarStyle: {
          position: "absolute",
          backgroundColor: colors.highlight,
          borderTopColor: colors.divider,
          height: 92,
        },
        sceneStyle: {
          backgroundColor: colors.primary,
        },
      }}
    >
      <Tabs.Screen
        name="insights"
        options={{
          title: "Insights",
          tabBarIcon: ({ color }) => (
            <Feather
              name="bar-chart"
              size={24}
              color={color}
              className="pb-4"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="activity"
        options={{
          title: "Activity",
          tabBarIcon: ({ color }) => (
            <Feather name="radio" size={24} color={color} className="pb-4" />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <Feather name="settings" size={24} color={color} className="pb-4" />
          ),
        }}
      />
    </Tabs>
  );
}
