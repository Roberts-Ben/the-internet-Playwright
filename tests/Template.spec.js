import { test, expect } from '@playwright/test';
import { testA11y } from '../fixtures/a11yFixture.js';
import { TemplatePage } from '../pages/Template.page';

test.describe('Test', () => {
  let templatePage;

  test.beforeEach(async ({ page }) => {
    templatePage = new TemplatePage(page);
    await templatePage.goto();
  });

  testA11y('accessibility', async ({ page, accessibilityBuilder }, testInfo) => { 
    const results = await accessibilityBuilder.analyze();
    await testInfo.attach("accessibility-scan-results", {
      body: JSON.stringify(results, null, 2),
      contentType: "application/json"
    });
    
    //expect(results.violations).toEqual([]); 
  });

  test('aTest', async ({ page }) => {
      
  });
});