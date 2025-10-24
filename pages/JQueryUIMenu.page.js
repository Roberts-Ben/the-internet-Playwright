import { expect } from '@playwright/test';

export class JQueryUIMenuPage 
{
    constructor(page) 
    {
        this.page = page;
        this.url = 'https://the-internet.herokuapp.com/jqueryui/menu';
        this.baseUrl = 'https://the-internet.herokuapp.com/jqueryui';
    }

    async goto() 
    {
        await this.page.goto(this.url);
        await expect(this.page).toHaveURL(this.url);
    }

    menuItem(index) 
    {
        const id = `#ui-id-${index + 1}`;
        return this.page.locator(id);
    }

    async isEnabled(index) 
    {
        const item = this.menuItem(index);
        await this.page.waitForTimeout(500);
        const attr = await item.getAttribute('aria-disabled');
        return attr === 'false';
    }

    async isDisplayed(index) 
    {
        const item = this.menuItem(index);
        await this.page.waitForTimeout(500);
        return await item.isVisible();
    }

    async hoverMenuPath(path) 
    {
        for (const index of path) 
        {
            const item = this.menuItem(index);
            await item.hover();
        }
    }

    async clickMenuItem(index)
    {
        const item = this.menuItem(index);
        await item.click();
    }
}