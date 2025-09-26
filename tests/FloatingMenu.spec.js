import { test, expect } from '@playwright/test';
import { testA11y } from '../fixtures/a11yFixture.js';
import { FloatingMenuPage } from '../pages/FloatingMenu.page';

test.describe('Floating Menu', () => {
  let floatingMenuPage;

  test.beforeEach(async ({ page }) => {
    floatingMenuPage = new FloatingMenuPage(page);
    await floatingMenuPage.goto();
  });

  testA11y('accessibility', async ({ accessibilityBuilder }, testInfo) => { 
    const results = await accessibilityBuilder.analyze();
    await testInfo.attach("accessibility-scan-results", {
      body: JSON.stringify(results.violations, null, 2),
      contentType: "application/json"
    });
    
    //expect(results.violations).toEqual([]); 
  });

  test('verifyFloatingHeader', async () => {
    const initialStyle = await floatingMenuPage.getMenuPosition();
    expect(initialStyle).toContain('top: 0px');

    await floatingMenuPage.scrollWindow();

    const scrolledStyle = await floatingMenuPage.getMenuPosition();
    expect(scrolledStyle).not.toContain('top: 0px');
  });
});