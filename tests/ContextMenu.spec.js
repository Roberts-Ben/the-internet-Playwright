import { test, expect } from '@playwright/test';
import { testA11y } from '../fixtures/a11yFixture.js';
import { ContextMenuPage } from '../pages/ContextMenu.page';

test.describe('Context Menu', () => {
  let contextMenuPage;
        
    test.beforeEach(async ({ page }) => {
        contextMenuPage = new ContextMenuPage(page);
        await contextMenuPage.goto();
    });
  
    testA11y('accessibility', async ({ accessibilityBuilder }, testInfo) => { 
      const results = await accessibilityBuilder.analyze();
      await testInfo.attach("accessibility-scan-results", {
          body: JSON.stringify(results.violations, null, 2),
          contentType: "application/json"
      });
      
      //expect(results.violations).toEqual([]); 
    });
  
    test('verifyContextMenuAppears', async ({ page }) => {
      page.once('dialog', async dialog => {
        expect(dialog.message()).toBe('You selected a context menu');
        await dialog.accept();
      });

      await contextMenuPage.rightClickHotspot();
    });
});