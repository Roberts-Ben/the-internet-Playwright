import { test, expect } from '@playwright/test';
import { testA11y } from '../fixtures/a11yFixture.js';
import { DynamicLoadingPage } from '../pages/DynamicLoading.page';

test.describe('Dynamic Loading', () => {
  let dynamicLoadingPage;

  test.beforeEach(async ({ page }) => {
    dynamicLoadingPage = new DynamicLoadingPage(page);
    await dynamicLoadingPage.goto();
  });

  testA11y('accessibility', async ({ accessibilityBuilder }, testInfo) => { 
    const results = await accessibilityBuilder.analyze();
    await testInfo.attach("accessibility-scan-results", {
      body: JSON.stringify(results.violations, null, 2),
      contentType: "application/json"
    });
    
    //expect(results.violations).toEqual([]); 
  });

  test('verifyHiddenElement', async () => {
    await dynamicLoadingPage.gotoTest(1);
    
    await expect(dynamicLoadingPage.hiddenElement).not.toBeVisible();

    await dynamicLoadingPage.clickStartButton();

    await expect(dynamicLoadingPage.hiddenElement).toBeVisible({ timeout: 10000 });;
  });
  
  test('verifyElementExistsAfterLoad', async () => {
    await dynamicLoadingPage.gotoTest(2);

    await expect(dynamicLoadingPage.hiddenElement).toHaveCount(0);

    await dynamicLoadingPage.clickStartButton();

    await expect(dynamicLoadingPage.hiddenElement).toBeVisible({ timeout: 10000 });
  });
});