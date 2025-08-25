// @ts-check
import { test, expect } from '@playwright/test';

const addButton = "button[onclick='addElement()']";
const deleteButton = "button[onclick='deleteElement()']";

test.beforeEach(async ({ page }) => 
{
  await page.goto('https://the-internet.herokuapp.com/add_remove_elements/');
  await expect(page).toHaveURL('https://the-internet.herokuapp.com/add_remove_elements/')
});
    
test('verifyAddElement', async ({ page }) => 
{
    await AddElement(page);

    await expect(page.locator(deleteButton)).toBeVisible();
});

test('verifyAddMultipleElement', async ({ page }) => 
{
    const elementsToAdd = 10;

    for(let i = 0; i < elementsToAdd; i++)
    {
        await AddElement(page);
    }

    await expect(page.locator(deleteButton)).toHaveCount(elementsToAdd);
});

test('verifyDeleteElement', async ({ page }) => 
{
    await AddElement(page);

    await expect(page.locator(deleteButton)).toHaveCount(1);

    await page.locator(deleteButton).first().click();

    await expect(page.locator(deleteButton)).toHaveCount(0);
});

test('verifyDeleteAllElements', async ({ page }) => 
{
    const elementsToAdd = 10;

    for(let i = 0; i < elementsToAdd; i++)
    {
        await AddElement(page);
    }

    await expect(page.locator(deleteButton)).toHaveCount(elementsToAdd);

    const deleteButtons = page.locator(deleteButton);
    const count = await deleteButtons.count();

    for (let i = 0; i < count; i++) 
    {
      await deleteButtons.first().click();
    }

    await expect(page.locator(deleteButton)).toHaveCount(0);
});

test('verifyDeleteRandomElements', async ({ page }) => 
{
    const elementsToAdd = 10;
    const elementsToDelete = 3;

    for(let i = 0; i < elementsToAdd; i++)
    {
        await AddElement(page);
    }

    for (let i = 0; i < elementsToDelete; i++) 
    {
      const deleteButtons = page.locator(deleteButton);
      const count = await deleteButtons.count();

      const randomIndex = Math.floor(Math.random() * count);

      await deleteButtons.nth(randomIndex).click();
    }

    await expect(page.locator(deleteButton)).toHaveCount(elementsToAdd - elementsToDelete);
});

async function AddElement(page) 
{
  await page.click(addButton);
}