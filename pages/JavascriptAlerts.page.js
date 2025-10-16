import { expect } from '@playwright/test';

export class JavascriptAlertsPage 
{
    constructor(page) 
    {
        this.page = page;
        this.url = 'https://the-internet.herokuapp.com/javascript_alerts';
        this.jsAlertButton = this.page.locator("//button[@onclick='jsAlert()']");
        this.jsConfirmButton = this.page.locator("//button[@onclick='jsConfirm()']");
        this.jsPromptButton = this.page.locator("//button[@onclick='jsPrompt()']");
        this.resultLabel = this.page.locator('#result');
    }

    async goto() 
    {
        await this.page.goto(this.url);
        await expect(this.page).toHaveURL(this.url);
    }

    async clickJSAlert()
    {
        await this.jsAlertButton.click();
    }

    async clickJSConfirm()
    {
        await this.jsConfirmButton.click();
    }

    async clickJSPrompt()
    {
        await this.jsPromptButton.click();
    }
}