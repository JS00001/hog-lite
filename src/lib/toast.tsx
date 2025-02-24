import { BaseToast, type BaseToastProps } from "react-native-toast-message";

import useColors from "@/lib/theme";

const toastConfig = {
  /**
   * The successs modal, shows a green checkmark with the content
   */
  success: (props: BaseToastProps) => {
    const colors = useColors();
    return (
      <BaseToast
        {...props}
        style={{
          boxShadow: "none",
          shadowOpacity: 0,
          borderWidth: 1,
          borderColor: colors.divider,
          borderLeftColor: colors.green,
          backgroundColor: colors.highlight,
          height: 72,
          paddingVertical: 24,
        }}
        text1Style={{ color: colors.ink, fontSize: 16, fontWeight: "600" }}
        text2Style={{ color: colors.gray, fontSize: 12, fontWeight: "500" }}
      />
    );
  },
  /**
   * The error modal, shows a red warning icon with the content
   */
  error: (props: BaseToastProps) => {
    const colors = useColors();
    return (
      <BaseToast
        {...props}
        style={{
          boxShadow: "none",
          shadowOpacity: 0,
          borderWidth: 1,
          borderColor: colors.divider,
          borderLeftColor: colors.red,
          backgroundColor: colors.highlight,
          height: 72,
          paddingVertical: 24,
        }}
        text1Style={{ color: colors.ink, fontSize: 16, fontWeight: "600" }}
        text2Style={{ color: colors.gray, fontSize: 12, fontWeight: "500" }}
      />
    );
  },
  /**
   * The warning modal, shows a yellow-500 warning icon with the content
   */
  warning: (props: BaseToastProps) => {
    const colors = useColors();
    return (
      <BaseToast
        {...props}
        style={{
          boxShadow: "none",
          shadowOpacity: 0,
          borderWidth: 1,
          borderColor: colors.divider,
          borderLeftColor: colors.yellow,
          backgroundColor: colors.highlight,
          height: 72,
          paddingVertical: 24,
        }}
        text1Style={{ color: colors.ink, fontSize: 16, fontWeight: "600" }}
        text2Style={{ color: colors.gray, fontSize: 12, fontWeight: "500" }}
      />
    );
  },
  /**
   * The info modal, shows a blue info icon with the content
   */
  info: (props: BaseToastProps) => {
    const colors = useColors();

    return (
      <BaseToast
        {...props}
        style={{
          boxShadow: "none",
          shadowOpacity: 0,
          borderWidth: 1,
          borderColor: colors.divider,
          borderLeftColor: colors.blue,
          backgroundColor: colors.highlight,
          height: 72,
          paddingVertical: 24,
        }}
        text1Style={{
          color: colors.ink,
          fontSize: 16,
          fontWeight: "600",
        }}
        text2Style={{
          color: colors.gray,
          fontSize: 12,
          fontWeight: "500",
        }}
      />
    );
  },
};

export default toastConfig;
