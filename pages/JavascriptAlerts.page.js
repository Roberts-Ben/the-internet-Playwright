import { expect } from '@playwright/test';

export class JavascriptAlertsPage 
{
    constructor(page) 
    {
        this.page = page;
        this.url = 'https://the-internet.herokuapp.com/javascript_alerts';
        this.jsAlertButton = this.page.getByRole('button', { name: 'Click for JS Alert' });
        this.jsConfirmButton = this.page.getByRole('button', { name: 'Click for JS Confirm' });
        this.jsPromptButton = this.page.getByRole('button', { name: 'Click for JS Prompt' });
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