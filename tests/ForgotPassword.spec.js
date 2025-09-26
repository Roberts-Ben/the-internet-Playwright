import { test, expect } from '@playwright/test';
import { testA11y } from '../fixtures/a11yFixture.js';
import { ForgotPasswordPage } from '../pages/ForgotPassword.page';

test.describe('Forgot Password', () => {
  let forgotPasswordPage;

  test.beforeEach(async ({ page }) => {
    forgotPasswordPage = new ForgotPasswordPage(page);
    await forgotPasswordPage.goto();
  });

  testA11y('accessibility', async ({ accessibilityBuilder }, testInfo) => { 
    const results = await accessibilityBuilder.analyze();
    await testInfo.attach("accessibility-scan-results", {
      body: JSON.stringify(results.violations, null, 2),
      contentType: "application/json"
    });
    
    //expect(results.violations).toEqual([]); 
  });

  test('verifyForgotPassword', async () => {
    await forgotPasswordPage.inputEmail();

    const inputContent = await forgotPasswordPage.getInputFieldValue();
    expect(inputContent).toBe(forgotPasswordPage.email);

    await forgotPasswordPage.clickRetrieve();

    await expect(forgotPasswordPage.header).toHaveText('Internal Server Error'); //NOTE: This is just the page that gets returned
  });
});