import { expect } from '@playwright/test';

export class CheckboxesPage 
{
    constructor(page) 
    {
        this.page = page;
        this.url = 'https://the-internet.herokuapp.com/checkboxes';
        this.checkboxes = this.page.locator("input");
    }

    async goto() 
    {
        await this.page.goto(this.url);
        await expect(this.page).toHaveURL(this.url);
    }

    getFirstCheckbox()
    {
        return this.checkboxes.first();
    }

    getLastCheckbox()
    {
        return this.checkboxes.last();
    }

    async clickFirstCheckbox()
    {
        await this.checkboxes.first().click();
    }

    async clickLastCheckbox()
    {
        await this.checkboxes.last().click();
    }
}