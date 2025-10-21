import { expect } from '@playwright/test';

export class KeyPressesPage 
{
    constructor(page) 
    {
        this.page = page;
        this.url = 'https://the-internet.herokuapp.com/key_presses';
        this.inputField = this.page.locator('#target');
        this.resultLabel = this.page.locator('#result');
    }

    async goto() 
    {
        await this.page.goto(this.url);
        await expect(this.page).toHaveURL(this.url);
    }

    async sendInput(key)
    {
        await this.inputField.click();
        await this.page.keyboard.press(key)
    }
}