import { expect } from '@playwright/test';

export class HorizontalSliderPage 
{
    constructor(page) 
    {
        this.page = page;
        this.url = 'https://the-internet.herokuapp.com/horizontal_slider';
        this.sliderValue = this.page.locator('#range');
        this.slider = this.page.locator("input[type='range']");
    }

    async goto() 
    {
        await this.page.goto(this.url);
        await expect(this.page).toHaveURL(this.url);
    }

    async dragSlider(value)
    {
        const boundingBox = await this.slider.boundingBox();
        const startX = boundingBox.x;
        const sliderWidth = boundingBox.width;
        const targetPos = startX + sliderWidth / 2; 

        await this.page.mouse.move(startX, boundingBox.y + boundingBox.height / 2);
        await this.page.mouse.down();
        await this.page.mouse.move(targetPos, boundingBox.y + boundingBox.height / 2);
        await this.page.mouse.up();
    }

    async moveSliderViaKeys(key)
    {
        await this.slider.focus();

        await this.page.keyboard.press(key);
    }
}