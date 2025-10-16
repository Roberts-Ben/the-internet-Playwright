import { test, expect } from '@playwright/test';
import { testA11y } from '../fixtures/a11yFixture.js';
import { HoversPage } from '../pages/Hovers.page';

test.describe('Hovers', () => {
  let hoversPage;

  test.beforeEach(async ({ page }) => {
    hoversPage = new HoversPage(page);
    await hoversPage.goto();
  });

  testA11y('accessibility', async ({ accessibilityBuilder }, testInfo) => { 
    const results = await accessibilityBuilder.analyze();
    await testInfo.attach("accessibility-scan-results", {
      body: JSON.stringify(results.violations, null, 2),
      contentType: "application/json"
    });
    
    //expect(results.violations).toEqual([]); 
  });

  test('verifyHover', async () => {
    const count = await hoversPage.hoverElements.count();

    for(let i = 0; i < count; i++)
    {
        await expect(hoversPage.hiddenElements.nth(i)).not.toBeVisible();
    }

    for (let i = 0; i < count; i++) 
    {
        await hoversPage.moveToElement(i);

        for (let j = 0; j < count; j++)
        {
            if (i == j)
            {
                await expect(hoversPage.hiddenElements.nth(j)).toBeVisible();
            }
            else
            {
                await expect(hoversPage.hiddenElements.nth(j)).not.toBeVisible();
            }
        }
        const statusCode = await hoversPage.verifyValidLink(i);
        expect([200, 404]).toContain(statusCode.status());
    }
  });
});