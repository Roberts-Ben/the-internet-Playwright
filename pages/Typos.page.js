import { expect } from '@playwright/test';

export class TyposPage 
{
    constructor(page) 
    {
        this.page = page;
        this.url = 'https://the-internet.herokuapp.com/typos';
        this.content = this.page.locator('#content p').nth(1);
    }

    async goto() 
    {
        await this.page.goto(this.url);
        await expect(this.page).toHaveURL(this.url);
    }
}