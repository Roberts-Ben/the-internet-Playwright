import { expect } from '@playwright/test';

export class FileUploadPage 
{
    constructor(page) 
    {
        this.page = page;
        this.url = 'https://the-internet.herokuapp.com/upload';
        this.filePath = '/AutomatedTesting/the-internet-Playwright/resources/testuploadfile';
        this.fileName = 'testFile.txt';
        this.chooseFileButton = this.page.locator('#file-upload');
        this.uploadButton = this.page.locator('#file-submit');
        this.uploadedFile = this.page.locator('#uploaded-files');
        this.header  = this.page.locator('h1');
    }

    async goto() 
    {
        await this.page.goto(this.url);
        await expect(this.page).toHaveURL(this.url);
    }

    async uploadFile()
    {
        await this.chooseFileButton.setInputFiles(this.filePath + '/' + this.fileName);
    }

    async clickUpload()
    {
        await this.uploadButton.click();
    }
}