import { test, expect } from '@playwright/test';

test.describe('Payment Tabs', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200');
  });

  test.describe("Main Page", async () => {
      test('Has title and warning', async ({ page }) => {
      await expect(page.locator(`.title-container`)).toContainText("Batch #13 - CashCloud ****1123");
      await expect(page.locator(`.warning-text-container`)).toHaveText("One or more workflows are missing. Non-admins need approval, signature, and disbursement workflows to process payments.");

  });

  test('should navigate between tabs correctly', async ({ page }) => {
    const tabLabels = ['approve', 'sign', 'disburse'];
    for (const label of tabLabels) {
      console.log(`Clicking on tab: ${label}`);
    
      await page.getByRole('button', { name: `${label}` }).click();
      await expect(page.locator(`.custom-tab-button:has-text("${label}")`)).toHaveClass(/active-tab/);
    }
  });

  test('should handle the "More" dropdown tab', async ({ page }) => {
    const dropdownMenu = page.locator('.dropdown-container');
   await page.getByRole('button', { name: 'More actions' }).click();
     await expect(dropdownMenu).toBeVisible();
     await page.getByRole('button', { name: 'rejected' }).click();
    
      await expect(page.locator(`.custom-tab-button:has-text("Rejected")`)).toHaveClass(/active-tab/);
  });
   });
});