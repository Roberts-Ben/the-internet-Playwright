import { test, expect } from '@playwright/test';
import { testA11y } from '../fixtures/a11yFixture.js';
import { GeolocationPage } from '../pages/Geolocation.page';

test.describe('Geolocation', () => {
  let geolocationPage;

  test.beforeEach(async ({ browser }) => {
    const context = await browser.newContext({
      permissions: ['geolocation'],
      geolocation: { latitude: 51.5074, longitude: -0.1278 },
    });

    const page = await context.newPage();
    geolocationPage = new GeolocationPage(page);
    await geolocationPage.goto();
  });

  testA11y('accessibility', async ({ accessibilityBuilder }, testInfo) => { 
    const results = await accessibilityBuilder.analyze();
    await testInfo.attach("accessibility-scan-results", {
      body: JSON.stringify(results.violations, null, 2),
      contentType: "application/json"
    });
    
    //expect(results.violations).toEqual([]); 
  });

  test('verifyLocation', async () => {
    await geolocationPage.clickLocationButton();

    await expect(geolocationPage.latValue).toBeVisible();

    const locationURL = geolocationPage.mapsBaseUrl + await geolocationPage.getLocation();
    expect(locationURL).toEqual(await geolocationPage.getMapsLinkAttribute());
  });
});