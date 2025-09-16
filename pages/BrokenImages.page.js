import { expect } from '@playwright/test';

export class BrokenImagesPage 
{
    constructor(page) 
    {
        this.page = page;
        this.url = 'https://the-internet.herokuapp.com/broken_images';
        this.images = this.page.locator('img');
    }

    async goto() 
    {
        await this.page.goto(this.url);
        await expect(this.page).toHaveURL(this.url);
    }

    getAllImages() 
    {
        return this.images;
    }

    async getImageURL(imgLocator) 
    {
        const src = await imgLocator.getAttribute('src');
        return new URL(src, this.url).toString();
    }
}