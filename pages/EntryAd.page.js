import { expect } from '@playwright/test';

export class EntryAdPage 
{
    constructor(page) 
    {
        this.page = page;
        this.url = 'https://the-internet.herokuapp.com/entry_ad';
        this.modal = this.page.locator('.modal-footer');
        this.resetButton = this.page.locator('#restart-ad');
    }

    async goto() 
    {
        await this.page.goto(this.url);
        await expect(this.page).toHaveURL(this.url);
    }

    async reload()
    {
        await this.page.reload();
        await expect(this.page).toHaveURL(this.url);
    }

    async waitForModalVisible(timeout = 5000) 
    {
        await this.modal.waitFor({ state: 'visible', timeout });
    }

    async waitForModalHidden(timeout = 5000) 
    {
        await this.modal.waitFor({ state: 'hidden', timeout });
    }

    async clickModal()
    {
        await this.modal.click();
    }

    async clickResetButton()
    {
        await this.resetButton.click();
    }
}