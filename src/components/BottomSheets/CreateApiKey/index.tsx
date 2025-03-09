import { forwardRef, PropsWithChildren } from 'react';
import { Linking, View } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

import { BottomSheetProps } from '../@types';

import Text from '@/ui/Text';
import Button from '@/ui/Button';
import BottomSheet from '@/ui/BottomSheet';
import useClientStore from '@/store/client';
import usePosthog from '@/hooks/usePosthog';
import TeacherHedgehogRight from '@/components/Hedgehogs/TeacherHedgehogRight';
import BottomSheetScrollView from '@/ui/BottomSheet/Containers/ScrollView';
import classNames from 'classnames';

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
        Create an account API Key
      </Text>

      <View className="w-full gap-3 p-4 bg-primary border border-divider rounded-xl">
        <Text className="text-lg  text-ink">
          Start by navigating to your account settings by clicking the button
          below.
        </Text>
        <Button size="sm" color="accent" onPress={onUserSettings}>
          Go to settings
        </Button>
      </View>

      <View className="w-full gap-3 p-4 bg-primary border border-divider rounded-xl">
        <Text className="text-lg text-ink">
          Click "+ Create personal API key
        </Text>
      </View>

      <View className="w-full gap-3 p-4 bg-primary border border-divider rounded-xl">
        <Text className="text-lg text-ink">
          Give your key a label - this is just for you, usually to describe the
          key's purpose.
        </Text>
      </View>

      <View className="w-full gap-3 p-4 bg-primary border border-divider rounded-xl">
        <Text className="text-lg  text-ink">
          Choose the scopes for your key. For this client to work, the API key
          needs to have the following scopes (READONLY):
        </Text>
        <View className="gap-1 flex-wrap flex-row">
          <Permission>User</Permission>
          <Permission>Query</Permission>
          <Permission>Organization</Permission>
          <Permission>Project</Permission>
          <Permission>Dashboard</Permission>
          <Permission>Insight</Permission>
        </View>
      </View>

      <View className="w-full gap-3 p-4 bg-primary border border-divider rounded-xl">
        <Text className="text-lg text-ink">
          At the top of the list, you should see your brand new key. Immediately
          copy its value and paste it here, as you'll never be able to see it
          again.
        </Text>
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
