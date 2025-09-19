import { test, expect } from '@playwright/test';
import { testA11y } from '../fixtures/a11yFixture.js';

test.describe('Google accessibility test', () => {
  testA11y('accessibility', async ({ page, accessibilityBuilder }, testInfo) => { 
    await page.goto('https://www.google.com/');

    const results = await accessibilityBuilder.analyze();
    await testInfo.attach("accessibility-scan-results", {
      body: JSON.stringify(results.violations, null, 2),
      contentType: "application/json"
    });
    
    expect(results.violations).toEqual([]); 
  });
});