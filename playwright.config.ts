import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: 1,
  workers: 1,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:5000',
    trace: 'off',
    headless: true,
    screenshot: 'off',
    video: 'off',
    viewport: { width: 1280, height: 720 }
  },
  projects: [
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] }
    }
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5000',
    reuseExistingServer: true,
    timeout: 120000,
    env: {
      CI: '1',
      HEADLESS: 'true'
    }
  }
})
