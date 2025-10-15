import { test, expect } from '@playwright/test';
import { testA11y } from '../fixtures/a11yFixture.js';
import { HorizontalSliderPage } from '../pages/HorizontalSlider.page';

test.describe('Horizontal Slider', () => {
  let horizontalSliderPage;

  test.beforeEach(async ({ page }) => {
    horizontalSliderPage = new HorizontalSliderPage(page);
    await horizontalSliderPage.goto();
  });

  testA11y('accessibility', async ({ accessibilityBuilder }, testInfo) => { 
    const results = await accessibilityBuilder.analyze();
    await testInfo.attach("accessibility-scan-results", {
      body: JSON.stringify(results.violations, null, 2),
      contentType: "application/json"
    });
    
    //expect(results.violations).toEqual([]); 
  });

  test('verifySliderClickAndDrag', async () => {
    await expect(horizontalSliderPage.sliderValue).toHaveText('0')

    await horizontalSliderPage.dragSlider();

    await expect(horizontalSliderPage.sliderValue).toHaveText('2.5')
  });

  test('verifySliderArrowKeys', async () => {
    await expect(horizontalSliderPage.sliderValue).toHaveText('0')

    await horizontalSliderPage.moveSliderViaKeys('ArrowRight');

    await expect(horizontalSliderPage.sliderValue).toHaveText('0.5')

    await horizontalSliderPage.moveSliderViaKeys('ArrowLeft');

    await expect(horizontalSliderPage.sliderValue).toHaveText('0')
  });
});