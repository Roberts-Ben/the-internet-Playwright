import { test, expect } from '@playwright/test';
import { testA11y } from '../fixtures/a11yFixture.js';
import { InputsPage } from '../pages/Inputs.page';

test.describe('Inputs', () => {
  let inputsPage;

  test.beforeEach(async ({ page }) => {
    inputsPage = new InputsPage(page);
    await inputsPage.goto();
  });

  testA11y('accessibility', async ({ accessibilityBuilder }, testInfo) => { 
    const results = await accessibilityBuilder.analyze();
    await testInfo.attach("accessibility-scan-results", {
      body: JSON.stringify(results.violations, null, 2),
      contentType: "application/json"
    });
    
    //expect(results.violations).toEqual([]); 
  });

  test('verifyValidInput', async () => {
    await expect(inputsPage.inputField).toHaveValue('');

    await inputsPage.inputValue('55');

    await expect(inputsPage.inputField).toHaveValue('55');
  });

  test('verifyValidNegativeInput', async () => {
    await expect(inputsPage.inputField).toHaveValue('');

    await inputsPage.inputValue('-91');

    await expect(inputsPage.inputField).toHaveValue('-91');
  });

  test('verifyInvalidInput', async () => {
    await expect(inputsPage.inputField).toHaveValue('');

    await inputsPage.inputValue('abc');

    await expect(inputsPage.inputField).toHaveValue('');
  });
});