import { RedirectProps, Redirect as ExpoRedirect } from 'expo-router';

import { ActivityIndicator, View } from 'react-native';

import useColors from '@/lib/theme';

export default function Redirect(props: RedirectProps) {
  const colors = useColors();

  return (
    <View className="flex-1 bg-primary items-center justify-center">
      <ActivityIndicator size="small" color={colors.gray} />
      <ExpoRedirect {...props} />
    </View>
  );
}
