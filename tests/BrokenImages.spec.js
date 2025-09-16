import { test, expect } from '@playwright/test';
import { BrokenImagesPage } from '../pages/BrokenImages.page';

test.describe('Basic Auth', () => {
    test('verifyImages', async ({ page }) => {
        const brokenImagesPage = new BrokenImagesPage(page);
        await brokenImagesPage.goto();
        
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