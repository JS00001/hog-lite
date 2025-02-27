import { Stack } from "expo-router";

import useColors from "@/lib/theme";
import Redirect from "@/ui/Redirect";
import useAuthStore from "@/store/auth";

export default function Layout() {
  const colors = useColors();
  const loggedIn = useAuthStore((state) => state.apiKey || state.demoing);

  if (!loggedIn) {
    return (
      <Stack
        initialRouteName="landing"
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: colors.primary,
          },
        }}
      >
        <Stack.Screen name="landing" />
        <Stack.Screen name="region" />
        <Stack.Screen name="api-key" />
      </Stack>
    );
  }

  return <Redirect href="/main/insights" />;
}
