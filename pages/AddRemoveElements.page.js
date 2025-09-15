// @ts-check
import { expect } from '@playwright/test';

export class AddRemoveElementsPage 
{
    constructor(page) 
    {
        this.page = page;
        this.url = 'https://the-internet.herokuapp.com/add_remove_elements/';
        this.addButton = this.page.locator("button[onclick='addElement()']");
        this.deleteButton = this.page.locator("button[onclick='deleteElement()']");
    }

    async goto() 
    {
        await this.page.goto(this.url);
        await expect(this.page).toHaveURL(this.url);
    }

    async addElement() 
    {
        await this.addButton.click();
    }

    async deleteElement(index)
    {
        await this.deleteButton.nth(index).click();
    }

    /**
     *@returns {import('@playwright/test').Locator}
    */
    getDeleteButtons() 
    {
        return this.deleteButton;
    }
}