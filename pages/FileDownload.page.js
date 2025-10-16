import { expect } from '@playwright/test';

export class FileDownloadPage 
{
    constructor(page) 
    {
        this.page = page;
        this.url = 'https://the-internet.herokuapp.com/download';
        this.downloadButtons = this.page.locator('a[href]');
    }

    async goto() 
    {
        await this.page.goto(this.url);
        await expect(this.page).toHaveURL(this.url);
    }

    async getDownloadButtons()
    {
        return await this.downloadButtons.elementHandles();
    }

    async extractFileName(downloadButton)
    {
        const downloadLink = await downloadButton.getAttribute('href');
        return decodeURIComponent(downloadLink.split('/').pop() || '');
    }

    async clickDownloadButton(downloadButton)
    {
        await downloadButton.click();
    }

    async getLargestFilePerExtension()
    {
        const buttons = await this.getDownloadButtons();
        const firstFilePerExt = new Map();

        const pattern = /\.(jpg|png|txt|json|xlsx|pdf|mp4|zip|py|exe|docx|jpeg|csv|sol|tmp|java|doc|class|bin|mov|xml|bmp|webp|rtf)$/i;

        for (const button of buttons)
        {
            const fileName = await this.extractFileName(button);
            const match = fileName.match(pattern);
            if (match) 
            {
                const ext = match[1].toLowerCase();
                if (!firstFilePerExt.has(ext)) 
                {
                    firstFilePerExt.set(ext, button);
                }
            }
        }

        return firstFilePerExt;
    }
}