import Select from "@/ui/Select";
import Layout from "@/components/Layout";
import useClientStore from "@/store/client";
import usePosthog from "@/hooks/usePosthog";
import { ISelectOption } from "@/ui/Select/@types";

export default function Appearance() {
  const posthog = usePosthog();

  const setClientStore = useClientStore((s) => s.setField);
  const theme = useClientStore((store) => store.theme);

  const onThemeChange = (value: string) => {
    setClientStore("theme", value as "light" | "dark");
    posthog.capture("theme_changed", { theme: value });
  };

  /**
   * The options for the theme select input.
   */
  const themeSelectOptions: ISelectOption[] = [
    { label: "Light", value: "light" },
    { label: "Dark", value: "dark" },
  ];

  return (
    <Layout title="Appearance" scrollable hasBackButton>
      <Select
        size="sm"
        label="Theme"
        placeholder="Select theme"
        value={theme}
        options={themeSelectOptions}
        onChange={onThemeChange}
      />

      {/* <View className="gap-2">
        <Text className="text-ink font-medium">App Icon</Text>

        <View className="justify-between flex-row">
          <View className="size-24 bg-red"></View>
          <View className="size-24 bg-red" />
          <View className="size-24 bg-red" />
        </View>
      </View> */}
    </Layout>
  );
}
