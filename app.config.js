const packageJson = require("./package.json");

const IS_DEV = process.env.APP_VARIANT === "development";

export default {
  expo: {
    name: "HogLite PostHog Client",
    slug: "hoglite-posthog-client",
    version: packageJson.version,
    orientation: "portrait",
    icon: IS_DEV ? "./assets/images/dev-icon.png" : "./assets/images/icon.png",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    newArchEnabled: false,
    ios: {
      supportsTablet: false,
      bundleIdentifier: IS_DEV
        ? "dev.js00001.hogliteposthogclient"
        : "com.js00001.hogliteposthogclient",
      infoPlist: {
        CFBundleDisplayName: IS_DEV ? "HogLite (Dev)" : "HogLite",
      },
      config: {
        usesNonExemptEncryption: false,
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      package: "com.js00001.hogliteposthogclient",
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/icon.png",
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#EEEFE9",
        },
      ],
      [
        "expo-dynamic-app-icon",
        {
          default: {
            image: "./assets/images/icon.png",
            prerendered: true,
          },
          angry: {
            image: "./assets/images/dynamic-icons/angry-icon.png",
            prerendered: true,
          },
          "happy-blue": {
            image: "./assets/images/dynamic-icons/happy-icon-blue.png",
            prerendered: true,
          },
          "happy-orange": {
            image: "./assets/images/dynamic-icons/happy-icon-orange.png",
            prerendered: true,
          },
          nerd: {
            image: "./assets/images/dynamic-icons/nerd-icon.png",
            prerendered: true,
          },
          space: {
            image: "./assets/images/dynamic-icons/space-icon.png",
            prerendered: true,
          },
        },
      ],
      "expo-localization",
      [
        "@sentry/react-native/expo",
        {
          url: "https://sentry.io/",
          project: "react-native",
          organization: "mobile-hog",
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      router: {
        origin: false,
      },
      sentry: {
        dsn: "https://9160938ae3b27ed96491fe7a8c66d52b@o4508886620307456.ingest.us.sentry.io/4508886621356032",
      },
      posthog: {
        apiKey: "phc_iTaZ24s0csbANginlIguMpeD9B3njznZFQtSVi98trh",
        url: "https://us.posthog.com",
      },
      eas: {
        projectId: "5aa36c6c-94e2-4275-8492-716de199920f",
      },
    },
    runtimeVersion: "1.0.0",
    updates: {
      url: "https://u.expo.dev/5aa36c6c-94e2-4275-8492-716de199920f",
    },
  },
};
