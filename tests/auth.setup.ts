import { test, expect } from '@playwright/test';

/**
 * B5. Lưu session auth.json
 * npx playwright codegen --save-storage=auth/auth.json https://opensource-demo.orangehrmlive.com/web/index.php/auth/login
 */
test('Authenticate and save storage', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  await page.getByPlaceholder('Username').fill('Admin');
  await page.getByPlaceholder('Password').fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();
  
  // Wait for dashboard
  await page.waitForURL('**/dashboard/index');
  
  // Save session
  await page.context().storageState({ path: 'auth/auth.json' });
});
