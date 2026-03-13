import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 120000,
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'always' }],
    ['list']
  ],
  use: {
    navigationTimeout: 120000,
    actionTimeout: 30000,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
  },
  projects: [
    // Project 1: Setup (Chromium only)
    {
      name: 'setup',
      testMatch: /auth\.setup\.ts/,
      use: { ...devices['Desktop Chrome'], headless: true },
    },
    // Project 2: Login tests on Chromium
    {
      name: 'login-chromium',
      testMatch: /login\.spec\.ts/,
      dependencies: ['setup'],
      use: { ...devices['Desktop Chrome'], headless: true },
    },
    // Project 3: Login tests on Firefox
    {
      name: 'login-firefox',
      testMatch: /login\.spec\.ts/,
      dependencies: ['setup'],
      use: { ...devices['Desktop Firefox'], headless: true },
    },
    // Project 4: Search tests on Chromium
    {
      name: 'search-chromium',
      testMatch: /search\.spec\.ts/,
      dependencies: ['setup'],
      use: { ...devices['Desktop Chrome'], headless: true },
    },
    // Project 5: Search tests on Firefox
    {
      name: 'search-firefox',
      testMatch: /search\.spec\.ts/,
      dependencies: ['setup'],
      use: { ...devices['Desktop Firefox'], headless: true },
    },
    // Project 6: Add Candidate tests on Chromium
    {
      name: 'addcandidate-chromium',
      testMatch: /addCandidate\.spec\.ts/,
      dependencies: ['setup'],
      use: { ...devices['Desktop Chrome'], headless: true },
    },
    // Project 7: Add Candidate tests on Firefox
    {
      name: 'addcandidate-firefox',
      testMatch: /addCandidate\.spec\.ts/,
      dependencies: ['setup'],
      use: { ...devices['Desktop Firefox'], headless: true },
    },
  ],
});
