/**
 * Helper functions for Playwright tests
 */

/**
 * Generate unique email for candidate testing
 */
export function generateUniqueEmail(baseEmail: string): string {
  const timestamp = Date.now();
  const [localPart, domain] = baseEmail.split('@');
  return `${localPart}+${timestamp}@${domain}`;
}

/**
 * Format phone number
 */
export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.substring(0, 10);
}

/**
 * Wait for element with timeout
 */
export async function waitForElement(page: any, selector: string, timeout: number = 5000): Promise<boolean> {
  try {
    await page.waitForSelector(selector, { timeout });
    return true;
  } catch {
    return false;
  }
}

/**
 * Extract error message from error field
 */
export async function getErrorMessage(page: any, fieldSelector: string): Promise<string> {
  const errorElement = page.locator(`${fieldSelector} + .oxd-input-field-error`);
  return await errorElement.textContent();
}

/**
 * Retry action with timeout
 */
export async function retryAction(
  action: () => Promise<any>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<any> {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await action();
    } catch (error) {
      if (i === maxRetries - 1) {
        throw error;
      }
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}
