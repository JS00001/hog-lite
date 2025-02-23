import {
  SafeAreaProvider,
  SafeAreaViewProps,
  SafeAreaView as RNSafeAreaView,
} from "react-native-safe-area-context";

/**
 * On new expo architecture (>v52.0.0), react native safe area context
 * will not render the safe area insets properly on first load. We need
 * to wrap each view with the provider, rather than wrapping it
 * globally.
 */
export default function SafeAreaView(props: SafeAreaViewProps) {
  return (
    <SafeAreaProvider>
      <RNSafeAreaView {...props} />
    </SafeAreaProvider>
  );
}
