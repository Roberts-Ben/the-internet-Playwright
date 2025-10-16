import { expect } from '@playwright/test';

export class InfiniteScrollingPage 
{
    constructor(page) 
    {
        this.page = page;
        this.url = 'https://the-internet.herokuapp.com/infinite_scroll';
    }

    async goto() 
    {
        await this.page.goto(this.url);
        await expect(this.page).toHaveURL(this.url);
    }

    async scrollWindow()
    {
        await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await this.page.waitForTimeout(100);
    }

    async getScreenHeight()
    {
        return await this.page.evaluate(() => document.body.scrollHeight);
    }
}