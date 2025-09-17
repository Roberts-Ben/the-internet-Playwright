import { expect } from '@playwright/test';

export class ChallengingDOMPage 
{
    constructor(page) 
    {
        this.page = page;
        this.url = 'https://the-internet.herokuapp.com/challenging_dom';
        this.button = this.page.locator("//a[@class='button']");
        this.alertButton = this.page.locator("//a[@class='button alert']");
        this.successButton = this.page.locator("//a[@class='button success']");

        this.tableHeader = this.page.locator("//th[contains(text(),'Lorem')]");
        this.tableContent = this.page.locator("//td[contains(text(),'Iuvaret')]");
        this.tableEditButton = this.page.locator("//a[text()='edit']");
        this.tableDeleteButton = this.page.locator("//a[text()='delete']");

        this.canvas = this.page.locator("canvas");
    }

    async goto() 
    {
        await this.page.goto(this.url);
        await expect(this.page).toHaveURL(this.url);
    }

    getButton()
    {
        return this.button;
    }

    getAlertButton()
    {
        return this.alertButton;
    }

    getSuccessButton()
    {
        return this.successButton;
    }

    getHeader()
    {
        return this.tableHeader;
    }

    async getCellText(index)
    {
        return (await this.tableContent.nth(index).textContent())?.trim();
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