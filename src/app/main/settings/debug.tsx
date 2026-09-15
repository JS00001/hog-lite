import { View } from 'react-native';

import Text from '@/ui/Text';
import Switch from '@/ui/Switch';
import constants from '@/constants';
import Layout from '@/components/Layout';
import useClientStore from '@/store/client';
import usePosthog from '@/hooks/usePosthog';
import { t } from '@/i18n';

export default function Appearance() {
  const posthog = usePosthog();

  const devMode = useClientStore((s) => s.devMode);
  const disableUpdateAlerts = useClientStore((s) => s.disableUpdateAlerts);
  const setClientStore = useClientStore((s) => s.setField);

  const onToggleDeveloperMode = () => {
    setClientStore('devMode', !devMode);
    posthog.capture('toggle_developer_mode', { devMode: !devMode });
  };

  const onToggleUpdateAlerts = () => {
    setClientStore('disableUpdateAlerts', !disableUpdateAlerts);
    posthog.capture('toggle_update_alerts', {
      disableUpdateAlerts: !disableUpdateAlerts,
    });
  };

  return (
    <Layout title={t('debug')} scrollable hasBackButton className="!gap-2">
      <View className="p-4 rounded-xl bg-highlight border border-divider gap-2">
        <View>
          <Text className="font-medium text-ink">{t('currentAppVersion')}</Text>
          <Text className="font-medium text-gray text-sm">
            {t('currentAppVersionDescription')}
          </Text>
        </View>
        <Text className="text-ink text-3xl font-semibold">
          {constants.version}
        </Text>
      </View>

      <View className="p-4 rounded-xl bg-highlight border border-divider gap-4">
        <View className="flex-row items-center justify-between gap-2">
          <View className="shrink">
            <Text className="font-medium text-ink">{t('developerMode')}</Text>
            <Text className="font-medium text-gray text-sm">
              {t('developerModeDescription')}
            </Text>
          </View>
          <Switch value={devMode} onChange={onToggleDeveloperMode} />
        </View>
      </View>

      <View className="p-4 rounded-xl bg-highlight border border-divider gap-4">
        <View className="flex-row items-center justify-between gap-2">
          <View className="shrink">
            <Text className="font-medium text-ink">
              {t('updateAlertsEnabled')}
            </Text>
            <Text className="font-medium text-gray text-sm">
              {t('updateAlertsDescription')}
            </Text>
          </View>
          <Switch
            value={!disableUpdateAlerts}
            onChange={onToggleUpdateAlerts}
          />
        </View>
      </View>
    </Layout>
  );
}
