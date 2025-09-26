import { test, expect } from '@playwright/test';
import { testA11y } from '../fixtures/a11yFixture.js';
import { DragAndDropPage } from '../pages/DragAndDrop.page';

test.describe('Drag and Drop', () => {
  let dragAndDropPage;

  test.beforeEach(async ({ page }) => {
    dragAndDropPage = new DragAndDropPage(page);
    await dragAndDropPage.goto();
  });

  testA11y('accessibility', async ({ accessibilityBuilder }, testInfo) => { 
    const results = await accessibilityBuilder.analyze();
    await testInfo.attach("accessibility-scan-results", {
      body: JSON.stringify(results.violations, null, 2),
      contentType: "application/json"
    });
    
    //expect(results.violations).toEqual([]); 
  });

  test('verifyDragDropSwap', async ( { browserName }) => {
      await expect(dragAndDropPage.headerA).toHaveText('A');
      await expect(dragAndDropPage.headerB).toHaveText('B');

      if(browserName === 'webkit')
      {
        console.log("Running dragDropHelper.js for Webkit");
        await dragAndDropPage.dragAndDropScript();
      }
      else
      {
        await dragAndDropPage.dragAndDrop();
      }
      
      await expect(dragAndDropPage.headerA).toHaveText('B');
      await expect(dragAndDropPage.headerB).toHaveText('A');
  });
});