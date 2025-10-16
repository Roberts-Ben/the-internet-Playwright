import { test, expect } from '@playwright/test';
import { testA11y } from '../fixtures/a11yFixture.js';
import { JavascriptAlertsPage } from '../pages/JavascriptAlerts.page';

test.describe('Javascript Alerts', () => {
  let javascriptAlertsPage;

  test.beforeEach(async ({ page }) => {
    javascriptAlertsPage = new JavascriptAlertsPage(page);
    await javascriptAlertsPage.goto();
  });

  testA11y('accessibility', async ({ accessibilityBuilder }, testInfo) => { 
    const results = await accessibilityBuilder.analyze();
    await testInfo.attach("accessibility-scan-results", {
      body: JSON.stringify(results.violations, null, 2),
      contentType: "application/json"
    });
    
    //expect(results.violations).toEqual([]); 
  });

  test('verifyJSAlert', async ({ page }) => {
    page.on("dialog", async (dialog) => {
        expect(dialog.message()).toContain("I am a JS Alert");
        await dialog.accept();
    });

    await javascriptAlertsPage.clickJSAlert();

    await expect(javascriptAlertsPage.resultLabel).toHaveText('You successfully clicked an alert');
  });

  test('verifyJSConfirmOK', async ({ page }) => {
    page.on("dialog", async (dialog) => {
        expect(dialog.type()).toContain("confirm");
        expect(dialog.message()).toContain("I am a JS Confirm");
        await dialog.accept();
    });

    await javascriptAlertsPage.clickJSConfirm();

    await expect(javascriptAlertsPage.resultLabel).toHaveText('You clicked: Ok');
  });

  test('verifyJSConfirmCancel', async ({ page }) => {
    page.on("dialog", async (dialog) => {
        expect(dialog.type()).toContain("confirm");
        expect(dialog.message()).toContain("I am a JS Confirm");
        await dialog.dismiss();
    });

    await javascriptAlertsPage.clickJSConfirm();

    await expect(javascriptAlertsPage.resultLabel).toHaveText('You clicked: Cancel');
  });

  test('verifyJSPromptAccept', async ({ page }) => {
    page.on("dialog", async (dialog) => {
        expect(dialog.type()).toContain("prompt");
        expect(dialog.message()).toContain("I am a JS prompt");
        await dialog.accept('Test');
    });

    await javascriptAlertsPage.clickJSPrompt();

    await expect(javascriptAlertsPage.resultLabel).toHaveText('You entered: Test');
  });

  test('verifyJSPromptEmpty', async ({ page }) => {
    page.on("dialog", async (dialog) => {
        expect(dialog.type()).toContain("prompt");
        expect(dialog.message()).toContain("I am a JS prompt");
        await dialog.accept();
    });

    await javascriptAlertsPage.clickJSPrompt();

    await expect(javascriptAlertsPage.resultLabel).toHaveText('You entered:');
  });

  test('verifyJSPromptCancel', async ({ page }) => {
    page.on("dialog", async (dialog) => {
        expect(dialog.type()).toContain("prompt");
        expect(dialog.message()).toContain("I am a JS prompt");
        await dialog.dismiss();
    });

    await javascriptAlertsPage.clickJSPrompt();

    await expect(javascriptAlertsPage.resultLabel).toHaveText('You entered: null');
  });
});