import { test, expect } from '@playwright/test';
import { testA11y } from '../fixtures/a11yFixture.js';
import { KeyPressesPage } from '../pages/KeyPresses.page';

test.describe('Key Presses', () => {
  let keyPressesPage;

  test.beforeEach(async ({ page }) => {
    keyPressesPage = new KeyPressesPage(page);
    await keyPressesPage.goto();
  });

  testA11y('accessibility', async ({ accessibilityBuilder }, testInfo) => { 
    const results = await accessibilityBuilder.analyze();
    await testInfo.attach("accessibility-scan-results", {
      body: JSON.stringify(results.violations, null, 2),
      contentType: "application/json"
    });
    
    //expect(results.violations).toEqual([]); 
  });

  test('verifyValidKeyPress', async () => {
    await expect(keyPressesPage.resultLabel).not.toBeVisible();

    await keyPressesPage.sendInput('ArrowUp')
    await expect(keyPressesPage.resultLabel).toHaveText('You entered: UP');

    await keyPressesPage.sendInput('Backspace')
    await expect(keyPressesPage.resultLabel).toHaveText('You entered: BACK_SPACE');

    await keyPressesPage.sendInput('Tab')
    await expect(keyPressesPage.resultLabel).toHaveText('You entered: TAB');

    await keyPressesPage.sendInput('Escape')
    await expect(keyPressesPage.resultLabel).toHaveText('You entered: ESCAPE');

    await keyPressesPage.sendInput('Enter')
    await expect(keyPressesPage.resultLabel).not.toBeVisible();
  });
});