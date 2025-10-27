import { test, expect } from '@playwright/test';
import { testA11y } from '../fixtures/a11yFixture.js';
import { MultipleWindowsPage } from '../pages/MultipleWindows.page';

test.describe('Multiple Windows', () => {
  let multipleWindowsPage;

  test.beforeEach(async ({ page }) => {
    multipleWindowsPage = new MultipleWindowsPage(page);
    await multipleWindowsPage.goto();
  });

  testA11y('accessibility', async ({ accessibilityBuilder }, testInfo) => { 
    const results = await accessibilityBuilder.analyze();
    await testInfo.attach("accessibility-scan-results", {
      body: JSON.stringify(results.violations, null, 2),
      contentType: "application/json"
    });
    
    //expect(results.violations).toEqual([]); 
  });

  test('verifyNewWindow', async ( { context }) => {
    const pagePromise = context.waitForEvent('page');

    await multipleWindowsPage.clickNewTabButton();

    const newPage = await pagePromise;
    await newPage.waitForLoadState();
    await newPage.bringToFront();

    await expect(newPage.locator(multipleWindowsPage.headerLocator)).toHaveText('New Window');

    await newPage.close();
    await expect(multipleWindowsPage.page).toHaveURL(multipleWindowsPage.url);
  });
});