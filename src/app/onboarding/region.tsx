import { View } from "react-native";
import { router } from "expo-router";

import Select from "@/ui/Select";
import Button from "@/ui/Button";
import useForm from "@/hooks/useForm";
import TextInput from "@/ui/TextInput";
import Layout from "@/components/Layout";
import validators from "@/lib/validators";
import useClientStore from "@/store/client";
import { ISelectOption } from "@/ui/Select/@types";
import useBottomSheetStore from "@/store/bottom-sheets";

export default function Region() {
  const clientStore = useClientStore();
  const bottomSheetStore = useBottomSheetStore();

  const form = useForm({
    validators: {
      apiEndpoint: validators.url,
      selection: validators.string.optional(),
    },
  });

  /**
   * When the form is submitted, check if we have a valid API url
   * to use, then set it as the clients preferred endpoint and
   * navigate to the next step in the onboarding process
   */
  const onSubmit = async () => {
    const isValid = form.validateState();

    if (!isValid) return;

    const isCustomInput = form.state.selection.value === "custom-endpoint";
    const isCustomInputEmpty = form.state.apiEndpoint.value === "";

    if (isCustomInput && isCustomInputEmpty) {
      form.setError("apiEndpoint", "URL is required");
      return;
    }

    clientStore.setField("apiEndpoint", form.state.apiEndpoint.value);
    router.push("/onboarding/api-key");
  };

  /**
   * We store two vars, `selection` and `apiEndpoint`.
   * If the user selects a region from the dropdown, we set
   * the `apiEndpoint` to the selected regions endpoint.
   * If the user selects 'Custom Endpoint', we set the `apiEndpoint`
   * to an empty string and allow the user to input their own endpoint.
   */
  const onSelectChange = (value: string) => {
    form.setValue("selection", value);

    if (value !== "custom-endpoint") {
      form.setValue("apiEndpoint", value);
      return;
    }

    form.setValue("apiEndpoint", "");
  };

  /**
   * When the 'What's this?' button is pressed, we open a bottom sheet
   * that explains what the data region is and why it's important
   */
  const onExplain = () => {
    bottomSheetStore.open("DATA_REGION");
  };

  const regionOptions: ISelectOption[] = [
    { label: "United States", value: "https://us.posthog.com/api" },
    { label: "European Union", value: "https://eu.posthog.com/api" },
    { label: "Custom Endpoint", value: "custom-endpoint" },
  ];

  return (
    <Layout title="Get Started" className="justify-center" hedgehog>
      <View className="bg-divider pb-1 rounded-xl">
        <View className="bg-highlight rounded-xl p-4 gap-4">
          <Select
            label="Data Region"
            placeholder="Select a region"
            options={regionOptions}
            value={form.state.selection.value}
            onChange={onSelectChange}
          />
          {form.state.selection.value === "custom-endpoint" && (
            <TextInput
              label="Custom Endpoint"
              placeholder="https://us.posthog.com/api"
              value={form.state.apiEndpoint.value}
              error={form.state.apiEndpoint.error}
              onChangeText={(value) => form.setValue("apiEndpoint", value)}
            />
          )}

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
