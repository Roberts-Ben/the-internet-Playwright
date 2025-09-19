import { expect } from '@playwright/test';

export class DragAndDropPage 
{
    constructor(page) 
    {
        this.page = page;
        this.url = 'https://the-internet.herokuapp.com/drag_and_drop';
        this.dragA = this.page.locator('#column-a');
        this.dragB = this.page.locator('#column-b');
        this.headerA = this.page.locator('#column-a > header');
        this.headerB = this.page.locator('#column-b > header');
    }

    async goto() 
    {
        await this.page.goto(this.url);
        await expect(this.page).toHaveURL(this.url);
    }

    async getHeaderAText()
    {
        return (await this.headerA.textContent())?.trim();
    }

    async getHeaderBText()
    {
        return (await this.headerB.textContent())?.trim();
    }

    async dragAndDrop()
    {
        await this.dragA.dragTo(this.dragB);
    }
}