import { Redirect, Slot, Stack } from "expo-router";

import useAuthStore from "@/store/auth";
import { colors } from "@/lib/tailwind";

interface Props {}

export default function Layout({}: Props) {
  const apiKey = useAuthStore((state) => state.apiKey);

  if (!apiKey) {
    return (
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: colors.background.light,
          },
        }}
      />
    );
  }

  return <Redirect href="/main/insights" />;
}
