import { expect } from '@playwright/test';

export class DragAndDropPage 
{
    constructor(page) 
    {
        this.page = page;
        this.url = 'https://the-internet.herokuapp.com/drag_and_drop';
        this.dragA = '#column-a';
        this.dragB = '#column-b';
        this.headerA = this.page.locator('#column-a > header');
        this.headerB = this.page.locator('#column-b > header');
    }

    async goto() 
    {
        await this.page.goto(this.url);
        await expect(this.page).toHaveURL(this.url);
    }

    async dragAndDrop()
    {
         await this.page.dragAndDrop(this.dragA, this.dragB);
    }
}