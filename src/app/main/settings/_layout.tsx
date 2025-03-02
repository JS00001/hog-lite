import { Stack } from 'expo-router';

import useColors from '@/lib/theme';

export default function Layout() {
  const colors = useColors();

  return (
    <Stack
      initialRouteName="index"
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: colors.primary,
        },
      }}
    />
  );
}
