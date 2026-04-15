
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.clusterturismo.3183fa27e4d240b4a2cbe36d7ff54e55',
  appName: 'Villavicencio Turismo',
  webDir: 'dist',
  server: {
    url: 'https://3183fa27-e4d2-40b4-a2cb-e36d7ff54e55.clusterturismo.sactel.cloud?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
      launchAutoHide: true,
      backgroundColor: "#16a34a",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
      showSpinner: false,
      androidSpinnerStyle: "large",
      iosSpinnerStyle: "small",
      spinnerColor: "#999999",
      splashFullScreen: true,
      splashImmersive: true,
    },
  },
};

export default config;
