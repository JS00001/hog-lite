import { router } from "expo-router";
import { Text, View } from "react-native";

import Button from "@/ui/Button";
import useForm from "@/hooks/useForm";
import TextInput from "@/ui/TextInput";
import useAuthStore from "@/store/auth";
import SafeAreaView from "@/ui/SafeAreaView";
import validators from "@/lib/validators";

export default function Step1() {
  const authStore = useAuthStore();

  const form = useForm({
    validators: {
      apiKey: validators.posthogApiKey,
    },
  });

  const onSubmit = () => {
    const isValid = form.validateState();

    if (!isValid) return;

    authStore.login(form.state.apiKey.value);
    router.push("/main/insights");
  };

  return (
    <SafeAreaView className="px-6 flex-1 justify-center pb-48">
      <View className="bg-divider-light pb-1 rounded-xl overflow-hidden">
        <View className="bg-white rounded-xl p-4 gap-4">
          <Text className="text-xl font-semibold text-ink-light">
            Get Started with MobileHog
          </Text>

          <TextInput
            autoCorrect={false}
            autoComplete="off"
            label="API Key"
            placeholder="phx_12345"
            value={form.state.apiKey.value}
            error={form.state.apiKey.error}
            onChangeText={(apiKey) => form.setValue("apiKey", apiKey)}
          />

          <Button size="lg" color="accent" onPress={onSubmit}>
            Login
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}
