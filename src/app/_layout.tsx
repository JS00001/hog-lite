import { Slot } from "expo-router";

import Toast from "react-native-toast-message";
import * as SplashScreen from "expo-splash-screen";
import { QueryClientProvider } from "@tanstack/react-query";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { startNetworkLogging } from "react-native-network-logger";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import "@/app/globals.css";
import toastConfig from "@/lib/toast";
import AuthProvider from "@/providers/Auth";
import queryClient from "@/lib/query-client";
import ThemeProvider from "@/providers/Theme";
import SplashScreenProvider from "@/providers/SplashScreen";
import BottomSheetComponent from "@/components/BottomSheets";
import setupRequestInterceptors from "@/lib/axios/interceptors";
import GestureDetectorProvider from "@/providers/GestureDetector";

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
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SplashScreenProvider>
          <SafeAreaProvider>
            <GestureHandlerRootView style={[{ flex: 1 }]}>
              <ThemeProvider>
                <BottomSheetModalProvider>
                  <GestureDetectorProvider>
                    <BottomSheetComponent />
                    <Slot />
                  </GestureDetectorProvider>
                </BottomSheetModalProvider>
                <Toast config={toastConfig} />
              </ThemeProvider>
            </GestureHandlerRootView>
          </SafeAreaProvider>
        </SplashScreenProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
