import { test, expect } from '@playwright/test';
import { testA11y } from '../fixtures/a11yFixture.js';
import { FileDownloadPage } from '../pages/FileDownload.page';
import { isFileDownloaded } from '../utils/fileUtils.js';
import path from 'path';
import fs from 'fs';

test.describe('file Download', () => {
  let fileDownloadPage;
  const downloadDir = path.resolve('./downloads');

  test.beforeEach(async ({ page }) => {
    fileDownloadPage = new FileDownloadPage(page);
    await fileDownloadPage.goto();
    if (!fs.existsSync(downloadDir)) fs.mkdirSync(downloadDir, { recursive: true });
  });

  testA11y('accessibility', async ({ accessibilityBuilder }, testInfo) => { 
    const results = await accessibilityBuilder.analyze();
    await testInfo.attach("accessibility-scan-results", {
      body: JSON.stringify(results.violations, null, 2),
      contentType: "application/json"
    });
    
    //expect(results.violations).toEqual([]); 
  });

  test('verifyFileDownload', async ( { page }) => {
    const filesToDownload = await fileDownloadPage.getLargestFilePerExtension();
    const totalFiles = filesToDownload.size;
    let currentFile = 1;

    for (const [ext, downloadButton] of filesToDownload) 
    {
        const fileName = await fileDownloadPage.extractFileName(downloadButton);

        console.log("Downloading " + ext + " file: " + fileName);

        const [ download ] = await Promise.all([
          page.waitForEvent('download'),
          downloadButton.click()
        ]);

        await download.saveAs(path.join(downloadDir, fileName));
        
        console.log(`${fileName} - ${currentFile}/${totalFiles}`);
        currentFile++;

        const result = await isFileDownloaded(fileName, true, downloadDir);
        expect(result).toBe(true);
    }
  });
});