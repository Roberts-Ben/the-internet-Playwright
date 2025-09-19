import { test, expect } from '@playwright/test';
import { testA11y } from '../fixtures/a11yFixture.js';
import { DisappeaingElementsPage } from '../pages/DisappearingElements.page';

test.describe('Disappearing Elements', () => {
  let disappeaingElementsPage;

  test.beforeEach(async ({ page }) => {
    disappeaingElementsPage = new DisappeaingElementsPage(page);
    await disappeaingElementsPage.goto();
  });

  testA11y('accessibility', async ({ page, accessibilityBuilder }, testInfo) => { 
    const results = await accessibilityBuilder.analyze();
    await testInfo.attach("accessibility-scan-results", {
      body: JSON.stringify(results.violations, null, 2),
      contentType: "application/json"
    });
    
    //expect(results.violations).toEqual([]); 
  });

  test('verifyDisappearingElements', async ({ page }) => {

    let verified5Elements = false;
    let verified4Elements = false;

    while(!verified4Elements || !verified5Elements)
    {
        const listSize = await disappeaingElementsPage.getMenuSize();

        if(listSize == 5 && !verified5Elements)
        {
            expect(listSize).toBe(5);
            verified5Elements = true;
        }
        else if(listSize == 4 && !verified4Elements)
        {
            expect(listSize).toBe(4);
            verified4Elements = true;
        }

        await disappeaingElementsPage.goto();
    }   
  });
});