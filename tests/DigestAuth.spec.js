import { test, expect } from '@playwright/test';
import { testA11y } from '../fixtures/a11yFixture.js';
import { AuthPage } from '../pages/Auth.page';

test.describe('Digest Auth', () => {

    testA11y('accessibility', async ({ page, accessibilityBuilder }, testInfo) => { 
        const authPage = new AuthPage(page, 'digest');
        await authPage.navigateWithCredentials();
        
        const results = await accessibilityBuilder.analyze();
        await testInfo.attach("accessibility-scan-results", {
            body: JSON.stringify(results.violations, null, 2),
            contentType: "application/json"
        });
        
        //expect(results.violations).toEqual([]); 
    });

    test('verifyAuthSuccessViaDirectURL', async ({ page }) => {
        const authPage = new AuthPage(page, 'digest');
        await authPage.navigateWithCredentials();
        
        const message = await authPage.getSuccessMessage();
        expect(message).toContain(authPage.successMessageText);
    });

    test('verifyHttpCredentials', async ({ browser }) => {
        const context = await browser.newContext({
            httpCredentials: { username: 'admin', password: 'admin' }
        });
        const page = await context.newPage();
        const authPage = new AuthPage(page, 'digest');

        await authPage.navigateWithAuth();
        const message = await authPage.getSuccessMessage();
        expect(message).toContain(authPage.successMessageText);

        await context.close();
    });

    test('verifyNoAuth', async ({ page }) => {
        const authPage = new AuthPage(page, 'digest');

        const response = await page.request.get(authPage.url);
        
        expect(response.status()).toBe(401);
    }); 

    test('verifyInvalidAuth', async ({ browser }) => {
        const context = await browser.newContext({
        httpCredentials: { username: 'wronguser', password: 'wrongpass' }
        });

        const page = await context.newPage();
        const authPage = new AuthPage(page, 'digest');
        
        const response = await context.request.get(authPage.url);
        if (!response) throw new Error('Navigation failed, response is null');
        expect(response.status()).toBe(401);

        await context.close();
    });
});