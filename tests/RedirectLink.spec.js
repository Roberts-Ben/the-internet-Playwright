import { test, expect } from '@playwright/test';
import { testA11y } from '../fixtures/a11yFixture.js';
import { RedirectLinkPage } from '../pages/RedirectLink.page';

test.describe('Redirect Link', () => {
  let redirectLinkPage;

  test.beforeEach(async ({ page }) => {
    redirectLinkPage = new RedirectLinkPage(page);
    await redirectLinkPage.goto();
  });

  testA11y('accessibility', async ({ accessibilityBuilder }, testInfo) => { 
    const results = await accessibilityBuilder.analyze();
    await testInfo.attach("accessibility-scan-results", {
      body: JSON.stringify(results.violations, null, 2),
      contentType: "application/json"
    });
    
    //expect(results.violations).toEqual([]); 
  });

  test('verifyRedirect', async () => {
    await redirectLinkPage.clickRedirectLink()
    await expect(redirectLinkPage.page).toHaveURL(redirectLinkPage.redirectUrl);
  });
});