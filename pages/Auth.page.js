import { expect } from '@playwright/test';

export class AuthPage 
{
  constructor(page, authType = 'basic') 
  {
    this.page = page;
    this.authType = authType;

    this.urls = {
      basic: 'https://the-internet.herokuapp.com/basic_auth',
      digest: 'https://the-internet.herokuapp.com/digest_auth',
    };

    this.content = this.page.getByRole('paragraph');
    this.successMessageText = "Congratulations! You must have the proper credentials.";
    this.username = 'admin';
    this.password = 'admin';
  }

  get url() 
  {
    return this.urls[this.authType];
  }

  async navigateWithCredentials() 
  {
    const authURL = `https://${this.username}:${this.password}@the-internet.herokuapp.com/${
      this.authType === 'basic' ? 'basic_auth' : 'digest_auth'
    }`;

    await this.page.goto(authURL);
    await expect(this.page).toHaveURL(this.url);
  }

  async navigateWithAuth() 
  {
    await this.page.goto(this.url);
    await expect(this.page).toHaveURL(this.url);
  }

  async getSuccessMessage() 
  {
    return await this.content.textContent();
  }
}