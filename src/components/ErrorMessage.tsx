import { AxiosError } from 'axios';
import { Linking, View } from 'react-native';

import Text from '@/ui/Text';
import AngryHedgehog from '@/components/Hedgehogs/AngryHedgehog';
import Button from '@/ui/Button';

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

  const onCheckStatus = () => {
    Linking.openURL('https://status.posthog.com/history');
  };

  return (
    <View className="items-center justify-center gap-2 px-12">
      <AngryHedgehog size={36} />

      <View className="items-center">
        <Text className="font-semibold text-ink text-xl">{title}</Text>
        <Text className="text-center text-ink leading-6">{httpError}</Text>
      </View>

      <Button
        size="sm"
        className="mt-2"
        icon="external-link"
        onPress={onCheckStatus}
      >
        Check PostHog's Status
      </Button>
    </View>
  );
}
