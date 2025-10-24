import { expect } from '@playwright/test';

export class StatusCodesPage 
{
    constructor(page) 
    {
        this.page = page;
        this.url = 'https://the-internet.herokuapp.com/status_codes';
    }

    async goto() 
    {
        await this.page.goto(this.url);
        await expect(this.page).toHaveURL(this.url);
    }

    async getStatusCode(code)
    {
        const path = this.url + '/' + code;
        return await this.page.request.get(path);
    }
}