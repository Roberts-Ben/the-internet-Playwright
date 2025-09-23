import { test, expect } from '@playwright/test';
import { testA11y } from '../fixtures/a11yFixture.js';
import { DynamicControlsPage } from '../pages/DynamicControls.page';

test.describe('Dynamic Controls', () => {
  let dynamicControlsPage;

  test.beforeEach(async ({ page }) => {
    dynamicControlsPage = new DynamicControlsPage(page);
    await dynamicControlsPage.goto();
  });

  testA11y('accessibility', async ({ accessibilityBuilder }, testInfo) => { 
    const results = await accessibilityBuilder.analyze();
    await testInfo.attach("accessibility-scan-results", {
      body: JSON.stringify(results.violations, null, 2),
      contentType: "application/json"
    });
    
    //expect(results.violations).toEqual([]); 
  });

  test('verifyDynamicCheckbox', async () => {
      await expect(dynamicControlsPage.checkbox).toHaveCount(1);

      await dynamicControlsPage.clickSwapCheckboxButton();

      await expect(dynamicControlsPage.successMessage).toBeVisible();
      await expect(dynamicControlsPage.successMessage).toHaveText("It's gone!");

      await expect(dynamicControlsPage.checkbox).toHaveCount(0);

      await dynamicControlsPage.clickSwapCheckboxButton();

      await expect(dynamicControlsPage.successMessage).toBeVisible();
      await expect(dynamicControlsPage.successMessage).toHaveText("It's back!");

      await expect(dynamicControlsPage.checkbox).toHaveCount(1);
  });

  test('verifyDynamicInput', async () => {
      await expect(dynamicControlsPage.inputField).toBeDisabled();

      await dynamicControlsPage.clickSwapInputButton();

      await expect(dynamicControlsPage.inputField).toBeEnabled();

      await dynamicControlsPage.clickSwapInputButton();

      await expect(dynamicControlsPage.inputField).toBeDisabled();
  });
});