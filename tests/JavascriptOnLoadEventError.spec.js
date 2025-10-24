import { test, expect } from '@playwright/test';
import { testA11y } from '../fixtures/a11yFixture.js';
import { JavascriptOnLoadEventErrorPage } from '../pages/JavascriptOnLoadEventError.page';

test.describe('Javascript On Load Event Error', () => {
  let javascriptOnLoadEventErrorPage;

  test.beforeEach(async ({ page }) => {
    javascriptOnLoadEventErrorPage = new JavascriptOnLoadEventErrorPage(page);
    await javascriptOnLoadEventErrorPage.goto();
  });

  testA11y('accessibility', async ({ accessibilityBuilder }, testInfo) => { 
    const results = await accessibilityBuilder.analyze();
    await testInfo.attach("accessibility-scan-results", {
      body: JSON.stringify(results.violations, null, 2),
      contentType: "application/json"
    });
    
    //expect(results.violations).toEqual([]); 
  });

  test('verifyError', async () => {
    test.skip(browserName === 'firefox', `Skipping: ${browserName} does not support browser logs);
    const jsErrors = await javascriptOnLoadEventErrorPage.hasJsErrors();

    if (jsErrors.length > 0) 
    { 
      console.log('Detected JS Errors:\n', jsErrors.join('\n')); 
    }

    expect(jsErrors.length).toBeGreaterThan(0);
  });
});