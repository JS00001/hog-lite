import * as SplashScreen from "expo-splash-screen";
import { PropsWithChildren, useEffect } from "react";

// todo: clean
export default function SplashScreenProvider({ children }: PropsWithChildren) {
  useEffect(() => {
    const checkSplashState = async () => {
      await SplashScreen.hideAsync();
    };

    checkSplashState();
  }, []);

  return children;
}
