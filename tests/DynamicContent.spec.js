import { test, expect } from '@playwright/test';
import { testA11y } from '../fixtures/a11yFixture.js';
import { DynamicContentPage } from '../pages/DynamicContent.page';

test.describe('Dynamic Content', () => {
  let dynamicContentPage;

  test.beforeEach(async ({ page }) => {
    dynamicContentPage = new DynamicContentPage(page);
    await dynamicContentPage.goto();
  });

  testA11y('accessibility', async ({ accessibilityBuilder }, testInfo) => { 
    const results = await accessibilityBuilder.analyze();
    await testInfo.attach("accessibility-scan-results", {
      body: JSON.stringify(results.violations, null, 2),
      contentType: "application/json"
    });
    
    //expect(results.violations).toEqual([]); 
  });

  test('verifyDynamicContent', async () => {
      const originalAvatars = await dynamicContentPage.getAvatarSources();
      const originalParagraphs = await dynamicContentPage.getParagraphTexts();

      await dynamicContentPage.goto();

      const newAvatars = await dynamicContentPage.getAvatarSources();
      const newParagraphs = await dynamicContentPage.getParagraphTexts();

      expect(dynamicContentPage.hasContentChanged(originalAvatars, newAvatars, false) || dynamicContentPage.hasContentChanged(originalParagraphs, newParagraphs, false))
        .toBe(true);
  });

  test('verifyStaticAndDynamicContent', async () => {
    await dynamicContentPage.enableStaticDynamicMode();
    
    const originalAvatars = await dynamicContentPage.getAvatarSources();
    const originalParagraphs = await dynamicContentPage.getParagraphTexts();

    await dynamicContentPage.enableStaticDynamicMode();

    const newAvatars = await dynamicContentPage.getAvatarSources();
    const newParagraphs = await dynamicContentPage.getParagraphTexts();

    // First 2 remain static
    const count = await originalAvatars.length;
    for(let i = 0; i < count; i++)
    {
      if(i < 2)
      {
        expect(originalAvatars[i]).toBe(newAvatars[i]);
        expect(originalParagraphs[i]).toBe(newParagraphs[i]);
      }
    }

    // 3rd may change still
    expect(dynamicContentPage.hasContentChanged(originalAvatars, newAvatars, true) || dynamicContentPage.hasContentChanged(originalParagraphs, newParagraphs, true))
        .toBe(true);
  });
});