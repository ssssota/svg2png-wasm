import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  use: {
    headless: true,
    ignoreHTTPSErrors: true,
  },
  webServer: {
    command: 'npm exec serve',
    port: 5000,
  },
};
export default config;
