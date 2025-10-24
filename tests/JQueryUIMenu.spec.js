import { test, expect } from '@playwright/test';
import { testA11y } from '../fixtures/a11yFixture.js';
import { JQueryUIMenuPage } from '../pages/JQueryUIMenu.page';

test.describe('JQuery UI Menu', () => {
  let jQueryUIMenuPage;

  test.beforeEach(async ({ page }) => {
    jQueryUIMenuPage = new JQueryUIMenuPage(page);
    await jQueryUIMenuPage.goto();
  });

  testA11y('accessibility', async ({ accessibilityBuilder }, testInfo) => { 
    const results = await accessibilityBuilder.analyze();
    await testInfo.attach("accessibility-scan-results", {
      body: JSON.stringify(results.violations, null, 2),
      contentType: "application/json"
    });
    
    //expect(results.violations).toEqual([]); 
  });

  test('verifyJQueryUIMenu', async () => {
    // Disabled element
    expect(await jQueryUIMenuPage.isEnabled(0)).toBeFalsy();

    // Hidden element
    expect(await jQueryUIMenuPage.isDisplayed(1)).toBeFalsy();

    // Enabled element (shows next submenu)
    await jQueryUIMenuPage.hoverMenuPath([2]);
    expect(await jQueryUIMenuPage.isDisplayed(3)).toBeTruthy();
    
    // Downloads element (shows submenu)
    await jQueryUIMenuPage.hoverMenuPath([2, 3]);
    expect(await jQueryUIMenuPage.isDisplayed(4)).toBeTruthy();

    // Verify downloads work
    for (const i of [4, 5, 6]) 
    {
      await jQueryUIMenuPage.hoverMenuPath([2, 3, i]);
      await jQueryUIMenuPage.clickMenuItem(i);
      // TODO: Verify download succeeded
    }

    // Navigate to "Back to JQuery UI"
    await jQueryUIMenuPage.hoverMenuPath([2, 7]);
    await jQueryUIMenuPage.clickMenuItem(7);

    await expect(jQueryUIMenuPage.page).toHaveURL(jQueryUIMenuPage.baseUrl);
  });
});