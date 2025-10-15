import { expect } from '@playwright/test';

export class GeolocationPage 
{
    constructor(page) 
    {
        this.page = page;
        this.url = 'https://the-internet.herokuapp.com/geolocation';
        this.mapsBaseUrl = 'http://maps.google.com/';
        this.locationButton = this.page.locator("//button[@onclick='getLocation()']");
        this.latValue = this.page.locator('#lat-value');
        this.longValue = this.page.locator('#long-value');
        this.mapsLink = this.page.locator("//a[contains(text(), 'See it on Google')]");
    }

    async goto() 
    {
        await this.page.goto(this.url);
        await expect(this.page).toHaveURL(this.url);
    }

    async clickLocationButton()
    {
        await this.locationButton.click();
    }

    async getMapsLinkAttribute()
    {
        return await this.mapsLink.getAttribute('href');
    }

    async getLocation()
    {
        return "?q=" + await this.latValue.innerText()+ "," + await this.longValue.innerText();
    }
}