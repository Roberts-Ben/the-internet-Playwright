import { expect } from '@playwright/test';

export class ExitIntentPage 
{
    constructor(page) 
    {
        this.page = page;
        this.url = 'https://the-internet.herokuapp.com/exit_intent';
        this.modal = this.page.locator('#ouibounce-modal');
        this.modalCloseButton = this.page.locator('.modal-footer');
    }

    async goto() 
    {
        await this.page.goto(this.url);
        await expect(this.page).toHaveURL(this.url);
    }

    async closeModal()
    {
        await this.modalCloseButton.click();
    }

    async forceModal()
    {
        await this.page.evaluate(() => {
            _ouibounce.fire();
        });
    }

    async waitForModalVisible(timeout = 5000) 
    {
        await this.modal.waitFor({ state: 'visible', timeout }); 
    }

    async waitForModalHidden(timeout = 5000) 
    {
        await this.modal.waitFor({ state: 'hidden', timeout });
    }

    async waitForModalInteractive(timeout = 5000) 
    {
        await this.modalCloseButton.waitFor({ state: 'attached', timeout });
    }
}