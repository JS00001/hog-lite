import { View } from "react-native";

import Button from "@/ui/Button";
import useForm from "@/hooks/useForm";
import TextInput from "@/ui/TextInput";
import Layout from "@/components/Layout";
import validators from "@/lib/validators";
import { useLogin } from "@/hooks/api/user";
import useBottomSheetStore from "@/store/bottom-sheets";

export default function Step1() {
  const login = useLogin();
  const bottomSheetStore = useBottomSheetStore();

  const form = useForm({
    validators: {
      apiKey: validators.posthogApiKey,
    },
  });

  /**
   * When the form is submitted, attempt to
   * log the user in with theior API key
   */
  const onSubmit = async () => {
    const isValid = form.validateState();

    if (!isValid) return;

    await login.mutateAsync({ apiKey: form.state.apiKey.value });
  };

  /**
   * When the 'How do I create an API key?' button is pressed,
   * show the bottom sheet with the instructions on how to create
   * an API key
   */
  const onCreateApiKey = () => {
    bottomSheetStore.open("CREATE_API_KEY");
  };

  /**
   * When the 'Do you store my API key?' button is pressed,
   * show the bottom sheet with the information on how we store
   * the API key (We don't store it)
   */
  const onDataSecurity = () => {
    bottomSheetStore.open("DATA_SECURITY");
  };

  return (
    <Layout title="API Key" className="justify-center" hedgehog>
      <View className="bg-divider pb-1 rounded-xl overflow-hidden">
        <View className="bg-highlight rounded-xl p-4 gap-4">
          <TextInput
            autoCorrect={false}
            autoComplete="off"
            label="API Key"
            placeholder="phx_12345"
            value={form.state.apiKey.value}
            error={form.state.apiKey.error}
            onChangeText={(apiKey) => form.setValue("apiKey", apiKey)}
          />

          <View className="gap-1">
            <Button
              size="sm"
              color="accent"
              loading={login.isPending}
              disabled={!form.state.apiKey.value}
              onPress={onSubmit}
            >
              Login
            </Button>

            <Button size="sm" onPress={onCreateApiKey}>
              How do I get this?
            </Button>
            <Button size="sm" onPress={onDataSecurity}>
              Do you store my API key?
            </Button>
          </View>
        </View>
      </View>
    </Layout>
  );
}
