import { Linking, View } from 'react-native';

import Text from '@/ui/Text';
import Switch from '@/ui/Switch';
import Button from '@/ui/Button';
import constants from '@/constants';
import { createUUID } from '@/lib/utils';
import Layout from '@/components/Layout';
import useClientStore from '@/store/client';
import usePosthog from '@/hooks/usePosthog';
import useBottomSheetStore from '@/store/bottom-sheets';

export default function Appearance() {
  const posthog = usePosthog();

  const devMode = useClientStore((s) => s.devMode);
  const openBottomSheet = useBottomSheetStore((s) => s.open);
  const setClientStore = useClientStore((s) => s.setField);

  const onToggleDeveloperMode = () => {
    setClientStore('devMode', !devMode);
    posthog.capture('toggle_developer_mode', { devMode: !devMode });
  };

  const onGoToGitHub = () => {
    Linking.openURL(constants.githubUrl);
    posthog.capture('go_to_github');
  };

  const onSetUniqueId = () => {
    const uuid = createUUID();

    posthog.capture('set_unique_id', { uuid });
    posthog.identify(uuid, {
      uuid,
      user_source: 'debug',
    });
  };

  const onNetworkPress = () => {
    posthog.capture('open_network');
    openBottomSheet('NETWORK_LOGGER');
  };

  return (
    <Layout title="Debug" scrollable hasBackButton className="!gap-2">
      <View className="p-4 rounded-xl bg-highlight border border-divider gap-2">
        <View>
          <Text className="font-medium text-ink">Current App Version</Text>
          <Text className="font-medium text-gray text-sm">
            The version of the app you are currently using. Formatted as "binary
            version - update version"
          </Text>
        </View>
        <Text className="text-ink text-3xl font-semibold">
          {constants.version}
        </Text>
      </View>

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
        <View>
          <Text className="font-medium text-ink">Generate Unique ID</Text>
          <Text className="font-medium text-gray text-sm">
            Only use this if you know what you are doing. This won't change
            anything in the app.
          </Text>
        </View>
        <Button size="sm" color="accent" onPress={onSetUniqueId}>
          Set New Unique ID
        </Button>
      </View>

      <View className="p-4 rounded-xl bg-highlight border border-divider gap-4">
        <View>
          <Text className="font-medium text-ink">Open Network</Text>
          <Text className="font-medium text-gray text-sm">
            On simulators where you cannot press the screen with three fingers,
            press below to open the network logs
          </Text>
        </View>
        <Button size="sm" color="accent" onPress={onNetworkPress}>
          Open Network
        </Button>
      </View>
    </Layout>
  );
}
