import { FlatList } from "react-native";
// import { setAppIcon } from "expo-dynamic-app-icon";

import Text from "@/ui/Text";
import Select from "@/ui/Select";
import Layout from "@/components/Layout";
import AppIcon from "@/components/AppIcon";
import usePosthog from "@/hooks/usePosthog";
import { ISelectOption } from "@/ui/Select/@types";
import useClientStore, { AppIcon as TAppIcon } from "@/store/client";

export default function Appearance() {
  const posthog = usePosthog();

  const theme = useClientStore((store) => store.theme);
  const appIcon = useClientStore((store) => store.appIcon);
  const setClientStore = useClientStore((s) => s.setField);

  const onThemeChange = (value: string) => {
    setClientStore("theme", value as "light" | "dark");
    posthog.capture("theme_changed", { theme: value });
  };

  const onAppIconChange = (value: TAppIcon) => {
    // TODO: Enable
    // setAppIcon(value);
    setClientStore("appIcon", value);
    posthog.capture("app_icon_changed", { appIcon: value });
  };

  /**
   * The options for the theme select input.
   */
  const themeSelectOptions: ISelectOption[] = [
    { label: "Light", value: "light" },
    { label: "Dark", value: "dark" },
  ];

  /**
   * The options for app icons
   */
  const appIconOptions = [
    {
      label: "Default",
      value: "default",
      src: require("@/../assets/images/icon.png"),
    },
    {
      label: "Angry Hog",
      value: "angry",
      src: require("@/../assets/images/dynamic-icons/angry-icon.png"),
    },
    {
      label: "Nerdy Hog",
      value: "nerd",
      src: require("@/../assets/images/dynamic-icons/nerd-icon.png"),
    },
    {
      label: "Blue",
      value: "happy-blue",
      src: require("@/../assets/images/dynamic-icons/happy-icon-blue.png"),
    },
    {
      label: "Orange",
      value: "happy-orange",
      src: require("@/../assets/images/dynamic-icons/happy-icon-orange.png"),
    },
    {
      label: "Space Hog",
      value: "space",
      src: require("@/../assets/images/dynamic-icons/space-icon.png"),
    },
  ];

  return (
    <Layout title="Appearance" hasBackButton>
      <Select
        size="sm"
        label="Theme"
        placeholder="Select theme"
        value={theme}
        options={themeSelectOptions}
        onChange={onThemeChange}
      />

      <FlatList
        data={appIconOptions}
        keyExtractor={(item) => item.value}
        numColumns={4}
        scrollEnabled={false}
        ListHeaderComponent={
          <Text className="text-ink font-medium pb-2">App Icon</Text>
        }
        contentContainerClassName="gap-4"
        columnWrapperClassName="gap-2"
        renderItem={({ item }) => (
          <AppIcon
            src={item.src}
            label={item.label}
            selected={appIcon === item.value}
            onPress={() => onAppIconChange(item.value as TAppIcon)}
          />
        )}
      />
    </Layout>
  );
}
