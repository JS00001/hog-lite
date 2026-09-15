import classNames from 'classnames';
import { Linking, View } from 'react-native';
import { forwardRef, PropsWithChildren } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

import { BottomSheetProps } from '../@types';

import Text from '@/ui/Text';
import Button from '@/ui/Button';
import BottomSheet from '@/ui/BottomSheet';
import useClientStore from '@/store/client';
import usePosthog from '@/hooks/usePosthog';
import TeacherHedgehogRight from '@/components/Hedgehogs/TeacherHedgehogRight';
import BottomSheetScrollView from '@/ui/BottomSheet/Containers/ScrollView';
import { t } from '@/i18n';

type Props = BottomSheetProps;

function Content({}: Props) {
  const posthog = usePosthog();
  const posthogEndpoint = useClientStore((store) => store.posthogEndpoint);

  const onUserSettings = () => {
    Linking.openURL(`${posthogEndpoint}/settings/user-api-keys`);
    posthog.capture('onboarding_api_key_tutorial_settings_clicked');
  };

  return (
    <BottomSheetScrollView contentContainerClassName="items-center">
      <TeacherHedgehogRight size={64} />

      <Text className="text-3xl font-medium text-ink ">
        {t('createApiKey')}
      </Text>

      <View className="w-full gap-3 p-4 bg-primary border border-divider rounded-xl">
        <Text className="text-lg  text-ink">{t('createApiKeyStart')}</Text>
        <Button size="sm" color="accent" onPress={onUserSettings}>
          {t('goToSettings')}
        </Button>
      </View>

      <View className="w-full gap-3 p-4 bg-primary border border-divider rounded-xl">
        <Text className="text-lg text-ink">{t('createPersonalApiKey')}</Text>
      </View>

      <View className="w-full gap-3 p-4 bg-primary border border-divider rounded-xl">
        <Text className="text-lg text-ink">{t('apiKeyLabelInstruction')}</Text>
      </View>

      <View className="w-full gap-3 p-4 bg-primary border border-divider rounded-xl">
        <Text className="text-lg  text-ink">
          {t('apiKeyScopesInstruction')}
        </Text>
        <View className="gap-1 flex-wrap flex-row">
          <Permission>User</Permission>
          <Permission>Query</Permission>
          <Permission>Organization</Permission>
          <Permission>Project</Permission>
          <Permission>Dashboard</Permission>
          <Permission>Insight</Permission>
          <Permission>Event Definition</Permission>
        </View>
      </View>

      <View className="w-full gap-3 p-4 bg-primary border border-divider rounded-xl">
        <Text className="text-lg text-ink">{t('apiKeyCopyInstruction')}</Text>
      </View>
    </BottomSheetScrollView>
  );
}

function Permission({ children }: PropsWithChildren) {
  const classes = classNames(
    'py-1 px-2 text-ink font-semibold bg-accent',
    'border border-divider overflow-hidden rounded-md',
  );

  return <Text className={classes}>{children}</Text>;
}

const CreateApiKeySheet = forwardRef<BottomSheetModal, BottomSheetProps>(
  function CreateApiKeySheet(props, ref) {
    return <BottomSheet ref={ref} children={<Content {...props} />} />;
  },
);

export default CreateApiKeySheet;
