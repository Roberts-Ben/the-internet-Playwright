import { expect } from '@playwright/test';

export class HoversPage 
{
    constructor(page) 
    {
        this.page = page;
        this.url = 'https://the-internet.herokuapp.com/hovers';
        this.userUrl = 'https://the-internet.herokuapp.com/hovers/users/';
        this.hoverElements = this.page.locator('.figure');
        this.hiddenElements = this.page.locator('.figcaption');
    }

    async goto() 
    {
        await this.page.goto(this.url);
        await expect(this.page).toHaveURL(this.url);
    }

    async moveToElement(index)
    {
        await this.hoverElements.nth(index).hover();
    }

    async verifyValidLink(index)
    {
        const finalURL = this.userUrl + index;
        return await this.page.request.get(finalURL);
    }
}