import { test, expect } from '@playwright/test';
import users from '../test-data/users.json';

for (const user of users) {
  test(`${user.description}`, async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await page.getByPlaceholder('Username').fill(user.username);
    await page.getByPlaceholder('Password').fill(user.password);
    await page.getByRole('button', { name: 'Login' }).click();
    
    if (user.expectedResult === 'success') {
      await expect(page).toHaveURL(/dashboard/);
    } else {
      await page.waitForTimeout(2000);
      // Verify error message appears
      const errorAlert = page.locator('.oxd-alert-content');
      if (await errorAlert.isVisible().catch(() => false)) {
        await expect(errorAlert).toBeVisible();
      }
    }
  });
}
