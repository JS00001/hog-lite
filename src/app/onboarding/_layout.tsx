import { Redirect, Stack } from "expo-router";

import useColors from "@/lib/theme";
import useAuthStore from "@/store/auth";

interface Props {}

export default function Layout({}: Props) {
  const colors = useColors();
  const loggedIn = useAuthStore((state) => state.apiKey || state.demoing);

  if (!loggedIn) {
    return (
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: colors.primary,
          },
        }}
      />
    );
  }

  return <Redirect href="/main/insights" />;
}
