import { expect } from '@playwright/test';

export class ForgotPasswordPage 
{
    constructor(page) 
    {
        this.page = page;
        this.url = 'https://the-internet.herokuapp.com/forgot_password';
        this.inputField = this.page.locator('#email');
        this.retrieveButton = this.page.locator('#form_submit');
        this.header = this.page.locator('h1');
        this.email = 'TestUser@TestEmail.com';
    }

    async goto() 
    {
        await this.page.goto(this.url);
        await expect(this.page).toHaveURL(this.url);
    }

    async inputEmail()
    {
        await this.inputField.fill(this.email)
    }

    async getInputFieldValue()
    {
        return await this.inputField.inputValue();
    }

    async clickRetrieve()
    {
        await this.retrieveButton.click();
    }
}