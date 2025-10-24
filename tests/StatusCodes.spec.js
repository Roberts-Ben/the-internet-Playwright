import { test, expect } from '@playwright/test';
import { testA11y } from '../fixtures/a11yFixture.js';
import { StatusCodesPage } from '../pages/StatusCodes.page';

test.describe('Status Codes', () => {
  let statusCodesPage;

  test.beforeEach(async ({ page }) => {
    statusCodesPage = new StatusCodesPage(page);
    await statusCodesPage.goto();
  });

  testA11y('accessibility', async ({ accessibilityBuilder }, testInfo) => { 
    const results = await accessibilityBuilder.analyze();
    await testInfo.attach("accessibility-scan-results", {
      body: JSON.stringify(results.violations, null, 2),
      contentType: "application/json"
    });
    
    //expect(results.violations).toEqual([]); 
  });

  test('verifyCode200', async () => {
    const response = await statusCodesPage.getStatusCode(200);
    expect(response.status()).toBe(200);
  });

  test('verifyCode301', async () => {
    const response = await statusCodesPage.getStatusCode(301);
    expect(response.status()).toBe(301);
  });

  test('verifyCode404', async () => {
    const response = await statusCodesPage.getStatusCode(404);
    expect(response.status()).toBe(404);
  });

  test('verifyCode500', async () => {
    const response = await statusCodesPage.getStatusCode(500);
    expect(response.status()).toBe(500);
  });
});