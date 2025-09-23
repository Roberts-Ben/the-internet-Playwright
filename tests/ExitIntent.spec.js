import { test, expect } from '@playwright/test';
import { testA11y } from '../fixtures/a11yFixture.js';
import { ExitIntentPage } from '../pages/ExitIntent.page';

test.describe('Exit Intent', () => {
  let exitIntentPage;

  test.beforeEach(async ({ page }) => {
    exitIntentPage = new ExitIntentPage(page);
    await exitIntentPage.goto();
  });

  testA11y('accessibility', async ({ accessibilityBuilder }, testInfo) => { 
    const results = await accessibilityBuilder.analyze();
    await testInfo.attach("accessibility-scan-results", {
      body: JSON.stringify(results.violations, null, 2),
      contentType: "application/json"
    });
    
    //expect(results.violations).toEqual([]); 
  });

  test('verifyModal', async () => {
        await exitIntentPage.waitForModalHidden();
        await expect (exitIntentPage.modal).not.toBeVisible(); 

        await exitIntentPage.forceModal();

        await exitIntentPage.waitForModalInteractive();
        await expect(exitIntentPage.modalCloseButton).toBeEnabled();

        await exitIntentPage.closeModal();

        await exitIntentPage.waitForModalHidden();
        await expect (exitIntentPage.modal).not.toBeVisible(); 
  });
});