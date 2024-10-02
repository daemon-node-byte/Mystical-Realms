import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await expect(page.getByRole('heading')).toContainText('Mystical Realms');
  await expect(page.getByText('Under Construction')).toBeVisible();
  const page1Promise = page.waitForEvent('popup');
  await page.getByLabel('Github').click();
  const page1 = await page1Promise;
  await expect(page1.locator('#repository-container-header')).toContainText('Mystical-Realms');
});