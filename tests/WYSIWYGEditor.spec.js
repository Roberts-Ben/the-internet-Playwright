import { test, expect } from '@playwright/test';
import { testA11y } from '../fixtures/a11yFixture.js';
import { FramesPage } from '../pages/Frames.page';

test.describe('WYSIWYG Editor', () => {
  let framesPage;

  test.beforeEach(async ({ page }) => {
    framesPage = new FramesPage(page);
    await framesPage.gotoiFrame();
  });

  testA11y('accessibility', async ({ accessibilityBuilder }, testInfo) => { 
    const results = await accessibilityBuilder.analyze();
    await testInfo.attach("accessibility-scan-results", {
      body: JSON.stringify(results.violations, null, 2),
      contentType: "application/json"
    });
    
    //expect(results.violations).toEqual([]); 
  });

  test('verifyEditor', async () => {
    await framesPage.clickCloseButton();

    const text = await framesPage.getIFrameEditorText();
    expect(text).toContain('Your content goes here.');
  });
});