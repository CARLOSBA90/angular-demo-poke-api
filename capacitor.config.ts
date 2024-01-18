import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'Poke-app',
  webDir: 'dist/app',
  server: {
    androidScheme: 'https'
  }
};

export default config;
