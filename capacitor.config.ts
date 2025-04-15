
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.513fb20e2f2e43fa857efdb1ceb0bda6',
  appName: 'link-to-life-qr',
  webDir: 'dist',
  server: {
    url: 'https://513fb20e-2f2e-43fa-857e-fdb1ceb0bda6.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  ios: {
    contentInset: 'always',
  },
  android: {
    backgroundColor: "#FFFFFF"
  }
};

export default config;
