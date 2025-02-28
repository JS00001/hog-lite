import * as Updates from "expo-updates";
import { PropsWithChildren, useEffect, useRef } from "react";
import { AppState, AppStateStatus } from "react-native";

import alert from "@/lib/alert";
import constants from "@/constants";

export default function EasUpdateProvider({ children }: PropsWithChildren) {
  const appState = useRef(AppState.currentState);

  /**
   * When the app moves from background to foreground,
   * we want to check if there is an update pending.
   */
  useEffect(() => {
    if (constants.environment !== "production") return;

    const checkForUpdates = async (nextAppState: AppStateStatus) => {
      const regex = /inactive|background/;

      if (appState.current.match(regex) && nextAppState === "active") {
        await fetchUpdateAsync();
      }

      appState.current = nextAppState;
    };

    // When app first loads, check for updates
    fetchUpdateAsync();

    // Subscribe to app state changes
    const subscription = AppState.addEventListener("change", checkForUpdates);

    return () => subscription.remove();
  }, []);

  /**
   * Check for OTA updates and prompt the user to update if a new version is available.
   */
  const fetchUpdateAsync = async () => {
    const res = await Updates.fetchUpdateAsync();

    if (res.isNew) {
      alert({
        title: "Update Available",
        message:
          "A new update is available. Reload the app now to get the latest features.",
        buttons: [
          {
            text: "Reload",
            onPress: () => Updates.reloadAsync(),
          },
          {
            text: "Later",
            onPress: () => {},
          },
        ],
      });
    }
  };

  return children;
}
