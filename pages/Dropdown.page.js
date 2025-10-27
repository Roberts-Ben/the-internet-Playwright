import { expect } from '@playwright/test';

export class DropdownPage 
{
    constructor(page) 
    {
        this.page = page;
        this.url = 'https://the-internet.herokuapp.com/dropdown';
        this.dropdown = this.page.getByRole('combobox');
    }

    async goto() 
    {
        await this.page.goto(this.url);
        await expect(this.page).toHaveURL(this.url);
    }
    
    async selectByValue(value)
    {
        await this.dropdown.selectOption(value);
    }
}