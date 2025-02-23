import { Alert, AlertButton, AlertOptions } from "react-native";

interface AlertProps {
  title: string;
  message: string;
  buttons?: AlertButton[];
  options?: AlertOptions;
}

const alert = ({ title, message, buttons, options }: AlertProps) => {
  Alert.alert(title, message, buttons, options);
};

export default alert;
