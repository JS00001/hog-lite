import { router } from 'expo-router';
import { Linking, View } from 'react-native';

import Text from '@/ui/Text';
import Button from '@/ui/Button';
import constants from '@/constants';
import Layout from '@/components/Layout';
import usePosthog from '@/hooks/usePosthog';
import { useDemoLogin } from '@/hooks/api/user';

export default function Landing() {
  const posthog = usePosthog();
  const demoMutation = useDemoLogin();

  const onContinue = () => {
    router.push('/onboarding/region');
    posthog.capture('onboarding_landing_continue');
  };

  const onTextClick = () => {
    Linking.openURL(constants.githubUrl);
    posthog.capture('onboarding_landing_open_source');
  };

  const onDemo = async () => {
    await demoMutation.mutateAsync();
    posthog.capture('onboarding_landing_demo');
  };

  return (
    <Layout title="Welcome, Friend" className="justify-center" hedgehog>
      <View className="bg-divider pb-1 rounded-xl overflow-hidden">
        <View className="bg-highlight rounded-xl p-4 gap-4">
          <View className="gap-1">
            <Text className="text-2xl font-medium text-ink">
              Welcome to HogLite!
            </Text>
            <Text className="text-lg text-gray">
              HogLite is a fully{' '}
              <Text className="text-red underline" onPress={onTextClick}>
                open-source
              </Text>{' '}
              PostHog client to view insights, events, and more, all from your
              phone. We're excited to have you on board!
            </Text>
          </View>

          <View className="gap-1">
            <Button size="sm" color="accent" onPress={onContinue}>
              Get Started
            </Button>
            <Button size="sm" onPress={onDemo}>
              Explore with Sample Data
            </Button>
          </View>
        </View>
      </View>
    </Layout>
  );
}
