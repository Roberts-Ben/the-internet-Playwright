import { test, expect } from '@playwright/test';
import { testA11y } from '../fixtures/a11yFixture.js';
import { CheckboxesPage } from '../pages/Checkboxes.page';

test.describe('Checkboxes', () => {
  let checkboxesPage;
      
  test.beforeEach(async ({ page }) => {
    checkboxesPage = new CheckboxesPage(page);
    await checkboxesPage.goto();
  });

  testA11y('accessibility', async ({ accessibilityBuilder }, testInfo) => { 
    const results = await accessibilityBuilder.analyze();
    await testInfo.attach("accessibility-scan-results", {
        body: JSON.stringify(results.violations, null, 2),
        contentType: "application/json"
    });
    
    //expect(results.violations).toEqual([]); 
  });

  test('verifyCheckboxes', async () => {
    await expect(checkboxesPage.getFirstCheckbox()).not.toBeChecked();
    await expect(checkboxesPage.getLastCheckbox()).toBeChecked();

    await checkboxesPage.clickFirstCheckbox();
    await checkboxesPage.clickLastCheckbox();

    await expect(checkboxesPage.getFirstCheckbox()).toBeChecked();
    await expect(checkboxesPage.getLastCheckbox()).not.toBeChecked();
  });
});