import { expect } from '@playwright/test';

export class DisappearingElementsPage 
{
    constructor(page) 
    {
        this.page = page;
        this.url = 'https://the-internet.herokuapp.com/disappearing_elements';
        this.buttons = this.page.locator('li');
    }

    async goto() 
    {
        await this.page.goto(this.url);
        await expect(this.page).toHaveURL(this.url);
    }
}