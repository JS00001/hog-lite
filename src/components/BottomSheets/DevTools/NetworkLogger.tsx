import RNNetworkLogger from 'react-native-network-logger';

import useColors from '@/lib/theme';

export default function NetworkLogger() {
  const colors = useColors();

  return (
    <RNNetworkLogger
      theme={{
        colors: {
          background: colors.highlight,
          text: colors.ink,
          card: colors.primary,
        },
      }}
    />
  );
}
