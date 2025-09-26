import { test, expect } from '@playwright/test';
import { testA11y } from '../fixtures/a11yFixture.js';
import { FileUploadPage } from '../pages/FileUpload.page';

test.describe('File Upload', () => {
  let fileUploadPage;

  test.beforeEach(async ({ page }) => {
    fileUploadPage = new FileUploadPage(page);
    await fileUploadPage.goto();
  });

  testA11y('accessibility', async ({ accessibilityBuilder }, testInfo) => { 
    const results = await accessibilityBuilder.analyze();
    await testInfo.attach("accessibility-scan-results", {
      body: JSON.stringify(results.violations, null, 2),
      contentType: "application/json"
    });
    
    //expect(results.violations).toEqual([]); 
  });

  test('verifyUpload', async () => {
      await fileUploadPage.uploadFile();

      await fileUploadPage.clickUpload();

      await expect(fileUploadPage.uploadedFile).toHaveText(fileUploadPage.fileName);
  });

  test('verifyEmptyUpload', async () => {
      await fileUploadPage.clickUpload();

      await expect(fileUploadPage.header).toHaveText('Internal Server Error');
  });
});