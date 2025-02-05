import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  timeout: 30 * 1000,
  retries: 1,
  use: {
    baseURL: 'https://trapezoid-api-934897179230.us-central1.run.app',
    extraHTTPHeaders: {
      'Content-Type': 'application/json'
    }
  },
  testDir: './tests',
  reporter: [['html', { outputFolder: 'playwright-report' }]],
  //reporter: [['json', { outputFile: 'playwright-report/report.json' }]],
};

export default config;
