import { View } from "react-native";
import { router } from "expo-router";

import Button from "@/ui/Button";
import useForm from "@/hooks/useForm";
import Layout from "@/components/Layout";
import validators from "@/lib/validators";
import useClientStore from "@/store/client";
import useBottomSheetStore from "@/store/bottom-sheets";
import Select from "@/ui/Select";

export default function Region() {
  const clientStore = useClientStore();
  const bottomSheetStore = useBottomSheetStore();

  const form = useForm({
    validators: {
      apiEndpoint: validators.url,
    },
  });

  /**
   * When the form is submitted, attempt to
   * log the user in with theior API key
   */
  const onSubmit = async () => {
    const isValid = form.validateState();

    if (!isValid) return;

    clientStore.setField("apiEndpoint", form.state.apiEndpoint.value);
    router.push("/onboarding/api-key");
  };

  /**
   * When the 'How do I create an API key?' button is pressed,
   * show the bottom sheet with the instructions on how to create
   * an API key
   */
  const onExplain = () => {
    // bottomSheetStore.open("CREATE_API_KEY");
  };

  return (
    <Layout title="Get Started" className="justify-center" hedgehog>
      <View className="bg-divider pb-1 rounded-xl">
        <View className="bg-highlight rounded-xl p-4 gap-4">
          <Select
            label="Data Region"
            placeholder="Select a region"
            onChange={(value) => form.setValue("apiEndpoint", value)}
            value={form.state.apiEndpoint.value}
            options={[
              { label: "United States", value: "https://us.posthog.com/api" },
              { label: "European Union", value: "https://eu.posthog.com/api" },
              { label: "Custom Endpoint", value: "custom-endpoint" },
            ]}
          />

          <View className="gap-1">
            <Button
              size="sm"
              color="accent"
              disabled={!form.state.apiEndpoint.value}
              onPress={onSubmit}
            >
              Continue
            </Button>

            <Button size="sm" onPress={onExplain}>
              What's this?
            </Button>
          </View>
        </View>
      </View>
    </Layout>
  );
}
