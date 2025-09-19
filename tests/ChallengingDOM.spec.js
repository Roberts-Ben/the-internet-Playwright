import { test, expect } from '@playwright/test';
import { testA11y } from '../fixtures/a11yFixture.js';
import { ChallengingDOMPage } from '../pages/ChallengingDOM.page';

test.describe('Challenging DOM', () => {
  let challengingDOMPage;

  test.beforeEach(async ({ page }) => {
    challengingDOMPage = new ChallengingDOMPage(page);
    await challengingDOMPage.goto();
  });

  testA11y('accessibility', async ({ page, accessibilityBuilder }, testInfo) => { 
      const results = await accessibilityBuilder.analyze();
      await testInfo.attach("accessibility-scan-results", {
          body: JSON.stringify(results.violations, null, 2),
          contentType: "application/json"
      });
      
      //expect(results.violations).toEqual([]); 
  });

  test('verifyButton', async () => {
    await expect(challengingDOMPage.getButton()).toBeVisible();
  });

  test('verifyAlertButton', async () => {
    await expect (challengingDOMPage.getAlertButton()).toBeVisible();
  });

  test('verifySuccessButton', async () => {
    await expect(challengingDOMPage.getSuccessButton()).toBeVisible();
  });

  test('verifyTable', async () => {
    const tableSize = 10;

    await expect(challengingDOMPage.getHeader()).toBeVisible();
    
    await challengingDOMPage.clickEdit();
    await expect(challengingDOMPage.page).toHaveURL(challengingDOMPage.url + "#edit");

    await challengingDOMPage.clickDelete();
    await expect(challengingDOMPage.page).toHaveURL(challengingDOMPage.url + "#delete");

    for(let i = 0; i < tableSize; i++)
    {
      const contentText = await challengingDOMPage.getCellText(i);
      expect(contentText).toBe("Iuvaret" + i);
    }
  });

  test('verifyCanvas', async () => {
    await expect(challengingDOMPage.getCanvas()).toBeVisible();
  });
});