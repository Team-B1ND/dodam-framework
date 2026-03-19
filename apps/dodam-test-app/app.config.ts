import { ExpoConfig, ConfigContext } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "dodam-test-app",
  slug: "dodam-test-app",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  scheme: "dodamtestapp",
  userInterfaceStyle: "automatic",
  newArchEnabled: true,
  splash: {
    image: "./assets/images/splash-icon.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  ios: {
    ...config.ios,
    supportsTablet: true,
    infoPlist: {
      NSAppTransportSecurity: {
        NSAllowsArbitraryLoads: true,
      },
    },
    bundleIdentifier: "me.cher1shrxd.dodamtestapp",
    appleTeamId: "U4VGJDX962",
  },
  android: {
    ...config.android,
    package: "me.cher1shrxd.dodamtestapp",
    usesCleartextTraffic: true,
    adaptiveIcon: {
      foregroundImage: "./assets/images/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
    edgeToEdgeEnabled: true,
  },
});