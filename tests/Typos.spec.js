import { test, expect } from '@playwright/test';
import { testA11y } from '../fixtures/a11yFixture.js';
import { TyposPage } from '../pages/Typos.page';

test.describe('Typos', () => {
  let typosPage;

  const EXPECTED_TEXT = "Sometimes you'll see a typo, other times you won't.";
  const TYPO_TEXT = "Sometimes you'll see a typo, other times you won,t.";

  test.beforeEach(async ({ page }) => {
    typosPage = new TyposPage(page);
    await typosPage.goto();
  });

  testA11y('accessibility', async ({ accessibilityBuilder }, testInfo) => { 
    const results = await accessibilityBuilder.analyze();
    await testInfo.attach("accessibility-scan-results", {
      body: JSON.stringify(results.violations, null, 2),
      contentType: "application/json"
    });
    
    //expect(results.violations).toEqual([]); 
  });

  test('verifyText', async () => {
    const actualText = await typosPage.content.innerText();
    expect([EXPECTED_TEXT, TYPO_TEXT]).toContain(actualText);
  });
});