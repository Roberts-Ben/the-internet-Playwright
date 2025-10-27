import { test, expect } from '@playwright/test';
import { testA11y } from '../fixtures/a11yFixture.js';
import { SlowResourcesPage } from '../pages/SlowResources.page';

// NOTE: Currently this page fails with a 503 rather than loading the expected elements
// To test around this:
// Navigate directly to the page that calls the GET request and validating that it fails after 30 seconds instead of loading the content
test.describe('Slow Resources', () => {
  let slowResourcesPage;

  test.beforeEach(async ({ page }) => {
    slowResourcesPage = new SlowResourcesPage(page);
    await slowResourcesPage.goto();
  });

  testA11y('accessibility', async ({ accessibilityBuilder }, testInfo) => { 
    const results = await accessibilityBuilder.analyze();
    await testInfo.attach("accessibility-scan-results", {
      body: JSON.stringify(results.violations, null, 2),
      contentType: "application/json"
    });
    
    //expect(results.violations).toEqual([]); 
  });

  test('verifySlowElement', async () => {
    test.setTimeout(35_000);

    const response = await slowResourcesPage.getSlowResourceStatus();
    expect(response.status()).toBe(503);
  });
});