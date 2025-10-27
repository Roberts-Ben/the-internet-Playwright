import { expect } from '@playwright/test';

export class ABTestingPage 
{
    constructor(page) 
    {
        this.page = page;
        this.url = 'https://the-internet.herokuapp.com/abtest';
        this.header = this.page.getByRole('heading', { level: 3 });
    }

    async goto() 
    {
        await this.page.goto(this.url);
        await expect(this.page).toHaveURL(this.url);
    }
}