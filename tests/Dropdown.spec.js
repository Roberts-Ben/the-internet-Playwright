import { test, expect } from '@playwright/test';
import { testA11y } from '../fixtures/a11yFixture.js';
import { DropdownPage } from '../pages/Dropdown.page';

test.describe('Dropdown', () => {
  let dropdownPage;

  test.beforeEach(async ({ page }) => {
    dropdownPage = new DropdownPage(page);
    await dropdownPage.goto();
  });

  testA11y('accessibility', async ({ accessibilityBuilder }, testInfo) => { 
    const results = await accessibilityBuilder.analyze();
    await testInfo.attach("accessibility-scan-results", {
      body: JSON.stringify(results.violations, null, 2),
      contentType: "application/json"
    });
    
    //expect(results.violations).toEqual([]); 
  });

  test('verifyDropdown', async () => {
      await expect(dropdownPage.dropdown).toHaveValue('');

      await dropdownPage.selectByValue('1');

      await expect(dropdownPage.dropdown).toHaveValue('1');
  });
});