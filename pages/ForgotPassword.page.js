import { expect } from '@playwright/test';

export class ForgotPasswordPage 
{
    constructor(page) 
    {
        this.page = page;
        this.url = 'https://the-internet.herokuapp.com/forgot_password';
        this.inputField = this.page.getByRole('textbox', { name: 'E-mail' });
        this.retrieveButton = this.page.getByRole('button', { name: 'Retrieve password' });
        this.header = this.page.getByRole('heading', { level: 1 });
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