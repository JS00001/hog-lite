import { router } from "expo-router";
import { View } from "react-native";

import Button from "@/ui/Button";
import useForm from "@/hooks/useForm";
import TextInput from "@/ui/TextInput";
import useAuthStore from "@/store/auth";
import Layout from "@/components/Layout";
import validators from "@/lib/validators";
import { useLogin } from "@/hooks/api/user";

export default function Step1() {
  const login = useLogin();

  const form = useForm({
    validators: {
      apiKey: validators.posthogApiKey,
    },
  });

  const onSubmit = async () => {
    const isValid = form.validateState();

    if (!isValid) return;

    await login.mutateAsync({ apiKey: form.state.apiKey.value });
  };

  return (
    <Layout title="Get Started">
      <View className="bg-divider-light pb-1 rounded-xl overflow-hidden">
        <View className="bg-white rounded-xl p-4 gap-4">
          <TextInput
            autoCorrect={false}
            autoComplete="off"
            label="API Key"
            placeholder="phx_12345"
            value={form.state.apiKey.value}
            error={form.state.apiKey.error}
            onChangeText={(apiKey) => form.setValue("apiKey", apiKey)}
          />

          <Button
            size="lg"
            color="accent"
            loading={login.isPending}
            disabled={!form.state.apiKey.value}
            onPress={onSubmit}
          >
            Login
          </Button>
        </View>
      </View>
    </Layout>
  );
}
