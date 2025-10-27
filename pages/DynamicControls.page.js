import { expect } from '@playwright/test';

export class DynamicControlsPage 
{
    constructor(page) 
    {
        this.page = page;
        this.url = 'https://the-internet.herokuapp.com/dynamic_controls';
        this.checkbox = this.page.getByRole('checkbox');
        this.swapCheckboxButton = this.page.locator('button[onclick="swapCheckbox()"]');
        this.successMessage = this.page.locator('#message');
        this.inputField = this.page.getByRole('textbox');
        this.swapInputButton = this.page.locator('button[onclick="swapInput()"]');
    }

    async goto() 
    {
        await this.page.goto(this.url);
        await expect(this.page).toHaveURL(this.url);
    }

    async clickSwapCheckboxButton()
    {
        await this.swapCheckboxButton.click();
    }

    async clickSwapInputButton()
    {
        await this.swapInputButton.click();
    }
}