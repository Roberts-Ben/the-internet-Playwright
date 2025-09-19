import { test, expect } from '@playwright/test';
import { testA11y } from '../fixtures/a11yFixture.js';
import { AddRemoveElementsPage } from '../pages/AddRemoveElements.page';

test.describe('Add Remove Elements', () => {
  let addRemovePage;

  test.beforeEach(async ({ page }) => {
    addRemovePage = new AddRemoveElementsPage(page);
    await addRemovePage.goto();
  });

  testA11y('accessibility', async ({ accessibilityBuilder }, testInfo) => { 
    const results = await accessibilityBuilder.analyze();
    await testInfo.attach("accessibility-scan-results", {
      body: JSON.stringify(results.violations, null, 2),
      contentType: "application/json"
    });
      
    //expect(results.violations).toEqual([]); 
  });

  test('verifyAddElement', async () => {
    await addRemovePage.addElement();

    await expect(addRemovePage.getDeleteButtons()).toHaveCount(1);
  });

  test('verifyAddMultipleElement', async () => {
    const elementsToAdd = 10;
    
    for(let i = 0; i < elementsToAdd; i++)
    {
      await addRemovePage.addElement();
    }

    await expect(addRemovePage.getDeleteButtons()).toHaveCount(elementsToAdd);
  });

  test('verifyDeleteElement', async () => {
    await addRemovePage.addElement();

    await expect(addRemovePage.getDeleteButtons()).toHaveCount(1);

    await addRemovePage.deleteElement(0);

    await expect(addRemovePage.getDeleteButtons()).toHaveCount(0);
  });

  test('verifyDeleteAllElements', async () => {
    const elementsToAdd = 10;
    
    for(let i = 0; i < elementsToAdd; i++)
    {
      await addRemovePage.addElement();
    }

    await expect(addRemovePage.getDeleteButtons()).toHaveCount(elementsToAdd);

    const deleteButtons = await addRemovePage.getDeleteButtons();
    let count = await deleteButtons.count();

    for (let i = 0; i < count; i++) 
    {
      await deleteButtons.first().click();
    }

    await expect(addRemovePage.getDeleteButtons()).toHaveCount(0);
  });

  test('verifyDeleteRandomElements', async () => {
    const elementsToAdd = 10;
    const elementsToDelete = 3;

    for(let i = 0; i < elementsToAdd; i++)
    {
      await addRemovePage.addElement();
    }

    for (let i = 0; i < elementsToDelete; i++)
    {
      const deleteButtons = await addRemovePage.getDeleteButtons();
      const count = await deleteButtons.count();
      const randomIndex = Math.floor(Math.random() * count);
      await deleteButtons.nth(randomIndex).click();
    }

    await expect(addRemovePage.getDeleteButtons()).toHaveCount(elementsToAdd - elementsToDelete);
  });
});