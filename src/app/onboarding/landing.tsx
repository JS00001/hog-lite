import { View } from "react-native";

import Button from "@/ui/Button";
import Layout from "@/components/Layout";
import { router } from "expo-router";

export default function Landing() {
  const onContinue = () => {
    router.push("/onboarding/region");
  };

  return (
    <Layout title="Welcome!" className="justify-center" hedgehog>
      <View className="bg-divider pb-1 rounded-xl overflow-hidden">
        <View className="bg-highlight rounded-xl p-4 gap-4">
          <View className="gap-1">
            <Button size="sm" color="accent" onPress={onContinue}>
              Continue
            </Button>
          </View>
        </View>
      </View>
    </Layout>
  );
}
