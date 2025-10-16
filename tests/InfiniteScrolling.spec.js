import { test, expect } from '@playwright/test';
import { testA11y } from '../fixtures/a11yFixture.js';
import { InfiniteScrollingPage } from '../pages/InfiniteScrolling.page';

test.describe('Infinite Scrolling', () => {
  let infiniteScrollingPage;

  test.beforeEach(async ({ page }) => {
    infiniteScrollingPage = new InfiniteScrollingPage(page);
    await infiniteScrollingPage.goto();
  });

  testA11y('accessibility', async ({ accessibilityBuilder }, testInfo) => { 
    const results = await accessibilityBuilder.analyze();
    await testInfo.attach("accessibility-scan-results", {
      body: JSON.stringify(results.violations, null, 2),
      contentType: "application/json"
    });
    
    //expect(results.violations).toEqual([]); 
  });

  test('verifyInfiniteScroll', async () => {
    const numberOfTimesToScroll = 5;
    
    let screenHeight = await infiniteScrollingPage.getScreenHeight();
    let newScreenHeight;

    for(let i = 0; i < numberOfTimesToScroll; i++)
    {
      await infiniteScrollingPage.scrollWindow();

      newScreenHeight = await infiniteScrollingPage.getScreenHeight();

      expect(newScreenHeight).toBeGreaterThan(screenHeight);

      screenHeight = newScreenHeight;
    }
  });
});