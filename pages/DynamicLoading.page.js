import { expect } from '@playwright/test';

export class DynamicLoadingPage 
{
    constructor(page) 
    {
        this.page = page;
        this.url = 'https://the-internet.herokuapp.com/dynamic_loading';
        this.startButton = this.page.locator('//button');
        this.hiddenElement = this.page.locator('#finish');
    }

    async goto() 
    {
        await this.page.goto(this.url);
        await expect(this.page).toHaveURL(this.url);
    }

    async gotoTest(index)
    {
        const targetUrl = this.url + "/" + index;
        await this.page.goto(targetUrl);
        await expect(this.page).toHaveURL(targetUrl);
    }

    async clickStartButton()
    {
        await this.startButton.click();
    }
}