import { Tabs } from 'expo-router';
import Feather from '@expo/vector-icons/Feather';

import useColors from '@/lib/theme';
import Redirect from '@/ui/Redirect';
import useAuthStore from '@/store/auth';
import { t } from '@/i18n';

export default function Layout() {
  const colors = useColors();
  const loggedIn = useAuthStore((state) => state.apiKey || state.demoing);

  if (!loggedIn) {
    return <Redirect href="/onboarding/landing" />;
  }

  return (
    <Tabs
      initialRouteName="insights"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.blue,
        tabBarItemStyle: {
          marginTop: 12,
        },
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: colors.highlight,
          borderTopColor: colors.divider,
          height: 92,
        },
        sceneStyle: {
          backgroundColor: colors.primary,
        },
      }}
    >
      <Tabs.Screen
        name="insights"
        options={{
          title: t('navInsights'),
          tabBarIcon: ({ color }) => (
            <Feather
              name="bar-chart"
              size={24}
              color={color}
              className="pb-4"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="activity"
        options={{
          title: t('navActivity'),
          tabBarIcon: ({ color }) => (
            <Feather name="radio" size={24} color={color} className="pb-4" />
          ),
        }}
      />
      <Tabs.Screen
        name="exceptions"
        options={{
          title: t('navExceptions'),
          tabBarIcon: ({ color }) => (
            <Feather
              name="alert-triangle"
              size={24}
              color={color}
              className="pb-4"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: t('navSettings'),
          tabBarIcon: ({ color }) => (
            <Feather name="settings" size={24} color={color} className="pb-4" />
          ),
        }}
      />
    </Tabs>
  );
}
