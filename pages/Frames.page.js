import { expect } from '@playwright/test';

export class FramesPage 
{
    constructor(page) 
    {
        this.page = page;
        this.url = 'https://the-internet.herokuapp.com/frames';
        this.iFrameUrl = 'https://the-internet.herokuapp.com/iframe';
        this.nestedFrameUrl = 'https://the-internet.herokuapp.com/nested_frames';

        this.nestedFramesLink = this.page.getByRole('link', { name: 'Nested Frames' });
        this.closeButton = this.page.getByRole('button', { name: 'Close' });
        this.frameID = this.page.frameLocator('#mce_0_ifr');
        this.editor = this.frameID.locator('body');
    }

    async goto() 
    {
        await this.page.goto(this.url);
        await expect(this.page).toHaveURL(this.url);
    }

    async gotoiFrame() 
    {
        await this.page.goto(this.iFrameUrl);
        await expect(this.page).toHaveURL(this.iFrameUrl);
    }

    async clickNestedFramesLink()
    {
        await this.nestedFramesLink.click();
    }

    async clickCloseButton()
    {
        await this.closeButton.click();
    }

    async getIFrameEditorText() 
    {
        return await this.editor.innerText();
    }
}