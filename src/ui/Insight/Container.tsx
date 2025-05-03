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
    <View className="gap-3">
      <View className="py-1 px-2 bg-accent self-start rounded-lg">
        <Text className="text-xs text-ink font-medium">{type}</Text>
      </View>

      {children}
    </View>
  );
}
