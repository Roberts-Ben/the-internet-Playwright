import { test, expect } from '@playwright/test';
import { testA11y } from '../fixtures/a11yFixture.js';
import { BrokenImagesPage } from '../pages/BrokenImages.page';

test.describe('Broken Images', () => {
    let brokenImagesPage;
    
    test.beforeEach(async ({ page }) => {
        brokenImagesPage = new BrokenImagesPage(page);
        await brokenImagesPage.goto();
    });

    testA11y('accessibility', async ({ accessibilityBuilder }, testInfo) => { 
        const results = await accessibilityBuilder.analyze();
        await testInfo.attach("accessibility-scan-results", {
            body: JSON.stringify(results, null, 2),
            contentType: "application/json"
        });
        
        //expect(results.violations).toEqual([]); 
    });
    
    test('verifyImages', async ({ page }) => {       
        const images = await brokenImagesPage.getAllImages();

        let count = await images.count();

        for (let i = 0; i < count; i++) 
        {
            const imageURL = await brokenImagesPage.getImageURL(images.nth(i));
            const response = await page.request.get(imageURL);

            if(response.status() === 200)
            {
                expect(response.status()).toBe(200);
            }
            else if(response.status() === 404)
            {
                expect(response.status()).toBe(404);
            }
        }
    });
});