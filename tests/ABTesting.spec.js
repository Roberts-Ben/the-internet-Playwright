import { test, expect } from '@playwright/test';
import { testA11y } from '../fixtures/a11yFixture.js';
import { ABTestingPage } from '../pages/ABTesting.page';

test.describe('AB Testing', () => {
  let abPage;

  const HEADER_A = 'A/B Test Variation 1';
  const HEADER_B = 'A/B Test Control';

  test.beforeEach(async ({ page }) => {
    abPage = new ABTestingPage(page);
    await abPage.goto();
  });

  testA11y('accessibility', async ({ accessibilityBuilder }, testInfo) => { 
    const results = await accessibilityBuilder.analyze();
    await testInfo.attach("accessibility-scan-results", {
      body: JSON.stringify(results.violations, null, 2),
      contentType: "application/json"
    });
    
    //expect(results.violations).toEqual([]); 
  });

  test('verifyHeaderText', async () => {
    const headerText = await abPage.getHeaderText();
    expect([HEADER_A, HEADER_B]).toContain(headerText);
  });
});