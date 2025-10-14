import { expect } from '@playwright/test';

export class FormAuthPage 
{
    constructor(page) 
    {
        this.page = page;
        this.url = 'https://the-internet.herokuapp.com/login';
        this.bypassUrl = 'https://the-internet.herokuapp.com/secure';

        this.loginButton = this.page.locator('button[type="submit"]');
        this.logoutButton = this.page.locator("a[href*='/logout']");
        this.usernameField = this.page.locator('#username');
        this.passwordField = this.page.locator('#password');
        this.alert = this.page.locator('#flash');

        this.username = 'tomsmith';
        this.password = 'SuperSecretPassword!';
        this.invalidUsername = 'test';
        this.invalidPassword = 'pass';
    }

    async goto() 
    {
        await this.page.goto(this.url);
        await expect(this.page).toHaveURL(this.url);
    }

    async gotoBypass() 
    {
        await this.page.goto(this.bypassUrl);
        await expect(this.page).toHaveURL(this.url);
    }

    async clickLogin()
    {
        await this.loginButton.click();
    }

    async clickLogout()
    {
        await this.logoutButton.click();
    }

    async inputCredentials(validLogin)
    {
        await this.usernameField.fill(validLogin ? this.username : this.invalidUsername);
        await this.passwordField.fill(validLogin ? this.password : this.invalidPassword);
    }
}