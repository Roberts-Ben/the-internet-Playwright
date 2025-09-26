import { expect } from '@playwright/test';

export class FloatingMenuPage 
{
    constructor(page) 
    {
        this.page = page;
        this.url = 'https://the-internet.herokuapp.com/floating_menu';
        this.floatingMenu = this.page.locator('#menu');
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

    async getMenuPosition()
    {
        return await this.floatingMenu.getAttribute('style');
    }
}