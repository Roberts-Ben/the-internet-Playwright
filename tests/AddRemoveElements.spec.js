// @ts-check
import { test, expect } from '@playwright/test';
import { AddRemoveElementsPage } from '../pages/AddRemoveElements.page';

test.describe('Add Remove Elements', () => {
  test.beforeEach(async ({ page }) => {
    const addRemovePage = new AddRemoveElementsPage(page);
    await addRemovePage.goto();
  });

  test('verifyAddElement', async ({ page }) => {
    const addRemovePage = new AddRemoveElementsPage(page);

    await addRemovePage.addElement();

    await expect(addRemovePage.getDeleteButtons()).toHaveCount(1);
  });

  test('verifyAddMultipleElement', async ({ page }) => {
    const addRemovePage = new AddRemoveElementsPage(page);
    const elementsToAdd = 10;
    
    for(let i = 0; i < elementsToAdd; i++)
    {
      await addRemovePage.addElement();
    }

    await expect(addRemovePage.getDeleteButtons()).toHaveCount(elementsToAdd);
  });

  test('verifyDeleteElement', async ({ page }) => {
    const addRemovePage = new AddRemoveElementsPage(page);

    await addRemovePage.addElement();

    await expect(addRemovePage.getDeleteButtons()).toHaveCount(1);

    await addRemovePage.deleteElement(0);

    await expect(addRemovePage.getDeleteButtons()).toHaveCount(0);
  });

  test('verifyDeleteAllElements', async ({ page }) => {
    const addRemovePage = new AddRemoveElementsPage(page);
    const elementsToAdd = 10;
    
    for(let i = 0; i < elementsToAdd; i++)
    {
      await addRemovePage.addElement();
    }

    await expect(addRemovePage.getDeleteButtons()).toHaveCount(elementsToAdd);

    const deleteButtons = addRemovePage.getDeleteButtons();
    let count = await deleteButtons.count();

    for (let i = 0; i < count; i++) 
    {
      await deleteButtons.first().click();
    }

    await expect(addRemovePage.getDeleteButtons()).toHaveCount(0);
  });

  test('verifyDeleteRandomElements', async ({ page }) => {
    const addRemovePage = new AddRemoveElementsPage(page);
    const elementsToAdd = 10;
    const elementsToDelete = 3;

    for(let i = 0; i < elementsToAdd; i++)
    {
      await addRemovePage.addElement();
    }

    for (let i = 0; i < elementsToDelete; i++)
    {
      const deleteButtons = addRemovePage.getDeleteButtons();
      const count = await deleteButtons.count();
      const randomIndex = Math.floor(Math.random() * count);
      await deleteButtons.nth(randomIndex).click();
    }

    await expect(addRemovePage.getDeleteButtons()).toHaveCount(elementsToAdd - elementsToDelete);
  });
});