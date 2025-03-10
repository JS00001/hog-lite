import { useMemo } from 'react';
import { router } from 'expo-router';
import { Linking, View } from 'react-native';

import Text from '@/ui/Text';
import alert from '@/lib/alert';
import Button from '@/ui/Button';
import Select from '@/ui/Select';
import useAuthStore from '@/store/auth';
import Layout from '@/components/Layout';
import useClientStore from '@/store/client';
import usePosthog from '@/hooks/usePosthog';
import { ISelectOption } from '@/ui/Select/@types';
import { useGetOrganization } from '@/hooks/api/organization';

import Card from '@/ui/Card';
import constants from '@/constants';
import useBottomSheetStore from '@/store/bottom-sheets';

export default function Settings() {
  const posthog = usePosthog();
  const organizationQuery = useGetOrganization();

  const openBottomSheet = useBottomSheetStore((store) => store.open);

  const user = useAuthStore((store) => store.user)!;
  const demoing = useAuthStore((store) => store.demoing);
  const logout = useAuthStore((store) => store.logout);

  const setClientStore = useClientStore((s) => s.setField);
  const project = useClientStore((store) => store.project);
  const organization = useClientStore((store) => store.organization);

  const organizations = user.organizations;
  const projects = organizationQuery.data?.projects || [];

  /**
   * All of the projects that the user can switch to, within
   * the currently selected organization.
   */
  const projectSelectOptions: ISelectOption[] = useMemo(() => {
    return projects.map((project) => ({
      label: project.name,
      value: `${project.id}`,
    }));
  }, [user, projects]);

  /**
   * All of the organizations that the user can switch to.
   */
  const organizationSelectOptions: ISelectOption[] = useMemo(() => {
    return organizations.map((organization) => ({
      label: organization.name,
      value: `${organization.id}`,
    }));
  }, [user]);

  const onProjectChange = (value: string) => {
    setClientStore('project', value);
    posthog.capture('project_changed');
  };

  const onOrganizationChange = (value: string) => {
    setClientStore('organization', value);
    posthog.capture('organization_changed');
  };

  /**
   * Log the user out after prompting them with a confirmation dialog.
   */
  const onLogout = () => {
    alert({
      title: 'Are you sure?',
      message:
        'Are you sure you want to logout? You will need to re-enter your API key to login again.',
      buttons: [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: logout,
        },
      ],
    });

    const eventName = demoing ? 'demo_logout' : 'logout';
    posthog.capture(eventName);
  };

  return (
    <Layout title="Settings" className="pb-32" scrollable>
      {/* Selections */}
      <Select
        size="sm"
        label="Project"
        placeholder="Select project"
        value={project}
        options={projectSelectOptions}
        disabled={organizationQuery.isLoading}
        onChange={onProjectChange}
      />
      <Select
        size="sm"
        label="Organization"
        placeholder="Select organization"
        value={organization}
        options={organizationSelectOptions}
        loading={organizationQuery.isLoading}
        onChange={onOrganizationChange}
      />

      <View className="gap-2">
        <Text className="text-ink font-medium">Other Settings</Text>

        <View className="gap-2 flex-row">
          <Card
            icon="user"
            title="Account"
            description="View your current PostHog account"
            onPress={() => {
              router.push('/main/settings/account');
              posthog.capture('account_settings_clicked');
            }}
          />
          <Card
            icon="sun"
            title="Appearance"
            description="Change the appearance of the app"
            onPress={() => {
              router.push('/main/settings/appearance');
              posthog.capture('appearance_settings_clicked');
            }}
          />
        </View>
        <View className="gap-2 flex-row">
          <Card
            icon="git-branch"
            title="Contribute"
            description="We're open source! Contribute to our project"
            onPress={() => {
              Linking.openURL(`${constants.githubUrl}`);
              posthog.capture('contribute_clicked');
            }}
          />
          <Card
            icon="frown"
            title="Report Bug"
            description="Found a bug? Want a feature? Let us know!"
            onPress={() => {
              Linking.openURL(`${constants.githubUrl}/issues/new`);
              posthog.capture('bug_report_clicked');
            }}
          />
        </View>
        <View className="gap-2 flex-row">
          <Card
            icon="share"
            title="Share with Friends"
            description="Love HogLite? Share it with your friends!"
            onPress={() => {
              openBottomSheet('SHARE_WITH_FRIENDS');
              posthog.capture('share_with_friends_clicked');
            }}
          />
          <Card
            icon="code"
            title="Debug"
            description="View and enable debugging features"
            onPress={() => {
              router.push('/main/settings/debug');
              posthog.capture('debug_settings_clicked');
            }}
          />
        </View>
      </View>

      <Button color="danger" onPress={onLogout}>
        Logout
      </Button>
    </Layout>
  );
}
