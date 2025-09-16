import { expect } from '@playwright/test';

export class AuthPage 
{
  constructor(page) {
    this.page = page;
    this.url = 'https://the-internet.herokuapp.com/basic_auth';
    this.content = this.page.locator('p');
    this.username = 'admin';
    this.password = 'admin';
  }

  async navigateWithCredentials() 
  {
    const authURL = `https://${this.username}:${this.password}@the-internet.herokuapp.com/basic_auth`;

    await this.page.goto(authURL);
    await expect(this.page).toHaveURL(this.url);
  }

  async navigateWithAuth() 
  {
    await this.page.goto(this.url);
    await expect(this.page).toHaveURL(this.url);
  }

  async navigateWithoutAuth()
  {
    await this.page.goto(this.url);
  }

  async getSuccessMessage() 
  {
    return await this.content.textContent();
  }
}