import { expect } from '@playwright/test';

export class ContextMenuPage
{
    constructor(page) 
    {
        this.page = page;
        this.url = 'https://the-internet.herokuapp.com/context_menu';
        this.hotspot = this.page.locator("#hot-spot");
    }

    async goto() 
    {
        await this.page.goto(this.url);
        await expect(this.page).toHaveURL(this.url);
    }

    async rightClickHotspot()
    {
        await this.hotspot.dispatchEvent('contextmenu');
    }
}