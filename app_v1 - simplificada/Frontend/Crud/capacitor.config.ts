import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.help.app',
  appName: 'help',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  }
};

export default config;
