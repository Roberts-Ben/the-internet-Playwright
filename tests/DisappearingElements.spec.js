import { test, expect } from '@playwright/test';
import { testA11y } from '../fixtures/a11yFixture.js';
import { DisappearingElementsPage } from '../pages/DisappearingElements.page';

test.describe('Disappearing Elements', () => {
  let disappearingElementsPage;

  test.beforeEach(async ({ page }) => {
    disappearingElementsPage = new DisappearingElementsPage(page);
    await disappearingElementsPage.goto();
  });

  testA11y('accessibility', async ({ accessibilityBuilder }, testInfo) => { 
    const results = await accessibilityBuilder.analyze();
    await testInfo.attach("accessibility-scan-results", {
      body: JSON.stringify(results.violations, null, 2),
      contentType: "application/json"
    });
    
    //expect(results.violations).toEqual([]); 
  });

  test('verifyDisappearingElements', async () => {

    let verified5Elements = false;
    let verified4Elements = false;

    while(!verified4Elements || !verified5Elements)
    {
        const listSize = await disappearingElementsPage.buttons.count();

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

        await disappearingElementsPage.goto();
    }   
  });
});