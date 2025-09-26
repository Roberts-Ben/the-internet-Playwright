import { test, expect } from '@playwright/test';
import { testA11y } from '../fixtures/a11yFixture.js';
import { EntryAdPage } from '../pages/EntryAd.page';

test.describe('Entry Ad', () => {
  let entryAdPage;

  test.beforeEach(async ({ page }) => {
    entryAdPage = new EntryAdPage(page);
    await entryAdPage.goto();
  });

  testA11y('accessibility', async ({ accessibilityBuilder }, testInfo) => { 
    const results = await accessibilityBuilder.analyze();
    await testInfo.attach("accessibility-scan-results", {
      body: JSON.stringify(results.violations, null, 2),
      contentType: "application/json"
    });
    
    //expect(results.violations).toEqual([]); 
  });

  test('verifyAdOnFirstLoad', async () => {
    await entryAdPage.waitForModalHidden();
    await expect(entryAdPage.modal).not.toBeVisible();

    await entryAdPage.waitForModalVisible();
    await expect(entryAdPage.modal).toBeVisible();

    await entryAdPage.clickModal();

    await entryAdPage.waitForModalHidden();
    await expect(entryAdPage.modal).not.toBeVisible();
  });

  test('verifyAdOnlyAppearsOnce', async () => {
    await entryAdPage.waitForModalHidden();
    await expect(entryAdPage.modal).not.toBeVisible();

    await entryAdPage.waitForModalVisible();
    await expect(entryAdPage.modal).toBeVisible();

    await entryAdPage.clickModal();

    await entryAdPage.waitForModalHidden();
    await expect(entryAdPage.modal).not.toBeVisible();

    // wait for modal state to persist
    await entryAdPage.page.waitForTimeout(2000);
    await entryAdPage.reload();

    await entryAdPage.waitForModalHidden();
    await expect(entryAdPage.modal).not.toBeVisible();
  });

  test('verifyAdAppearsAfterRefresh', async ( { browserName }) => {
    test.skip(browserName === 'firefox' || browserName === 'webkit', 'Skipping: Firefox does not refresh the Ad correctly');
    
    await entryAdPage.waitForModalHidden();
    await expect(entryAdPage.modal).not.toBeVisible();

    await entryAdPage.waitForModalVisible();
    await expect(entryAdPage.modal).toBeVisible();

    await entryAdPage.clickModal();

    await entryAdPage.waitForModalHidden();
    await expect(entryAdPage.modal).not.toBeVisible();

    // Re-enable the popup
    await entryAdPage.page.waitForTimeout(2000);
    await entryAdPage.clickResetButton();

    await entryAdPage.page.waitForTimeout(2000);
    await entryAdPage.reload();

    await entryAdPage.waitForModalVisible();
    await expect(entryAdPage.modal).toBeVisible();
  });
});