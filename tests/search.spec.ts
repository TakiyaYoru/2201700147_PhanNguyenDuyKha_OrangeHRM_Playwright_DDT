import { test, expect } from '@playwright/test';
import searchData from '../test-data/search.json';

const SEARCH_URL = 'https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewEmployeeList';

test.use({ storageState: 'auth/auth.json' });

// Search có kết quả
for (const item of searchData.validSearch) {
  test(`Search thành công - ${item.description}: "${item.employeeName}"`, async ({ page }) => {
    await page.goto(SEARCH_URL);

    // Fill search field (use .first() because there are 2 elements with same placeholder)
    await page.getByPlaceholder('Type for hints...').first().fill(item.employeeName);
    await page.getByRole('button', { name: 'Search' }).click();

    // Verify có kết quả
    await expect(page.getByRole('row').nth(1)).toBeVisible();
  });
}

// Search không có kết quả
for (const item of searchData.invalidSearch) {
  test(`Search không có kết quả - ${item.description}: "${item.employeeName}"`, async ({ page }) => {
    await page.goto(SEARCH_URL);

    await page.getByPlaceholder('Type for hints...').first().fill(item.employeeName);
    await page.getByRole('button', { name: 'Search' }).click();

    // Wait for page to load
    await page.waitForTimeout(2000);
    
    // Verify "No Records Found" message appears (check both in table and notification)
    const noRecordsInTable = page.locator('tbody').locator('text=No Records Found');
    const noRecordsNotification = page.locator('[class*="info"]').locator('text=No Records Found');
    
    const isNoRecordsFound = await noRecordsInTable.isVisible().catch(() => false) 
                             || await noRecordsNotification.isVisible().catch(() => false);
    
    expect(isNoRecordsFound).toBe(true);
  });
}
