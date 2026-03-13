import { test, expect } from '@playwright/test';
import candidateData from '../test-data/candidate.json';

const RECRUITMENT_URL = 'https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewCandidates';

test.use({ storageState: 'auth/auth.json' });

// Test cases for VALID candidates - should add successfully
for (const candidate of candidateData.validCandidates) {
  test(`Thêm ứng viên thành công - ${candidate.description}`, async ({ page }) => {
    await page.goto(RECRUITMENT_URL);
    
    // Click "Add" button
    await page.getByRole('button', { name: 'Add' }).click();
    
    // Wait for form to load
    await page.waitForLoadState('networkidle');
    
    // Fill First Name
    await page.locator('input[placeholder="First Name"]').fill(candidate.firstName);
    
    // Fill Last Name
    await page.locator('input[placeholder="Last Name"]').fill(candidate.lastName);
    
    // Fill Email
    await page.locator('input[placeholder="Type here"]').first().fill(candidate.email);
    
    // Fill Contact Number
    const contactInputs = await page.locator('input[placeholder="Type here"]').all();
    if (contactInputs.length > 1) {
      await contactInputs[1].fill(candidate.phone);
    }
    
    // Click Save button
    await page.getByRole('button', { name: 'Save' }).click();
    
    // Wait for save and verify
    await page.waitForTimeout(3000);
    
    // Verify success message appears
    const successMessage = await page.getByText('Successfully Saved').isVisible().catch(() => false);
    expect(successMessage).toBe(true);
  });
}

// Test cases for INVALID candidates - should show error
for (const candidate of candidateData.invalidCandidates) {
  test(`Thêm ứng viên thất bại - ${candidate.description}`, async ({ page }) => {
    await page.goto(RECRUITMENT_URL);
    
    // Click "Add" button
    await page.getByRole('button', { name: 'Add' }).click();
    
    // Wait for form to load
    await page.waitForLoadState('networkidle');
    
    // Fill First Name (leave empty for invalid test if needed)
    if (candidate.firstName) {
      await page.locator('input[placeholder="First Name"]').fill(candidate.firstName);
    }
    
    // Fill Last Name
    await page.locator('input[placeholder="Last Name"]').fill(candidate.lastName);
    
    // Fill Email (invalid format)
    await page.locator('input[placeholder="Type here"]').first().fill(candidate.email);
    
    // Fill Contact Number
    const contactInputs = await page.locator('input[placeholder="Type here"]').all();
    if (contactInputs.length > 1) {
      await contactInputs[1].fill(candidate.phone);
    }
    
    // Click Save button
    await page.getByRole('button', { name: 'Save' }).click();
    
    // Wait for error message
    await page.waitForTimeout(3000);
    
    // Verify error appears (validation fails) or still on form
    const errorText = await page.getByText(/Required|Invalid/i).isVisible().catch(() => false);
    const stillOnForm = await page.locator('input[placeholder="First Name"]').isVisible().catch(() => false);
    
    // Should have error OR still be on form (not saved)
    expect(errorText || stillOnForm).toBe(true);
  });
}
