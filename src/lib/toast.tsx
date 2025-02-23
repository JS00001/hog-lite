import { BaseToast, type BaseToastProps } from "react-native-toast-message";
import { colors } from "./tailwind";

const toastConfig = {
  /**
   * The successs modal, shows a green checkmark with the content
   */
  success: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      style={{
        backgroundColor: colors.white,
        boxShadow: "none",
        shadowOpacity: 0,
        borderWidth: 1,
        borderColor: colors.divider.light,
        borderLeftColor: colors.green[800],
        height: 72,
        paddingVertical: 24,
      }}
      text1Style={{ color: colors.ink.light, fontSize: 16, fontWeight: "600" }}
      text2Style={{ color: colors.gray[500], fontSize: 12, fontWeight: "500" }}
    />
  ),
  /**
   * The error modal, shows a red warning icon with the content
   */
  error: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      style={{
        backgroundColor: colors.white,
        boxShadow: "none",
        shadowOpacity: 0,
        borderWidth: 1,
        borderColor: colors.divider.light,
        borderLeftColor: colors.red[800],
        height: 72,
        paddingVertical: 24,
      }}
      text1Style={{ color: colors.ink.light, fontSize: 16, fontWeight: "600" }}
      text2Style={{ color: colors.gray[500], fontSize: 12, fontWeight: "500" }}
    />
  ),
  /**
   * The warning modal, shows a yellow-500 warning icon with the content
   */
  warning: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      style={{
        backgroundColor: colors.white,
        boxShadow: "none",
        shadowOpacity: 0,
        borderWidth: 1,
        borderColor: colors.divider.light,
        borderLeftColor: colors.yellow[800],
        height: 72,
        paddingVertical: 24,
      }}
      text1Style={{ color: colors.ink.light, fontSize: 16, fontWeight: "600" }}
      text2Style={{ color: colors.gray[500], fontSize: 12, fontWeight: "500" }}
    />
  ),
  /**
   * The info modal, shows a blue info icon with the content
   */
  info: (props: BaseToastProps) => {
    return (
      <BaseToast
        {...props}
        style={{
          backgroundColor: colors.white,
          boxShadow: "none",
          shadowOpacity: 0,
          borderWidth: 1,
          borderColor: colors.divider.light,
          borderLeftColor: colors.blue[800],
          height: 72,
          paddingVertical: 24,
        }}
        text1Style={{
          color: colors.ink.light,
          fontSize: 16,
          fontWeight: "600",
        }}
        text2Style={{
          color: colors.gray[500],
          fontSize: 12,
          fontWeight: "500",
        }}
      />
    );
  },
};

export default toastConfig;
