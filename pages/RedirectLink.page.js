import { expect } from '@playwright/test';

export class RedirectLinkPage 
{
    constructor(page) 
    {
        this.page = page;
        this.url = 'https://the-internet.herokuapp.com/redirector';
        this.redirectUrl = 'https://the-internet.herokuapp.com/status_codes';
        this.redirectLink = this.page.locator('#redirect');
    }

    async goto() 
    {
        await this.page.goto(this.url);
        await expect(this.page).toHaveURL(this.url);
    }

    async clickRedirectLink()
    {
        await this.redirectLink.click();
    }

}