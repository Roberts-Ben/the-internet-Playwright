import { expect } from '@playwright/test';

export class SlowResourcesPage 
{
    constructor(page) 
    {
        this.page = page;
        this.url = 'https://the-internet.herokuapp.com/slow';
        this.slowUrl = 'https://the-internet.herokuapp.com/slow_external'
    }

    async goto() 
    {
        await this.page.goto(this.url);
        await expect(this.page).toHaveURL(this.url);
    }

    async getSlowResourceStatus()
    {
        return await this.page.request.get(this.slowUrl);
    }
}