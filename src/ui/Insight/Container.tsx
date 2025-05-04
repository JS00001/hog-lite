import { View } from 'react-native';

import Text from '@/ui/Text';

interface InsightContainerProps {
  type: string;
  children: React.ReactNode;
}

export default function InsightContainer({
  type,
  children,
}: InsightContainerProps) {
  return (
    <View className="gap-4">
      <View className="py-1 px-2 bg-accent self-start rounded-lg border border-divider">
        <Text className="text-xs text-ink font-medium">{type}</Text>
      </View>

      {children}
    </View>
  );
}
