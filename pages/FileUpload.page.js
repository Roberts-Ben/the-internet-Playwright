import { expect } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

export class FileUploadPage 
{
  constructor(page) 
  {
    this.page = page;
    this.url = 'https://the-internet.herokuapp.com/upload';

    const filename = fileURLToPath(import.meta.url);
    const dirname = path.dirname(filename);
    this.filePath = path.join(dirname, '..', 'resources', 'testuploadfile');
    this.fileName = 'testFile.txt';

    this.chooseFileButton = this.page.locator('#file-upload');
    this.uploadButton = this.page.getByRole('button', { name: 'Upload' });
    this.uploadedFile = this.page.locator('#uploaded-files');
    this.header = this.page.getByRole('heading', { level: 1 });
  }

  async goto() 
  {
    await this.page.goto(this.url);
    await expect(this.page).toHaveURL(this.url);
  }

  async uploadFile() 
  {
    const fullPath = path.join(this.filePath, this.fileName);
    await this.chooseFileButton.setInputFiles(fullPath);
  }

  async clickUpload() 
  {
    await this.uploadButton.click();
  }
}