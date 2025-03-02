import { AxiosError } from 'axios';
import { View } from 'react-native';

import Text from '@/ui/Text';
import AngryHedgehog from '@/components/Hedgehogs/AngryHedgehog';

interface Props {
  error: Error | null;
  style?: any;
  description?: string;
  fallbackMessage?: string;
}

export default function ErrorMessage({
  error,
  description,
  fallbackMessage,
}: Props) {
  const httpError = (() => {
    if (error instanceof AxiosError) {
      const humanMessage = error.response?.data?.detail;

      if (humanMessage) return humanMessage;
    }

    if (fallbackMessage) {
      return fallbackMessage;
    }

    return error?.message;
  })();

  const title = description || 'An error occurred';

  return (
    <View className="items-center justify-center gap-2">
      <AngryHedgehog size={36} />

      <View>
        <Text className="font-semibold text-ink text-xl">{title}</Text>
        <Text className="text-center text-ink">{httpError}</Text>
      </View>
    </View>
  );
}
