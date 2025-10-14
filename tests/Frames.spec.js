import { test, expect } from '@playwright/test';
import { testA11y } from '../fixtures/a11yFixture.js';
import { FramesPage } from '../pages/Frames.page';

test.describe('Frames', () => {
  let framesPage;

  test.beforeEach(async ({ page }) => {
    framesPage = new FramesPage(page);
    await framesPage.goto();
  });

  testA11y('accessibility', async ({ accessibilityBuilder }, testInfo) => { 
    const results = await accessibilityBuilder.analyze();
    await testInfo.attach("accessibility-scan-results", {
      body: JSON.stringify(results.violations, null, 2),
      contentType: "application/json"
    });
    
    //expect(results.violations).toEqual([]); 
  });

  test('verifyNestedFramesLink', async () => {
    await framesPage.clickNestedFramesLink();
  });

  test('verifyiFrame', async () => {
    await framesPage.gotoiFrame();

    await framesPage.clickCloseButton();

    const text = await framesPage.getIFrameEditorText();
    expect(text).toContain('Your content goes here.');
  });
});