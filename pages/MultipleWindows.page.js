import { expect } from '@playwright/test';

export class MultipleWindowsPage 
{
    constructor(page) 
    {
        this.page = page;
        this.url = 'https://the-internet.herokuapp.com/windows';
        this.newTabButton = this.page.getByRole('link', { name: 'Click Here' });
        this.headerLocator = 'h3';
    }

    async goto() 
    {
        await this.page.goto(this.url);
        await expect(this.page).toHaveURL(this.url);
    }

    async clickNewTabButton()
    {
        await this.newTabButton.click();
    }
}