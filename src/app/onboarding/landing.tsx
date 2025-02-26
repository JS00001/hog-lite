import { router } from "expo-router";
import { Linking, View } from "react-native";

import Text from "@/ui/Text";
import Button from "@/ui/Button";
import useAuthStore from "@/store/auth";
import Layout from "@/components/Layout";
import usePosthog from "@/hooks/usePosthog";

export default function Landing() {
  const posthog = usePosthog();
  const authStore = useAuthStore();

  const onContinue = () => {
    router.push("/onboarding/region");
    posthog.capture("onboarding_landing_continue");
  };

  const onTextClick = () => {
    Linking.openURL("https://github.com/JS00001/hog-mobile");
    posthog.capture("onboarding_landing_open_source");
  };

  const onDemo = () => {
    authStore.setDemoing(true);
    posthog.capture("onboarding_landing_demo");
  };

  return (
    <Layout title="Welcome, Friend" className="justify-center" hedgehog>
      <View className="bg-divider pb-1 rounded-xl overflow-hidden">
        <View className="bg-highlight rounded-xl p-4 gap-4">
          <View className="gap-1">
            <Text className="text-2xl font-medium">Welcome to Hog Lite!</Text>
            <Text className="text-lg text-gray">
              Hog Lite is a free and fully{" "}
              <Text className="text-red underline" onPress={onTextClick}>
                open-source
              </Text>{" "}
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
