import { test, expect } from '@playwright/test';
import { testA11y } from '../fixtures/a11yFixture.js';
import { DragAndDropPage } from '../pages/DragAndDrop.page';

test.describe('Drag and Drop', () => {
  let dragAndDropPage;

  test.beforeEach(async ({ page }) => {
    dragAndDropPage = new DragAndDropPage(page);
    await dragAndDropPage.goto();
  });

  testA11y('accessibility', async ({ page, accessibilityBuilder }, testInfo) => { 
    const results = await accessibilityBuilder.analyze();
    await testInfo.attach("accessibility-scan-results", {
      body: JSON.stringify(results.violations, null, 2),
      contentType: "application/json"
    });
    
    //expect(results.violations).toEqual([]); 
  });

  test('verifyDragDropSwap', async ({ page }) => {
      expect(await dragAndDropPage.getHeaderAText()).toBe('A');
      expect(await dragAndDropPage.getHeaderBText()).toBe('B');

      await dragAndDropPage.dragAndDrop();

      expect(await dragAndDropPage.getHeaderAText()).toBe('B');
      expect(await dragAndDropPage.getHeaderBText()).toBe('A');
  });
});