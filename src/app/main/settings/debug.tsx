import { View } from "react-native";

import Text from "@/ui/Text";
import Switch from "@/ui/Switch";
import Button from "@/ui/Button";
import constants from "@/constants";
import Layout from "@/components/Layout";
import useClientStore from "@/store/client";
import usePosthog from "@/hooks/usePosthog";

export default function Appearance() {
  const posthog = usePosthog();

  const devMode = useClientStore((s) => s.devMode);
  const setClientStore = useClientStore((s) => s.setField);

  const onToggleDeveloperMode = () => {
    setClientStore("devMode", !devMode);
    posthog.capture("toggle_developer_mode", { devMode: !devMode });
  };

  return (
    <Layout title="Debug" scrollable hasBackButton className="!gap-2">
      <View className="p-4 rounded-xl bg-highlight border border-divider gap-4">
        <View className="flex-row items-center justify-between gap-2">
          <View className="shrink">
            <Text className="font-medium text-ink">Developer Mode</Text>
            <Text className="font-medium text-gray text-sm">
              Press three fingers on the screen to view network logs
            </Text>
          </View>
          <Switch value={devMode} onChange={onToggleDeveloperMode} />
        </View>
      </View>

      <View className="p-4 rounded-xl bg-highlight border border-divider gap-4">
        <Text className="font-medium text-ink">Current App Version</Text>
        <Button size="sm" color="accent">
          {constants.version} (Click to copy)
        </Button>
      </View>
    </Layout>
  );
}
