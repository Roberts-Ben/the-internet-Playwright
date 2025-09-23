import { expect } from '@playwright/test';

export class ChallengingDOMPage 
{
    constructor(page) 
    {
        this.page = page;
        this.url = 'https://the-internet.herokuapp.com/challenging_dom';
        this.button = this.page.locator('a.button').first();
        this.alertButton = this.page.locator('a.button.alert');
        this.successButton = this.page.locator('a.button.success');

        this.tableHeader = this.page.locator("table th:has-text('Lorem')");
        this.tableContent = this.page.locator("table td:has-text('Iuvaret')");
        this.tableEditButton = this.page.locator("table a:has-text('edit')");
        this.tableDeleteButton = this.page.locator("table a:has-text('delete')");

        this.canvas = this.page.locator('canvas');
    }

    async goto() 
    {
        await this.page.goto(this.url);
        await expect(this.page).toHaveURL(this.url);
    }

    async getCellText(index)
    {
        return await this.tableContent.nth(index).innerText();
    }

    async clickEdit()
    {
        await this.tableEditButton.first().click();
    }

    async clickDelete()
    {
        await this.tableDeleteButton.first().click();
    }

    getCanvas()
    {
        return this.canvas;
    }
}