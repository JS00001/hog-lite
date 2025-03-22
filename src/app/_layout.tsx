import { Slot } from 'expo-router';
import Toast from 'react-native-toast-message';
import * as SplashScreen from 'expo-splash-screen';
import { QueryClientProvider } from '@tanstack/react-query';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { startNetworkLogging } from 'react-native-network-logger';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import AuthProvider from '@/providers/Auth';
import ThemeProvider from '@/providers/Theme';
import PromptProvider from '@/providers/Prompt';
import SentryProvider from '@/providers/external/Sentry';
import PosthogProvider from '@/providers/external/Posthog';
import SplashScreenProvider from '@/providers/SplashScreen';
import EasUpdateProvider from '@/providers/external/EasUpdate';
import GestureDetectorProvider from '@/providers/GestureDetector';

import '@/app/globals.css';
import toastConfig from '@/lib/toast';
import queryClient from '@/lib/query-client';
import BottomSheetComponent from '@/components/BottomSheets';
import setupRequestInterceptors from '@/lib/axios/interceptors';

// Prevent the native splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

// Setup interceptors to handle common errors and refresh tokens
setupRequestInterceptors();

// Start network logging no matter what
// Visible by shaking the screen in dev mode, or the admin panel
// in production
startNetworkLogging();

export default function RootLayout() {
  return (
    <SentryProvider>
      <EasUpdateProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <PosthogProvider>
              <SplashScreenProvider>
                <SafeAreaProvider>
                  <GestureHandlerRootView style={[{ flex: 1 }]}>
                    <ThemeProvider>
                      <BottomSheetModalProvider>
                        <GestureDetectorProvider>
                          <PromptProvider>
                            <Slot />
                            <BottomSheetComponent />
                          </PromptProvider>
                        </GestureDetectorProvider>
                      </BottomSheetModalProvider>
                      <Toast config={toastConfig} />
                    </ThemeProvider>
                  </GestureHandlerRootView>
                </SafeAreaProvider>
              </SplashScreenProvider>
            </PosthogProvider>
          </AuthProvider>
        </QueryClientProvider>
      </EasUpdateProvider>
    </SentryProvider>
  );
}
