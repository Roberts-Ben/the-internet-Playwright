import { expect } from '@playwright/test';

export class InputsPage 
{
    constructor(page) 
    {
        this.page = page;
        this.url = 'https://the-internet.herokuapp.com/inputs';
        this.inputField = this.page.getByRole('spinbutton');
    }

    async goto() 
    {
        await this.page.goto(this.url);
        await expect(this.page).toHaveURL(this.url);
    }

    async inputValue(input)
    {
        await this.inputField.type(input);
    }
}