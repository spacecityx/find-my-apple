import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.spacecityx.findmyapple',
  appName: 'Find My Apple',
  webDir: 'dist',
  server: { androidScheme: 'https' },
  android: {
    allowMixedContent: true,
    backgroundColor: '#0a0c12',
    webContentsDebuggingEnabled: true
  }
};

export default config;