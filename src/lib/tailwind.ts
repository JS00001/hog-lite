import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config";

type TailwindConfigReturnType = ReturnType<typeof resolveConfig>;

type ColorScale = {
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
};

type ThemeScale = {
  light: string;
  dark: string;
};

type CustomTailwindConfigReturnType = TailwindConfigReturnType & {
  theme: TailwindConfigReturnType["theme"] & {
    colors: TailwindConfigReturnType["theme"]["colors"] & {
      ink: ThemeScale;
      background: ThemeScale;
      accent: ThemeScale;
      divider: ThemeScale;
      red: ThemeScale;
      yellow: ThemeScale;
      blue: ThemeScale;
      gray: ColorScale;
    };
  };
};

const config = resolveConfig(tailwindConfig) as CustomTailwindConfigReturnType;

export const colors = config.theme.colors;

export default config;
