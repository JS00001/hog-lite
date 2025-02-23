import { Redirect, Tabs } from "expo-router";
import Feather from "@expo/vector-icons/Feather";

import { colors } from "@/lib/tailwind";
import useAuthStore from "@/store/auth";

interface Props {}

export default function Layout({}: Props) {
  const apiKey = useAuthStore((state) => state.apiKey);

  if (!apiKey) return <Redirect href="/onboarding/step1" />;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.blue.light,
        tabBarItemStyle: {
          marginTop: 12,
        },
        tabBarStyle: {
          position: "absolute",
          height: 92,
        },
        sceneStyle: {
          backgroundColor: colors.background.light,
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
