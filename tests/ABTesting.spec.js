// @ts-check
import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => 
{
  await page.goto('https://the-internet.herokuapp.com/abtest');
  await expect(page).toHaveURL('https://the-internet.herokuapp.com/abtest')
});

test('verifyAPage', async ({ page }) => {
  const AHeader = "A/B Test Variation 1";
  const BHeader = "A/B Test Control";

  const header = page.locator('h3');
  const headerText = await header.textContent();

  // Assert headerText is either AHeader or BHeader
  expect([AHeader, BHeader]).toContain(headerText);
});