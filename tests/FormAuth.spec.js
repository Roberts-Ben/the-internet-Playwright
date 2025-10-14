import { test, expect } from '@playwright/test';
import { testA11y } from '../fixtures/a11yFixture.js';
import { FormAuthPage } from '../pages/FormAuth.page';

test.describe('Form Auth', () => {
  let formAuthPage;

  test.beforeEach(async ({ page }) => {
    formAuthPage = new FormAuthPage(page);
    await formAuthPage.goto();
  });

  testA11y('accessibility', async ({ accessibilityBuilder }, testInfo) => { 
    const results = await accessibilityBuilder.analyze();
    await testInfo.attach("accessibility-scan-results", {
      body: JSON.stringify(results.violations, null, 2),
      contentType: "application/json"
    });
    
    //expect(results.violations).toEqual([]); 
  });

  test('verifyValidAuth', async () => {
    await formAuthPage.inputCredentials(true);

    await formAuthPage.clickLogin();

    await expect(formAuthPage.alert).toContainText('You logged into a secure area!');
  });

  test('verifyInvalidAuth', async () => {
    await formAuthPage.inputCredentials(false);

    await formAuthPage.clickLogin();

    await expect(formAuthPage.alert).toContainText('Your username is invalid!');
  });

  test('verifyLogout', async () => {
    await formAuthPage.inputCredentials(true);
    
    await formAuthPage.clickLogin();
    await formAuthPage.clickLogout();

    await expect(formAuthPage.alert).toContainText('You logged out of the secure area!');
  });

  test('verifyUnableToBypass', async () => {
      await formAuthPage.gotoBypass();

      await expect(formAuthPage.alert).toContainText('You must login to view the secure area!');
  });
});